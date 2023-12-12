import Popup from "reactjs-popup";
import InputConfirmInfo from "../Components/InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactLoading from 'react-loading';
import { useState } from "react";
const PopupOTP = ({ objectConfirm, open }) => {
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };

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

    const [item, setItem] = useState(
        {
            email: objectConfirm ? objectConfirm.email : ""
        }
    )
    const onChangeItem = (name, value) => {
        setItem({ ...item, [name]: value })
    }
    return (

        <Popup trigger={<button class="confirm-button"> Cập nhật</button>} position="right center"
            modal
            nested
            open={open}
            closeOnDocumentClick={false}
            {... { contentStyle }}
        >
            {
                close => (

                    <div class='p-md text-16 text-txt'>
                        <p class='text-20 text-center font-bold'>Xác thực OTP</p>
                        <div class='w-full h-[1px] bg-txt my-sm' ></div>

                        <div class='grid grid-cols-12 w-full grid-flow-row'>
                            <p class='col-span-3 col-start-2 flex items-center justify-center '>OTP</p>
                            <div class='col-span-7'>

                                <InputConfirmInfo
                                    onChange={onChangeItem}
                                    item={{
                                        type: "text", placeholder: "OTP",
                                        name: "email",
                                        value: item.value, spanWidth: 60, background: "#e1e1e1"
                                    }}></InputConfirmInfo>
                            </div>
                        </div>
                        <div class='flex justify-center my-md'>
                            <button class='w-[100px] shrink-0 confirm-button mx-md'>Xác nhận</button>
                            <button class='w-[100px] shrink-0 confirm-button' onClick={close}>Hủy</button>
                        </div>
                    </div>
                )
            }
        </Popup>
    );
}

export default PopupOTP;