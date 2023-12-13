
import { useState, useEffect } from "react";
import UserAccountRow from "../../components/Layout/Components/Admin/manageAccountUser/UserAccountRow";
import Paginate from "../../components/Layout/Components/Paginate"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as CustomerServices from "../../services/CustomerServices"
const ManageUserAccount = () => {
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(userAccount);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'exported_data.xlsx');
    };

    const [userAccount, setUserAccount] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await CustomerServices.GetAll();
                setLoading(false)
                if (!response.isError)
                    setUserAccount(response.data.items)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
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
                <input placeholder="Tìm kiếm" class='col-start-4 col-span-5 bg-[#e1e1e1] outline-none border-none p-sm rounded-md'></input>
                <button class="flex justify-center" onClick={exportToExcel}>
                    <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                    </FontAwesomeIcon>
                </button>
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
                    {loading ?
                        <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">

                        </div>

                        :
                        !loading && userAccount.length != 0 ?
                            < Paginate itemsPerPage={5} items={userAccount} componentToRender={UserAccountRow} updateStatus={changeStatus} />
                            :
                            "Không có người dùng nào"

                    }
                </tbody>
            </table>

        </div >
    );
}

export default ManageUserAccount;