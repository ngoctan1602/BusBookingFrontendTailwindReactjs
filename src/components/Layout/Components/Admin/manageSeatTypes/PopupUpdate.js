import Popup from "reactjs-popup";
import InputConfirmInfo from "../../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import * as SeatTypeSV from "../../../../../services/SeatTypeSV"
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
const PopupUpdate = ({ item, status, onChange, updateTypeBus, success, closePopup, fetchData }) => {
    console.log(fetchData)
    const contentStyle = { backgroundColor: '#FFFF', borderRadius: "8px", width: "40%" };
    const notifySuccess = () => toast.success('Cập nhật thành công!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = () => toast.error('Cập nhật thất bại!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const getItemValue = async (close) => {
        if (success()) {
            const update = await SeatTypeSV.updateSeatTypesAdmin(updateTypeBus)
            if (update.isError) {
                notifyError()
                return
            }
            notifySuccess()
            setTimeout(() => {
                fetchData()
                close()
            }, 1500);
        }
        else {

            notifyError()
        }

        console.log(updateTypeBus)

    };

    const closePop = (close) => {
        closePopup();
        close();
    }
    return (

        <Popup trigger={<button class="w-full flex justify-center "> <FontAwesomeIcon icon={faPenToSquare} color="#00B873" class='cursor-pointer confirm-button w-[30px] h-[30px]'></FontAwesomeIcon></button>} position="right center"
            modal
            nested
            closeOnDocumentClick={false}
            {... { contentStyle }}
        >
            {
                close => (

                    <div class='p-md text-16 text-txt'>
                        <p class='text-20 text-center font-bold'>{item.title}</p>
                        

                        {
                            (item.item).map((item, index) => (
                                <div class='flex items-center justify-center'>
                                    <p class='w-[80px] shrink-0'>{item.content}</p>
                                    <div class='w-1/2'>

                                        {
                                            item.id === 1 ?
                                                <InputConfirmInfo item={{ disable: true, type: "text", placeholder: `${item.placeholder}`, id: updateTypeBus[item.name], value: updateTypeBus.id, spanWidth: Number(item.spanWidth), background: "#FFFF" }}></InputConfirmInfo>
                                                : (item.name === "price")
                                                    ?
                                                    <InputConfirmInfo item={{ type: "number", placeholder: `${item.placeholder}`, id: item.id, value: updateTypeBus[item.name], spanWidth: Number(item.spanWidth), background: "#FFFF" }} onChange={onChange}></InputConfirmInfo>
                                                    : <InputConfirmInfo item={{ type: "text", placeholder: `${item.placeholder}`, id: item.id, value: updateTypeBus[item.name], spanWidth: Number(item.spanWidth), background: "#FFFF" }} onChange={onChange}></InputConfirmInfo>

                                        }
                                    </div>
                                </div>
                            ))
                        }


                        <div class='w-full my-md gap-sm grid grid-cols-10'>
                            <button class='col-start-4 col-span-3 col confirm-button ' onClick={(e) => getItemValue(close)}>Xác nhận</button>
                            <button class='col-span-3 confirm-button' onClick={(e) => closePop(close)}>Hủy</button>
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

export default PopupUpdate;