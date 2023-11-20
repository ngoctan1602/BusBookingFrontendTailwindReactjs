import { useState } from "react";
import Input from "../../components/Layout/Components/Input";
import Button from "../../components/Layout/Components/Button";
import { Link } from "react-router-dom";
import * as authServices from "../../services/AuthServices";
import configs from "../../configs"

const Login = () => {
    const [usernam, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const account = {
            username: usernam,
            password: password,
        }
        const response = await authServices.login(account)
        if (!response.isError){
            setError('');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('avatar', response.data.avatar);
            window.location.href = configs.routers.home
        }
        else{
            setError(response.data)
        }
            }
            return (
            <div className="w-content min-h-[500px] flex items-center flex-col ">
                <div className="flex items-center flex-col p-md">
                    <p className="text-[30px] font-extrabold tracking-wider m-sm text-txt">Đăng nhập vào tài khoản của bạn</p>
                    <p >Trải nghiệm dịch vụ đến từ Y-Trip</p>
                </div>

                <div className="text-xs text-red-500">{error}</div>
            <form className="w-input pb-md">

                <Input type="username" placeholder={'Nhập tên đăng nhập'} content='Tên đăng nhập' onChange={onChangeUsername}></Input>
                <Input type="password" placeholder={'Nhập mật khẩu'} content='Mật khẩu' onChange={onChangePassword}></Input>
            </form>

            <Button type="solid" content="Đăng nhập" onClick={onSubmit} />
            <p className="w-[50%] m-md text-sm italic text-text font-bold text-14 text-center">
                Bạn chưa có tài khoản? <Link to="/register" className="text-button hover:underline">Đăng kí tài khoản</Link>
            </p>
            {/*<div className="m-md w-input h-[1px] flex items-center justify-between py-md">*/}
            {/*    <div className="w-input h-[1px] bg-txt">*/}

            {/*    </div>*/}
            {/*    <p>*/}
            {/*        Hoặc*/}
            {/*    </p>*/}
            {/*    <div className="w-input h-[1px] bg-txt">*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<Button type="solid" content="Đăng nhập bằng Google" onClick={onSubmit} />*/}
        </div>
    );
}

export default Login;