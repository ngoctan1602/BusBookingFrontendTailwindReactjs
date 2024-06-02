import Popup from "reactjs-popup";
import InputConfirmInfo from "../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import * as TypeBusServices from "../../../../services/TypeBusServices"
import ReactLoading from 'react-loading';

const PopupAdd = ({ objectAdd, item, onChange, success, emtyItemValue, fetchData }) => {
    const contentStyle = { backgroundColor: '#FFFF', borderRadius: "8px", width: "40%" };

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

    const notifyError = () => toast.error('Loại xe đã tồn tại trong hệ thống', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyWarning = () => toast.warning('Các trường không được để trống và số chỗ ngồi khác 0', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    const getItemValue = async (close) => {
        if (success()) {
            setLoading(true)
            const a = await TypeBusServices.createTypeBus(objectAdd)
            setLoading(false)
            if (a.isError) {
                notifyError()
                return
            }

            notifySuccess()
            setTimeout(() => {
                fetchData()
                close()
            }, 1500);

            emtyItemValue()
        }
        else {
            notifyWarning()
        }
        console.log(objectAdd)

    };



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
                        <p class='text-20 text-center font-bold'>{item.title}</p>
                        

                        {
                            (item.item).map((item, index) => (
                                <div class='flex items-center justify-center'>
                                    <p class='w-[80px] shrink-0'>{item.content}</p>
                                    <div class='w-1/2'>
                                        {
                                            item.name === "price" ?
                                                <InputConfirmInfo item={{ type: "number", placeholder: `${item.placeholder}`, value: item.value, spanWidth: Number(item.spanWidth), id: item.id, background: "#FFFF" }} onChange={onChange}></InputConfirmInfo>
                                                : <InputConfirmInfo item={{ type: "text", placeholder: `${item.placeholder}`, value: item.value, spanWidth: Number(item.spanWidth), id: item.id, background: "#FFFF" }} onChange={onChange}></InputConfirmInfo>

                                        }
                                        {/* <InputConfirmInfo item={{ type: "text", placeholder: `${item.placeholder}`, value: item.value, spanWidth: Number(item.spanWidth), id: item.id, background: "#e1e1e1" }} onChange={onChange}></InputConfirmInfo> */}
                                    </div>
                                </div>
                            ))
                        }


                        <div class='w-full my-md gap-sm grid grid-cols-10'>
                            <button class='col-start-4 col-span-3 col confirm-button ' onClick={() => getItemValue(close)}>Xác nhận</button>
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
                )
            }

        </Popup>
    );
}

export default PopupAdd;