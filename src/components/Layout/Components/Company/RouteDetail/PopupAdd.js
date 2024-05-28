import Popup from "reactjs-popup";
import InputConfirmInfo from "../../InputConfirmInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useCallback } from "react";
import * as BusStationSv from "../../../../../services/BusStationSv"
import BusStationRow from "../../../Components/Admin/manageBusStation/BusStationRow";
import ReactLoading from 'react-loading';
import PaginatedItemsWithAPI from "../../PaginateWithApi";
const PopupAdd = ({ items, propsAdd, onChange }) => {
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "60%" };

    const [busStation, setBusStation] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const respBusStation = await BusStationSv.getAllBusStationWithParams({ pageSize: 10, pageIndex: currentPage + 1 });
            setBusStation(respBusStation.data.items)
            setPageTotal(respBusStation.data.pageTotal)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (

        <Popup trigger={<button class="flex justify-center"> <FontAwesomeIcon icon={faPlus} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'></FontAwesomeIcon></button>} position="right center"
            modal
            nested
            closeOnDocumentClick={false}
            {... { contentStyle }}
        >
            {
                close => (

                    <div class='w-full h-full relative'>
                        {/* {submit &&
                            <div class='absolute bg-hover-txt w-full h-full z-20 opacity-40'>
                                <ReactLoading
                                    type="spin" color="#ffffff"
                                    height={'5%'} width={'5%'}
                                    className="absolute bg-hover-txt left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                                />
                            </div>
                        } */}
                        <div class='p-md text-16 text-txt '>
                            <p class='text-20 text-center font-bold'>Thêm mới lộ trình</p>

                        </div>
                        <div className="w-full grid grid-cols-12 grid-flow-row">
                            <div className="col-span-2 col-start-3 flex items-center">
                                Chọn tuyến đi
                            </div>
                            <select className="col-span-6 outline-none p-sm rounded-md bg-bgPopup border-[1px] border-hover-txt">
                                <option>
                                    Chọn tuyến đi
                                </option>
                            </select>
                        </div>
                        <div className=" w-full grid grid-flow-row grid-cols-12">
                            <div className="col-start-3 col-span-8 my-lg grid grid-flow-row grid-cols-12">
                                <p className="col-span-12 font-bold">Chọn điểm xuất phát</p>
                                <input className="col-span-8 p-sm  rounded-md outline-none" placeholder="Tìm kiếm bến xuất phát"></input>
                                <button className="col-span-3 col-start-10 border-[1px] rounded-md border-button
                                hover:bg-button hover:text-bg ease-in-out duration-300 
                                ">
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>


                        <div className="w-full grid grid-flow-row grid-cols-12">
                            <div class='col-span-8 col-start-3 overflow-y-auto overflow-x-auto mb-lg h-[150px]'>
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
                                                <PaginatedItemsWithAPI handleClick={handlePageClick} componentToRender={BusStationRow} items={busStation} pageCount={pageTotal} fetchData={fetchData} nameRadio="StationStartId"
                                                //  onUpdate={onChangeName}
                                                ></PaginatedItemsWithAPI>
                                                : "Không có bến nào"
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-full grid grid-flow-row grid-cols-12">
                            <div class='col-span-8 col-start-3 overflow-y-auto overflow-x-auto mb-lg h-[150px]'>
                                <table class="w-full my-sm rounded-md border-collapse  text-txt text-16 ">
                                    <thead>
                                        <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                                            <th class='col-start-2 col-span-2'>Id</th>
                                            <th class='col-span-4'>Tên bến xe</th>
                                            <th class='col-span-5'>Địa chỉ</th>
                                        </tr>
                                    </thead>
                                    <tbody class='bg-[#e1e1e1]'>
                                        {/* {
                                            busStation.length > 0 ?
                                                <PaginatedItemsWithAPI handleClick={handlePageClick} componentToRender={BusStationRow} items={busStation} pageCount={pageTotal} fetchData={fetchData} nameRadio="StationStartId"
                                                //  onUpdate={onChangeName}
                                                ></PaginatedItemsWithAPI>
                                                : "Không có bến nào"
                                        } */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

        </Popup>
    );
}

export default PopupAdd;