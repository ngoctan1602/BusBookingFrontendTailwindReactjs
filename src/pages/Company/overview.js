
import { useState, useEffect } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFileExcel, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";

import OverviewRow from "../../components/Layout/Components/Company/Bus/OverviewRow";
import PopupAdd from "../../components/Layout/Components/Company/Bus/PopupAdd";
import * as busServices from "../../services/Company/BusSV";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import Search from "antd/es/input/Search";
import PaginatedItemsWithAPI from "../../components/Layout/Components/PaginateWithApi";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
const Overview = () => {
    document.title = "Quản lý xe";
    const [loading, setLoading] = useState(true);
    const [bus, setBus] = useState([])

    const [currentPage, setCurrentPage] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    const fetchData = async () => {
        try {
            const response = await busServices.getAllBusOfCompany({ pageSize: 10, pageIndex: currentPage });
            console.log(response.data)
            if (!response.isError && response.data.items !== undefined && response.data.items != null) {
                setBus(response.data.items);
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
    }, [currentPage]);


    useEffect(() => {
        fetchData();

    }, []);

    const [itemAdd, setItemAdd] = useState(
        {
            seatTypeID: 0,
            busTypeID: 0,
            busNumber: "",
            description: "",
        }
    )
    const [propsAdd, setPropsAdd] = useState({
        title: "Thêm xe mới",
        item: [
            {
                id: 1, name: "seatTypeID", content: "Loại ghế", value: itemAdd.seatTypeID
            },
            {
                id: 2, name: "busTypeID", content: "Loại xe", value: itemAdd.busTypeID
            },
            {
                id: 3, name: "busNumber", content: "Biển số xe", value: itemAdd.busNumber, spanWidth: 120, placeholder: "Thêm biển số xe", type: "text"
            },
            {
                id: 4, name: "description", content: "Mô tả", value: itemAdd.description, spanWidth: 100, placeholder: "Thêm mô tả", type: "text"
            },

        ]
    })

    const updateItemValue = (id, newValue) => {
        propsAdd.item.map(item => {
            if (item.id === id) {
                setItemAdd({ ...itemAdd, [item.name]: newValue })
            }
        });
    };

    const [isChange, setIsChange] = useState(false);
    const changeStatus = (id, value) => {
        bus.map(async (item) => {
            if (item.id === id) {
                if (value === 3) {
                    setIsChange(true);
                    const update = await busServices.changeIsDisable({ id: id })

                    setIsChange(false)
                    if (!update.isError) {
                        notifySuccess()
                        fetchData()
                        return
                    }
                    else {
                        notifyError()
                        return
                    }
                }
                else if (value === 1) {
                    setIsChange(true);
                    const update = await busServices.changeIsActive({ id: id })
                    setIsChange(false);
                    if (!update.isError) {
                        notifySuccess()
                        fetchData()
                        return
                    }
                    else {
                        notifyError()
                        return
                    }
                }

            }
        });
    }

    const notifySuccess = () => toast.success('Cập nhật trạng thái thành công', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = () => toast.error('Cập nhật trạng thái thất bại', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const find = async(param) => {
        try {
            const response = await busServices.find({ param: param, pageSize: 10, pageIndex: currentPage });
            if (!response.isError) {
                setBus(response.data.items);
                setPageTotal(response.data.pageTotal)
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    const navigate = useNavigate();

    return (
        <div className="w-full h-full">
            <div class='w-full text-txt txt-16 bg-bg py-[20px] px-[10px] rounded-md box-shadow-content mb-md' >

                <div class='grid grid-cols-12 grid-flow-row gap-4 items-center'>
                    <p class='col-span-2 font-bold text-20'>Quản lý xe</p>
                    <Search
                        placeholder="Tìm kiếm xe"
                        allowClear
                        className="col-start-3 col-span-8 p-md"
                    onSearch={find}
                    // style={{
                    //     width: 200,
                    // }}
                    />
                    {/* <input placeholder="Tìm kiếm" class='col-start-4 col-span-5 bg-[#ffff] outline-none border-none p-sm rounded-md'></input> */}

                    <FontAwesomeIcon onClick={() => navigate("/company/create-bus")} icon={faPlus} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]' />

                    {/* <PopupAdd fetchData={fetchData} items={itemAdd} propsAdd={propsAdd} onChange={updateItemValue}></PopupAdd> */}
                    {/* <PopupAddBusStation objectAdd={addBusStation} item={itemAdd} onChange={updateItemValue} success={success} emtyItemValue={emtyItemValue}></PopupAddBusStation> */}

                </div>
                <table class="min-h-[300px] w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden relative">
                    {
                        isChange &&
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
                            {/* <th class='col-span-2'>Id bus</th> */}
                            <th class='col-span-3'>Biển số xe</th>
                            <th class='col-span-3'>Loại xe</th>
                            <th class='col-span-2'>Số chỗ ngồi</th>
                            <th class='col-span-2'>Trạng thái</th>
                            <th class='col-span-2'></th>
                        </tr>


                    </thead>
                    <tbody class='bg-[#ffff]'>
                        {loading ?
                            <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                            </div>
                            :
                            !loading && bus.length > 0 && bus !== undefined && bus !== null
                                ?
                                // <tr>
                                //     Có dữ liệu
                                // </tr>
                                <PaginatedItemsWithAPI handleClick={handlePageClick} updateStatus={changeStatus} componentToRender={OverviewRow} items={bus} pageCount={pageTotal} fetchData={fetchData} currentPage={currentPage}></PaginatedItemsWithAPI>

                                // <Paginate itemsPerPage={5} items={bus} componentToRender={OverviewRow} updateStatus={changeStatus} ></Paginate>
                                :
                                <tr>
                                    Không có buýt nào
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