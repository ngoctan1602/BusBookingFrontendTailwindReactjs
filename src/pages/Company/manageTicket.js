
import { useState, useEffect } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


import PopupAdd from "../../components/Layout/Components/Company/Bus/PopupAdd";
import * as busServices from "../../services/Company/BusSV";
import * as ticketSV from "../../services/Company/Ticket";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import ManageTicketRow from "../../components/Layout/Components/Company/Bus/ManageTicketRow";
import PaginatedItemsWithAPI from "../../components/Layout/Components/PaginateWithApi";

const Overview = () => {


    const [currentPage, setCurrentPage] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage);
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

    const [addSeatType, setAddSeatType] = useState({
        type: '',
        description: '',
        price: 0,
    });


    document.title = "Quản lý chuyến đi";
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState(
        []
    )

    const fetchData = async (month) => {
        setLoading(true)
        try {
            const response = await ticketSV.getAllTicketInCompany({ pageSize: 10, pageIndex: currentPage + 1, month: month });
            console.log(response)
            if (!response.isError && response.data.items) {
                setTickets([])
                setTickets(response.data.items);
                setPageTotal(response.data.pageTotal)
            }
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };

    useEffect(() => {


        fetchData(selectedMonth);
        return () => {
            console.log("call api success")
        }
    }, []);


    const [isChange, setIsChange] = useState(false);
    const changeStatus = async (id, value) => {
        setIsChange(true)
        if (value === 7) {
            try {
                const resp = await ticketSV.changeCompleteStatus({ id: id });
                setIsChange(false)
                console.log(resp)
                if (!resp.isError) {
                    notifySuccess()
                    setTimeout(
                        () =>
                            fetchData()
                        , 2000
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (value === 0) {
            try {
                const resp = await ticketSV.deleteTicket({ id: id });
                setIsChange(false)
                console.log(resp)
                if (!resp.isError) {
                    notifySuccess()
                    setTimeout(
                        () =>
                            fetchData()
                        , 2000
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }
        // if (value === 0)
        //     try {
        //         const resp = ticketSV.changeCompleteStatus({ id: id });
        //         setIsChange(false)
        //         console.log(resp)
        //         if (!resp.isError) {
        //             notifySuccess()
        //             setTimeout(
        //                 () =>
        //                     fetchData()
        //                 , 2000
        //             )
        //         }
        //     } catch (error) {
        //         console.log(error)
        //     }
        console.log(id, value)
    }
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const onChangeMonth = async (month) => {
        setSelectedMonth(month)
        fetchData(month)
        //Gọi api 
    }
    return (
        <div className="w-full h-full">

            <div class='w-full text-txt txt-16 bg-bg py-[20px] px-[10px] rounded-md box-shadow-content mb-md' >

                <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                    <p class='col-span-2 font-bold text-20'>Quản lý chuyến đi</p>

                    <input type="month" class="col-span-2 rounded-md border border-solid border-button p-sm"
                        value={selectedMonth} onChange={(e) => onChangeMonth(e.target.value)} />

                </div>
                <table class="w-full min-h-[300px] my-md rounded-md border-collapse  text-txt text-16 overflow-hidden relative">
                    {
                        loading &&
                        <div class='absolute bg-hover-txt w-full h-full z-20 opacity-40'>
                            <ReactLoading
                                type="spinningBubbles" color="#ffffff"
                                height={'5%'} width={'5%'}
                                className="absolute bg-hover-txt left-1/2 top-[30%]  "
                            />
                        </div>
                    }
                    <thead>
                        <tr class='grid bg-bg grid-cols-12 p-sm text-left gap-md'>
                            {/* <th class='col-span-1'>Id</th> */}
                            <th class='col-span-2'>Biển số xe</th>
                            <th class='col-span-3'>Loại xe</th>
                            <th class='col-span-2'>Ngày khởi hành</th>
                            <th class='col-span-2'>Số chỗ trống</th>
                            <th class='col-span-2'>Trạng thái</th>
                            {/* <th class='col-span-1'>Chi tiết</th> */}
                        </tr>


                    </thead>
                    <tbody class='bg-[#FFFF] relative'>
                        {loading ?
                            <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                            </div>
                            :
                            !loading && tickets.length > 0
                                ?
                                <PaginatedItemsWithAPI handleClick={handlePageClick} pageCount={pageTotal} itemsPerPage={5} items={tickets} componentToRender={ManageTicketRow} updateStatus={changeStatus}></PaginatedItemsWithAPI>
                                :
                                <tr style={{ width: "100%", position: "absolute", top: 100, textAlign: "center" }}>
                                    Chưa có chuyến đi nào trong tháng
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
        </div>

    );
}

export default Overview;