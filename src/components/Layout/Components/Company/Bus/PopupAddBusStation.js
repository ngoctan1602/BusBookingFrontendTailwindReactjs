import Popup from "reactjs-popup";
import InputConfirmInfo from "../../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
// import * as TypeBusSv from "../../../../services/TypeBusServices"
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import * as BusStationSv from "../../../../../services/BusStationSv"
import * as BusSV from "../../../../../services/Company/BusSV"
import seat from "../../../../../assets/images/seat.png"
import { useParams } from "react-router-dom";
const PopupAddBusStation = () => {
    let { id } = useParams();

    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "60%" };
    const [busStation, setBusStation] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const restBusStation = await BusStationSv.getAllBusStation({ pageSize: 200 });
                const resp = await BusStationSv.getAllInBus({ busId: id });
                const difference = restBusStation.data.items.filter(restBusStation =>
                    !resp.data.items.some(resp => restBusStation.id === resp.id)
                );
                setBusStation(difference)
                console.log(difference)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);


    const [selectedIds, setSelectedIds] = useState([]);
    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            // Nếu được chọn, thêm ID vào mảng
            setSelectedIds(prevIds => [...prevIds, id]);
        } else {
            // Nếu không được chọn, loại bỏ ID khỏi mảng
            setSelectedIds(prevIds => prevIds.filter(prevId => prevId !== id));
        }
    };
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

    // const notifyError = () => toast.error('Cập nhật thất bại!', {
    //     position: "bottom-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    // });

    const getItemValue = async (close) => {

        console.log(selectedIds);
        if (selectedIds) {
            //Gọi api thêm vào 
            const objectAdd = { Id: id, BusStopIds: selectedIds }
            console.log(objectAdd)
            try {
                const resp = await BusSV.addBusStops(objectAdd);
                if (!resp.isError) {

                    notifySuccess()

                    setTimeout(() => {
                        setSelectedIds([])
                        close()
                    }, 1500);
                }
            }
            catch (error) {
                console.log(error)
            }

        }


    };

    const closePop = (close) => {
        setSelectedIds([])
        close();
    }
    return (

        <Popup trigger={<button class="w-[40px] h-[40px] button-hover col-start-12 "

        >
            <FontAwesomeIcon class='w-full' icon={faPlus} color="#75718a"></FontAwesomeIcon>
        </button>} position="right center"
            modal
            nested
            closeOnDocumentClick={false}
            {... { contentStyle }}
        >
            {
                close => (

                    <div class='p-md text-16 text-txt'>

                        <p class='text-20 text-center font-bold'> Thêm điểm đón dừng cho xe</p>
                        <div class='w-full h-[1px] bg-txt my-sm' ></div>
                        <div class='grid grid-cols-12 grid-flow-row w-full'>
                            <input type="text"
                                class='p-sm outline-none border-[1px] rounded-md 
                             bg-[#e1e1e1] col-start-4 col-span-6 focus:border-button focus:border-[1.5px] ease-in-out duration-200'
                                placeholder="Tìm kiếm điểm đón trả khách"
                            />
                        </div>
                        <div class='w-full h-[300px] overflow-y-auto overflow-x-auto mb-lg '>
                            <table class="w-full my-sm rounded-md border-collapse  text-txt text-16 ">
                                <thead>
                                    <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                                        <th class='col-start-2 col-span-2'>Id</th>
                                        <th class='col-span-4'>Tên bến xe</th>
                                        <th class='col-span-5'>Địa chỉ</th>

                                    </tr>
                                </thead>
                                <tbody class='bg-[#e1e1e1]'>
                                    {
                                        busStation ?
                                            busStation.map((item, index) =>
                                                <tr class='grid bg-bgPopup grid-cols-12 p-sm text-left gap-md'>
                                                    <td><input type="checkbox"
                                                        onChange={(e) => handleCheckboxChange(e, item.id)}
                                                        checked={selectedIds.includes(item.id)}
                                                    /></td>
                                                    <td class='col-span-2 col-start-2'>{item.id}</td>
                                                    <td class='col-span-4'>{item.name}</td>
                                                    <td class='col-span-5'>{item.addressDb}</td>
                                                </tr>
                                            )
                                            :
                                            "Không có bến xe trong hệ thống"
                                    }
                                </tbody>
                            </table>
                        </div>
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

export default PopupAddBusStation;