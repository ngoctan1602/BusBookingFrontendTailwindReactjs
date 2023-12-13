import { useState ,useEffect} from "react";
import Input from "../../components/Layout/Components/Input";
import Button from "../../components/Layout/Components/Button";
import PopupOTP from "../../components/Layout/Components/PopupOTP"
import { Link } from "react-router-dom";
import * as CustomerServices from "../../services/CustomerServices"
import Configs from "../../configs"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";
const Register = () => {
    let navigate = useNavigate();
    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyWarning = () => toast.warning('Vui lòng nhập đầy đủ thông tin', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyError = (message) => toast.error('Đăng nhập thất bại', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const [error, setError] = useState('')
    const [user, setUser] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        address: '',
        gender: 'Nam',
        dateOfBirth: new Date(),
        username: '',
        wardID: ''
    });

    

    const onChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }


    const changeIdGender = (value) => {
        setUser({ ...user, gender: value })
    }
    const [gender, setGender] = useState([
        {
            name: "gender", type: "radio", content: "Nam"
        },
        {
            name: "gender", type: "radio", content: "Nữ"
        },
        {
            name: "gender", type: "radio", content: "Khác"
        }
    ])

    const [loading, setLoading] = useState();
    const [openPopup, setOpenPopUp] = useState(false);

    const [confirm, setConfirm] = useState(
        {
            email: user.email,
            code: '',
        }
    )

    const onChangeConfirm = async(name, value) => {
        setConfirm({ ...confirm, [name]: value })
        console.log(confirm)
        
    }
    const onChangeOpen = () => {
        setOpenPopUp(false)
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        let warning = false;
        Object.keys(user).forEach(prop => {
            if (user[prop] === null || user[prop] === undefined)
                warning = true
        });
        user.wardID = 3473
        if (warning) {
            notifyWarning()
        }
        else {
            try {
                setLoading(true)
                setConfirm({ ...confirm, email: user.email })
                const response = await CustomerServices.Register(user)

                if (!response.isError && response !== undefined) {
                    setLoading(false)
                    notifySuccess("Hãy xác thực OTP")
                    setOpenPopUp(true)
                }
                else {
                    setLoading(false)
                    notifyError(response.data)
                }
            } catch (error) {
                setLoading(false)
                notifyError()
            }
        }
        setLoading(false)

        // else {
        //     setError(response.data)
        // }
        console.log(user);
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
    return (
        <div className="w-content min-h-[700px] flex items-center flex-col relative">
            {
                loading &&
                <div class='absolute w-[100%] h-full z-20 opacity-40'>
                    <ReactLoading
                        type="spinningBubbles" color="black"
                        height={'5%'} width={'5%'}
                        className="absolute left-1/2 top-1/2  "
                    />
                </div>
            }

            <div class='hidden'>
                <PopupOTP onChangeOpen={onChangeOpen} open={openPopup} confirm={confirm} onChangeConfirm={onChangeConfirm}></PopupOTP>
            </div>

            <div className="flex items-center flex-col">
                <p className="text-[30px] font-extrabold tracking-wider m-sm text-txt">Tạo tài khoản của bạn</p>
                <p >Trải nghiệm dịch vụ đến từ Y-Trip</p>
            </div>
            <p className="text-xs text-red-500">{error}</p>
            <form className="w-input">
                <Input placeholder={'Nguyễn Văn A'} content='Họ và tên' onChange={onChange} name="fullName" value={user.fullName}></Input>
                <Input type="date" placeholder={'01/01/2000'} content='Ngày tháng năm sinh' onChange={onChange} name="dateOfBirth" value={user.dateOfBirth}></Input>
                <Input type='text' placeholder={'Số 2, Nguyễn Thái Học, Quận 1, TP.HCM'} content='Địa chỉ' onChange={onChange} name="address" value={user.address}></Input>
                {/* <Input type='text' placeholder={'Nam'} content='Giới tính' onChange={onChange} name="gender" value={user.gender}></Input> */}

                <div className="w-full grid-cols-12 grid grid-flow-row">
                    <p className="col-span-3 flex items-center">Giới tính</p>
                    {
                        gender.map((item, index) => (
                            <Input
                                name={item.name}
                                type="radio"
                                content={item.content}
                                onChange={changeIdGender}
                                checked={user.gender === item.content ? true : false}>
                            </Input>
                        ))
                    }
                </div>

                 {/* Đây là phần địa chỉ */}
                 <div class='flex items-center mx-md my-xl h-[40px] '>
                    <p class='text-16 w-[100px] shrink-0'>Địa chỉ</p>
                    <div class='min-w-[100px] shrink-0'>
                        <select class=' h-[36px] bg-[#e1e1e1] border-[1px] rounded-md mr-sm' onChange={(e) => setIdCommune(Number(e.target.value))}>
                        <option>Chọn tỉnh</option>
                            {
                                province.map((item, index) => (
                                    <option class='text-center' selected={item.isChoose} value={item.id} >{item.name}</option>
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
                </div>

                <Input type="text" placeholder={'0923 140 493'} content='Số điện thoại' onChange={onChange} name="phoneNumber" value={user.phoneNumber}></Input>
                <Input type="email" placeholder={'example@gmail.com'} content='Email' onChange={onChange} name="email" value={user.email}></Input>
                <Input type="text" placeholder={'username'} content='Tên đăng nhập' onChange={onChange} name="username" value={user.username}></Input>
                <Input type="password" placeholder={'Nhập mật khẩu'} content='Mật khẩu' onChange={onChange} name="password" value={user.password}></Input>
                <Input type="password" placeholder={'Xác nhận mật khẩu'} content='Xác nhận mật khẩu' name="confirmPassword" onChange={onChange}></Input>
            </form>


            <p className="w-[50%] m-md text-sm italic text-text font-bold text-14 text-center">
                * Khi bấm vào đăng ký tài khoản, bạn chắc chắn đã đọc và đồng ý với <Link to="/policy" className="text-button hover:underline">Chính sách bảo mật</Link>,
                <Link className="text-button hover:underline"> Điều khoản dịch vụ và chính sách</Link> tư vấn của Y-Trip.
            </p>
            <Button type="solid" content="Đăng ký" onClick={onSubmit} />
            <br></br>
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

        </div>
    );
}

export default Register;