
import TypeBusRow from "../../components/Layout/Components/Admin/TypeBusRow";
import PopupAdd from "../../components/Layout/Components/Admin/PopupAdd";
import { useCallback, useEffect, useState } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as TypeBusSv from "../../services/TypeBusServices"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from "antd/es/input/Search";
import exportDataToExcel from "../../components/Common/exportExcel";
import PaginatedItemsWithAPI from "../../components/Layout/Components/PaginateWithApi";
import { Empty } from "antd";

import PopupAddTypeBus from "../../components/Layout/Components/Admin/manageTypeBus/PopupAddTypeBus";
const ManageTypeBus = () => {
    //#region  Notify 
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

    const [addTypeBus, setAddTypeBus] = useState({
        name: '',
        description: '',
        totalSeats: 0,
        status: 1
    });

    //#endregion

    const [itemAdd, setItemAdd] = useState(
        {
            title: "Thêm mới loại xe",
            item: [
                {
                    id: 1, name: "name", content: "Tên loại xe", spanWidth: 120, placeholder: "Tên loại xe", value: addTypeBus.name
                },
                {
                    id: 2, name: "description", content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả", value: addTypeBus.description
                },
                {
                    id: 3, name: "totalSeats", content: "Số chỗ ngồi", spanWidth: 160, placeholder: "Số chỗ ngồi", value: addTypeBus.totalSeats
                }
            ]
        }
    )

    const [loading, setLoading] = useState(false);

    const [typeBus, setTypeBus] = useState([]);
    useEffect(() => {

        fetchData();


    }, []);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageTotal, setTotalPage] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage);
    }
    const refetchData = async () => {
        setCurrentPage(0);
        fetchData()
    }
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await TypeBusSv.getAllTypeBus({ pageSize: 10, pageIndex: currentPage + 1 });
            if (!response.isError) {
                setTypeBus(response.data.items);
                setTotalPage(response.data.pageTotal)
            }
            setLoading(false)

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);


    // Hàm cập nhật trạng thái item
    const changeStatus = (id, value) => {
        const updatedItems = typeBus.map(async (item, index) => {
            if (item.id === id) {
                const a = {
                    ...item,
                    status: value
                }
                const update = await TypeBusSv.updateTypeBus(a)
                if (!update.isError) {
                    notifySuccess("Cập nhật trạng thái thành công")
                    fetchData();
                    return
                }
                else {
                    notifyError("Cập nhật trạng thái thất bại")
                    return
                }
            }
        });
    }


    //#region Call api paginate
    const Find = async (param) => {
        setLoading(true)
        try {
            const response = await TypeBusSv.find({ param: param, pageSize: 10, pageIndex: 1 });
            setLoading(false)
            if (!response.isError) {
                setTypeBus(response.data.items)
                setTotalPage(response.data.pageTotal)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    //#endregion



    return (
        <div class='w-full text-txt txt-16'>


            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center mt-[20px]'>
                <p class='col-span-2 text-20 font-black uppercase'>Quản lý loại xe</p>
                <Search
                    placeholder="Tìm kiếm loại xe"
                    allowClear
                    className="col-start-4 col-span-5 p-md"
                    onSearch={Find}
                />

                <div class='flex col-span-1  justify-evenly'>
                    <PopupAddTypeBus refetchData={refetchData}></PopupAddTypeBus>
                    {/* <PopupAdd objectAdd={addTypeBus} item={itemAdd} onChange={updateItemValue} success={success} emtyItemValue={emtyItemValue} fetchData={fetchData}></PopupAdd> */}
                    <button class="flex justify-center" onClick={() => exportDataToExcel(typeBus, notifySuccess, notifyError)}>
                        <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                        </FontAwesomeIcon>
                    </button>
                </div>
            </div>
            <table class="w-full min-h-[300px] my-md rounded-md border-collapse box-shadow-content text-txt text-16 overflow-hidden">
                <thead>
                    <tr class='grid bg-bg grid-cols-12 p-sm text-left border-b-2'>
                        {/* <th class='col-span-1'>Id</th> */}
                        <th class='col-span-3'>Tên</th>
                        <th class='col-span-4'>Mô tả</th>
                        <th class='col-span-2'>Tổng chỗ ngồi</th>
                        <th class='col-span-2'>Trạng thái</th>
                        <th class='col-span-1'></th>
                    </tr>
                </thead>
                <tbody class='bg-bg'>


                    {loading ?
                        <div className="animate-pulse bg-hover-txt w-full h-[300px] text-bg text-center">
                        </div>
                        :
                        !loading && typeBus.length > 0
                            ?
                            <PaginatedItemsWithAPI handleClick={handlePageClick} items={typeBus} componentToRender={TypeBusRow} updateStatus={changeStatus} pageCount={pageTotal} currentPage={currentPage} fetchData={refetchData}>
                            </PaginatedItemsWithAPI>
                            :
                            <Empty description="Không có loại xe"></Empty>
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

export default ManageTypeBus;