
import { useState, useEffect } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PopupAdd from "../../components/Layout/Components/Company/RouteDetail/PopupAdd";
import * as busServices from "../../services/Company/BusSV";
import * as RoutesSV from "../../services/RoutesSV";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import RouteDetailRow from "../../components/Layout/Components/Company/RouteDetail/RouteDetailRow";
import { useNavigate } from "react-router-dom";

const ManageRouteDetail = () => {
    let navigate = useNavigate();
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

    document.title = "Cập nhật lộ trình";
    const [loading, setLoading] = useState(true);
    const [routeDetail, setRouteDetail] = useState(
        []
    )
    const [currentPage, setCurrentPage] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    const fetchData = async () => {
        try {
            const response = await RoutesSV.getAllRoutesByCompany({ pageSize: 200, pageIndex: 1 });
            console.log(response)
            setRouteDetail(response.data.items);
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


    // const [isChange, setIsChange] = useState(false);
    // const changeStatus = (id, value) => {
    //     setIsChange(true)
    //     if (value === 7)
    //         try {
    //             const resp = ticketSV.changeCompleteStatus({ id: id });
    //             setIsChange(false)
    //             console.log(resp)
    //             if (!resp.isError) {
    //                 notifySuccess()
    //                 setTimeout(
    //                     () =>
    //                         fetchData()
    //                     , 2000
    //                 )
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }

    //     console.log(id, value)
    // }

    return (
        <div class='w-full text-txt txt-16 '>

            <div class='grid grid-cols-12 grid-flow-row gap-4 items-center'>
                <p class='col-span-2 font-bold text-20'>Quản lý lộ trình</p>
                <select className="col-span-3 outline-none p-sm rounded-md bg-bgPopup border-[1px] border-hover-txt"
                    onChange={(e) => navigate(e.target.value)}
                >
                    <option value={'/company/create-route-detail'}>
                        Thêm mới lộ trình
                    </option>
                    <option selected>
                        Cập nhật lộ trình
                    </option>
                </select>
                <input placeholder="Tìm kiếm" class='col-start-7 col-span-5 bg-[#e1e1e1] outline-none border-none p-sm rounded-md'></input>
                {/* <PopupAdd
                 items={itemAdd} propsAdd={propsAdd} onChange={updateItemValue}
                 ></PopupAdd> */}
                {/* <PopupAddBusStation objectAdd={addBusStation} item={itemAdd} onChange={updateItemValue} success={success} emtyItemValue={emtyItemValue}></PopupAddBusStation> */}

                {/* <PopupAdd></PopupAdd> */}
            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden relative">
                {/* {
                    loading &&
                    <div class='absolute bg-hover-txt w-full h-full z-20 opacity-40'>
                        <ReactLoading
                            type="spinningBubbles" color="#ffffff"
                            height={'5%'} width={'5%'}
                            className="absolute bg-hover-txt left-1/2 top-[30%]  "
                        />
                    </div>
                } */}
                <thead>
                    <tr class='grid bg-button grid-cols-12 p-sm text-left gap-sm'>
                        <th class='col-span-4'>Tên lộ trình</th>
                        <th class='col-span-3'>Điểm xuất phát</th>
                        <th class='col-span-3'>Điểm kết thúc</th>
                    </tr>
                </thead>
                <tbody class='bg-[#e1e1e1]'>
                    {loading ?
                        <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                        </div>
                        :
                        !loading && routeDetail.length > 0
                            ?
                            <Paginate itemsPerPage={5} items={routeDetail} componentToRender={RouteDetailRow}></Paginate>
                            :
                            <tr>
                                Không có chuyến đi nào
                            </tr>
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

export default ManageRouteDetail;