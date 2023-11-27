
import { useState } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import OrderRow from "../../components/Layout/Components/Company/OrderRow";
const ManageOrder = () => {

    const [order, setOrder] = useState(
        [
            {
                billId: 1,
                busNumber: "VG1233344",
                stationStart: "Vạn Giã, Vạn Ninh, Khánh Hòa",
                stationEnd: "Nông Lâm, Thủ Đức, TP.HCM",
                dateDeparture: new Date(2023, 2, 29),
                email: "tannt31n29@gmail.com",
                phoneNumber: "092312493",
                dateUpdate: new Date(2023, 2, 29),
                dateCreate: new Date(2023, 2, 29),
                fullName: "Nguyễn Thái Ngọc Tân",
                seats: [
                    {
                        id: 1, name: "A1"
                    },
                    {
                        id: 2, name: "A2"
                    },
                ],
                status: 1
            },
            {
                billId: 2,
                busNumber: "VG1233344",
                stationStart: "https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg",
                stationEnd: 1,
                dateDeparture: new Date(2023, 2, 29),
                email: "tannt31n29@gmail.com",
                phoneNumber: "092312493",
                dateUpdate: new Date(2023, 2, 29),
                dateCreate: new Date(2023, 2, 29),
                fullName: "Nguyễn Thái Ngọc Tân",
                seats: [
                    {
                        id: 1, name: "A1"
                    },
                    {
                        id: 2, name: "A2"
                    },
                ],
                status: 2
            },
        ]
    )
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(order);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'exported_data.xlsx');
    };



    // Hàm cập nhật trạng thái item
    // const changeStatus = (id, value) => {
    //     const updatedItems = company.map(item => {
    //         if (item.companyID === id) {
    //             return { ...item, status: value };
    //         }

    //         return { ...item };

    //     });
    //     setCompany(updatedItems);
    // }

    return (
        <div class='w-full text-txt txt-16'>

            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <p class='col-span-2 font-bold text-20'>Quản lý đơn hàng</p>
                <input placeholder="Tìm kiếm" class='col-start-4 col-span-5 bg-[#e1e1e1] outline-none border-none p-sm rounded-md'></input>
                <button class="flex justify-center" onClick={exportToExcel}>
                    <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                    </FontAwesomeIcon>
                </button>
            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden">
                <thead>
                    <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                        <th class='col-span-1'>Id</th>
                        <th class='col-span-1'>Biển số xe</th>
                        <th class='col-span-2'>Tên khách hàng</th>
                        <th class='col-span-2'>Email</th>
                        <th class='col-span-1 text-center'>Ngày đi</th>
                        <th class='col-span-2 text-center'>Số ghế</th>
                        <th class='col-span-2'>Trạng thái</th>
                        <th class='col-span-1'></th>
                    </tr>
                </thead>
                <tbody class='bg-[#e1e1e1]'>
                    <Paginate itemsPerPage={5} items={order} componentToRender={OrderRow} /*updateStatus={changeStatus} */></Paginate>

                </tbody>
            </table>

        </div>
    );
}

export default ManageOrder;