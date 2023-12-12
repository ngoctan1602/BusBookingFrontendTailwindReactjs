
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


import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Info = () => {
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
    });

    const [updateCustomer, setUpdateCustomer] = useState(
        {
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
                    setUpdateCustomer(response.data)

                    setError('')
                    setLoading(false)
                }
                else {
                    setError(response.data)
                    setLoading(false)
                }
            }
            catch (err) {
                setError(err.message)
            }
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

    const [province, setProvince] = useState(
        [
            {
                id: 1, name: "Khánh Hòa", isChoose: true,
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

    console.log(province)
    const [idProvince, setIdProvince] = useState("");
    useEffect(() => {

        const updatedItems = province.map(item => {
            if (item.id === idProvince) {

                return { ...item, isChoose: true };
            }
            return { ...item, isChoose: false };
        });
        setProvince(updatedItems);

    }, [idProvince]);

    const [idDistrict, setIdDistrict] = useState("");
    useEffect(() => {
        const updatedProvince = province.map(prov => {
            return {
                ...prov,
                district: prov.district.map(dist => {
                    if (dist.id === idDistrict)
                        return {
                            ...dist, isChoose: true
                            // // Update the properties you want here
                            // // For example, if you want to set isChoose to true for all districts, you can do:
                            // isChoose: true,
                            // commune: dist.commune.map(comm => {
                            //     return {
                            //         ...comm,
                            //         // Update the properties you want here
                            //     };
                            // })
                        };
                    return { ...dist, isChoose: false }
                })
            };
        });

        setProvince(updatedProvince);

        console.log(updatedProvince)

    }, [idDistrict]);

    const [idCommune, setIdCommune] = useState("");
    useEffect(() => {
        const updatedProvince = province.map(prov => {
            return {
                ...prov,
                district: prov.district.map(dist => {
                    return {
                        ...dist,
                        commune: dist.commune.map(comm => {
                            if (comm.id === idCommune)
                                return {
                                    ...comm,
                                    isChoose: true,
                                };

                            return {
                                ...comm,
                                isChoose: false,
                            };
                        })
                    };
                })
            }
        });

        setProvince(updatedProvince);

    }, [idCommune]);

    const onChangeCustomer = (name, value) => {
        setUpdateCustomer({ ...updateCustomer, [name]: value })
    }
    const updateProfile = async () => {
        try {
            const resp = customerServices.UpdateProfile(updateCustomer)
            // if(!resp.isError){

            // }
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div class='w-full h-full flex border-none outline-none  rounded-lg overflow-hidden'>
            <div class='w-1/2 shrink-0 bg-[#e1e1e1] '>
                <p class='font-bold m-md'>Thông tin cá nhân</p>
                <div class='flex my-lg items-center mx-md'>
                    <div class='w-[100px] h-[80px] shrink-0  overflow-hidden z-1 relative '>
                        {
                            !loading &&
                            <img src={customer.avatar === null ? avatarDefault: customer.avatar}
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
                        <p class='col-span-2 p-sm'>Họ và tên</p>
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
                <div class='flex items-center mx-md my-xl'>
                    <p class='text-16 w-[100px] shrink-0'>Ngày sinh</p>
                    {/* <div class='widthDate shrink-0'>
                        <InputConfirmInfo item={{ type: "date", value: customer.dateOfBirth.split('T', [1]), background: "#e1e1e1" }} onChange={changeBirthDate}></InputConfirmInfo>
                    </div> */}
                </div>
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

                {/* Đây là phần địa chỉ */}
                <div class='flex items-center mx-md my-xl h-[40px] '>
                    <p class='text-16 w-[100px] shrink-0'>Địa chỉ</p>
                    <div class='min-w-[100px] shrink-0'>
                        <select class=' h-[36px] bg-[#e1e1e1] border-[1px] rounded-md mr-sm' onChange={(e) => setIdCommune(Number(e.target.value))}>
                            <option>
                                Chọn xã
                            </option>
                            {
                                province.map((item, index) => (
                                    item.id === idProvince &&
                                    item.district.map((di, i) =>
                                    (
                                        di.id === idDistrict &&
                                        di.commune.map((co, j) =>
                                        (
                                            <option class='text-center' selected={co.isChoose} value={co.id} >{co.name}</option>
                                        )
                                        )
                                    )
                                    )

                                ))

                            }
                        </select>
                    </div>
                    <div class='min-w-[100px] shrink-0'>
                        <select class='h-[36px] bg-[#e1e1e1] border-[1px] rounded-md mr-sm' onChange={(e) => setIdDistrict(Number(e.target.value))}>
                            <option>Chọn huyện</option>
                            {
                                province.map((item, index) => (
                                    item.id === idProvince &&
                                    item.district.map((di, i) =>
                                    (
                                        <option class='text-center' selected={di.isChoose} value={di.id} >{di.name}</option>
                                    )
                                    )

                                ))

                            }
                        </select>
                    </div>
                    <div class=' min-w-[100px] shrink-0'>
                        <select class='bg-[#e1e1e1] h-[36px] border-[1px]  rounded-md mr-sm ease-in-out' onChange={(e) => setIdProvince(Number(e.target.value))}>
                            <option>Chọn tỉnh</option>
                            {
                                province.map((item, index) => (
                                    <option class='text-center' selected={item.isChoose} value={item.id} >{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div class='flex w-full justify-center mr-xl'>
                    <button class='button-hover'
                        onClick={(e) => alert(customer.fullName)}
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
                                        <div class='w-full h-[1px] bg-txt my-sm' ></div>
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
                                        <div class='w-full h-[1px] bg-txt my-sm' ></div>
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
                                            <button class='w-[100px] shrink-0 confirm-button mx-md'>Xác nhận</button>
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
                                        <div class='w-full h-[1px] bg-txt my-sm' ></div>
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
                                            <button class='w-[100px] shrink-0 confirm-button mx-md'>Xác nhận</button>
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