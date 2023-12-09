import Popup from "reactjs-popup";
import InputConfirmInfo from "../../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
// import * as TypeBusSv from "../../../../services/TypeBusServices"
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const PopupUpdate = ({ item, onChange, busUpdate, success, closePopup }) => {

    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };
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
    const [status, setStatus] = useState(Number(item.status));
    // const updateStatus = (e) =>{

    // }
    const getItemValue = async (close) => {
        if (success()) {
            const itemUpdate = { ...busUpdate, status: status }
            console.log(itemUpdate)
            console.log(busUpdate)
            // const update = await TypeBusSv.updateTypeBus(updateTypeBus)


            // if (update.isError) {
            //     notifyError()
            //     return
            // }
            notifySuccess()
            setTimeout(() => {
                close()
            }, 1500);
        }
        else {

            notifyError()
        }

    };

    const closePop = (close) => {
        closePopup();
        close();
    }
    return (

        <Popup trigger={<button class="w-[30px] col-start-4 flex justify-center "> <FontAwesomeIcon icon={faPenToSquare} color="#00B873" class='cursor-pointer confirm-button w-full h-[30px]'></FontAwesomeIcon></button>} position="right center"
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
                                <div class=' grid grid-cols-10'>
                                    <p class='col-span-2 col-start-2 self-center '>{item.content}</p>
                                    <div class='col-span-6'>
                                        {
                                            item.id === 1 ?
                                                <InputConfirmInfo item={{ disable: true, type: "text", placeholder: `${item.placeholder}`, id: busUpdate[item.name], value: busUpdate.id, spanWidth: Number(item.spanWidth), background: "#e1e1e1" }}></InputConfirmInfo>
                                                : item.name === "status" ?
                                                    <select class='bg-bgPopup w-full h-[40px]' onChange={(e) => setStatus(Number(e.target.value))}>
                                                        <option selected={Number(busUpdate.status) === 0 ? true : false} value={0}>Ngưng hoạt động</option>
                                                        <option selected={Number(busUpdate.status) === 1 ? true : false} value={1}>Hoạt động</option>
                                                    </select>
                                                    :
                                                    <InputConfirmInfo item={{ type: "text", placeholder: `${item.placeholder}`, id: item.id, value: busUpdate[item.name], spanWidth: Number(item.spanWidth), background: "#e1e1e1" }} onChange={onChange}></InputConfirmInfo>
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