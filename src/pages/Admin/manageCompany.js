
import { useState, useEffect } from "react";
import Paginate from "../../components/Layout/Components/Paginate"
import CompanyRow from "../../components/Layout/Components/Admin/manageCompany/CompanyRow";
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as CompanySV from "../../services/CompanySV"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
const ManageCompany = () => {

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
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await CompanySV.GetAllCompany({ pageSize: 200 });
            setLoading(false)
            if (!response.isError)
                setCompany(response.data.items)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(company);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'exported_data.xlsx');
    };




    const changeStatus = (id, value) => {
        const updatedItems = company.map(item => {
            if (item.companyID === id) {
                return { ...item, status: value };
            }

            return { ...item };

        });
        setCompany(updatedItems);
    }
    const [updateLoading, setUpdateLoading] = useState(false)

    const updateStatus = (id, value) => {
        setUpdateLoading(true)
        try {
            if (value === 1) {

                const resp = CompanySV.ChangIsActive({ id: id });
                console.log(resp)
                if (!resp.isError) {
                    setUpdateLoading(false)
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
                const resp = CompanySV.ChangeIsLock({ id: id });
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
                const resp = CompanySV.Delete({ id: id });
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
        <div class='w-full text-txt txt-16'>

            <div class='grid grid-cols-9 grid-flow-row gap-4 items-center'>
                <p class='col-span-2 font-bold text-20'>Quản lý nhà xe</p>
                {/* <input placeholder="Tìm kiếm" class='
                shadow-lg
                col-start-4 col-span-5 bg-[#e1e1e1] outline-none border-none p-sm rounded-md'></input> */}
                {/* <button class="flex justify-center" onClick={exportToExcel}>
                    <FontAwesomeIcon icon={faFileExcel} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'>
                    </FontAwesomeIcon>
                </button> */}
            </div>
            <table class="w-full my-md rounded-md border-collapse  text-txt-gray text-16 overflow-hidden">
                <thead>
                    <tr class='grid bg-bg grid-cols-12 p-sm text-center gap-md border-b-2'>
                        {/* <th class='col-span-1'>Id</th> */}
                        <th class='col-span-3'>Tên</th>
                        <th class='col-span-2'>Logo</th>
                        <th class='col-span-2'>Email</th>
                        {/* <th class='col-span-2'>Giới thiệu</th> */}
                        <th class='col-span-2 pl-sm'>Số điện thoại</th>
                        <th class='col-span-2'>Trạng thái</th>
                        <th class='col-span-1'></th>
                    </tr>
                </thead>
                <tbody class='bg-bg'>

                    {loading ?
                        <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">

                        </div>

                        :
                        !loading && company.length != 0 ?
                            <Paginate itemsPerPage={5} items={company} componentToRender={CompanyRow} updateStatus={updateStatus}/* emtyItemValue={emtyItemValue} */></Paginate>
                            :
                            "Không có nhà xe nào"

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

export default ManageCompany;