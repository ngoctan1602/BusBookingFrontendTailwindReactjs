import Popup from "reactjs-popup";
import InputConfirmInfo from "../../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import * as PriceClassSV from "../../../../../services/PriceClassSV"
import ReactLoading from 'react-loading';

const PopupAdd = () => {
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };
    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyWarning = (message) => toast.warning(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const handleClose = (close) => {
        // fetchData()
        close()
    }
    const getItemValue = () => {
        if (objectAdd.name === "" || objectAdd.description === "" || objectAdd.value <= 0) {
            notifyWarning("Các trường không được bỏ trống và đơn giá không được bằng 0")
            return
        }
        setLoading(true)
        try {
            const resp = PriceClassSV.createPriceSV(objectAdd);
            setLoading(false)
            if (!resp.isError) {
                notifySuccess("Thêm mới loại giá thành công")
            }
            else {
                notifyError("Lỗi khi thêm")
            }
        } catch (error) {
            console.log(error);
        }
        console.log(objectAdd);
    }
    const [objectAdd, setObjectAdd] = useState(
        {
            name: '',
            description: '',
            value: 0,
        }
    )
    const onChange = (name, value) => {
        if (name === "value") {
            setObjectAdd({ ...objectAdd, [name]: Number(value) })
        }
        else {

            setObjectAdd({ ...objectAdd, [name]: value })
        }
    }

    const [loading, setLoading] = useState(false)
    return (
        <Popup trigger={<button class="flex justify-center"> <FontAwesomeIcon icon={faPlus} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'></FontAwesomeIcon></button>} position="right center"
            modal
            nested
            closeOnDocumentClick={false}
            {... { contentStyle }}
        >
            {
                close => (

                    <div class='text-16 text-txt relative'>
                        {
                            loading &&
                            <div class='absolute bg-hover-txt w-[100%] h-full z-20 opacity-40'>
                                <ReactLoading
                                    type="spinningBubbles" color="#e1e1e1"
                                    height={'10%'} width={'10%'}
                                    className="absolute left-[50%] top-[40%]  "
                                />
                            </div>
                        }
                        <p class='text-20 text-center font-bold'>Thêm mới loại giá</p>
                        <div class='w-full h-[1px] bg-txt my-sm' ></div>

                        {/* {
                            (item.item).map((item, index) => (
                                <div class='flex items-center justify-center'>
                                    <p class='w-[80px] shrink-0'>{item.content}</p>
                                    <div class='w-1/2'>
                                        {
                                            item.name === "price" ?
                                                <InputConfirmInfo item={{ type: "number", placeholder: `${item.placeholder}`, value: item.value, spanWidth: Number(item.spanWidth), id: item.id, background: "#e1e1e1" }} onChange={onChange}></InputConfirmInfo>
                                                : <InputConfirmInfo item={{ type: "text", placeholder: `${item.placeholder}`, value: item.value, spanWidth: Number(item.spanWidth), id: item.id, background: "#e1e1e1" }} onChange={onChange}></InputConfirmInfo>

                                        }
                                    </div>
                                </div>
                            ))
                        } */}

                        <div class='flex items-center justify-center'>
                            <p class='w-[80px] shrink-0'>Tên</p>
                            <div class='w-1/2'>
                                <InputConfirmInfo item={{ type: "text", placeholder: "Nhập tên loại giá", value: objectAdd.name, spanWidth: 140, name: "name", background: "#e1e1e1" }} onChange={onChange}></InputConfirmInfo>
                            </div>
                        </div>
                        <div class='flex items-center justify-center'>
                            <p class='w-[80px] shrink-0'>Mô tả</p>
                            <div class='w-1/2'>
                                <InputConfirmInfo item={{ type: "text", placeholder: "Nhập mô tả", value: objectAdd.description, spanWidth: 140, name: "description", background: "#e1e1e1" }} onChange={onChange}></InputConfirmInfo>
                            </div>
                        </div>
                        <div class='flex items-center justify-center'>
                            <p class='w-[80px] shrink-0'>Phụ thu (%)</p>
                            <div class='w-1/2'>
                                <InputConfirmInfo item={{ type: "number", placeholder: "Nhập phụ thu", value: objectAdd.value, spanWidth: 140, name: "value", background: "#e1e1e1" }} onChange={onChange}></InputConfirmInfo>
                            </div>
                        </div>


                        <div class='w-full my-md gap-sm grid grid-cols-10'>
                            <button class='col-start-4 col-span-3 col confirm-button ' onClick={() => getItemValue(close)}>Xác nhận</button>
                            <button class='col-span-3 confirm-button' onClick={() => handleClose(close)}>Hủy</button>
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