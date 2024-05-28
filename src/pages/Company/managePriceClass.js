
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import PopupAdd from "../../components/Layout/Components/Company/RouteDetail/PopupAdd";
import * as busServices from "../../services/Company/BusSV";
// import * as ticketSV from "../../services/Company/Ticket";
import * as PriceClassSV from "../../services/PriceClassSV";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import ManageTicketRow from "../../components/Layout/Components/Company/Bus/ManageTicketRow";
import PopupAdd from "../../components/Layout/Components/Company/PriceClass/PopupAdd";
import { useNavigate } from "react-router-dom";
import PriceClassRow from "../../components/Layout/Components/Company/PriceClass/PriceClassRow";
import PaginatedItemsWithAPI from "../../components/Layout/Components/PaginateWithApi";
const ManagePriceClass = () => {
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
            const response = await PriceClassSV.getAllInCompany({ pageSize: 200, pageIndex: currentPage + 1 });
            console.log(response)
            if (!response.isError) {
                setPriceClass(response.data.items);
                setPageTotal(response.data.pageTotal)
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

    return (
        <div class='w-full text-txt txt-16 '>

            <div class='grid grid-cols-12 grid-flow-row gap-4 items-center'>
                <p class='col-span-2 font-bold text-20'>Quản lý loại giá</p>
                <select className="col-span-3 outline-none p-sm rounded-md bg-bgPopup border-[1px] border-hover-txt"
                    onChange={(e) => navigate(e.target.value)}
                >
                    <option selected>
                        Quản lý loại giá
                    </option>
                    <option value={'/company/prices'}>
                        Quản lý bảng giá
                    </option>
                </select>
                <input placeholder="Tìm kiếm" class='col-start-7 col-span-5 bg-bg outline-none border-none p-sm rounded-md'></input>
                {/* <PopupAdd
                    items={itemAdd} propsAdd={propsAdd} onChange={updateItemValue}
                ></PopupAdd> */}
                <div className="col-span-1">
                    <PopupAdd></PopupAdd>
                </div>

            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden relative">
                {/* {
                    loading &&
                    <div class='absolute bg-hover-txt w-full h-full z-20 opacity-40'>
                        <ReactLoading
                            type="spinningBubbles" color="#ffffff"
                            height={'5%'} width={'5%'}
                            className="absolute bg-hover-txt left-1/2 top-[30%]"
                        />
                    </div>
                } */}
                <thead>
                    <tr class='grid bg-bg grid-cols-12 p-sm text-left gap-md border-b-2'>
                        {/* <th class='col-span-2'>Id</th> */}
                        <th class='col-span-3 col-start-2'>Tên</th>
                        <th class='col-span-3'>Mô tả</th>
                        <th class='col-span-2 text-center'>Đơn giá</th>
                        <th class='col-span-2'>Trạng thái</th>
                    </tr>
                    

                </thead>
                <tbody class='bg-bg'>
                    {
                        loading ?
                            <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                            </div>
                            :
                            !loading && priceClass.length > 0
                                ?
                                <PaginatedItemsWithAPI handleClick={handlePageClick} componentToRender={PriceClassRow} items={priceClass} pageCount={pageTotal} fetchData={fetchData}></PaginatedItemsWithAPI>
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

export default ManagePriceClass;