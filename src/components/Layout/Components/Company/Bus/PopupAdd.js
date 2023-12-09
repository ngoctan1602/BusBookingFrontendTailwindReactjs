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
const PopupAdd = ({ items, propsAdd, onChange }) => {
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "60%" };

    const [typeSeat, setTypeSeat] = useState();
    const [typeBus, setTypeBus] = useState();
    const [busStation, setBusStation] = useState();

    // const [showId, setShowId] = useState([])
    const [selectedIds, setSelectedIds] = useState([]);

    const [submit, setSubmit] = useState(false);

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            // Nếu được chọn, thêm ID vào mảng
            setSelectedIds(prevIds => [...prevIds, id]);

        } else {
            // Nếu không được chọn, loại bỏ ID khỏi mảng
            setSelectedIds(prevIds => prevIds.filter(prevId => prevId !== id));
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SeatService.getAllSeatCompany();

                setTypeSeat(response.data.items);

                const restypebus = await TypeBusServices.getAllTypeBus();
                setTypeBus(restypebus.data.items);

                const restBusStation = await BusStationSv.getAllBusStation();
                setBusStation(restBusStation.data.items);
                console.log(restBusStation.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);


    const searchByLocation = useCallback(
        async (value) => {
            try {
                const response = await BusStationSv.getByLocation({ location: value });

                setBusStation(response.data.items);
            }
            catch (error) {
                console.error('Error fetching data:', error);
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

    // const notifyError = () => toast.error('Loại xe đã tồn tại trong hệ thống', {
    //     position: "bottom-right",
    //     autoClose: 2500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    // });
    // const notifyWarning = () => toast.warning('Các trường không được để trống và số chỗ ngồi khác 0', {
    //     position: "bottom-right",
    //     autoClose: 2500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    // });


    const getItemValue = async (close) => {
        // if (success()) {
        //     const a = await TypeBusSv.createTypeBus(objectAdd)
        //     if (a.isError) {
        //         notifyError()
        //         return
        //     }
        //     emtyItemValue()
        // }
        // else {
        //     notifyWarning()
        // }
        setSubmit(true)
        let newBus = { ...items, listBusStopID: selectedIds, CompanyId: 1 }
        const a = await BusSV.createBus(newBus);
        console.log(a)
        notifySuccess()
        setSubmit(false);
        setTimeout(() => {
            close()
        }, 1500);

        console.log(newBus)
        console.log(items)

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

                    <div class='p-md text-16 text-txt'>
                        <p class='text-20 text-center font-bold'>Thêm mới xe</p>
                        <div class='w-full h-[1px] bg-txt my-sm' ></div>
                        <div class="grid-flow-row grid grid-cols-12">
                            <div class='col-span-6 '>

                                {
                                    propsAdd.item.map((item, index) => (
                                        item.name != "seatTypeID" && item.name != "busTypeID" &&
                                        <div class='grid grid-cols-12 my-md'>
                                            <p class='col-span-3 col-start-1 font-bold p-[5px]'>
                                                {item.content}
                                            </p>
                                            {
                                                <div
                                                    // onChange={(e) => onChange(propsAdd.item[1].id, Number(e.target.value))}
                                                    class='col-span-7 col-start-5 bg-bgPopup  rounded-md '>
                                                    {
                                                        <InputConfirmInfo item={{ type: "text", placeholder: `${item.placeholder}`, value: items[item.name], spanWidth: Number(item.spanWidth), id: item.id, background: "#e1e1e1" }} onChange={onChange} ></InputConfirmInfo>
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
                                            class='col-span-7 col-start-5 bg-bgPopup outline-none border-[1px] rounded-md p-[5px]'>
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
                                    <p class='col-span-3 col-start-1 font-bold p-[5px]'>
                                        Loại chỗ ngồi
                                    </p>
                                    {
                                        typeSeat &&
                                        <select
                                            onChange={(e) => onChange(propsAdd.item[0].id, Number(e.target.value))}
                                            class='col-span-7 col-start-5 bg-bgPopup outline-none border-[1px] rounded-md p-[5px]'>
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


                        <div class='grid grid-cols-12'>
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
                        </div>

                        <div class='grid grid-cols-12 grid-flow-row w-full'>
                            <p class='col-span-2 col-start-1 font-bold p-[5px]'>
                                Tìm kiếm bến
                            </p>
                            <input type="text"
                                class='p-sm outline-none border-[1px] rounded-md 
                             bg-[#e1e1e1] col-start-4 col-span-6 focus:border-button focus:border-[1.5px] ease-in-out duration-200'
                                placeholder="Tìm kiếm điểm đón trả khách theo khu vực "
                                onChange={(e) => searchByLocation(e.target.value)}
                            />
                        </div>
                        <div class='w-full h-[200px] overflow-y-auto overflow-x-auto mb-lg '>
                            <table class="w-full my-sm rounded-md border-collapse  text-txt text-16 ">
                                <thead>
                                    <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                                        <th class='col-start-2 col-span-2'>Id</th>
                                        <th class='col-span-4'>Tên bến xe</th>
                                        <th class='col-span-5'>Địa chỉ</th>

                                    </tr>
                                </thead>
                                <tbody class='bg-[#e1e1e1]'>
                                    {
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
                        </div>


                        <div class='w-full my-md gap-sm grid grid-cols-12'>
                            <button class='col-start-5 col-span-3 col confirm-button '
                                style={{ backgroundColor: submit ? "red" : "" }}
                                onClick={() => getItemValue(close)}>Xác nhận</button>
                            {/* <button class='col-span-3 confirm-button' onClick={close}>Hủy</button> */}
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
                )
            }

        </Popup>
    );
}

export default PopupAdd;