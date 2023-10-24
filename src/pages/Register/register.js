import { useState } from "react";
import Input from "../../components/Layout/Components/Input";
import Button from "../../components/Layout/Components/Button";
import { Link } from "react-router-dom";
const Register = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConfirmPassword] = useState('')

    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onSubmit = () => {
        console.log(name, phone, password, conPassword, email);
    }
    return (
        <div className="w-content min-h-[700px] flex items-center flex-col ">
            <div className="flex items-center flex-col">
                <p className="text-[30px] font-extrabold tracking-wider m-sm text-txt">Tạo tài khoản của bạn</p>
                <p >Trải nghiệm dịch vụ đến từ Y-Trip</p>
            </div>


            <Button type="solid" content="Đăng ký bằng Google" onClick={onSubmit} />
            <div className="m-md w-input h-[1px] flex items-center justify-between">
                <div className="w-input h-[1px] bg-txt">

                </div>
                <p>
                    Hoặc
                </p>
                <div className="w-input h-[1px] bg-txt">

                </div>
            </div>


            <form className="w-input">
                <Input placeholder={'Nguyễn Văn A'} content='Họ và tên' onChange={onChangeName}></Input>
                <Input type="number" placeholder={'0923 140 493'} content='Số điện thoại' onChange={onChangePhone}></Input>
                <Input type="email" placeholder={'example@gmail.com'} content='Email' onChange={onChangeEmail}></Input>
                <Input type="password" placeholder={'Nhập mật khẩu'} content='Mật khẩu' onChange={onChangePassword}></Input>
                <Input type="password" placeholder={'Xác nhận mật khẩu'} content='Xác nhận mật khẩu' onChange={onChangeConfirmPassword}></Input>
            </form>


            <p className="w-[50%] m-md text-sm italic text-text font-bold text-14 text-center">
                * Khi bấm vào đăng ký tài khoản, bạn chắc chắn đã đọc và đồng ý với <Link to="/policy" className="text-button hover:underline">Chính sách bảo mật</Link>,
                <Link className="text-button hover:underline"> Điều khoản dịch vụ và chính sách</Link> tư vấn của Y-Trip.
            </p>
            <Button type="solid" content="Đăng ký" onClick={onSubmit} />


        </div>
    );
}

export default Register;