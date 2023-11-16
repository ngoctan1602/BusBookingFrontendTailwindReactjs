
import { useState } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import CompanyRow from "../../components/Layout/Components/Admin/manageCompany/CompanyRow";
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
const ManageCompany = () => {

    const [company, setCompany] = useState(
        [
            {
                companyID: 1,
                name: "Phương Trang",
                logo: "https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg",
                status: 1,
                introduction: "Đi đâu cũng thấy Đi đâu cũng thấy Đi đâu cũng thấy Đi đâu cũng thấy Đi đâu cũng thấy Đi đâu cũng thấy",
                email: "tannt31n29@gmail.com",
                phoneNumber: "092312493",
                dateUpdate: new Date(2023, 2, 29),
                dateCreate: new Date(2023, 2, 29),
            },
            {
                companyID: 2,
                name: "Liên Hưng",
                logo: "https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg",
                status: 0,
                introduction: "Đi đâu cũng thấy",
                email: "tannt13n23139@gmail.com",
                phoneNumber: "0921140493",
                dateUpdate: new Date(2023, 2, 29),
                dateCreate: new Date(2023, 2, 29),
            },
            {
                companyID: 3,
                name: "Quang Hạnh",
                logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawy7Qu4yLmLx2k0iPfywN-cjz3dRVJ9TcPft-1Gtq&s",
                status: 1,
                introduction: "Đi đâu cũng thấy",
                email: "tanntn29212@gmail.com",
                phoneNumber: "0443140493",
                dateUpdate: new Date(2023, 2, 29),
                dateCreate: new Date(2023, 2, 29),
            },
            {
                companyID: 4,
                name: "Phương Trang",
                logo: "https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg",
                status: 1,
                introduction: "Đi đâu cũng thấy",
                email: "tannt31n29@gmail.com",
                phoneNumber: "092312493",
                dateUpdate: new Date(2023, 2, 29),
                dateCreate: new Date(2023, 2, 29),
            },
            {
                companyID: 5,
                name: "Liên Hưng",
                logo: "https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg",
                status: 0,
                introduction: "Đi đâu cũng thấy",
                email: "tannt13n23139@gmail.com",
                phoneNumber: "0921140493",
                dateUpdate: new Date(2023, 2, 29),
                dateCreate: new Date(2023, 2, 29),
            },
            {
                companyID: 6,
                name: "Quang Hạnh",
                logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawy7Qu4yLmLx2k0iPfywN-cjz3dRVJ9TcPft-1Gtq&s",
                status: 1,
                introduction: "Đi đâu cũng thấy",
                email: "tanntn29212@gmail.com",
                phoneNumber: "0443140493",
                dateUpdate: new Date(2023, 2, 29),
                dateCreate: new Date(2023, 2, 29),
            },

        ]
    )
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(company);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'exported_data.xlsx');
    };



    // Hàm cập nhật trạng thái item
    const changeStatus = (id, value) => {
        const updatedItems = company.map(item => {
            if (item.companyID === id) {
                return { ...item, status: value };
            }

            return { ...item };

        });
        setCompany(updatedItems);
    }

    return (
        <div class='w-full text-txt txt-16'>

            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <p class='col-span-2 font-bold text-20'>Quản lý nhà xe</p>
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
                        <th class='col-span-2'>Tên</th>
                        <th class='col-span-1'>Logo</th>
                        <th class='col-span-2'>Email</th>
                        <th class='col-span-2 pl-sm'>Số điện thoại</th>
                        <th class='col-span-1'>Ngày tạo</th>
                        <th class='col-span-2'>Trạng thái</th>
                        <th class='col-span-1'></th>
                    </tr>
                </thead>
                <tbody class='bg-[#e1e1e1]'>
                    <Paginate itemsPerPage={5} items={company} componentToRender={CompanyRow} updateStatus={changeStatus}/* emtyItemValue={emtyItemValue} */></Paginate>
                </tbody>
            </table>

        </div>
    );
}

export default ManageCompany;