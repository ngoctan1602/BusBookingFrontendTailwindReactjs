import { Link, useParams } from "react-router-dom";
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
import * as SeatsSV from "../../services/SeatsSV";
import * as BusSV from "../../services/Company/BusSV";
import { useLocation } from 'react-router-dom';
import CurrencyFormat from "react-currency-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BusDetail = () => {
    let { id } = useParams();

    let navigate = useNavigate();
    const location = useLocation();

    const [bus, setBus] = useState()
    const [itemUpdate, setUpdateItem] = useState(
        {
            Id: bus ? bus.id : '',
            busNumber: bus ? bus.busNumber : '',
            description: bus ? bus.description : '',
        }
    )
    const [routesOfBus, setRoutesOfBus] = useState([])
    const [loading, setLoading] = useState(false);
    const [firstFloor, setFirstFloor] = useState()

    const [secondFloor, setSecondFloor] = useState()

    const fetchData = async () => {
        try {
            setLoading(true)
            // const response = await busStationSV.getAllInBus({ busId: id });
            // setBusStationOfBus(response.data.items)

            const seat = await SeatsSV.getAllBusOfCompany({ busId: id, pageSize: 200 });
            if (!seat.isError) {

                setFirstFloor(seat.data.items.slice(0, seat.data.items.length / 2))
                setSecondFloor(seat.data.items.slice(seat.data.items.length / 2))
            }
            const busresp = await BusSV.getBusById({ id: id, pageSize: 200 });
            if (!busresp.isError && busresp.data) {
                setBus(busresp.data)
                setUpdateItem(
                    {
                        Id: busresp.data.id,
                        busNumber: busresp.data.busNumber,
                        description: busresp.data.description,
                    }
                )
                setRoutesOfBus(busresp.data.routes)
            }
            setLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchData();

    }, []);


    const [propUpdate, setPropUpdate] = useState({
        title: "Cập nhật thông tin xe",
        item: [
            {
                id: 1, name: "busID", content: "Id", spanWidth: 60, placeholder: "Id"
            },
            {
                id: 2, name: "busNumber", content: "Biển số xe", spanWidth: 120, placeholder: "Biển số xe", value: itemUpdate.busNumber
            },
            {
                id: 3, name: "description", content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả", value: itemUpdate.description
            },

        ],
    })

    const updateItemValue = (name, newValue) => {
        // propUpdate.item.map(item => {
        //     if (item.id === id) {
        //         setUpdateItem({ ...itemUpdate, [item.name]: newValue })
        //     }
        // });
        setUpdateItem({ ...itemUpdate, [name]: newValue })
    };
    const closePopup = () => {
        setUpdateItem({
            id: bus.id,
            busNumber: bus.busNumber,
            description: bus.description,
            status: bus.status
        })
    }
    const success = useCallback(() => {
        let isSuccess = true;
        for (let a in itemUpdate) {
            if (itemUpdate[a] === "") {
                isSuccess = false
            }
        }
        return isSuccess
    }, [itemUpdate])





    const [contentTooltip, setContentTooltip] = useState("");

    const [seatupdate, setSeatUpdate] = useState({
        title: "Cập nhật ghế ngồi",
        item: [
            {
                id: 1, name: "seatNumber", content: "Mã ghế", spanWidth: 70, placeholder: "Mã ghế"
            },
            {
                id: 2, name: "price", content: "Giá", spanWidth: 60, placeholder: "Giá"
            },
            {
                id: 3, name: "seatType", content: "Loại chỗ ngồi", spanWidth: 160, placeholder: "Loại chỗ ngoài"
            },
            {
                id: 4, name: "status", content: "Trạng thái", spanWidth: 160
            }
        ],
    })
    return (
        <div class='w-full h-full text-txt txt-16'>

            <div class='grid grid-cols-12 grid-flow-row w-1/2 items-center'>
                {/* <div className="col-span-1"> */}
                <FontAwesomeIcon className="cursor-pointer hover:text-button ease-in-out duration-150 h-[20px] w-[20px]" icon={faArrowLeft}
                    onClick={() => navigate('/company/bus')}
                ></FontAwesomeIcon>
                {/* </div> */}
                <p className="col-span-10 text-20">Chi tiết xe</p>


            </div>


            <div class=' w-full h-full grid grid-flow-row'>
                <div class='grid grid-cols-12 gap-sm'>
                    {/* Cập nhật thông tin chi tiết  */}
                    <div class='text-16 w-full col-span-5'>

                        {/* <div class='grid grid-cols-8 grid-flow-row w-full'>
                                <p class='col-span-3'>Mã xe:</p>
                                <p class='col-span-5'>{id}</p>
                            </div> */}
                        <p class='font-bold text-20'>Thông tin chi tiết</p>

                        {loading ?
                            <div className="animate-pulse bg-hover-txt col-span-5 h-[310px] text-bg text-center">
                            </div> :
                            bus &&
                            <div>

                                <div class='grid grid-cols-8 grid-flow-row w-full'>
                                    <p class='col-span-3'>Số xe:</p>
                                    <p class='col-span-5'>{bus.busNumber}</p>
                                </div>
                                <div class='grid grid-cols-8 grid-flow-row w-full'>
                                    <p class='col-span-3'>Mô tả:</p>
                                    <p class='col-span-5'>{bus.description}</p>
                                </div>
                                <div class='grid grid-cols-8 grid-flow-row w-full'>
                                    <p class='col-span-3'>Loại xe:</p>
                                    <p class='col-span-5'>{bus.busType}</p>
                                </div>
                                <div class='grid grid-cols-8 grid-flow-row w-full'>
                                    <p class='col-span-3'>Tổng chỗ:</p>
                                    <p class='col-span-5'>{bus.totalSeat}</p>
                                </div>
                                <div class='grid grid-cols-8 grid-flow-row w-full'>
                                    <p class='col-span-3'>Trạng thái:</p>
                                    <p p class='col-span-5'>
                                        {
                                            bus.status === 0 ? "Ngưng hoạt động" : "Hoạt động"
                                        }
                                    </p>
                                </div>
                                <div class='grid grid-cols-8 grid-flow-row w-full'>
                                    <PopupUpdate fetchData={fetchData} item={propUpdate} busUpdate={itemUpdate} onChange={updateItemValue} closePopup={closePopup} success={success} />
                                </div>
                            </div>
                        }
                    </div>
                    {/* Cập nhật ghế ngồi */}

                    <div class='col-span-7'>
                        <p class='font-bold text-20'>Danh sách chỗ ngồi</p>
                        {
                            loading ?
                                <div className="animate-pulse bg-hover-txt w-full h-[310px] text-bg text-center">
                                </div>
                                :
                                <div class='grid-flow-row grid-cols-2 grid gap-md'>
                                    <div class='rounded-lg col-span-1 bg-bgPopup h-[310px] overflow-y-auto'>
                                        <img class='w-[50px] h-[50px] m-sm cursor-not-allowed' src={steeringWheel}></img>

                                        <div class='grid-cols-3 grid grid-flow-row gap-sm my-lg mx-md'>
                                            {
                                                firstFloor &&
                                                firstFloor.map((item, index) => (
                                                    // <CurrencyFormat value={min} displayType={'text'} thousandSeparator={true} suffix={' đ'} />

                                                    <div
                                                        onPointerOver={(e) => setContentTooltip({ id: item.id, price: item.price })}
                                                        data-tooltip-id="my-tooltip"
                                                    >
                                                        <PopupUpdateSeat
                                                            item={seatupdate}
                                                            seatUpdate={item}>
                                                        </PopupUpdateSeat>
                                                    </div>
                                                )
                                                )
                                            }

                                        </div>

                                    </div>

                                    <div class='rounded-lg col-span-1 bg-bgPopup h-[310px] overflow-y-auto'>
                                        <p class=' h-[50px] m-sm cursor-default'></p>

                                        <div class='grid-cols-3 grid grid-flow-row gap-sm my-lg mx-md'>
                                            {
                                                secondFloor &&
                                                secondFloor.map((item, index) => (
                                                    <div
                                                        onPointerOver={(e) => setContentTooltip({ id: item.id, price: item.price })}
                                                        data-tooltip-id="my-tooltip"
                                                    >
                                                        <PopupUpdateSeat
                                                            item={seatupdate}
                                                            seatUpdate={item}>
                                                        </PopupUpdateSeat>
                                                    </div>
                                                )
                                                )
                                            }
                                        </div>

                                    </div>

                                </div>
                        }
                    </div>
                </div>

                <div class='my-sm'>

                    <div class='grid grid-cols-12 grid-flow-row'>
                        <p class='col-span-10 font-bold text-20'>Danh sách tuyến của xe:</p>
                        {/* <PopupAddBusStation /> */}
                    </div>
                    <div class='w-full h-[250px] overflow-y-auto overflow-x-auto mb-md'>
                        <table class="w-full my-sm rounded-md border-collapse  text-txt text-16 overflow-hidden">
                            <thead>
                                <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md '>
                                    {/* <th class='col-span-2'>Id</th> */}
                                    <th class='col-span-4 '>Tên tuyến</th>
                                    <th class='col-span-8'>Lộ trình</th>
                                    {/* <th class='col-span-2'>Trạng thái</th> */}
                                </tr>
                            </thead>
                            <tbody class='bg-[#FFFF]'>
                                {/* {
                                    loading ?
                                        <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                                        </div>
                                        :
                                        busStationOfBus &&
                                        busStationOfBus.map((item, index) =>
                                            <tr class='grid bg-bgPopup grid-cols-12 p-sm text-left gap-md'
                                                style={{ backgroundColor: item.status === 0 ? "#75718a" : "" }}

                                            >
                                                <td class='col-span-2'>{item.id}</td>
                                                <td class='col-span-4'>{item.name}</td>
                                                <td class='col-span-4'>{item.addressDb}</td>
                                                <td class='col-span-2'>
                                                    {
                                                        item.status === 1 ? "Hoạt động" : "Ngưng hoạt động"
                                                    }

                                                    <select
                                                        class='bg-bgPopup outline-none'

                                                    >
                                                        <option>
                                                            Hoạt động
                                                        </option>
                                                        <option>
                                                            Ngưng hoạt động
                                                        </option>
                                                    </select>
                                                </td>
                                            </tr>
                                        )
                                } */}
                                {
                                    loading ?
                                        <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                                        </div> :
                                        routesOfBus.length > 0
                                            ?
                                            routesOfBus.map(items => (
                                                <tr class='grid  grid-cols-12 p-sm text-left gap-md'>
                                                    {/* <th class='col-span-2'>Id</th> */}
                                                    <td class='col-span-4 '>{items.stationStartName + " - " + items.stationEndName}</td>

                                                    <td class='col-span-8'>
                                                        {
                                                            items.routeDetailResponses.map((item, index) =>
                                                                (item.busStationName + (index != (items.routeDetailResponses.length - 1) ? " => " : ""))
                                                            )
                                                        }
                                                    </td>
                                                    {/* <th class='col-span-2'>Trạng thái</th> */}
                                                </tr>
                                            )) :
                                            <tr>
                                                Không có chuyến đi
                                            </tr>

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



            <ReactTooltip
                id="my-tooltip"
                place="top"
                variant="info"
                style={{ backgroundColor: "#00B873", color: "white" }}
                // content={contentTooltip}
                content={
                    <div>
                        <p>
                            Mã ghế: {contentTooltip.id}
                        </p>
                        <p> Giá tiền:
                            <CurrencyFormat value={contentTooltip.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </p>
                    </div>
                }
            />
        </div >
    );
}

export default BusDetail;