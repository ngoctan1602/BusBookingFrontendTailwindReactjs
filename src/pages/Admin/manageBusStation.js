
import busStationRow from "../../components/Layout/Components/Admin/manageBusStation/BusStationRow";
import PopupAdd from "../../components/Layout/Components/Admin/PopupAdd";
import { useCallback, useEffect, useState } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import PopupAddBusStation from "../../components/Layout/Components/Admin/manageBusStation/PopupAddBusStation";
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import { SignOut } from "../../services/SignOut";
import * as BusStationSV from "../../services/BusStationSv"
import * as AddrressSV from "../../services/AddressSv"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';
import BusStationRow from "../../components/Layout/Components/Admin/manageBusStation/BusStationRow";
import Search from "antd/es/input/Search";
import exportDataToExcel from "../../components/Common/exportExcel";
import PaginatedItemsWithAPI from "../../components/Layout/Components/PaginateWithApi";
import { Empty } from "antd";

const ManageBusStation = () => {

    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const [addBusStation, setAddBusStation] = useState({
        name: '',
        description: '',
        address: '',
        status: 1,
        wardId: 0,
    });

    const [busStations, setBusStations] = useState([])
    const [address, setAddress] = useState();
    const [loading, setLoading] = useState(true);
    const [pageCurrent, setPageCurrent] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);
    const handlePageClick = (selectedPage) => {
        setPageCurrent(selectedPage)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BusStationSV.getAllBusStation({ pageSize: 10, pageIndex: pageCurrent + 1 });
                if (!response.isError) {
                    setBusStations(response.data.items);
                    setPageTotal(response.data.pageTotal);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const [itemAdd, setItemAdd] = useState({
        title: "Thêm mới bến bãi",
        item: [
            {
                id: 1, name: "name", content: "Tên bến bãi", spanWidth: 120, placeholder: "Tên bến bãi", value: addBusStation.name
            },
            {
                id: 2, name: "description", content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả", value: addBusStation.description
            },
            {
                id: 3, name: "address", content: "Thôn/Đường/Số nhà", spanWidth: 160, placeholder: "Thôn/Đường/Số nhà", value: addBusStation.address
            }
        ]
    })


    const updateItemValue = (id, newValue) => {

        const updatedItem = itemAdd.item.map(item => {
            if (item.id === id) {
                setAddBusStation({ ...addBusStation, [item.name]: newValue })
                return { ...item, value: newValue };
            }
            return item;
        });


        setItemAdd({
            ...itemAdd,
            item: updatedItem
        });
    };

    const success = useCallback(() => {
        let isSuccess = true;
        itemAdd.item.map(item => {
            if (item.value === "") {
                isSuccess = false
            }
            if (item.name === "wardId" && item.value === 0) {
                isSuccess = false
            }
            // setAddTypeBus({ ...addTypeBus, [item.name]: item.value })
        });

        return isSuccess
    }, [itemAdd])


    const emtyItemValue = () => {
        // Tạo một bản sao mới của mảng item với giá trị được cập nhật
        const updatedItem = itemAdd.item.map(item => {

            return { ...item, value: "" };

        });

        // Cập nhật state bằng mảng mới đã được cập nhật
        setItemAdd({
            ...itemAdd,
            item: updatedItem
        });
    };

    const changeStatus = (id, value) => {
        busStations.map(async (item, index) => {
            if (item.id === id) {
                const a = {
                    ...item,
                    status: value
                }
                const update = await BusStationSV.updateBusStation(a)
                if (!update.isError) {
                    notifySuccess()
                    return
                }
                else {
                    notifyError()
                    return
                }
            }
        });
    }
    // const updateStatus = (id, value) => {
    //     try {
    //         if (value === 3) {

    //             const resp = SeatTypeSV.changeToDisable({ id: id });
    //             console.log(resp)
    //             if (!resp.isError) {
    //                 notifySuccess()
    //                 setTimeout(
    //                     () =>
    //                         fetchData()
    //                     , 2000
    //                 )
    //             }
    //             else {
    //                 notifyError()
    //             }
    //         }
    //         else if (value === 1) {
    //             const resp = SeatTypeSV.changeIsActive({ id: id });
    //             setUpdateLoading(false)
    //             console.log(resp)
    //             if (!resp.isError) {
    //                 notifySuccess()
    //                 setTimeout(
    //                     () =>
    //                         fetchData()
    //                     , 2000
    //                 )
    //             }
    //             else {
    //                 notifyError()
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }
    const Find = async (param) => {
        try {
            const response = await BusStationSV.find({ param: param, pageSize: 10, pageIndex: 1 });
            setBusStations(response.data.items);
            // const addressPromises = response.data.items.map(async (item) => {

            //     const wa = await AddrressSV.getWardById({ id: item.wardId });
            //     return wa.data;

            // });

            // const addresses = await Promise.all(addressPromises);
            // setAddress(addresses);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }
    return (
        <div class='w-full text-txt txt-14 mt-[20px]'>

            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>

                <p class='col-span-2 text-20 font-black uppercase'>Quản lý bến bãi</p>
                <Search
                    placeholder="Tìm kiếm bến bãi"
                    allowClear
                    className="col-start-4 col-span-5 p-md"
                    onSearch={Find}
                />
                <div class='flex justify-evenly'>

                    <PopupAddBusStation objectAdd={addBusStation} item={itemAdd} onChange={updateItemValue} success={success} emtyItemValue={emtyItemValue}></PopupAddBusStation>
                    <button class="flex justify-center" onClick={() => exportDataToExcel(busStations, notifySuccess, notifyError)}>
                        <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                        </FontAwesomeIcon>
                    </button>
                </div>
            </div>
            <table class="min-h-[300px] box-shadow-content w-full my-md rounded-md  text-txt-gray text-16 overflow-hidden">
                <thead>
                    <tr class='grid bg-bg grid-cols-12 p-sm text-left border-b-2'>
                        {/* <th class='col-span-1'>Id</th> */}
                        <th class='col-span-3'>Tên</th>
                        <th class='col-span-6 '>Địa chỉ</th>
                        <th class='col-span-2'>Trạng thái</th>
                        <th class='col-span-1'></th>
                    </tr>
                </thead>
                <tbody class='bg-bg ' >
                    {
                        loading ?
                            <td className="animate-pulse bg-hover-txt w-full h-[300px] text-bg text-center"></td>
                            :
                            !loading && busStations.length > 0 ?
                                // <Paginate itemsPerPage={5} items={busStations} componentToRender={BusStationRow} updateStatus={changeStatus}></Paginate>
                                <PaginatedItemsWithAPI currentPage={pageCurrent} pageCount={pageTotal} items={busStations} componentToRender={BusStationRow} updateStatus={changeStatus}></PaginatedItemsWithAPI>
                                : <Empty description="Không có bến bãi" />
                    }
                </tbody>
            </table>
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
    );
}

export default ManageBusStation;