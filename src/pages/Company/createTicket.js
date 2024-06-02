import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import PopupUpdate from "../../components/Layout/Components/Company/Bus/PopupUpdate";
import PopupUpdateSeat from "../../components/Layout/Components/Company/Bus/PopupUpdateSeat";
import steeringWheel from "../../assets/images/steering_wheel.png"
import seat from "../../assets/images/seat.png"
import seatActive from "../../assets/images/seat_button.png"
import seatError from "../../assets/images/seat-error.png"
import { Tooltip as ReactTooltip } from "react-tooltip";
import PopupAddBusStation from "../../components/Layout/Components/Company/Bus/PopupAddBusStation";
import { useNavigate } from "react-router-dom";
import * as busStationSV from "../../services/BusStationSv";
import * as ticketServices from "../../services/Company/Ticket";
import CurrencyFormat from "react-currency-format";
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Ticket = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [status, setStatus] = useState(1);
    const [date, setDate] = useState(new Date());
    const notifySuccess = () => toast.success('Tạo vé thành công', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = () => toast.error('Tạo vé thất bại', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const [loadingCreate, setLoadingCreate] = useState(false)
    const createTicket = async () => {
        const submit = {
            // date: date,
            price: price,
            busId: Number(id),
            ticketStations: itemSelected,
        }
        setLoadingCreate(false)
        try {
            const resp = await ticketServices.createTicket(submit);
            console.log(resp)
            setLoadingCreate(true)
            if (resp.isError)
                notifyError()
            else {

                notifySuccess()
                setTimeout(
                    () => {
                        fetchData()
                    }
                )
            }
        }
        catch (error) {
            console.log(error);
        }
        console.log(submit)

        // setStatus(0)
    }
    // const [price, setPrice] = useState(2000);
    const [busStationOfBus, setBusStationOfBus] = useState()
    const [loading, setLoading] = useState(true);

    const [selectedIds, setSelectedIds] = useState([]);


    const [itemSelected, setItemSelected] = useState([]);

    /**
     * Check DepartureTime must graeter than ArrivalTime
     * @param {*} data1 is DepartureTime
     * @param {*} data2 is ArrivalTime
     * @returns 
     */
    function checkDepartureTimeAndArrivalTime(data1, data2) {
        if (data1.getTime() > data2.getTime()) {
            return true;
        }
        return false;
    }


    const updateTicketStations = (id, newValue, name) => {

        setItemSelected((prevItems) =>
            prevItems.map((item) =>
                item.busStopId === id ? { ...item, [name]: newValue } : item
            )
        );

    };



    const handleCheckboxChange = (event, id, item) => {
        console.log(item.departureTime.toISOString())

        if (event.target.checked) {
            // Nếu được chọn, thêm ID vào mảng
            setSelectedIds(prevIds => [...prevIds, id]);
            setItemSelected(prevItem => [...prevItem, item]);

        } else {
            // Nếu không được chọn, loại bỏ ID khỏi mảng
            setSelectedIds(prevIds => prevIds.filter(prevId => prevId !== id));
            // setItemSelected(prevItem => prevItem.filter(prevItem => prevItem.busStopId !== id));
            setItemSelected(prevItem => {
                const updatedItems = prevItem
                    .filter(item => item.busStopId !== id)
                    .map((item, index) => ({ ...item, indexStation: index }));

                return updatedItems;
            });
        }

    };
    const fetchData = async () => {
        try {

            const response = await busStationSV.getAllInBus({ busId: id });
            setBusStationOfBus(response.data.items)
            setLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchData();

    }, []);
    const [price, setPrice] = useState(0);

    return (
        <div class='w-full h-full text-txt txt-16'>
            {
                loadingCreate &&
                <div class='absolute w-[100%] h-full z-20 opacity-40'>
                    <ReactLoading
                        type="spinningBubbles" color="black"
                        height={'5%'} width={'5%'}
                        className="absolute left-1/2 top-[30%]  "
                    />
                </div>
            }
            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <select class='p-sm bg-bgPopup rounded-md text-16 font-bold col-span-2 outline-none'
                    onChange={(e) => navigate(e.target.value)}
                >
                    <option class='m-sm' value={`/company/bus/${id}`} >
                        Quản lý xe
                    </option>
                    <option value={`/company/ticket/${id}`} selected>
                        Quản lý vé
                    </option>
                </select>


            </div>

            <div class='grid grid-flow-row grid-cols-9 gap-4 my-md'>
                {/* <input type="date" class='col-span-2 p-md  bg-bgPopup rounded-md'
                    value={date.toLocaleDateString('en-CA')}
                    onChange={(e) => setDate(new Date(e.target.value))}
                >
                </input> */}
                <CurrencyFormat
                    class='text-center outline-none bg-bgPopup border-[1px] rounded-md col-span-2'
                    thousandSeparator={true} suffix={' đ'}
                    value={price}
                    onValueChange={(values) => setPrice(values.value)}
                // onValueChange={(values) => {
                //     updateTicketStations(item.busStopId, values.value || 0, "price")
                // }}
                />
                {
                    status === 1 ?
                        <button class='col-span-1 p-md rounded-md border-[1px] border-button col-start-4
                     hover:bg-button hover:text-bg ease-in-out duration-300'
                            onClick={() => createTicket()}
                        >
                            Tạo vé
                        </button> :
                        <button class='col-span-1 p-md rounded-md outline-none border-none col-start-4
                        bg-hover-txt cursor-default text-bg
                     '>
                            Đã tạo vé
                        </button>
                }
            </div>

            <div class='text-16 font-bold'>
                Danh sách các bến của xe
            </div>
            <div class='w-full h-[250px] overflow-y-auto overflow-x-auto mb-md'>

                <table class="w-full my-sm rounded-md border-collapse  text-txt text-16 overflow-hidden">
                    <thead>
                        <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                            <th class='col-span-1 col-start-2'>Id</th>
                            <th class='col-span-4'>Tên bến xe</th>
                            <th class='col-span-4'>Địa chỉ</th>
                            <th class='col-span-2'>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody class='bg-[#FFFF]'>
                        {
                            loading ?
                                <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                                </div>
                                :
                                busStationOfBus &&
                                busStationOfBus.map((item, index) =>
                                    <tr class='grid bg-bgPopup grid-cols-12 p-sm text-left gap-md'
                                        style={{ backgroundColor: item.status === 0 ? "#75718a" : "" }}

                                    >
                                        <td>
                                            <input type="checkbox" class='col-span-1'
                                                onChange={(e) => handleCheckboxChange(e, item.id,
                                                    item = {
                                                        indexStation: selectedIds.length,
                                                        busStopId: item.busStopId,
                                                        name: item.name,
                                                        DiscountPrice: 0,
                                                        departureTime: new Date(),
                                                        arrivalTime: new Date(),
                                                    })}
                                                checked={selectedIds.includes(item.id)}
                                            >
                                            </input>
                                        </td>
                                        <td class='col-span-1'>{item.id}</td>
                                        <td class='col-span-4'>{item.name}</td>
                                        <td class='col-span-4'>{item.addressDb}</td>
                                        <td class='col-span-2'>
                                            {
                                                item.status === 1 ? "Hoạt động" : "Ngưng hoạt động"
                                            }
                                        </td>
                                    </tr>
                                )
                        }

                    </tbody>
                </table>
            </div>

            <div class='text-16 font-bold'>
                Danh sách các bến được chọn
            </div>

            <div class='w-full h-[250px] overflow-y-auto overflow-x-auto mb-md'>

                <table class="w-full my-sm rounded-md border-collapse  text-txt text-16 overflow-hidden">
                    <thead>
                        <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                            <th class='col-span-1'>Id</th>
                            <th class='col-span-3'>Tên bến xe</th>
                            <th class='col-span-3'>Giờ cập bến</th>
                            <th class='col-span-3'>Giờ xuất bến</th>
                            <th class='col-span-2'>Giá</th>
                        </tr>
                    </thead>
                    <tbody class='bg-[#FFFF]'>
                        {
                            loading ?
                                <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                                </div>
                                :
                                itemSelected &&
                                itemSelected.map((item, index) =>
                                    <tr class='grid bg-bgPopup grid-cols-12 p-sm text-left gap-md'
                                        style={{ backgroundColor: item.status === 0 ? "#75718a" : "" }}

                                    >
                                        <td class='col-span-1'>{item.busStopId}</td>
                                        <td class='col-span-2'>{item.name}</td>
                                        <td class='col-span-3'>
                                            <input type="datetime-local"
                                                class=' outline-none bg-bgPopup rounded-md'
                                                value={new Date(item.departureTime - item.departureTime.getTimezoneOffset() * 60000)
                                                    .toISOString()
                                                    .slice(0, 16)}

                                                onChange={(e) => updateTicketStations(item.busStopId, new Date(e.target.value), "departureTime")}

                                            >
                                            </input>
                                        </td>
                                        <td class='col-span-3'>
                                            <input type="datetime-local" class=' outline-none bg-bgPopup rounded-md'
                                                value={new Date(item.arrivalTime - item.arrivalTime.getTimezoneOffset() * 60000)
                                                    .toISOString()
                                                    .slice(0, 16)}
                                                onChange={(e) => updateTicketStations(item.busStopId, new Date(e.target.value), "arrivalTime")}
                                            >
                                            </input>
                                        </td>
                                        <td class='col-span-1'>
                                            <CurrencyFormat
                                                class='text-center outline-none bg-bgPopup border-[1px] rounded-md'
                                                thousandSeparator={true} suffix={' đ'}
                                                value={item.DiscountPrice}
                                                onValueChange={(values) => {
                                                    updateTicketStations(item.busStopId, values.value || 0, "price")
                                                }}
                                            />
                                        </td>

                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default Ticket;