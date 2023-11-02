
import TypeBusRow from "../../components/Layout/Components/Admin/TypeBusRow";
import PopupAdd from "../../components/Layout/Components/Admin/PopupAdd";
import { useCallback, useState } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
const ManageTypeBus = () => {

    const itemAdd = {
        title: "Thêm mới loại xe",
        item: [
            {
                id: 1, content: "Tên loại xe", spanWidth: 120, placeholder: "Tên loại xe"
            },
            {
                id: 2, content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả"
            },
            {
                id: 3, content: "Số chỗ ngồi", spanWidth: 160, placeholder: "Số chỗ ngồi"
            }
        ]
    }
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


    const changeStatus = (id, value) => {
        const updatedItems = typeBus.map(item => {
            if (item.id === id) {
                return { ...item, status: value };
            }

            return { ...item };

        });
        setTypeBus(updatedItems);
        console.log(typeBus)
    }

    return (
        <div class='w-full text-txt txt-16'>

            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <p class='col-span-2 font-bold text-20'>Quản lý nhà xe</p>
                <input placeholder="Tìm kiếm" class='col-span-6 bg-[#e1e1e1] outline-none border-none p-sm rounded-md'></input>

                <PopupAdd item={itemAdd}></PopupAdd>
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
                    <Paginate itemsPerPage={5} items={typeBus} componentToRender={TypeBusRow} updateStatus={changeStatus}></Paginate>
                </tbody>
            </table>
        </div>
    );
}

export default ManageTypeBus;