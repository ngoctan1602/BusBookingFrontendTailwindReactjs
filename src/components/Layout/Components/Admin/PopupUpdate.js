import Popup from "reactjs-popup";
import InputConfirmInfo from "../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PopupUpdate = ({ item, status, onChange, updateTypeBus, success }) => {

    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };
    const notifySuccess = () => toast.success('Cập nhật thành công!', {
        position: "bottom-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = () => toast.error('Cập nhật thất bại!', {
        position: "bottom-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const getItemValue = () => {
        if (success()) {
            //Call api updatetypus
            console.log(updateTypeBus);

            notifySuccess()
        }
        else {

            notifyError()
        }

    };
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
                        <div class='w-full h-[1px] bg-txt my-sm' ></div>

                        {
                            (item.item).map((item, index) => (
                                <div class='flex items-center justify-center'>
                                    <p class='w-[80px] shrink-0'>{item.content}</p>
                                    <div class='w-1/2'>
                                        {
                                            console.log(typeof (item.spanWidth))
                                        }
                                        {
                                            item.id === 1 ?
                                                <InputConfirmInfo item={{ disable: true, type: "text", placeholder: `${item.placeholder}`, id: item.id, value: item.value, spanWidth: Number(item.spanWidth), background: "#e1e1e1" }}></InputConfirmInfo> :
                                                <InputConfirmInfo item={{ type: "text", placeholder: `${item.placeholder}`, id: item.id, value: item.value, spanWidth: Number(item.spanWidth), background: "#e1e1e1" }} onChange={onChange}></InputConfirmInfo>
                                        }
                                    </div>
                                </div>
                            ))
                        }


                        <div class='w-full my-md gap-sm grid grid-cols-10'>
                            <button class='col-start-4 col-span-3 col confirm-button ' onClick={getItemValue}>Xác nhận</button>
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

export default PopupUpdate;