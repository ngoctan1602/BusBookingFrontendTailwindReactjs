
import { useState, useEffect } from "react";
import UserAccountRow from "../../components/Layout/Components/Admin/manageAccountUser/UserAccountRow";
import Paginate from "../../components/Layout/Components/Paginate"
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as CustomerServices from "../../services/CustomerServices"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
const ManageUserAccount = () => {
    const [updateLoading, setUpdateLoading] = useState(false)
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(userAccount);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'exported_data.xlsx');
    };
    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const [userAccount, setUserAccount] = useState([])
    const [loading, setLoading] = useState(false);
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
    useEffect(() => {

        fetchData();
    }, []);
    // Hàm cập nhật trạng thái item
    const updateStatus = (id, value) => {
        setUpdateLoading(true)
        try {
            if (value === 1) {

                const resp = CustomerServices.changeIsActive({ customerId: id });
                console.log(resp)
                setUpdateLoading(false)
                if (!resp.isError) {
                    notifySuccess("Cập nhật trạng thái thành công")
                    setTimeout(
                        () =>
                            fetchData()
                        , 2000
                    )
                }
                else {
                    notifyError("Cập nhật trạng thái thất bại")
                }
            }
            else if (value === 4) {
                const resp = CustomerServices.changeIsLock({ customerId: id });
                setUpdateLoading(false)
                console.log(resp)
                if (!resp.isError) {
                    notifySuccess("Cập nhật trạng thái thành công")
                    setTimeout(
                        () =>
                            fetchData()
                        , 2000
                    )
                }
                else {
                    notifyError("Cập nhật trạng thái thất bại")
                }
            }
            else if (value === 0) {
                const resp = CustomerServices.changeIsDelete({ customerId: id });
                setUpdateLoading(false)
                console.log(resp)
                if (!resp.isError) {
                    notifySuccess("Cập nhật trạng thái thành công")
                    setTimeout(
                        () =>
                            fetchData()
                        , 2000
                    )
                }
                else {
                    notifyError("Cập nhật trạng thái thất bại")
                }
            }
        } catch (error) {
            console.log(error)
        }

        console.log(id, value)

    }


    return (
        <div class='w-full text-txt txt-16 mt-[20px]'>

            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <p class='col-span-3 font-black uppercase text-20'>Quản lý tài khoản người dùng</p>
                <input placeholder="Tìm kiếm" class='col-start-4 col-span-5 bg-bg outline-none border-none p-sm rounded-md'></input>
                <button class="flex justify-center" onClick={exportToExcel}>
                    <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                    </FontAwesomeIcon>
                </button>
            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden shadow-2xl">
                <thead className="border-b-2">
                    <tr class='grid bg-bg grid-cols-11 p-sm text-left gap-md'>
                        <th class='col-span-2'>Username</th>
                        <th class='col-span-2'>Họ và tên</th>
                        <th class='col-span-2'>Ảnh đại diện</th>
                        <th class='col-span-2'>Email</th>
                        <th class='col-span-2'>Trạng thái</th>
                        <th class='col-span-1'>Thao tác</th>
                    </tr>
                </thead>
                <tbody class='bg-bg relative'>
                    {
                        updateLoading &&
                        <div class='absolute bg-hover-txt w-[100%] h-[200px] z-20 opacity-40'>
                            <ReactLoading
                                type="spinningBubbles" color="#e1e1e1"
                                height={'10%'} width={'10%'}
                                className="absolute left-[45%] top-[20%]  "
                            />
                        </div>
                    }
                    {

                        loading ?
                            <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">

                            </div>

                            :
                            !loading && userAccount.length != 0 ?
                                < Paginate itemsPerPage={5} items={userAccount} componentToRender={UserAccountRow} updateStatus={updateStatus} />
                                :
                                "Không có người dùng nào"

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
        </div >
    );
}

export default ManageUserAccount;