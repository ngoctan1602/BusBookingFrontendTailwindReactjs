
import busStationRow from "../../components/Layout/Components/Admin/manageBusStation/BusStationRow";
import PopupAdd from "../../components/Layout/Components/Admin/PopupAdd";
import { useCallback, useState } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import PopupAddBusStation from "../../components/Layout/Components/Admin/manageBusStation/PopupAddBusStation";
const ManageBusStation = () => {

    const [addBusStation, setAddBusStation] = useState({
        name: '',
        description: '',
        address: '',
        status: ''
    });


    const [itemAdd, setItemAdd] = useState({
        title: "Thêm mới bến bãi",
        item: [
            {
                id: 1, name: "name", content: "Tên bến bãi", spanWidth: 120, placeholder: "Tên bến bãi", value: addBusStation.name
            },
            {
                id: 2, name: "description", content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả", value: addBusStation.description
            },
            {
                id: 3, name: "address", content: "Địa chỉ", spanWidth: 160, placeholder: "Địa chỉ", value: addBusStation.address
            }
        ]
    })


    const updateItemValue = (id, newValue) => {

        const updatedItem = itemAdd.item.map(item => {
            if (item.id === id) {
                setAddBusStation({ ...addBusStation, [item.name]: newValue })
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

    const [province, setProvince] = useState(
        [
            {
                id: 0, name: "Chọn tỉnh", isChoose: true,
            },
            {
                id: 1, name: "Khánh Hòa", isChoose: false,
                district: [

                    {
                        id: 3, name: "Vạn Ninh", isChoose: true,
                        commune: [
                            {
                                id: 3, name: "Vạn Phú", isChoose: true,
                            },
                            {

                                id: 3, name: "Vạn Khánh", isChoose: false,
                            }
                        ]
                    },
                    {
                        id: 4, name: "Ninh Hòa", isChoose: false,
                        commune: [
                            {
                                id: 3, name: "Ninh Ích", isChoose: true,
                            },
                            {

                                id: 3, name: "Ninh Diêm", isChoose: false,
                            }
                        ]
                    },

                ]
            },
            {
                id: 2, name: "Vĩnh Long", isChoose: false,
                district: [
                    {
                        id: 3, name: "Vĩnh Mõ", isChoose: true,
                        commune: [
                            {
                                id: 3, name: "Vĩnh Bắc", isChoose: true,
                            },
                            {

                                id: 3, name: "Vĩnh Nam", isChoose: false,
                            }
                        ]
                    },
                    {
                        id: 4, name: "Vĩnh Hồ", isChoose: false,
                        commune: [
                            {
                                id: 3, name: "Vĩnh Lợi", isChoose: true,
                            },
                            {

                                id: 3, name: "Vĩnh Hằng", isChoose: false,
                            }
                        ]
                    },

                ]
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
                <PopupAddBusStation objectAdd={addBusStation} item={itemAdd} province={province} onChange={updateItemValue} success={success} emtyItemValue={emtyItemValue}></PopupAddBusStation>
                {/* <PopupAdd objectAdd={addBusStation} item={itemAdd} onChange={updateItemValue} success={success} emtyItemValue={emtyItemValue}></PopupAdd> */}
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