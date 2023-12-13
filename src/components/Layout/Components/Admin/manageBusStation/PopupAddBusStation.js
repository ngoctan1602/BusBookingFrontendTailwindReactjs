import Popup from "reactjs-popup";
import InputConfirmInfo from "../../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from "react";
import * as BusStationSV from "../../../../../services/BusStationSv"
import * as AddressSV from "../../../../../services/AddressSv.js"
const PopupAddBusStation = ({ objectAdd, item, onChange, success, emtyItemValue }) => {
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };

    const notifySuccess = () => toast.success('Thêm thành công!', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = () => toast.error('Thêm thất bại!', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });




    const [provinces, setProvinces] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AddressSV.getAllProvinces();

                setProvinces(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const getItemValue = async (close) => {
        if (success()) {
            const a = { ...objectAdd, wardID: idWard }
            const response = await BusStationSV.createBusStation(a)
            if (response.isError) {
                notifyError()
                return
            }

            notifySuccess()
            setTimeout(() => {
                close()
            }, 1500);

            // emtyItemValue()
        }
        else {
            // notifyWarning()
        }

    };
    const [idWard, setIdWard] = useState(0);
    const [idDistrict, setIdDistrict] = useState(0);
    const [idProvince, setIdProvince] = useState(0);

    const [districts, setDistricts] = useState([]);
    const getDistricts = useCallback(async (id) => {
        const a = {
            id: id
        }
        const response = await AddressSV.getDistricts(a);
        setDistricts(response.data.districts)
        setWards([]);
        setIdDistrict(0);
        setIdWard(0);
        setIdProvince(id);
    })

    const [wards, setWards] = useState([]);
    const getWards = useCallback(async (id) => {

        const a = {
            id: id
        }
        setIdDistrict(id);
        setIdWard(0);
        const response = await AddressSV.getWards(a);
        setWards(response.data.wards)
    })

    const getIdWard = useCallback((id) => {
        setIdWard(id);
    }, [idWard])




    const closePopup = (close) => {
        setIdProvince(0)
        setIdDistrict(0);
        setIdWard(0);
        setDistricts([])
        setWards([])
        close()
    }
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
                        <p class='text-20 text-center font-bold'>{item.title}</p>
                        <div class='w-full h-[1px] bg-txt my-sm' ></div>

                        {
                            (item.item).map((item, index) => (
                                <div class='flex items-center justify-center'>
                                    <p class='w-[80px] shrink-0'>{item.content}</p>
                                    <div class='w-1/2'>

                                        <InputConfirmInfo item={{ type: "text", placeholder: `${item.placeholder}`, value: item.value, spanWidth: Number(item.spanWidth), id: item.id, background: "#e1e1e1" }} onChange={onChange}></InputConfirmInfo>
                                    </div>
                                </div>
                            ))

                        }
                        <div class='flex items-center justify-center'>
                            <p class='w-[80px] shrink-0'>Tỉnh</p>
                            <div class='w-1/2'>
                                <select class='w-full p-sm bg-[#e1e1e1] border-txt border-[1px] rounded-md my-md' onChange={(e) => getDistricts(e.target.value)}>
                                    <option value={0} selected={(idProvince === 0) ? true : false}>
                                        Chọn tỉnh
                                    </option>
                                    {
                                        provinces &&
                                        provinces.map((item, index) => (
                                            <option value={item.id} selected={(idProvince === item.id) ? true : false}>
                                                {item.fullName}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div class='flex items-center justify-center'>
                            <p class='w-[80px] shrink-0'>Huyện</p>
                            <div class='w-1/2'>
                                <select class='w-full p-sm bg-[#e1e1e1] border-txt border-[1px] rounded-md my-md' onChange={(e) => getWards(e.target.value)}>
                                    <option value={0} selected={idDistrict === 0 ? true : false}>Chọn huyện</option>
                                    {
                                        districts && districts.map((item, index) => (
                                            <option value={item.id} selected={idDistrict === item.id ? true : false} >
                                                {item.fullName}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div class='flex items-center justify-center'>
                            <p class='w-[80px] shrink-0'>Xã</p>
                            <div class='w-1/2'>
                                <select class='w-full p-sm bg-[#e1e1e1] border-txt border-[1px] rounded-md my-md' onChange={(e) => getIdWard(e.target.value)}>
                                    <option value={0} selected={idWard === 0 ? true : false} >Chọn xã</option>
                                    {
                                        wards &&
                                        wards.map((item, index) => (

                                            <option value={item.id} selected={idWard === item.id ? true : false}>
                                                {item.fullName}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>


                        <div class='w-full my-md gap-sm grid grid-cols-10'>
                            <button class='col-start-4 col-span-3 col confirm-button ' onClick={(e) => getItemValue(close)}>Xác nhận</button>
                            <button class='col-span-3 confirm-button' onClick={(e) => closePopup(close)}>Hủy</button>
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

        </Popup >
    );
}

export default PopupAddBusStation;