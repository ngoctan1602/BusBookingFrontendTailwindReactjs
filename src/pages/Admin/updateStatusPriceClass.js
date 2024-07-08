
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import PopupAdd from "../../components/Layout/Components/Company/RouteDetail/PopupAdd";
import * as busServices from "../../services/Company/BusSV";
// import * as ticketSV from "../../services/Company/Ticket";
import * as PriceClassSV from "../../services/PriceClassSV";
import * as PriceSV from "../../services/PriceSV";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import ManageTicketRow from "../../components/Layout/Components/Company/Bus/ManageTicketRow";

import { useNavigate } from "react-router-dom";
import PriceClassRow from "../../components/Layout/Components/Admin/PriceClass/PriceClassRow";
import PaginatedItemsWithAPI from "../../components/Layout/Components/PaginateWithApi";
import PriceRow from "../../components/Layout/Components/Admin/Price/PriceRow";
import Search from "antd/es/input/Search";
import exportDataToExcel from "../../components/Common/exportExcel";
import { Empty } from "antd";
const UpdateStatusPriceClass = () => {
    let navigate = useNavigate();
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
    const [currentPage, setCurrentPage] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    document.title = "Quản lý loại giá";
    const [loading, setLoading] = useState(false);
    const [priceClass, setPriceClass] = useState([]);

    const fetchData = async () => {
        setLoading(true)
        try {
            const response1 = await PriceClassSV.getAll({ pageSize: 10, pageIndex: currentPage + 1 });
            // const response1 = await PriceSV.getAll({ pageSize: 10, pageIndex: currentPage + 1 });

            console.log(response1)
            if (!response1.isError) {
                setPriceClass(response1.data.items);
                setPageTotal(response1.data.pageTotal)
            }
            setLoading(false)

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };

    useEffect(() => {


        fetchData();
        return () => {
            console.log("call api success")
        }
    }, []);
    useEffect(() => {
        fetchData();
        return () => {
            console.log("call api success")
        }
    }, [currentPage]);
    const [updateLoading, setUpdateLoading] = useState(false)
    const changeStatus = (id, value) => {
        setUpdateLoading(true)
        try {
            if (value === 1) {

                const resp = PriceClassSV.ChangeIsActive({ id: id });
                setUpdateLoading(false)
                console.log(resp)
                if (!resp.isError) {
                    notifySuccess("Cập nhật trạng thái thành công")
                    setTimeout(
                        () =>
                            fetchData()
                        , 2000
                    )
                }
                else {
                    notifyError("Cập nhật trạng thái thất bại")
                }
            }
            else if (value === 2) {
                setUpdateLoading(true)
                const resp = PriceClassSV.ChangeIsWaiting({ id: id });
                setUpdateLoading(false)
                console.log(resp)
                if (!resp.isError) {
                    notifySuccess("Cập nhật trạng thái thành công")
                    setTimeout(
                        () =>
                            fetchData()
                        , 2000
                    )
                }
                else {
                    notifyError("Cập nhật trạng thái thất bại")
                }
            }
        } catch (error) {
            console.log(error)
        }
        console.log(id, value)

    }
    return (
        <div class='w-full text-txt txt-16 '>

            <div class='grid grid-cols-12 grid-flow-row gap-4 items-center mt-[20px]'>
                <p class='col-span-3 text-20 font-black uppercase'>Quản lý loại giá</p>
                <select className="col-span-3 outline-none p-sm rounded-md border-[1px] border-hover-txt"
                    onChange={(e) => navigate(e.target.value)}
                >
                    <option selected >
                        Quản lý loại giá
                    </option>
                    <option value={'/admin/prices'}>
                        Quản lý bảng giá
                    </option>
                </select>
                {/* <input placeholder="Tìm kiếm" class='col-start-7 col-span-5 bg-bg outline-none border-none p-sm rounded-md'></input> */}
                <Search
                    placeholder="Tìm kiếm loại giá"
                    allowClear
                    className="col-span-5 p-md"
                // onSearch={Find}
                />
                <button class="flex justify-center"
                    onClick={() => exportDataToExcel(priceClass, notifySuccess, notifyError)}
                >
                    <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                    </FontAwesomeIcon>
                </button>


            </div>
            <table class="min-h-[300px] box-shadow-content w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden relative">
                {
                    updateLoading &&
                    <div class='absolute bg-hover-txt w-[100%] h-full z-20 opacity-40'>
                        <ReactLoading
                            type="spinningBubbles" color="#e1e1e1"
                            height={'10%'} width={'10%'}
                            className="absolute left-[50%] top-[40%]  "
                        />
                    </div>
                }
                <thead>
                    <tr class='grid bg-bg grid-cols-12 p-sm text-left gap-md border-b-2'>
                        <th class='col-span-3'>Công ty</th>
                        <th class='col-span-3'>Tên loại giá</th>
                        <th class='col-span-2'>Giá trị (%)</th>
                        <th class='col-span-2'>Mô tả</th>
                        <th class='col-span-2'>Trạng thái</th>
                    </tr>
                </thead>
                <tbody class='bg-bg'>
                    {
                        loading ?
                            <div className="animate-pulse bg-hover-txt w-full h-[300px] text-bg text-center">
                            </div>
                            :
                            !loading && priceClass.length > 0
                                ?
                                <PaginatedItemsWithAPI currentPage={currentPage} handleClick={handlePageClick} componentToRender={PriceClassRow} items={priceClass} pageCount={pageTotal} fetchData={fetchData} updateStatus={changeStatus}></PaginatedItemsWithAPI>
                                :
                                <Empty description="Không có loại giá nào" />
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

export default UpdateStatusPriceClass;