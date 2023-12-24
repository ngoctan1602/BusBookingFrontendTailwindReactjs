
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
const Overview = () => {



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

    const fetchData = async () => {
        try {
            const response = await ticketSV.getAllTicketInCompany();
            console.log(response)

            setTickets(response.data.items);
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


    const [isChange, setIsChange] = useState(false);
    const changeStatus = (id, value) => {
        setIsChange(true)
        if (value === 7)
            try {
                const resp = ticketSV.changeCompleteStatus({ id: id });
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

    return (
        <div class='w-full text-txt txt-16 '>

            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <p class='col-span-2 font-bold text-20'>Quản lý chuyến đi</p>
                <input placeholder="Tìm kiếm" class='col-start-4 col-span-5 bg-[#e1e1e1] outline-none border-none p-sm rounded-md'></input>
                {/* <PopupAdd items={itemAdd} propsAdd={propsAdd} onChange={updateItemValue}></PopupAdd> */}
                {/* <PopupAddBusStation objectAdd={addBusStation} item={itemAdd} onChange={updateItemValue} success={success} emtyItemValue={emtyItemValue}></PopupAddBusStation> */}

            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden relative">
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
                    <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                        <th class='col-span-1'>Id</th>
                        <th class='col-span-2'>Biển số xe</th>
                        <th class='col-span-3'>Loại xe</th>
                        <th class='col-span-2'>Ngày khởi hành</th>
                        <th class='col-span-1'>Số chỗ trống</th>
                        <th class='col-span-2'>Trạng thái</th>
                        <th class='col-span-1'>Chi tiết</th>
                    </tr>
                </thead>
                <tbody class='bg-[#e1e1e1]'>
                    {loading ?
                        <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                        </div>
                        :
                        !loading && tickets.length > 0
                            ?
                            <Paginate itemsPerPage={5} items={tickets} componentToRender={ManageTicketRow} updateStatus={changeStatus}></Paginate>
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

export default Overview;