
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
import PopupAdd from "../../components/Layout/Components/Company/Price/PopupAdd";
import { useNavigate } from "react-router-dom";
import PriceClassRow from "../../components/Layout/Components/Company/PriceClass/PriceClassRow";
import PaginatedItemsWithAPI from "../../components/Layout/Components/PaginateWithApi";
import PriceRow from "../../components/Layout/Components/Company/Price/PriceRow";
import Search from "antd/es/input/Search";
const ManagePrice = () => {
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
    document.title = "Quản lý bảng giá";
    const [loading, setLoading] = useState(false);
    const [priceClass, setPriceClass] = useState([]);

    const fetchData = async () => {
        setLoading(true)
        try {
            // const response = await PriceClassSV.getAllInCompany({ pageSize: 200, pageIndex: currentPage + 1 });
            const response1 = await PriceSV.getAllInCompany({ pageSize: 10, pageIndex: currentPage + 1 });

            console.log(response1)
            if (!response1.isError && response1.data !== null && response1.data !== undefined) {
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

    return (

        <div className="w-full h-full">
            <div class='w-full text-txt txt-16 bg-bg py-[20px] px-[10px] rounded-md box-shadow-content mb-md' >

                <div class='grid grid-cols-12 grid-flow-row gap-4 items-center'>
                    <p class='col-span-3 font-bold text-20 uppercase'>Quản lý bảng giá</p>
                    <select className="col-span-3 outline-none p-sm rounded-md bg-bgPopup border-[1px] border-hover-txt"
                        onChange={(e) => navigate(e.target.value)}
                    >
                        <option value={'/company/priceclassification'} >
                            Quản lý loại giá
                        </option>
                        <option selected >
                            Quản lý bảng giá
                        </option>
                    </select>
                    <Search
                        placeholder="Tìm kiếm theo tên/ giá trị bảng giá"
                        allowClear
                        className="col-start-7 col-span-5 p-md"
                    // onSearch={onSearch}
                    >
                    </Search>
                    {/* <input placeholder="Tìm kiếm" class='col-start-9 col-span-3 bg-bg outline-none border-none p-sm rounded-md'></input> */}
                    {/* <PopupAdd
                    items={itemAdd} propsAdd={propsAdd} onChange={updateItemValue}
                ></PopupAdd> */}
                    <div className="col-span-1">
                        <PopupAdd></PopupAdd>
                    </div>

                </div>
                <table class="w-full min-h-[300px] my-md rounded-md border-collapse  text-txt text-16 overflow-hidden relative">
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
                        <tr class='grid bg-bg grid-cols-12 p-sm text-left gap-md'>
                            <th class='col-span-6'>Tuyến đi</th>
                            <th class='col-span-2'>Giá</th>
                            <th class='col-span-2'>Phụ phí</th>
                            <th class='col-span-2'>Trạng thái</th>
                        </tr>

                    </thead>
                    <tbody class='bg-bg relative'>
                        {
                            loading ?
                                <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                                </div>
                                :
                                !loading &&
                                    (priceClass !== null && priceClass.length > 0 && priceClass !== undefined)
                                    ?
                                    <PaginatedItemsWithAPI handleClick={handlePageClick} componentToRender={PriceRow} items={priceClass} pageCount={pageTotal} fetchData={fetchData}></PaginatedItemsWithAPI>
                                    :
                                    <tr style={{ width: "100%", position: "absolute", top: 100, textAlign: "center" }}>
                                        Chưa có bảng giá nào.
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
        </div >
    );
}

export default ManagePrice;