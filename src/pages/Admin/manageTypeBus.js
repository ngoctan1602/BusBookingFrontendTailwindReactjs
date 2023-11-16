
import TypeBusRow from "../../components/Layout/Components/Admin/TypeBusRow";
import PopupAdd from "../../components/Layout/Components/Admin/PopupAdd";
import { useCallback, useEffect, useState } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
const ManageTypeBus = () => {
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(typeBus);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'exported_data.xlsx');
    };

    const [addTypeBus, setAddTypeBus] = useState({
        name: '',
        description: '',
        totalSeat: '',
        status: ''
    });

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
                    id: 3, name: "totalSeat", content: "Số chỗ ngồi", spanWidth: 160, placeholder: "Số chỗ ngồi", value: addTypeBus.totalSeat
                }
            ]
        }
    )
    const updateItemValue = (id, newValue) => {

        const updatedItem = itemAdd.item.map(item => {
            if (item.id === id) {
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
            if (item.value === "") {
                isSuccess = false
            }
            // setAddTypeBus({ ...addTypeBus, [item.name]: item.value })
        });
        console.log(addTypeBus)
        return isSuccess
    }, [itemAdd])

    const emtyItemValue = () => {
        // Tạo một bản sao mới của mảng item với giá trị được cập nhật
        const updatedItem = itemAdd.item.map(item => {

            return { ...item, value: "" };

        });

        // Cập nhật state bằng mảng mới đã được cập nhật
        setItemAdd({
            ...itemAdd,
            item: updatedItem
        });
    };

    const [typeBus, setTypeBus] = useState(
        [
            {
                id: 1, name: "Limousine 32 chỗ", totalSeat: 30, status: 1, description: "Đây là xe Limousine 32 chỗ"
            },
            {
                id: 2, name: "Limousine 24 chỗ", totalSeat: 24, status: 0, description: "Đây là xe Limousine 24 chỗ"
            },
            {
                id: 3, name: "Limousine 28 chỗ", totalSeat: 28, status: 1, description: "Đây là xe Limousine 28 chỗ"
            },
            {
                id: 4, name: "Limousine 32 chỗ", totalSeat: 30, status: 1, description: "Đây là xe Limousine 32 chỗ"
            },
            {
                id: 5, name: "Limousine 24 chỗ", totalSeat: 24, status: 0, description: "Đây là xe Limousine 24 chỗ"
            },
            {
                id: 6, name: "Limousine 28 chỗ", totalSeat: 28, status: 1, description: "Đây là xe Limousine 28 chỗ"
            }
        ]
    );

    // Hàm cập nhật trạng thái item
    const changeStatus = (id, value) => {
        const updatedItems = typeBus.map(item => {
            if (item.id === id) {
                return { ...item, status: value };
            }

            return { ...item };

        });
        setTypeBus(updatedItems);
    }

    return (
        <div class='w-full text-txt txt-16'>

            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <p class='col-span-2 font-bold text-20'>Quản lý loại xe</p>
                <input placeholder="Tìm kiếm" class='col-span-5 bg-[#e1e1e1] outline-none border-none p-sm rounded-md'></input>
                <div class='flex col-span-1 col-start-8 justify-evenly'>

                    <PopupAdd objectAdd={addTypeBus} item={itemAdd} onChange={updateItemValue} success={success} emtyItemValue={emtyItemValue}></PopupAdd>
                    <button class="flex justify-center" onClick={exportToExcel}>
                        <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                        </FontAwesomeIcon>
                    </button>
                </div>
            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden">
                <thead>
                    <tr class='grid bg-button grid-cols-12 p-sm text-left'>
                        <th class='col-span-2'>Id</th>
                        <th class='col-span-3'>Tên</th>
                        <th class='col-span-3'>Mô tả</th>
                        <th class='col-span-2'>Tổng chỗ ngồi</th>
                        <th class='col-span-1'>Trạng thái</th>
                        <th class='col-span-1'></th>
                    </tr>
                </thead>
                <tbody class='bg-[#e1e1e1]'>
                    <Paginate itemsPerPage={5} items={typeBus} componentToRender={TypeBusRow} updateStatus={changeStatus} emtyItemValue={emtyItemValue}></Paginate>
                </tbody>
            </table>

        </div>
    );
}

export default ManageTypeBus;