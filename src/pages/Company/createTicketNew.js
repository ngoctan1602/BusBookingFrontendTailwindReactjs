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
import * as RoutesSV from "../../services/RoutesSV";
import * as BusSV from "../../services/Company/BusSV";
import * as RouteDetailSV from "../../services/Company/RouteDetailSV";
import * as PriceClassSV from "../../services/PriceClassSV";
import * as TicketSV from "../../services/Company/Ticket";
import * as ticketServices from "../../services/Company/Ticket";
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyFormat from 'react-currency-format';

const CreateTicketNew = () => {
    ;
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
    // const createTicket = async () => {
    //     const submit = {
    //         // date: date,
    //         price: price,
    //         busId: Number(id),
    //         ticketStations: itemSelected,
    //     }
    //     setLoadingCreate(false)
    //     try {
    //         const resp = await ticketServices.createTicket(submit);
    //         console.log(resp)
    //         setLoadingCreate(true)
    //         if (resp.isError)
    //             notifyError()
    //         else {

    //             notifySuccess()
    //             setTimeout(
    //                 () => {
    //                     fetchData()
    //                 }
    //             )
    //         }
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    //     console.log(submit)

    // }
    // const [price, setPrice] = useState(2000);
    const [busStationOfBus, setBusStationOfBus] = useState()
    const [loading, setLoading] = useState(true);





    const [route, setRoute] = useState([])
    const [priceClass, setPriceClass] = useState([])
    const fetchData = async () => {
        try {

            const response = await RoutesSV.getAllRoutesByCompany({ pageSize: 200 });
            console.log(response.data.items)
            if (!response.isError) {
                setRoute(response.data.items)
            }

            const priceClass = await PriceClassSV.getAllInCompany({ pageSize: 200 });
            setPriceClass(priceClass.data.items)
            // setBusStationOfBus(response.data.items)
            // setLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchData();

    }, []);

    const [bus, setBus] = useState([]);
    const [routeDetail, setRouteDetail] = useState([]);
    const changeRoute = async (id) => {
        setBus([])
        try {
            const response = await BusSV.GetInRoute({ routeId: id, pageSize: 200 });
            console.log(response.data.items)
            if (!response.isError) {
                setBus(response.data.items)
            }
            const routeDetailResp = await RouteDetailSV.getInRoute({ routeId: id, pageSize: 200 });
            console.log(routeDetailResp)
            setRouteDetail(routeDetailResp.data.items)
            const ids = routeDetailResp.data.items.map(item => item.id).filter(id => id !== null);
            setSelectedIds(ids)
            // setBusStationOfBus(response.data.items)
            // setLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }


    const [selectedIds, setSelectedIds] = useState([]);
    // const [selectedItem, setItemSelected] = useState([]);
    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            // Nếu được chọn, thêm ID vào mảng
            setSelectedIds(prevIds => [...prevIds, id]);
        } else {
            // Nếu không được chọn, loại bỏ ID khỏi mảng
            setSelectedIds(prevIds => prevIds.filter(prevId => prevId !== id));
        }

    };
    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    // const [date, setDate] = useState(getFormattedDate())
    const createTicket = async () => {
        const TicketStations = selectedIds.map((id) => {
            return { RouteDetailId: id };
        });
        const add = { ...objectAdd, TicketStations: TicketStations }
        setLoadingCreate(true)
        try {
            const resp = await TicketSV.createTicket(add)
            setLoadingCreate(false)
            if (!resp.isError) {
                notifySuccess();
            }
            else {
                notifyError()
            }
        } catch (error) {

        }
    }
    const [objectAdd, setObjectAdd] = useState(
        {
            DateOnly: getFormattedDate(),
            busId: 0,
            PriceClassificationId: 1,
            TicketStations: []
        }
    )

    const updateValue = (name, value) => {
        setObjectAdd({ ...objectAdd, [name]: value })
    }
    return (
        <div class='w-full h-full text-txt txt-16 relative'>
            {
                loadingCreate &&
                <div class='absolute w-[100%] h-full z-20 '>
                    <ReactLoading
                        type="spinningBubbles" color="black"
                        height={'8%'} width={'8%'}
                        className="absolute left-1/2 top-[30%]  "
                    />
                </div>
            }
            <div className="grid grid-cols-12 gap-sm  text-20">
                Tạo vé
            </div>

            <div className="grid grid-cols-12 gap-sm  text-16 my-md">
                <p className="col-span-2 flex items-center">Chọn lộ trình</p>
                <select
                    onChange={(e) => changeRoute(Number(e.target.value))}
                    className="col-span-4 p-sm bg-bg outline-none border-[1px] rounded-md">
                    <option value={0}>
                        Chọn lộ trình
                    </option>
                    {
                        route.length > 0 && route.map(
                            item => (
                                <option value={item.id}>
                                    {
                                        item.stationStartName + " - " + item.stationEndName
                                    }
                                </option>
                            )
                        )
                    }
                </select>

                <div className="col-span-5 grid-cols-8 grid grid-flow-row">
                    <p className="flex items-center col-span-2">Chọn ngày đi</p>
                    <input
                        value={objectAdd.DateOnly}
                        onChange={(e) => updateValue("DateOnly", e.target.value)}
                        type="date" className="border-[1px] border-txt text-center col-span-6 bg-bg outline-none rounded-md"></input>
                </div>


            </div>


            <div className="grid grid-cols-12 gap-sm  text-16 my-md">
                <p className="col-span-2 flex items-center">Chọn xe</p>
                <select
                    onChange={(e) => updateValue("busId", e.target.value)}
                    className="col-span-4 p-sm bg-bg outline-none border-[1px] rounded-md">
                    <option value={0}>
                        Chọn xe
                    </option>
                    {
                        bus.length > 0 && bus.map(
                            item => (
                                <option value={item.id}>
                                    {
                                        item.busNumber + " - " + item.busType
                                    }
                                </option>
                            )
                        )
                    }
                </select>


            </div>

            <div className="grid grid-cols-12 gap-sm  text-16 my-md">
                <p className="col-span-2 flex items-center">Chọn loại giá</p>
                <select
                    onChange={(e) => updateValue("PriceClassificationId", e.target.value)}
                    className="col-span-4 p-sm bg-bg outline-none border-[1px] rounded-md">
                    <option value={0}>
                        Chọn loại giá
                    </option>
                    {
                        priceClass.length > 0 && priceClass.map(
                            item => (
                                <option value={item.id}>
                                    {
                                        item.name + " - " + item.value + "%"
                                    }
                                </option>
                            )
                        )
                    }

                </select>

                <div className="col-span-5 grid-cols-8 grid grid-flow-row">
                    <button className="
                    hover:bg-button hover:text-bg
                    ease-in-out duration-300
                    col-span-6 col-start-3 border-[1px] border-button"
                        onClick={() => createTicket()}
                    >Tạo vé xe</button>
                </div>
            </div>
            {/* <p className="w-full">Đã chọn{selectedIds.join(',')}</p> */}
            <div class='col-span-12 col-start-1 overflow-y-auto overflow-x-auto mb-lg max-h-[300px] shadow-lg'>
                <table class="w-full my-sm rounded-md border-collapse  text-txt text-16 ">
                    <thead>
                        <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>

                            <th class='col-span-1 col-start-2 '>Thứ tự</th>
                            <th class='col-span-2'>Tên bến xe</th>
                            <th class='col-span-2'>Giờ cập bến</th>
                            <th class='col-span-2'>Giờ xuất bến</th>
                            <th class='col-span-2'>Giảm giá</th>
                            <th class='col-span-2'>Ngày so với bến xuất phát</th>
                        </tr>
                    </thead>
                    <tbody class='bg-[#FFFF]'>
                        {
                            routeDetail.length > 0 &&
                            routeDetail.map((item) => (
                                <tr className="grid grid-cols-12 p-sm text-left gap-md">
                                    <td class='col-span-1'>
                                        {
                                            (item.indexStation === 1 || item.indexStation === (routeDetail.length))
                                                ?
                                                <input type="checkbox" checked className="bg-txt"></input>
                                                :
                                                <input type="checkbox" className="bg-txt"
                                                    checked={selectedIds.includes(item.id)}
                                                    onChange={(e) => handleCheckboxChange(e, item.id)}
                                                ></input>
                                        }
                                    </td>
                                    <td class='col-span-1'>{item.indexStation}</td>

                                    <td class='col-span-2'>{item.busStationName}</td>
                                    <td class='col-span-2'>
                                        <input className="w-full text-center rounded-sm outline-none px-sm bg-bg border-[1px] border-hover-txt"
                                            type="time"
                                            value={item.arrivalTime}
                                            disabled
                                            hidden={item.indexStation === 1 ? true : false}
                                        >
                                        </input>
                                    </td>
                                    <td class='col-span-2'>
                                        <input className="w-full text-center rounded-sm outline-none px-sm bg-bg border-[1px] border-hover-txt"
                                            type="time"
                                            value={item.departureTime}
                                            disabled
                                            hidden={item.indexStation === routeDetail.length ? true : false}
                                        >
                                        </input>
                                    </td>

                                    <td class='col-span-2'>

                                        <CurrencyFormat value={item.discountPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                    </td>
                                    <td class='col-span-2'>

                                        {
                                            item.addDay
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </div >
    );
}

export default CreateTicketNew;