import Popup from "reactjs-popup";
import InputConfirmInfo from "../../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import * as BusStationSv from "../../../../../services/BusStationSv"
import * as RoutesSV from "../../../../../services/RoutesSV"
import ReactLoading from 'react-loading';
import PaginatedItemsWithAPI from "../../PaginateWithApi";
// import BusStationRow from "../../../Components/Admin/manageBusStation/BusStationRow";
import BusStationRow from "./CheckBusStationRow";
const PopupAdd = ({ fetch }) => {
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "60%" };

    const notifySuccess = (meseage) => toast.success(meseage, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = (meseage) => toast.error(meseage, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyWarning = (meseage) => toast.warning(meseage, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const [busStation, setBusStation] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);


    const [busStationEnd, setBusStationEnd] = useState([]);
    const [currentPageEnd, setCurrentPageEnd] = useState(0);


    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    const handlePageClickEnd = (selectedPage) => {
        setCurrentPageEnd(selectedPage);
    };

    const fetchData = async () => {
        setLoading(true)
        try {
            const respBusStation = await BusStationSv.getAllBusStationWithParams({ pageSize: 10, pageIndex: currentPage + 1 });
            setBusStation(respBusStation.data.items)
            setPageTotal(respBusStation.data.pageTotal)


            const respBusStationEnd = await BusStationSv.getAllBusStationWithParams({ pageSize: 10, pageIndex: currentPageEnd + 1 });
            setBusStationEnd(respBusStationEnd.data.items)
            console.log(respBusStation)
            setLoading(false)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [currentPage, currentPageEnd]);


    const getItemValue = async (close) => {
        if (objectAdd.StationEndId <= 0 || objectAdd.StationStartId <= 0) {
            notifyWarning("Vui lòng chọn đầy đủ điểm đi và đến")
            return
        }
        setIsCreate(true)
        try {
            const resp = RoutesSV.createRoute(objectAdd);
            // notifySuccess("Get thành công" + objectAdd.name + " " + objectAdd.StationStartId + " " + objectAdd.StationEndId)
            setIsCreate(false)
            if (!resp.isError) {
                notifySuccess("Tạo thành công")
            }
            else {
                notifyError("Lỗi hệ thống")
            }
        }
        catch (error) {
            console.log(error)
        }
    };


    const [objectAdd, setObjectAdd] = useState(
        {
            // name: '',
            StationStartId: 0,
            StationEndId: 0,
        }
    )

    const onChangeName = (name, value) => {
        setObjectAdd({ ...objectAdd, [name]: value })
    }
    const [loading, setLoading] = useState(false)
    const [isCreate, setIsCreate] = useState(false)
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
                            isCreate &&
                            <div class='absolute bg-hover-txt w-[100%] h-full z-20 opacity-40'>
                                <ReactLoading
                                    type="spinningBubbles" color="#e1e1e1"
                                    height={'10%'} width={'10%'}
                                    className="absolute left-[50%] top-[40%]  "
                                />
                            </div>
                        }
                        <p class='text-20 text-center font-bold'>Thêm mới tuyến đi</p>
                        <div class='w-full h-[1px] bg-txt my-sm' ></div>
                        <div className="w-full grid grid-cols-12 grid-flow-row ">
                            {/* <div className="col-span-11 col-start-2 grid grid-cols-12 grid-flow-row">
                                <p className="col-span-3 flex items-center"> Nhập tên tuyến đi </p>
                                <div className="col-span-8">
                                    <InputConfirmInfo item={{ type: "text", name: "name", value: objectAdd.name }} onChange={onChangeName}></InputConfirmInfo>
                                </div>
                            </div> */}
                            <div className="col-span-6 my-lg grid grid-flow-row grid-cols-12">
                                <p className="col-span-12 font-bold">Chọn điểm xuất phát</p>
                                <input className="col-span-8 p-sm  rounded-md outline-none" placeholder="Tìm kiếm bến xuất phát"></input>
                                <button className="col-span-3 col-start-10 border-[1px] rounded-md border-button
                                hover:bg-button hover:text-bg ease-in-out duration-300 mr-sm
                                ">
                                    Tìm kiếm
                                </button>
                            </div>

                            <div className="col-span-6 col-start-7 my-lg grid grid-flow-row grid-cols-12 ml-sm">

                                <p className="col-span-12 font-bold">Chọn điểm đến</p>
                                <input className="col-span-8 p-sm mr-sm rounded-md outline-none" placeholder="Tìm kiếm điểm đến"></input>
                                <button className="col-span-3 col-start-10 border-[1px] rounded-md border-button
                                hover:bg-button hover:text-bg ease-in-out duration-300
                                ">
                                    Tìm kiếm
                                </button>
                            </div>
                            <div class='col-span-6 col-start-1 overflow-y-auto overflow-x-auto mb-lg h-[300px] relative'>
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
                                            busStation.length > 0 ?
                                                <PaginatedItemsWithAPI handleClick={handlePageClick} componentToRender={BusStationRow} items={busStation} pageCount={pageTotal} fetchData={fetchData} nameRadio="StationStartId" onUpdate={onChangeName} objectAdd={objectAdd}></PaginatedItemsWithAPI>
                                                : "Không có bến nào"
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div class='col-span-6 col-start-7 overflow-y-auto overflow-x-auto mb-lg h-[300px] ml-sm relative'>
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
                                            busStationEnd.length > 0 ?
                                                <PaginatedItemsWithAPI handleClick={handlePageClickEnd} componentToRender={BusStationRow} items={busStationEnd} pageCount={pageTotal} fetchData={fetchData} nameRadio="StationEndId" onUpdate={onChangeName} objectAdd={objectAdd}></PaginatedItemsWithAPI>
                                                : "Không có bến nào"
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>



                        <div class='w-full my-md gap-sm grid grid-cols-10'>
                            <button class='col-start-4 col-span-3 col confirm-button ' onClick={() => getItemValue(close)}>Xác nhận</button>
                            <button class='col-span-3  confirm-button' onClick={(e) => console.log(objectAdd)}>Hủy</button>
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