
import InputConfirmInfo from "../../components/Layout/Components/InputConfirmInfo";
import { useCallback, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Dropzone from 'react-dropzone'
import Input from "../../components/Layout/Components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faPhone, faShieldBlank } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import * as addressService from "../../services/AddressService"
import * as customerServices from "../../services/CustomerServices";
import avatarDefault from '../../assets/images/avatar.png'
import * as AddressSV from "../../services/AddressSv"
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import * as authServices from "../../services/AuthServices";



import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Info = () => {

    const notifySuccess = () => toast.success('Đăng nhập thành công', {
        position: "bottom-right",
        autoClose: 1500,
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
        const a = {
            id: id
        }
        const response = await AddressSV.getDistricts(a);
        setDistricts(response.data.districts)
        setWards([]);
        setIdDistrict(0);
        setIdWard(0);
        setIdProvince(id);
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

    const [error, setError] = useState('')
    const [customer, setCustomer] = useState({
        avatar: '',
        fullName: '',
        dateOfBirth: '',
        address: '',
        email: '',
        phoneNumber: '',
        gender: '',
        dateCreate: '',
        roleName: '',
        username: '',
        rank: '',
        wardId: '',
        addressResponse: {}
    });

    const [updateCustomer, setUpdateCustomer] = useState(
        {
            fullName: '',
            dateOfBirth: '',
            address: '',
            email: '',
            phoneNumber: '',
            gender: '',
            wardId: '',
        }
    )

    console.log(updateCustomer)
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await customerServices.GetProfile();
                if (!response.isError) {
                    setCustomer(response.data)
                    Object.keys(updateCustomer).forEach(prop => {
                        // Use the current property (prop) to update the corresponding property in updateCustomer
                        setUpdateCustomer(prevState => ({
                            ...prevState,
                            [prop]: response.data[prop]
                        }));
                    });
                    setIdProvince(response.data.addressResponse.provinceId)

                    await getDistricts(response.data.addressResponse.provinceId)
                    setIdDistrict(response.data.addressResponse.districtId)

                    await getWards(response.data.addressResponse.districtId)
                    setIdWard(response.data.addressResponse.wardId)
                    setError('')
                }
                else {
                    setError(response.data)
                }
            }
            catch (err) {
                setError(err.message)
            }
            setLoading(false)
        };
        fetchData();
    }, [])

    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };


    const [birthDate, setBirthDate] = useState("2023-09-16");

    const [idGender, setIdGender] = useState(1);
    const [gender, setGender] = useState([
        {
            id: 1, name: "gender", type: "radio", content: "Nam", isChoose: false
        },
        {
            id: 2, name: "gender", type: "radio", content: "Nữ", isChoose: true
        },
        {
            id: 3, name: "gender", type: "radio", content: "Khác", isChoose: false
        }
    ])

    useEffect(() => {
        const updatedItems = gender.map(item => {
            if (item.id === idGender) {

                return { ...item, isChoose: true };

            }
            return { ...item, isChoose: false };
        });
        setGender(updatedItems);
    }, [idGender]
    )

    const changeIdGender = (id) => {
        setIdGender(id)
    }


    const changeBirthDate = (value) => {
        setBirthDate(value);
    }

    const onChangeCustomer = (name, value) => {
        setUpdateCustomer({ ...updateCustomer, [name]: value })
    }
    // const updateLoading = (loading) => {
    //     setLoading(loading)
    // }
    const updateProfile = async () => {
        setLoading(true);
        try {
            const response = await customerServices.UpdateProfile(updateCustomer)
            if (!response.isError && response.isError !== undefined && response !== undefined) {
                setCustomer(response.data)
            }
            else {
                setError(response.data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const updatePassword = async () => {
        setLoading(true);
        try {
            const response = await authServices.resetPass(updateCustomer)
            if (!response.isError && response.isError !== undefined && response !== undefined) {
                setCustomer(response.data)
            }
            else {
                setError(response.data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    return (
        <div class='w-full h-full flex border-none outline-none  rounded-lg overflow-hidden relative'>
            {
                loading &&
                <div class='absolute bg-hover-txt w-[100%] h-full z-20 opacity-10'>
                    <ReactLoading
                        type="spinningBubbles" color="black"
                        height={'5%'} width={'5%'}
                        className="absolute left-1/2 top-[10%]  "
                    />
                </div>
            }
            <div class='w-1/2 shrink-0 bg-[#e1e1e1] '>
                <p class='font-bold m-md'>Thông tin cá nhân</p>
                <div class='flex my-lg items-center mx-md'>
                    <div class='w-[100px] h-[80px] shrink-0  overflow-hidden z-1 relative '>
                        {
                            !loading &&
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img src={customer.avatar === null ? avatarDefault : customer.avatar}
                                class=' w-[80px] h-[80px] object-cover rounded-full'></img>
                        }
                        {/* <input type={type} class='bg-[black]  z-10 cursor-pointer w-[10px] h-[10px] absolute right-[0px] bottom-[20%]' onFocus={() => setType("file")}></input> */}
                    </div>
                    {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone> */}

                    <div class='grid grid-cols-8 w-[700px]'>
                        <div class='col-span-6 shrink-0'>
                            {
                                !loading &&
                                <InputConfirmInfo onChange={onChangeCustomer}
                                    item={{
                                        placeholder: "Họ và tên",
                                        value: updateCustomer.fullName, spanWidth: 80, type: "text", background: "#e1e1e1",
                                        name: "fullName"
                                    }}></InputConfirmInfo>
                            }
                        </div>
                    </div>
                </div>
                {/* Đây là phần ngày sinh */}
                {/* <div class='flex items-center mx-md my-xl'>
                    <p class='text-16 w-[100px] shrink-0'>Ngày sinh</p>
                    <div class='widthDate shrink-0'>
                        {customer.dateOfBirth !== null &&
                        <InputConfirmInfo item={{ type: "date", value:customer.dateOfBirth.split('T', [1]), background: "#e1e1e1" }} onChange={changeBirthDate}></InputConfirmInfo>}
                    </div>
                </div> */}
                {/* Đây là phần giới tính */}
                <div class='flex items-center mx-md my-xl'>
                    <p class='text-16 w-[100px] shrink-0'>Giới tính</p>
                    {
                        !loading &&
                        <p className='text-13'>
                            {customer.gender === "male" ? "Nam" : "Nữ"}
                        </p>
                        // gender.map((item, index) => (
                        //     <Input id={item.id} name={item.name} type="radio" content={item.content} onChange={changeIdGender} checked={item.isChoose}></Input>
                        // ))
                    }
                </div>

                <div className=" relative w-content outline-none p-sm shadow-lg ml-sm mb-sm h-[300px] grid-cols-10 grid-rows-10 grid grid-flow-row border-[1px] border-txt rounded-md">
                    {/* <div className=" ml-md col-span-10 grid grid-cols-10 mt-md ">

                        <p className="col-span-2 ">Địa chỉ</p>
                        <div className="col-span-7">
                            {
                                !loading &&
                                <InputConfirmInfo onChange={onChangeCustomer}
                                    item={{
                                        placeholder: "Địa chỉ",
                                        value: updateCustomer.address, spanWidth: 80, type: "text", background: "#e1e1e1",
                                        name: "address"
                                    }}></InputConfirmInfo>
                            }
                        </div>
                    </div> */}
                    <p className="absolute z-10 bg-bgPopup top-[-12px] pr-md left-[6px]">Địa chỉ</p>
                    <div className="col-span-7 col-start-3 ml-sm">
                        {
                            !loading &&
                            <InputConfirmInfo onChange={onChangeCustomer}
                                item={{
                                    placeholder: "Địa chỉ",
                                    value: updateCustomer.address, spanWidth: 80, type: "text", background: "#e1e1e1",
                                    name: "address"
                                }}></InputConfirmInfo>
                        }
                    </div>
                    {/* <div className="col-start-4 col-span-8 grid-flow-row grid grid-cols-12 ml-[-50px] bg-button"> */}
                    <select class='
                    row-start-2 col-span-7 col-start-3 mt-[-20px] ml-md pl-sm bg-[#e1e1e1] border-txt border-[1px] rounded-md mb-md' onChange={(e) => getDistricts(e.target.value)}>
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
                    <select class='col-start-3  col-span-7 ml-md pl-sm bg-[#e1e1e1] border-txt border-[1px] rounded-md mb-md' onChange={(e) => getWards(e.target.value)}>
                        <option value={0} selected={idDistrict === 0 ? true : false}>Chọn huyện</option>
                        {
                            districts && districts.map((item, index) => (
                                <option value={item.id} selected={idDistrict === item.id ? true : false} >
                                    {item.fullName}
                                </option>
                            ))
                        }
                    </select>

                    <select class='col-start-3 col-span-7 ml-md  pl-sm bg-[#e1e1e1] border-txt border-[1px] rounded-md mb-lg' onChange={(e) => {
                        getIdWard(e.target.value);
                        onChangeCustomer("wardId", e.target.value)
                    }}>
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
                    {/* </div> */}
                </div>

                <div class='flex w-full justify-center mr-xl'>
                    <button class='button-hover'
                        onClick={updateProfile}
                    >
                        Lưu thay đổi</button>
                </div>
            </div>

            {/* <div class='w-[1px] h-[full] border-none outline-none bg-[#e1e1e1] flex items-center'>
                <span class='w-full h-search border-l-[1px] opacity-30'>

                </span>
            </div> */}


            <div class='w-1/2 shrink-0 bg-[#e1e1e1]'>
                <div class='flex flex-col '>
                    <p class='font-bold m-md'>Số điện thoại và email</p>
                    <div class='flex justify-between w-content'>

                        <div class='mx-md flex items-center text-txt text-16'>
                            <FontAwesomeIcon icon={faPhone} ></FontAwesomeIcon>
                            <p class='mx-md'>Số điện thoại <br />
                                {!loading &&
                                    customer.phoneNumber
                                }
                            </p>
                        </div>
                        <Popup trigger={<button class="confirm-button"> Cập nhật</button>} position="right center"
                           
                           modal
                            nested
                            closeOnDocumentClick={false}
                            {... { contentStyle }}
                        >
                            {
                                close => (

                                    <div class='p-md text-16 text-txt'>
                                        <p class='text-20 text-center font-bold'>Cập nhật số điện thoại</p>
            
                                        <div class='grid grid-cols-12 w-full grid-flow-row'>
                                            <p class='col-span-3 col-start-2 flex items-center justify-center '>Số điện thoại</p>
                                            <div class='col-span-7'>

                                                <InputConfirmInfo
                                                    onChange={onChangeCustomer}
                                                    item={{
                                                        type: "text", placeholder: "Nhập số điện thoại",
                                                        name: "phoneNumber",
                                                        value: updateCustomer.phoneNumber, spanWidth: 140, background: "#e1e1e1"
                                                    }}></InputConfirmInfo>
                                            </div>
                                        </div>

                                        <div class='grid grid-cols-12 w-full grid-flow-row'>
                                            <button class='col-span-3  col-start-5 confirm-button'
                                                onClick={updateProfile}
                                            >Xác nhận</button>
                                            <button class='col-span-3 col-start-9 confirm-button' onClick={close}>Hủy</button>
                                        </div>
                                    </div>
                                )
                            }
                        </Popup>
                    </div>
                    <div class='w-content h-[1px] bg-txt m-md opacity-30'></div>
                    <div class='flex justify-between w-content'>

                        <div class='mx-md flex items-center text-txt text-16'>
                            <FontAwesomeIcon icon={faEnvelope} ></FontAwesomeIcon>
                            <p class='mx-md'>Email <br />
                                {
                                    !loading &&
                                    customer.email
                                }
                            </p>
                        </div>
                        <Popup trigger={<button class="confirm-button"> Cập nhật</button>} position="right center"
                            modal
                            nested
                            closeOnDocumentClick={false}
                            {... { contentStyle }}
                        >
                            {
                                close => (

                                    <div class='p-md text-16 text-txt'>
                                        <p class='text-20 text-center font-bold'>Cập nhật email</p>
            
                                        {/* <div class='flex items-center justify-center'>
                                            <p class='w-[60px] shrink-0'>Email</p>
                                            <div class='w-1/2'>

                                                <InputConfirmInfo item={{ type: "text", placeholder: "Nhập email", value: customer.email, spanWidth: 90, background: "#e1e1e1" }}></InputConfirmInfo>
                                            </div>
                                        </div> */}
                                        <div class='grid grid-cols-12 w-full grid-flow-row'>
                                            <p class='col-span-3 col-start-2 flex items-center justify-center '>Email</p>
                                            <div class='col-span-7'>

                                                <InputConfirmInfo
                                                    onChange={onChangeCustomer}
                                                    item={{
                                                        type: "text", placeholder: "Email",
                                                        name: "email",
                                                        value: updateCustomer.email, spanWidth: 60, background: "#e1e1e1"
                                                    }}></InputConfirmInfo>
                                            </div>
                                        </div>
                                        <div class='flex justify-center my-md'>
                                            <button class='w-[100px] shrink-0 confirm-button mx-md' onClick={updateProfile}>Xác nhận</button>
                                            <button class='w-[100px] shrink-0 confirm-button' onClick={close}>Hủy</button>
                                        </div>
                                    </div>
                                )
                            }
                        </Popup>
                    </div>
                </div>

                <div class='flex flex-col my-lg '>
                    <p class='font-bold m-md'>Bảo mật</p>
                    <div class='flex justify-between w-content'>

                        <div class='mx-md flex items-center text-txt text-16'>
                            <FontAwesomeIcon icon={faLock} ></FontAwesomeIcon>
                            <p class='mx-md'>Đổi mật khẩu</p>
                        </div>

                        <Popup trigger={<button class="confirm-button">Cập nhật</button>} position="right center"
                            modal
                            nested
                            closeOnDocumentClick={false}
                            {... { contentStyle }}
                        >
                            {
                                close => (

                                    <div class='p-md text-16 text-txt'>
                                        <p class='text-20 text-center font-bold'>  Thay đổi mật khẩu</p>
            
                                        <div class='flex items-center'>
                                            <p class='w-[150px] shrink-0'>Mật khẩu cũ</p>
                                            <div class='w-1/2'>

                                                <InputConfirmInfo item={{ type: "text", placeholder: "Nhập mật khẩu cũ", value: "", spanWidth: 130, background: "#e1e1e1" }}></InputConfirmInfo>
                                            </div>
                                        </div>
                                        <div class='flex items-center'>
                                            <p class='w-[150px] shrink-0'>Mật khẩu mới</p>
                                            <div class='w-1/2'>

                                                <InputConfirmInfo item={{ type: "text", placeholder: "Nhập mật khẩu mới", value: "", spanWidth: 160, background: "#e1e1e1" }}></InputConfirmInfo>
                                            </div>
                                        </div>
                                        <div class='flex items-center'>
                                            <p class='w-[150px] shrink-0'>Xác nhận mật khẩu mới</p>
                                            <div class='w-1/2'>

                                                <InputConfirmInfo item={{ type: "text", placeholder: "Xác nhận mật khẩu mới", value: "", spanWidth: 170, background: "#e1e1e1" }}></InputConfirmInfo>
                                            </div>
                                        </div>
                                        <div class='flex justify-center my-md'>
                                            <button class='w-[100px] shrink-0 confirm-button mx-md' onClick={updatePassword}>Xác nhận</button>
                                            <button class='w-[100px] shrink-0 confirm-button' onClick={close}>Hủy</button>
                                        </div>
                                    </div>
                                )
                            }
                        </Popup>

                    </div>
                    <div class='w-content h-[1px] bg-txt m-md opacity-30'></div>
                    <div class='flex justify-between w-content'>

                        <div class='mx-md flex items-center text-txt text-16'>
                            <FontAwesomeIcon icon={faShieldBlank} ></FontAwesomeIcon>
                            <p class='mx-md'>Thiết lập mã pin</p>
                        </div>
                        <button class=' button-hover p-sm'>Thiết lập</button>
                    </div>
                </div>


                <div class='flex flex-col my-lg '>
                    <p class='font-bold m-md'>Liên kết mạng xã hội</p>
                    <div class='flex justify-between w-content'>

                        <div class='mx-md flex items-center text-txt text-16'>
                            <FontAwesomeIcon icon={faFacebook} ></FontAwesomeIcon>
                            <p class='mx-md'>Liên kết facebook</p>
                        </div>
                        <button class=' button-hover p-sm'>Liên kết</button>
                    </div>
                    <div class='w-content h-[1px] bg-txt m-md opacity-30'></div>
                    <div class='flex justify-between w-content'>

                        <div class='mx-md flex items-center text-txt text-16'>
                            <FontAwesomeIcon icon={faGoogle} ></FontAwesomeIcon>
                            <p class='mx-md'>Liên kết google</p>
                        </div>
                        <button class=' button-hover p-sm'>Liên kết</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Info;