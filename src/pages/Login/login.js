import { useState } from "react";
import Input from "../../components/Layout/Components/Input";
import Button from "../../components/Layout/Components/Button";
import { Link } from "react-router-dom";
const Login = () => {
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
        <div className="w-content min-h-[500px] flex items-center flex-col ">
            <div className="flex items-center flex-col p-md">
                <p className="text-[30px] font-extrabold tracking-wider m-sm text-txt">Đăng nhập vào tài khoản của bạn</p>
                <p >Trải nghiệm dịch vụ đến từ Y-Trip</p>
            </div>


            <Button type="solid" content="Đăng nhập bằng Google" onClick={onSubmit} />
            <div className="m-md w-input h-[1px] flex items-center justify-between py-md">
                <div className="w-input h-[1px] bg-txt">

                </div>
                <p>
                    Hoặc
                </p>
                <div className="w-input h-[1px] bg-txt">

                </div>
            </div>


            <form className="w-input pb-md">

                <Input type="email" placeholder={'example@gmail.com'} content='Email' onChange={onChangeEmail}></Input>
                <Input type="password" placeholder={'Nhập mật khẩu'} content='Mật khẩu' onChange={onChangePassword}></Input>
                <Input type="password" placeholder={'Xác nhận mật khẩu'} content='Xác nhận mật khẩu' onChange={onChangeConfirmPassword}></Input>
            </form>


            <Button type="solid" content="Đăng nhập" onClick={onSubmit} />
            <p className="w-[50%] m-md text-sm italic text-text font-bold text-14 text-center">
                Bạn chưa có tài khoản? <Link to="/register" className="text-button hover:underline">Đăng kí tài khoản</Link>
            </p>


        </div>
    );
}

export default Login;