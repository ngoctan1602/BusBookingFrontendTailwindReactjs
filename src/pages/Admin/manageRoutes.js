import ReactLoading from 'react-loading';
import PopupAdd from "../../../src/components/Layout/Components/Admin/manageRoutes/PopupAdd";
import { useCallback, useEffect, useState } from "react";
import PaginateWithApi from "../../components/Layout/Components/PaginateWithApi"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faPlus } from "@fortawesome/free-solid-svg-icons";
// import * as SeatTypeSV from "../../services/SeatTypeSV"
import * as RoutesSV from "../../services/RoutesSV"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesRow from '../../components/Layout/Components/Admin/manageRoutes/RouteRow';
import Search from "antd/es/input/Search";
import exportDataToExcel from "../../components/Common/exportExcel";
import { Button, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';


const ManageRoutes = () => {

    const navigate = useNavigate();
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


    const [loading, setLoading] = useState(false);

    const [routes, setRoutes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    useEffect(() => {

        fetchData();

    }, []);
    useEffect(() => {

        fetchData();

    }, [currentPage]);
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await RoutesSV.getAllRoutesWithParams({ pagesize: 10, pageIndex: currentPage + 1 });
            console.log(response.data)
            if (!response.isError) {
                setRoutes(response.data.items);
                setPageTotal(response.data.pageTotal)
            }
            setLoading(false)

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };

    const [updateLoading, setUpdateLoading] = useState(false)
    const Find = async (param) => {
        setLoading(true)
        try {
            const response = await RoutesSV.find({ params: param, pageSize: 10, pageIndex: 1 });
            setLoading(false)
            if (!response.isError)
                setRoutes(response.data.items)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <div class='w-full text-txt txt-16 min-h-[600px] relative mt-[20px]'>
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
            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <p class='col-span-3 text-20 font-black uppercase'>Quản lý tuyến đường</p>
                <Search
                    placeholder="Tìm kiếm theo tên/ giá trị bảng giá"
                    allowClear
                    className=" col-span-5 p-md"
                    onSearch={Find}
                />
                <div class='flex col-span-1 justify-evenly'>

                    {/* <PopupAdd fetchData={fetchData}></PopupAdd> */}
                    <Button onClick={() => navigate("/admin/create-routes")} style={{ width: 39, height: 39 }} icon={<FontAwesomeIcon icon={faPlus} color="#00B873" style={{ width: 20, height: 20 }}></FontAwesomeIcon>}></Button>
                    <button class="flex justify-center" onClick={() => exportDataToExcel(routes, notifySuccess, notifyError)}>
                        <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                        </FontAwesomeIcon>
                    </button>
                </div>
            </div>
            <table class="min-h-[300px] box-shadow-content w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden">

                <thead>
                    <tr class='grid bg-bg grid-cols-6 p-sm text-left border-b-2'>
                        {/* <th class='col-span-1'>Id</th> */}
                        <th class='col-span-3'>Điểm xuất phát</th>
                        <th class='col-span-3'>Điểm đến</th>
                    </tr>
                </thead>
                <tbody class='bg-bg'>

                    {
                        loading ?
                            <div className="animate-pulse bg-hover-txt w-full h-[300px] text-bg text-center">
                            </div>
                            :
                            !loading &&
                                routes.length > 0 ?
                                <PaginateWithApi currentPage={currentPage} handleClick={handlePageClick} componentToRender={RoutesRow} items={routes} pageCount={pageTotal}></PaginateWithApi>
                                : <Empty description="Không có tuyến đường nào"></Empty>
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

export default ManageRoutes;