import { useState } from "react";
import Input from "../../components/Layout/Components/Input";
import Button from "../../components/Layout/Components/Button";
import { Link } from "react-router-dom";
import * as CustomerServices from "../../services/CustomerServices"
import Configs from "../../configs"

const Register = () => {
    const [error,setError] = useState('')
    const [user, setUser] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        address: '',
        gender: '',
        dateOfBirth: '',
        username: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await CustomerServices.Register(user)

        if (!response.isError){
            window.location.href = Configs.routers.login
        }

        else{
            setError(response.data)
        }
        console.log(user);
    }
    return (
        <div className="w-content min-h-[700px] flex items-center flex-col ">
            <div className="flex items-center flex-col">
                <p className="text-[30px] font-extrabold tracking-wider m-sm text-txt">Tạo tài khoản của bạn</p>
                <p >Trải nghiệm dịch vụ đến từ Y-Trip</p>
            </div>
            <p className="text-xs text-red-500">{error}</p>
            <form className="w-input">
                <Input placeholder={'Nguyễn Văn A'} content='Họ và tên' onChange={onChange} name="fullName" value={user.fullName}></Input>
                <Input type="date" placeholder={'01/01/2000'} content='Ngày tháng năm sinh' onChange={onChange} name="dateOfBirth" value={user.dateOf}></Input>
                <Input type='text' placeholder={'Số 2, Nguyễn Thái Học, Quận 1, TP.HCM'} content='Địa chỉ' onChange={onChange} name="address" value={user.address}></Input>
                <Input type='text' placeholder={'Nam'} content='Giới tính' onChange={onChange} name="gender" value={user.gender}></Input>
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

            <div className="m-md w-input h-[1px] flex items-center justify-between">
                <div className="w-input h-[1px] bg-txt">

                </div>
                <p>
                    Hoặc
                </p>
                <div className="w-input h-[1px] bg-txt">

                </div>
            </div>

            <Button type="solid" content="Đăng ký bằng Google" onClick={onSubmit} />

        </div>
    );
}

export default Register;