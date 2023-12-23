import Popup from "reactjs-popup";
import InputConfirmInfo from "../../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import * as PriceSV from "../../../../../services/PriceSV"
import * as RoutesSV from "../../../../../services/RoutesSV"
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
    const [route, setRoute] = useState([])
    const fetchData = async () => {
        try {

            const routerresp = await RoutesSV.getAllRoutes();
            setRoute(routerresp.data.items)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData()

    }, [])
    const getItemValue = () => {
        if (objectAdd.name === "" || objectAdd.description === "" || objectAdd.value <= 0) {
            notifyWarning("Các trường không được bỏ trống và đơn giá không được bằng 0")
            return
        }
        setLoading(true)
        try {
            const resp = PriceSV.createPrice(objectAdd);
            setLoading(false)
            if (!resp.isError) {
                notifySuccess("Thêm mới loại giá thành công")
            }
            else {
                notifyError("Lỗi khi thêm")
            }
            console.log(objectAdd)
        } catch (error) {
            console.log(error);
        }
        console.log(objectAdd);
    }
    const [objectAdd, setObjectAdd] = useState(
        {
            RouteId: 0,
            Surcharges: 0,
            Price: 0,
        }
    )
    const onChange = (name, value) => {
        setObjectAdd({ ...objectAdd, [name]: Number(value) })
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
                        <p class='text-20 text-center font-bold'>Thêm mới bảng giá</p>
                        <div class='w-full h-[1px] bg-txt my-sm' ></div>

                        <div class='w-full grid-flow-row grid grid-cols-12 '>
                            <p className="col-start-3 col-span-2">
                                Lộ trình
                            </p>
                            <select className="col-span-6 bg-bgPopup border-[1px] rounded-md ml-[-8px] p-sm"
                                onChange={(e) => onChange("RouteId", e.target.value)}
                            >
                                <option>
                                    Chọn lộ trình
                                </option>
                                {
                                    route.map(item =>
                                        <option value={item.id}>
                                            {item.stationStartName + " - " + item.stationEndName}
                                        </option>)
                                }
                            </select>
                        </div>

                        <div class='flex items-center justify-center'>
                            <p class='w-[80px] shrink-0'>Giá</p>
                            <div class='w-1/2'>
                                <InputConfirmInfo item={{ type: "number", placeholder: "Nhập giá", value: objectAdd.Price, spanWidth: 90, name: "Price", background: "#e1e1e1" }} onChange={onChange}></InputConfirmInfo>
                            </div>
                        </div>
                        <div class='flex items-center justify-center'>
                            <p class='w-[80px] shrink-0'>Phụ phí</p>
                            <div class='w-1/2'>
                                <InputConfirmInfo item={{ type: "number", placeholder: "Nhập phụ phí", value: objectAdd.Surcharges, spanWidth: 120, name: "Surcharges", background: "#e1e1e1" }} onChange={onChange}></InputConfirmInfo>
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