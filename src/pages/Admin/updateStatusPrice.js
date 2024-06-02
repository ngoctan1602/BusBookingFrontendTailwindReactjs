
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
const UpdateStatusPrice = () => {
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
            // const response = await PriceClassSV.getAllInCompany({ pageSize: 200, pageIndex: currentPage + 1 });
            const response1 = await PriceSV.getAll({ pageSize: 10, pageIndex: currentPage + 1 });

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
    const [updateLoading, setUpdateLoading] = useState(false)
    const changeStatus = (id, value) => {
        setUpdateLoading(true)
        try {
            if (value === 1) {

                const resp = PriceSV.ChangeIsActive({ id: id });
                console.log(resp)
                if (!resp.isError) {
                    setUpdateLoading(false)
                    notifySuccess()
                    setTimeout(
                        () =>
                            fetchData()
                        , 2000
                    )
                }
                else {
                    notifyError()
                }
            }
            else if (value === 2) {
                const resp = PriceSV.ChangeIsWaiting({ id: id });
                setUpdateLoading(false)
                console.log(resp)
                if (!resp.isError) {
                    notifySuccess()
                    setTimeout(
                        () =>
                            fetchData()
                        , 2000
                    )
                }
                else {
                    notifyError()
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
                <p class='col-span-2 font-bold text-20 font-black uppercase' >Quản lý bảng giá</p>
                <select className="col-span-3 outline-none p-sm rounded-md bg-bgPopup border-[1px] border-hover-txt"
                    onChange={(e) => navigate(e.target.value)}
                >
                    <option value={'/admin/priceclassification'} >
                        Quản lý loại giá
                    </option>
                    <option selected >
                        Quản lý bảng giá
                    </option>
                </select>
                <input placeholder="Tìm kiếm" class='col-start-7 col-span-5 bg-bg outline-none border-none p-sm rounded-md'></input>



            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt-gray text-16 overflow-hidden relative">
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
                        <th class='col-span-3'>Tuyến đi</th>
                        <th class='col-span-2'>Giá</th>
                        <th class='col-span-2'>Phụ phí</th>
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
                                <PaginatedItemsWithAPI handleClick={handlePageClick} componentToRender={PriceRow} items={priceClass} pageCount={pageTotal} fetchData={fetchData} updateStatus={changeStatus}></PaginatedItemsWithAPI>
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

export default UpdateStatusPrice;