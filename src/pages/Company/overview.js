
import { useState, useEffect } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import OverviewRow from "../../components/Layout/Components/Company/Bus/OverviewRow";
import PopupAdd from "../../components/Layout/Components/Company/Bus/PopupAdd";
import * as busServices from "../../services/Company/BusSV";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
const Overview = () => {
    document.title = "Quản lý xe";
    const [loading, setLoading] = useState(true);
    const [bus, setBus] = useState(
    )

    const fetchData = async () => {
        try {
            const response = await busServices.getAllBusOfCompany();
            console.log(response.data)
            setBus(response.data.items);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const response = await busServices.getAllBusOfCompany();
        //         console.log(response.data)
        //         setBus(response.data.items);
        //         setLoading(false)
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //         setLoading(false)
        //     }
        // };

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

    return (
        <div class='w-full text-txt txt-16 '>

            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <p class='col-span-2 font-bold text-20'>Quản lý xe</p>
                <input placeholder="Tìm kiếm" class='col-start-4 col-span-5 bg-[#e1e1e1] outline-none border-none p-sm rounded-md'></input>
                <PopupAdd fetchData={fetchData} items={itemAdd} propsAdd={propsAdd} onChange={updateItemValue}></PopupAdd>
                {/* <PopupAddBusStation objectAdd={addBusStation} item={itemAdd} onChange={updateItemValue} success={success} emtyItemValue={emtyItemValue}></PopupAddBusStation> */}

            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden relative">
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
                    <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                        {/* <th class='col-span-2'>Id bus</th> */}
                        <th class='col-span-3'>Biển số xe</th>
                        <th class='col-span-3'>Loại xe</th>
                        <th class='col-span-2'>Số chỗ ngồi</th>
                        <th class='col-span-2'>Trạng thái</th>
                        <th class='col-span-2'></th>
                    </tr>
                </thead>
                <tbody class='bg-[#e1e1e1]'>
                    {loading ?
                        <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                        </div>
                        :
                        !loading && bus
                            ?
                            <Paginate itemsPerPage={5} items={bus} componentToRender={OverviewRow} updateStatus={changeStatus} ></Paginate>
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
    );
}

export default Overview;