import ReactLoading from 'react-loading';
import PopupAdd from "../../../src/components/Layout/Components/Admin/manageRoutes/PopupAdd";
import { useCallback, useEffect, useState } from "react";
import PaginateWithApi from "../../components/Layout/Components/PaginateWithApi"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
// import * as SeatTypeSV from "../../services/SeatTypeSV"
import * as RoutesSV from "../../services/RoutesSV"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesRow from '../../components/Layout/Components/Admin/manageRoutes/RouteRow';

const ManageRoutes = () => {
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(routes);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'exported_data.xlsx');
    };

    const notifySuccess = () => toast.success('Cập nhật trạng thái thành công!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = () => toast.error('Cập nhật trạng thái thất bại', {
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
    // Hàm cập nhật trạng thái item
    // const changeStatus = (id, value) => {
    //     setUpdateLoading(true)
    //     try {
    //         if (value === 3) {

    //             const resp = SeatTypeSV.changeToDisable({ id: id });
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
    //         else if (value === 1) {
    //             setUpdateLoading(true)
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
    const [updateLoading, setUpdateLoading] = useState(false)
    return (
        <div class='w-full text-txt txt-16 min-h-[600px] relative '>
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
                <p class='col-span-2 font-bold text-20'>Quản lý tuyến đường</p>
                <input placeholder="Tìm kiếm" class='col-span-5 bg-[#e1e1e1] outline-none border-none p-sm rounded-md'></input>
                <div class='flex col-span-1 col-start-8 justify-evenly'>

                    <PopupAdd fetchData={fetchData}></PopupAdd>
                    <button class="flex justify-center" onClick={exportToExcel}>
                        <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                        </FontAwesomeIcon>
                    </button>
                </div>
            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden">

                <thead>
                    <tr class='grid bg-button grid-cols-6 p-sm text-left'>
                        {/* <th class='col-span-1'>Id</th> */}
                        <th class='col-span-3'>Điểm xuất phát</th>
                        <th class='col-span-3'>Điểm đến</th>
                    </tr>
                </thead>
                <tbody class='bg-[#e1e1e1]'>

                    {
                        loading ?
                            <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                            </div>
                            :
                            !loading &&
                                routes.length > 0 ?
                                <PaginateWithApi handleClick={handlePageClick} componentToRender={RoutesRow} items={routes} pageCount={pageTotal}></PaginateWithApi>
                                : "Không có bến nào"

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