import Popup from "reactjs-popup";
import InputConfirmInfo from "../../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useCallback } from "react";
import * as SeatService from "../../../../../services/Company/SeatSV"
import * as TypeBusServices from "../../../../../services/TypeBusServices"
import * as BusStationSv from "../../../../../services/BusStationSv"
import * as BusSV from "../../../../../services/Company/BusSV"
import * as RoutesSV from "../../../../../services/RoutesSV"
import ReactLoading from 'react-loading';
const PopupAdd = ({ fetchData, items, propsAdd, onChange }) => {
    const contentStyle = { backgroundColor: '#FFFF', borderRadius: "8px", width: "60%" };

    const [typeSeat, setTypeSeat] = useState();
    const [typeBus, setTypeBus] = useState();
    const [busStation, setBusStation] = useState();

    // const [showId, setShowId] = useState([])

    const [submit, setSubmit] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            // Nếu được chọn, thêm ID vào mảng
            setSelectedIds(prevIds => [...prevIds, id]);

        } else {
            // Nếu không được chọn, loại bỏ ID khỏi mảng
            setSelectedIds(prevIds => prevIds.filter(prevId => prevId !== id));
        }

    };
    const [loading, setLoading] = useState(false);
    const [route, setRoute] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {

                const response = await SeatService.getAllSeatCompany({ pageSize: 200 });

                setTypeSeat(response.data.items);

                const restypebus = await TypeBusServices.getAllTypeBus();
                setTypeBus(restypebus.data.items);

                const respRoute = await RoutesSV.getAllRoutesByCompany({ pageSize: 200 });
                setRoute(respRoute.data.items)
                console.log(respRoute.data.items)
                // const restBusStation = await BusStationSv.getAllBusStation();
                // setBusStation(restBusStation.data.items);
                // console.log(restBusStation.data)

                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
            }
        };

        fetchData();

    }, []);


    const searchByLocation = useCallback(
        async (value) => {

            try {
                setLoading(true)
                const response = await BusStationSv.getByLocation({ location: value });
                setBusStation(response.data.items);
                setLoading(false)
            }
            catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
            }

        }, [busStation]
    )

    const notifySuccess = () => toast.success('Thêm thành công xe mới!', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = () => toast.error('Xe đã tồn tại trong hệ thống', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyWarning = () =>
        toast.warning('Vui nhập nhập đúng định dạng dữ liệu', {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const checkEmtyValue = () => {
        let success = true
        if (selectedIds.length === 0) {
            success = false
        }
        if (items.seatTypeID <= 0) {
            success = false
        }
        if (items.busTypeID <= 0) {
            success = false
        }
        if (!items.busNumber || !items.busNumber === '') {
            success = false;
        }
        if (!items.description || !items.description === '') {
            success = false;
        }
        return success
    }

    const getItemValue = async (close) => {
        if (checkEmtyValue()) {
            setSubmit(true)
            let newBus = { ...items, ListRouteId: selectedIds }
            try {
                const a = await BusSV.createBus(newBus);
                if (a.isError) {
                    notifyError()
                    return
                }
                notifySuccess()
            }
            catch (error) {
                console.log(error);
            }

            setSubmit(false);
            setTimeout(() => {
                close()
                fetchData()
            }, 1500);
            console.log(newBus)
        }
        else {
            notifyWarning()
        }
    };




    return (

        <Popup trigger={<button class="flex justify-center"> <FontAwesomeIcon icon={faPlus} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'></FontAwesomeIcon></button>} position="right center"
            modal
            nested
            closeOnDocumentClick={false}
            {... { contentStyle }}
        >
            {
                close => (

                    <div class='w-full h-full relative'>
                        {submit &&
                            <div class='absolute bg-hover-txt w-full h-full z-20 opacity-40'>
                                <ReactLoading
                                    type="spin" color="#ffffff"
                                    height={'5%'} width={'5%'}
                                    className="absolute bg-hover-txt left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                                />
                            </div>
                        }
                        <div class='p-md text-16 text-txt '>
                            <p class='text-20 text-center font-bold'>Thêm mới xe</p>

                            <div class="grid-flow-row grid grid-cols-12">
                                <div class='col-span-6 '>

                                    {
                                        propsAdd.item.map((item, index) => (
                                            item.name != "seatTypeID" && item.name != "busTypeID" &&
                                            <div class='grid grid-cols-12 w-full grid-flow-row'>
                                                <p class='col-span-3 col-start-2 flex items-center font-bold '>
                                                    {item.content}
                                                </p>
                                                {
                                                    <div

                                                        class='col-span-7 col-start-5 bg-bg  rounded-md '>
                                                        {
                                                            <InputConfirmInfo item={{ type: "text", placeholder: `${item.placeholder}`, value: items[item.name], spanWidth: Number(item.spanWidth), id: item.id, background: "#ffff" }} onChange={onChange} ></InputConfirmInfo>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                                <div class='col-span-6'>
                                    <div class='grid grid-cols-12 my-md'>
                                        <p class='col-span-3 col-start-1 font-bold p-[5px]'>
                                            Loại xe
                                        </p>
                                        {
                                            typeBus &&
                                            <select
                                                onChange={(e) => onChange(propsAdd.item[1].id, Number(e.target.value))}
                                                class='col-span-7 col-start-5 bg-bg outline-none border-[1px] rounded-md p-[5px]'>
                                                <option value={0} selected={items.busTypeID === 0 ? true : false}>
                                                    Chọn loại xe
                                                </option>
                                                {
                                                    typeBus.map((item, index) => (
                                                        <option value={Number(item.id)}
                                                            selected={items.busTypeID === item.id ? true : false}
                                                        >
                                                            {
                                                                item.name
                                                            }
                                                        </option>
                                                    ))

                                                }
                                            </select>
                                        }
                                    </div>
                                    <div class='grid grid-cols-12'>
                                        <p class='col-span-4 col-start-1 font-bold p-[5px]'>
                                            Loại chỗ ngồi
                                        </p>
                                        {
                                            typeSeat &&
                                            <select
                                                onChange={(e) => onChange(propsAdd.item[0].id, Number(e.target.value))}
                                                class='col-span-7 col-start-5 bg-bg outline-none border-[1px] rounded-md p-[5px]'>
                                                <option value={0} selected={items.seatTypeID === 0 ? true : false}>
                                                    Chọn loại ghế
                                                </option>
                                                {
                                                    typeSeat.map((item, index) => (
                                                        <option value={Number(item.id)}
                                                            selected={items.seatTypeID === item.id ? true : false}
                                                        >
                                                            {
                                                                item.type
                                                            }
                                                        </option>
                                                    ))

                                                }
                                            </select>
                                        }
                                    </div>
                                </div>
                            </div>


                            {/* <div class='grid grid-cols-12'>
                                <p class='col-span-2 col-start-1 font-bold p-[5px]'>
                                    Danh sách bến
                                </p>
                                {

                                    <p
                                        class='col-span-7 col-start-4 bg-bgPopup  rounded-md p-[5px]'>
                                        {
                                            selectedIds ? selectedIds.join(',') : "Không có bến được chọn"
                                        }

                                    </p>
                                }
                            </div> */}

                            {/* <div class='grid grid-cols-12 grid-flow-row w-full'>
                                <p class='col-span-2 col-start-1 font-bold p-[5px]'>
                                    Tìm kiếm bến
                                </p>
                                <input type="text"
                                    class='p-sm outline-none border-[1px] rounded-md 
                             bg-[#FFFF] col-start-4 col-span-6 focus:border-button focus:border-[1.5px] ease-in-out duration-200'
                                    placeholder="Tìm kiếm điểm đón trả khách theo khu vực "
                                    onChange={(e) => searchByLocation(e.target.value)}
                                />
                            </div> */}
                            {/* <div class='w-full h-[200px] overflow-y-auto overflow-x-auto mb-lg relative '>
                                <table class="w-full my-sm rounded-md border-collapse  text-txt text-16  ">
                                    <thead>
                                        <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                                            <th class='col-start-2 col-span-2'>Id</th>
                                            <th class='col-span-4'>Tên bến xe</th>
                                            <th class='col-span-5'>Địa chỉ</th>

                                        </tr>
                                    </thead>
                                    <tbody class='bg-[#FFFF]'>
                                        {
                                            !loading ?
                                                <tr class='absolute bg-hover-txt w-full h-full z-20 opacity-40'>
                                                    <ReactLoading
                                                        type="spinningBubbles" color="#FFFF"
                                                        height={'20&'} width={'20%'}
                                                        className="absolute bg-hover-txt left-1/2 top-[20%]  "
                                                    />
                                                </tr>
                                                :
                                                busStation &&
                                                busStation.map((item, index) =>
                                                    <tr class='grid bg-bgPopup grid-cols-12 p-sm text-left gap-md'>
                                                        <td><input type="checkbox"
                                                            onChange={(e) => handleCheckboxChange(e, item.id)}
                                                            checked={selectedIds.includes(item.id)}
                                                        /></td>
                                                        <td class='col-span-2 col-start-2'>{item.id}</td>
                                                        <td class='col-span-4'>{item.name}</td>
                                                        <td class='col-span-5'>{item.addressDb}</td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div> */}

                            <div class='w-full h-[200px] overflow-y-auto overflow-x-auto mb-lg relative '>
                                <table class="w-full my-sm rounded-md border-collapse  text-txt text-16  ">
                                    <thead>
                                        <tr class='grid bg-bg grid-cols-12 p-sm text-center gap-md'>
                                            <th class='col-start-5 col-span-4'>Chọn tuyến đi </th>

                                        </tr>
        

                                    </thead>
                                    <tbody class='bg-[#FFFF]'>

                                        {
                                            route.length > 0 && route.map(item => (
                                                <tr class='grid grid-cols-12 p-sm text-left gap-md'>
                                                    <td className="col-span-1 col-start-4">
                                                        <input className="w-[20px] h-[20px]" type="checkbox" onClick={(e) => handleCheckboxChange(e, item.id)}></input>
                                                    </td>
                                                    <td className="col-span-8">
                                                        {item.stationStartName + " - " + item.stationEndName}
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                            <div class='w-full my-md gap-sm grid grid-cols-12'>
                                <button class='col-start-4 col-span-3 col confirm-button '

                                    onClick={() => getItemValue(close)}>Xác nhận</button>
                                <button class='col-span-3 confirm-button' onClick={close}>Hủy</button>
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

                            </div>
                        </div>
                    </div>
                )
            }

        </Popup>
    );
}

export default PopupAdd;