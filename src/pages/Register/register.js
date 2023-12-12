import { useState } from "react";
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
    const notifyError = () => toast.error('Đăng nhập thất bại', {
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
            otp: '',
        }
    )

    const onChangeConfirm = (name, value) => {
        setConfirm({ ...confirm, [name]: value })
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
        if (warning) {
            notifyWarning()
        }
        else {
            try {
                setLoading(true)
                // const response = await CustomerServices.Register(user)

                // if (!response.isError) {
                //     window.location.href = Configs.routers.login
                // }

                setLoading(false)
                notifySuccess("Hãy xác thực OTP")
                setOpenPopUp(true)
            } catch (error) {
                notifyError()
            }
        }

        // else {
        //     setError(response.data)
        // }
        console.log(user);
    }
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