
import busStationRow from "../../components/Layout/Components/Admin/BusStationRow";
import PopupAdd from "../../components/Layout/Components/Admin/PopupAdd";
import { useCallback, useState } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
const ManageBusStation = () => {

    const itemAdd = {
        title: "Thêm mới bến bãi",
        item: [
            {
                id: 1, content: "Tên bến bãi", spanWidth: 120, placeholder: "Tên bến bãi"
            },
            {
                id: 2, content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả"
            },
            {
                id: 3, content: "Địa chỉ", spanWidth: 160, placeholder: "Địa chỉ"
            }
        ]
    }
    const [busStation, setbusStation] = useState(
        [
            {
                id: 1, name: "BX Miền Đông", description: "Đây là xe Limousine 32 chỗ", address: "Thôn Tân Phú, xã Vạn Phú", status: 1
            },
            {
                id: 2, name: "BX Nha Trang", description: "Đây là xe Limousine 32 chỗ", address: "Thôn Tân Phú, xã Vạn Phú", status: 1
            },
            {
                id: 3, name: "BX Miền Tây", description: "Đây là xe Limousine 32 chỗ", address: "Thôn Tân Phú, xã Vạn Phú", status: 1
            },
            {
                id: 4, name: "BX Hà Nam", description: "Đây là xe Limousine 32 chỗ", address: "Thôn Tân Phú, xã Vạn Phú", status: 1
            },

        ]
    );


    const changeStatus = (id, value) => {
        const updatedItems = busStation.map(item => {
            if (item.id === id) {
                return { ...item, status: value };
            }

            return { ...item };

        });
        setbusStation(updatedItems);
        console.log(busStation)
    }

    return (
        <div class='w-full text-txt txt-16'>

            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <p class='col-span-2 font-bold text-20'>Quản lý bến bãi</p>
                <input placeholder="Tìm kiếm" class='col-span-6 bg-[#e1e1e1] outline-none border-none p-sm rounded-md'></input>

                <PopupAdd item={itemAdd}></PopupAdd>
            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden">
                <thead>
                    <tr class='grid bg-button grid-cols-12 p-sm text-left'>
                        <th class='col-span-2'>Id</th>
                        <th class='col-span-3'>Tên</th>
                        <th class='col-span-3'>Mô tả</th>
                        <th class='col-span-2'>Địa chỉ</th>
                        <th class='col-span-1'>Trạng thái</th>
                        <th class='col-span-1'></th>
                    </tr>
                </thead>
                <tbody class='bg-[#e1e1e1]'>
                    <Paginate itemsPerPage={5} items={busStation} componentToRender={busStationRow} updateStatus={changeStatus}></Paginate>
                </tbody>
            </table>
        </div>
    );
}

export default ManageBusStation;