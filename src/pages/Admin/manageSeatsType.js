import ReactLoading from 'react-loading';
import PopupAdd from "../../components/Layout/Components/Admin/manageSeatTypes/PopupAdd";
import { useCallback, useEffect, useState } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as SeatTypeSV from "../../services/SeatTypeSV"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SeatTypeRow from "../../components/Layout/Components/Admin/manageSeatTypes/SeatTypeRow";
const ManageSeatsType = () => {
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(seatTypes);
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

    const [addSeatType, setAddSeatType] = useState({
        type: '',
        description: '',
        price: 0,
    });

    const [itemAdd, setItemAdd] = useState(
        {
            title: "Thêm mới loại ghế",
            item: [
                {
                    id: 1, name: "type", content: "Tên loại ghế", spanWidth: 120, placeholder: "Tên loại ghế", value: addSeatType.type
                },
                {
                    id: 2, name: "description", content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả", value: addSeatType.description
                },
                {
                    id: 3, name: "price", content: "Giá tiền", spanWidth: 80, placeholder: "Giá tiền", value: addSeatType.price
                }
            ]
        }
    )

    const updateItemValue = (id, newValue) => {

        const updatedItem = itemAdd.item.map(item => {
            if (item.id === id) {
                if (item.name === "price") {
                    setAddSeatType({ ...addSeatType, [item.name]: parseInt(newValue) })
                    return { ...item, value: parseInt(newValue) };
                }

                setAddSeatType({ ...addSeatType, [item.name]: newValue })
                return { ...item, value: newValue };
            }
            return item;
        });

        setItemAdd({
            ...itemAdd,
            item: updatedItem
        });
    };

    const success = useCallback(() => {
        let isSuccess = true;
        itemAdd.item.map(item => {
            if (item.value === "" || (item.name === "totalSeats" && item.value === 0)) {
                isSuccess = false
            }

        });
        console.log(addSeatType)
        return isSuccess
    }, [itemAdd])

    const emtyItemValue = () => {

        const updatedItem = itemAdd.item.map(item => {
            if (item.name === "totalSeats")
                return { ...item, value: 0 };
            return { ...item, value: "" };

        });
        setItemAdd({
            ...itemAdd,
            item: updatedItem
        });
    };

    const [loading, setLoading] = useState(false);

    const [seatTypes, setTypeBus] = useState([]);
    useEffect(() => {

        fetchData();

    }, []);
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await SeatTypeSV.getAllSeatTypes({ pageSize: 200 });
            console.log(response.data)
            setTypeBus(response.data.items);
            setLoading(false)

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };
    // Hàm cập nhật trạng thái item
    const changeStatus = (id, value) => {
        setUpdateLoading(true)
        try {
            if (value === 3) {

                const resp = SeatTypeSV.changeToDisable({ id: id });
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
            else if (value === 1) {
                setUpdateLoading(true)
                const resp = SeatTypeSV.changeIsActive({ id: id });
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

    }
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
                <p class='col-span-2 font-bold text-20'>Quản lý loại ghế</p>
                <input placeholder="Tìm kiếm" class='col-span-5 bg-bg outline-none border-none p-sm rounded-md'></input>
                <div class='flex col-span-1 col-start-8 justify-evenly'>

                    <PopupAdd objectAdd={addSeatType} item={itemAdd} onChange={updateItemValue} success={success} emtyItemValue={emtyItemValue} fetchData={fetchData}></PopupAdd>
                    <button class="flex justify-center" onClick={exportToExcel}>
                        <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                        </FontAwesomeIcon>
                    </button>
                </div>
            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden">

                <thead>
                    <tr class='grid bg-bg grid-cols-12 p-sm text-left border-b-2'>
                        {/* <th class='col-span-1'>Id</th> */}
                        <th class='col-span-3'>Tên loại ghế</th>
                        <th class='col-span-4'>Mô tả</th>
                        <th class='col-span-2'>Đơn giá</th>
                        <th class='col-span-2'>Trạng thái</th>
                        <th class='col-span-1'></th>
                    </tr>
                </thead>
                <tbody class='bg-bg'>


                    {loading ?
                        <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                        </div>
                        :
                        !loading && seatTypes.length != 0
                            ?
                            <Paginate itemsPerPage={8} items={seatTypes} fetchData={fetchData} componentToRender={SeatTypeRow} updateStatus={changeStatus} emtyItemValue={emtyItemValue}></Paginate>
                            :
                            <tr>
                                Không có loại ghế nào
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

export default ManageSeatsType;