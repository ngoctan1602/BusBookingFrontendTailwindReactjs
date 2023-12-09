import Popup from "reactjs-popup";
import InputConfirmInfo from "../../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
// import * as TypeBusSv from "../../../../services/TypeBusServices"
import 'react-toastify/dist/ReactToastify.css';
import { useState, useCallback } from "react";
import seat from "../../../../../assets/images/seat.png"


const PopupUpdateSeat = ({ item, seatUpdate }) => {

    const [itemUpdate, setItemUpdate] = useState(seatUpdate);
    const [status, setStatus] = useState(seatUpdate.status);
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };

    const updateItemValue = (id, newValue) => {
        item.item.map(item => {
            if (item.id === id) {
                setItemUpdate({ ...itemUpdate, [item.name]: newValue })
            }
        });
    };

    const success = useCallback(() => {
        let isSuccess = true;
        for (let a in itemUpdate) {

            if (a === "price" && itemUpdate[a] === 0) {
                isSuccess = false
            }
            if (itemUpdate[a] === "") {
                isSuccess = false
            }
        }
        return isSuccess
    }, [itemUpdate])
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
            // const itemUpdate = { ...busUpdate, status: status }
            // console.log(itemUpdate)
            // console.log(busUpdate)
            // const update = await TypeBusSv.updateTypeBus(updateTypeBus)


            // if (update.isError) {
            //     notifyError()
            //     return
            // }
            setItemUpdate({ ...itemUpdate, status: status })
            console.log(itemUpdate)
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
        setItemUpdate(seatUpdate)
        close();
    }
    return (

        <Popup trigger={<button class="w-[50px] span-col-1 mb-md hover:scale-105 cursor-pointer items-center "

        >
            <img src={seat}

                class='h-[50px] '>

            </img>
        </button>} position="right center"
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
                                                <InputConfirmInfo item={{ disable: true, type: "text", placeholder: `${item.placeholder}`, id: itemUpdate[item.name], value: itemUpdate.id, spanWidth: Number(item.spanWidth), background: "#e1e1e1" }}></InputConfirmInfo>
                                                : item.name === "status" ?
                                                    <select class='bg-bgPopup w-full h-[40px]' onChange={(e) => setStatus(Number(e.target.value))}>
                                                        <option selected={(status) === 0 ? true : false} value={0}>Ngưng hoạt động</option>
                                                        <option selected={(status) === 1 ? true : false} value={1}>Hoạt động</option>
                                                    </select>
                                                    : item.name === "price" ?
                                                        <InputConfirmInfo item={{ type: "number", placeholder: `${item.placeholder}`, id: item.id, value: itemUpdate[item.name], spanWidth: Number(item.spanWidth), background: "#e1e1e1" }} onChange={updateItemValue}></InputConfirmInfo>
                                                        :
                                                        <InputConfirmInfo item={{ type: "text", placeholder: `${item.placeholder}`, id: item.id, value: itemUpdate[item.name], spanWidth: Number(item.spanWidth), background: "#e1e1e1" }} onChange={updateItemValue}></InputConfirmInfo>

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

export default PopupUpdateSeat;