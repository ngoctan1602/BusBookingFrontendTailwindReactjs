
import { useState } from "react";
import UserAccountRow from "../../components/Layout/Components/Admin/manageAccountUser/UserAccountRow";
import Paginate from "../../components/Layout/Components/Paginate"

const ManageUserAccount = () => {

    const [userAccount, setUserAccount] = useState(
        [
            {
                username: "tanntn29",
                status: 1,
                fullName: "Nguyễn Thái Ngọc Tân",
                dateOfBirth: new Date(2022, 2, 29),
                address: "Tân Phú, Vạn Phú, Vạn Ninh, Khánh Hòa",
                email: "tanntn29@gmail.com",
                gender: "Nam",
                dateCreate: new Date(2022, 2, 29),
                dateUpdate: new Date(2022, 2, 29),
                avatar: "https://inkythuatso.com/uploads/thumbnails/800/2022/06/hinh-anh-dep-ve-du-lich-viet-nam-cho-dien-thoai-1-inkythuatso-08-14-13-02.jpg"
            },
            {
                username: "tanntn292002",
                status: 1,
                fullName: "Nguyễn Thái Ngọc Phước",
                dateOfBirth: new Date(2023, 2, 31),
                address: "Tân Phú, Vạn Phú, Vạn Ninh, Khánh Hòa",
                email: "tanfantn29@gmail.com",
                gender: "Nam",
                dateCreate: new Date(2022, 2, 29),
                dateUpdate: new Date(2022, 2, 29),
                avatar: "https://inkythuatso.com/uploads/thumbnails/800/2022/06/hinh-anh-dep-ve-du-lich-viet-nam-cho-dien-thoai-1-inkythuatso-08-14-13-02.jpg"
            }


        ]
    )
    // Hàm cập nhật trạng thái item
    const changeStatus = (username, value) => {
        const updatedItems = userAccount.map(item => {
            if (item.username === username) {
                return { ...item, status: value };
            }

            return { ...item };

        });
        setUserAccount(updatedItems);
    }

    return (
        <div class='w-full text-txt txt-16'>

            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <p class='col-span-3 font-bold text-20'>Quản lý tài khoản người dùng</p>
                <input placeholder="Tìm kiếm" class='col-span-6 bg-[#e1e1e1] outline-none border-none p-sm rounded-md'></input>
            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden">
                <thead>
                    <tr class='grid bg-button grid-cols-11 p-sm text-left gap-md'>
                        <th class='col-span-2'>Username</th>
                        <th class='col-span-2'>Họ và tên</th>
                        <th class='col-span-2'>Ảnh đại diện</th>
                        <th class='col-span-2'>Email</th>
                        <th class='col-span-2'>Trạng thái</th>
                        <th class='col-span-1'>Thao tác</th>
                    </tr>
                </thead>
                <tbody class='bg-[#e1e1e1]'>
                    <Paginate itemsPerPage={5} items={userAccount} componentToRender={UserAccountRow} updateStatus={changeStatus}></Paginate>
                </tbody>
            </table>

        </div>
    );
}

export default ManageUserAccount;