import Popup from "reactjs-popup";
import InputConfirmInfo from "../Components/InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';
import { useState } from "react";
import * as CustomerServices from "../../../services/CustomerServices";
const PopupOTP = ({ open, confirm, onChangeConfirm, onChangeOpen }) => {
    const contentStyle = { backgroundColor: '#fff', borderRadius: "8px", width: "40%" };
    let navigate = useNavigate();
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

    // const [item, setItem] = useState(
    //     {
    //         email: objectConfirm ? objectConfirm.email : ""
    //     }
    // )
    // const onChangeItem = (name, value) => {
    //     setItem({ ...item, [name]: value })
    // }
    const handleSubmit = async () => {
        const responseAuth = await CustomerServices.AuthOTP(confirm)
        if (!responseAuth.isError && responseAuth !== undefined && responseAuth.isError !== undefined) {
            notifySuccess("Đăng ký thành công")
            setTimeout(() => navigate('/login'), 1500);
            onChangeOpen();
        }
        else {
            console.log(responseAuth.data)
        }
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

                        <div class='grid grid-cols-12  w-full grid-flow-row'>
                            <p class='col-span-3 col-start-2 flex items-center justify-center '>OTP</p>
                            <div class='col-span-9 col-start-5'>
                                <InputConfirmInfo
                                    onChange={onChangeConfirm}
                                    item={{
                                        type: "text", placeholder: "OTP",
                                        name: "code",
                                        value: confirm.code, spanWidth: 60, background: "#fff"
                                    }}></InputConfirmInfo>
                            </div>
                        </div>
                        <div class='flex justify-center my-md'>
                            <button class='w-[100px] shrink-0 confirm-button mx-md'
                                onClick={handleSubmit}
                            >Xác nhận</button>
                            <button class='w-[100px] shrink-0 confirm-button' onClick={onChangeOpen}>Hủy</button>
                        </div>
                    </div>
                )
            }
        </Popup>
    );
}

export default PopupOTP;