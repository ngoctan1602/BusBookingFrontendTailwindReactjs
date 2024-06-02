import { useCallback, useEffect, useState } from "react";
import adminlogo from "../../assets/images/AdminLogo.png"
import InputConfirmInfo from "../../components/Layout/Components/InputConfirmInfo";
import { Link, useNavigate } from "react-router-dom";
import * as CompanySV from "../../services/CompanySV";
import * as AddressSV from "../../services/AddressSv"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupOTP from "../../components/Layout/Components/PopupOTP";
import ImageUploadPopup from '../../components/Layout/Components/ImagePopup';
const CompanyRegister = () => {
    const navigate = useNavigate();
    document.title = "Đăng ký trở thành nhà xe"


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

    const notifyError = () => toast.error('Đăng nhập thất bại! Nhập đúng tài khoản và mật khẩu', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyWarning = (message) => toast.warning(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const [provinces, setProvinces] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AddressSV.getAllProvinces();

                setProvinces(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const [idWard, setIdWard] = useState(0);
    const [idDistrict, setIdDistrict] = useState(0);
    const [idProvince, setIdProvince] = useState(0);

    const [districts, setDistricts] = useState([]);
    const getDistricts = useCallback(async (id) => {
        if (id !== 0) {
            const a = {
                id: id
            }
            const response = await AddressSV.getDistricts(a);
            setDistricts(response.data.districts)
            setWards([]);
            setIdDistrict(0);
            setIdWard(0);
            setIdProvince(id);
        }
        else {
            setDistricts([])
            setWards([])
        }
    })

    const [wards, setWards] = useState([]);
    const getWards = useCallback(async (id) => {

        const a = {
            id: id
        }
        setIdDistrict(id);
        setIdWard(0);
        const response = await AddressSV.getWards(a);
        setWards(response.data.wards)
    })

    const getIdWard = useCallback((id) => {
        setIdWard(id);
    }, [idWard])


    const onSubmit = async (e) => {
        // e.preventDefault();

        if (account.name === '' || account.name === null || account.name === undefined) {
            notifyWarning("Hãy nhập tên nhà xe")
            return
        }
        if (account.introduction === '' || account.introduction === null || account.introduction === undefined) {
            notifyWarning("Hãy nhập mô tả")
            return
        }
        if (account.email === '' || account.email === null || account.email === undefined) {
            notifyWarning("Hãy nhập email")
            return
        }
        if (account.phoneNumber === '' || account.phoneNumber === null || account.phoneNumber === undefined) {
            notifyWarning("Hãy nhập số điện thoại")
            return
        }
        if (account.username === '' || account.password === null || account.password === undefined) {
            notifyWarning("Hãy nhập username")
            return
        }
        if (account.password === '' || account.password === null || account.password === undefined) {
            notifyWarning("Hãy nhập passowrd")
            return
        }
        if (account.address === '' || account.address === null || account.address === undefined) {

            notifyWarning("Hãy nhập số nhà/ thôn/ địa chỉ")
            return
        }
        if (idWard === 0) {
            notifyWarning("Hãy chọn địa chỉ")
        }
        try {
            const object = { ...account, wardId: idWard }
            const response = await CompanySV.Register(object)
            if (!response.isError) {

                notifySuccess("Đã gửi yêu cầu tạo tài khoản, vui lòng liên hệ người quản trị để xác nhận tài khoản")
                setTimeout(() => {
                    navigate('/company/login');
                }, 1500);
            }
            else {
                notifyError()
            }
        } catch (error) {
            notifyError()
        }
    }


    const onChange = (id, value) => {
        const updatedItems = item.map(item => {
            if (item.id === id) {
                setAccount({ ...account, [item.id]: value })
                return { ...item, value: value };
            }
            return { ...item };
        });
        setItem(updatedItems)
    }

    const onChangeShowPassword = (isShow) => {
        const updatedItems = item.map(item => {
            if (item.id === "password" && isShow) {
                return { ...item, type: "password" };
            }
            if (item.id === "password" && !isShow) {
                return { ...item, type: "text" };
            }
            return { ...item };
        });
        setItem(updatedItems)
    }
    const [account, setAccount] = useState(
        {
            name: '',
            introduction: '',
            email: '',
            phoneNumber: '',
            username: '',
            password: '',
            address: '',
            wardId: 0,
            logo: null
        }
    )
    const [item, setItem] = useState(
        [
            {
                id: "name",
                content: "Tên nhà xe:",
                type: "text",
                placeholder: "Nhập tên nhà xe",
                value: account.name,
                spanWidth: 140,
                background: "#e1e1e1"
            },
            {
                id: "introduction",
                content: "Giới thiệu:",
                type: "text",
                placeholder: "Nhập mô tả",
                value: account.introduction,
                spanWidth: 120,
                background: "#e1e1e1"
            },
            {
                id: "email",
                content: "Email",
                type: "text",
                placeholder: "Nhập email",
                value: account.email,
                spanWidth: 100,
                background: "#e1e1e1"
            },
            {
                id: "phoneNumber",
                content: "Số điện thoại",
                type: "number",
                placeholder: "Nhập số điện thoại",
                value: account.phoneNumber,
                spanWidth: 160,
                background: "#e1e1e1"
            },
            {
                id: "username",
                content: "Tên đăng nhập:",
                type: "text",
                placeholder: "Nhập tên đăng nhập",
                value: account.username,
                spanWidth: 170,
                background: "#e1e1e1"
            },
            {
                id: "password",
                content: "Mật khẩu:",
                type: "password",
                pw: "password",
                placeholder: "Nhập mật khẩu",
                value: account.password,
                spanWidth: 150,
                background: "#e1e1e1"
            },
            {
                id: "address",
                content: "Thôn/Số nhà/Đường",
                type: "text",
                placeholder: "Nhập Thôn/Số nhà/ Đường",
                value: account.address,
                spanWidth: 250,
                background: "#e1e1e1"
            },
        ]
    );
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);

    const handleImageUpload = (file) => {
        // Xử lý file hình ảnh ở đây, ví dụ: tải lên server, lưu trữ URL, vv.
        console.log('File uploaded:', file);
    };


    return (
        <div class='w-full h-[100vh] bg-gradient-to-br from-button to-[#B0D9B1] flex justify-center items-center'>
            {/* <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button type="button" onClick={open}>
                    Open
                </button>
            </div> */}
            {/* <div>
                <button onClick={() => setImagePopupOpen(true)}>Mở popup thêm hình ảnh</button>
                <ImageUploadPopup isOpen={isImagePopupOpen} onClose={() => setImagePopupOpen(false)} onImageUpload={handleImageUpload} />
            </div> */}

            <div class='w-[70%] h-[90%] border-none shadow-2xl rounded-md overflow-auto flex bg-[#e1e1e1]'>
                <div class='w-[40%] h-[750px] bg-bgLogin bg-cover bg-no-repeat text-bg flex flex-col items-center'>
                    <img src={adminlogo} class='mt-md shrink-0 w-[100px] h-[100px] rounded-full'></img>
                    <p class='text-[30px] font-semibold shrink-0'>
                        Chào mừng quay trở lại !
                    </p>
                    <p class='text-18 shrink-0'>
                        Đăng ký trở thành nhà xe
                    </p>
                    <p class='text-16 m-md'>
                        Những chuyến đi dài của bạn hãy để chúng mình lo nhé.
                        Chỉ cần một cú click chuột mọi thứ đều trong tầm tay
                    </p>

                </div>

                <div class='w-[60%] h-[750px] text-txt flex items-center bg-[#e1e1e1]'>
                    <div class='w-full h-full items-center flex flex-col bg-[#e1e1e1] pb-md'>
                        <div class='w-full grid grid-flow-row grid-cols-10 gap-sm items-center my-sm'>
                            <p class='col-start-4 col-span-6 font-bold text-[20px] uppercase'>Đăng ký trở thành nhà xe</p>
                        </div>
                        {
                            item.map((item, index) => (
                                <div class='w-full grid grid-flow-row grid-cols-10 gap-sm items-center my-[4px]'>
                                    <p class='text-16 mx-md col-span-3 font-semibold'>{item.content} </p>
                                    <div class='col-span-6'>
                                        <InputConfirmInfo item={
                                            {
                                                type: item.type,
                                                placeholder: item.placeholder,
                                                value: item.value,
                                                spanWidth: item.spanWidth,
                                                id: item.id,
                                                pw: item.pw,
                                                background: "#e1e1e1"
                                            }}
                                            onChange={onChange}
                                            onChangeShowPassword={onChangeShowPassword}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                        <div className="w-[90%] grid grid-flow-row grid-cols-12 gap-sm items-center">
                            <select class='col-span-4 p-sm bg-[#e1e1e1] border-txt border-[1px] rounded-md my-md' onChange={(e) => getDistricts(Number(e.target.value))}>
                                <option value={0} selected={(idProvince === 0) ? true : false}>
                                    Chọn tỉnh
                                </option>
                                {
                                    provinces &&
                                    provinces.map((item, index) => (
                                        <option value={item.id} selected={(idProvince === item.id) ? true : false}>
                                            {item.fullName}
                                        </option>
                                    ))
                                }

                            </select>
                            <select class='col-span-4 col-start-5 mx-sm p-sm bg-[#e1e1e1] border-txt border-[1px] rounded-md my-md' onChange={(e) => getWards(e.target.value)}>
                                <option value={0} selected={idDistrict === 0 ? true : false}>Chọn huyện</option>
                                {
                                    districts && districts.map((item, index) => (
                                        <option value={item.id} selected={idDistrict === item.id ? true : false} >
                                            {item.fullName}
                                        </option>
                                    ))
                                }
                            </select>

                            <select class='col-span-4 col-start-9 p-sm bg-[#e1e1e1] border-txt border-[1px] rounded-md my-md' onChange={(e) => getIdWard(e.target.value)}>
                                <option value={0} selected={idWard === 0 ? true : false} >Chọn xã</option>
                                {
                                    wards &&
                                    wards.map((item, index) => (

                                        <option value={item.id} selected={idWard === item.id ? true : false}>
                                            {item.fullName}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div class='w-full grid grid-flow-row grid-cols-10 gap-sm items-center my-md'>
                            <button class='confirm-button col-start-4 col-span-6' onClick={onSubmit}>
                                Đăng ký
                            </button>

                        </div>
                        <div class='w-[90%] grid grid-flow-row grid-cols-10 gap-sm items-center my-md'>
                            <p className="col-span-5 col-start-4 italic text-[16px] ">

                                Bạn đã có tài khoản
                            </p>
                            <Link class='col-start-9 col-span-2 italic text-button text-[16px] 
                            hover:text-txt 
                            ' to={'/company/login'}>
                                Đăng nhập
                            </Link>

                        </div>


                    </div>



                </div>
            </div>

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

export default CompanyRegister;