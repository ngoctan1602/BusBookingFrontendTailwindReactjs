
import TypeBusRow from "../../components/Layout/Components/Admin/TypeBusRow";
import PopupAdd from "../../components/Layout/Components/Admin/PopupAdd";
import { useCallback, useEffect, useState } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as TypeBusSv from "../../services/TypeBusServices"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ManageTypeBus = () => {
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(typeBus);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'exported_data.xlsx');
    };

    //#region  Notify 
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

    const [addTypeBus, setAddTypeBus] = useState({
        name: '',
        description: '',
        totalSeats: 0,
        status: 1
    });

    //#endregion

    const [itemAdd, setItemAdd] = useState(
        {
            title: "Thêm mới loại xe",
            item: [
                {
                    id: 1, name: "name", content: "Tên loại xe", spanWidth: 120, placeholder: "Tên loại xe", value: addTypeBus.name
                },
                {
                    id: 2, name: "description", content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả", value: addTypeBus.description
                },
                {
                    id: 3, name: "totalSeats", content: "Số chỗ ngồi", spanWidth: 160, placeholder: "Số chỗ ngồi", value: addTypeBus.totalSeats
                }
            ]
        }
    )

    const updateItemValue = (id, newValue) => {

        const updatedItem = itemAdd.item.map(item => {
            if (item.id === id) {
                if (item.name === "totalSeats") {
                    setAddTypeBus({ ...addTypeBus, [item.name]: parseInt(newValue) })
                    return { ...item, value: parseInt(newValue) };
                }

                setAddTypeBus({ ...addTypeBus, [item.name]: newValue })
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
        console.log(addTypeBus)
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

    const [typeBus, setTypeBus] = useState([]);
    useEffect(() => {

        fetchData();


    }, []);
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await TypeBusSv.getAllTypeBus();
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
        const updatedItems = typeBus.map(async (item, index) => {
            if (item.id === id) {
                const a = {
                    ...item,
                    status: value
                }
                const update = await TypeBusSv.updateTypeBus(a)
                if (!update.isError) {
                    notifySuccess()
                    fetchData();
                    return
                }
                else {
                    notifyError()
                    return
                }
            }
        });
    }


    //#region Call api paginate

    //#endregion

    return (
        <div class='w-full text-txt txt-16'>


            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center mt-[20px]'>
                <p class='col-span-2 font-bold text-20 font-black uppercase'>Quản lý loại xe</p>
                <input placeholder="Tìm kiếm" class='col-span-5 bg-bg outline-none border-none p-sm rounded-md'></input>

                <div class='flex col-span-1 col-start-8 justify-evenly'>

                    <PopupAdd objectAdd={addTypeBus} item={itemAdd} onChange={updateItemValue} success={success} emtyItemValue={emtyItemValue} fetchData={fetchData}></PopupAdd>
                    {/* <button class="flex justify-center" onClick={exportToExcel}>
                        <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                        </FontAwesomeIcon>
                    </button> */}
                </div>
            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden">
                <thead>
                    <tr class='grid bg-bg grid-cols-12 p-sm text-left border-b-2'>
                        {/* <th class='col-span-1'>Id</th> */}
                        <th class='col-span-3'>Tên</th>
                        <th class='col-span-4'>Mô tả</th>
                        <th class='col-span-2'>Tổng chỗ ngồi</th>
                        <th class='col-span-2'>Trạng thái</th>
                        <th class='col-span-1'></th>
                    </tr>
                </thead>
                <tbody class='bg-bg'>


                    {loading ?
                        <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                        </div>
                        :
                        !loading && typeBus
                            ?
                            <Paginate itemsPerPage={5} items={typeBus} componentToRender={TypeBusRow} updateStatus={changeStatus} emtyItemValue={emtyItemValue} fetchData={fetchData}></Paginate>
                            :
                            <tr>
                                Không có loại buýt nào
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

export default ManageTypeBus;