import { useState } from "react";
import Input from "../../components/Layout/Components/Input";
import Button from "../../components/Layout/Components/Button";
import { Link, useNavigate } from "react-router-dom";
import * as authServices from "../../services/AuthServices";

import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

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
    let navigate = useNavigate();
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
    const [loading, setLoading] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        const account = {
            username: usernam,
            password: password,
        }

        try {
            setLoading(true)
            const response = await authServices.login(account)
            setLoading(false)
            if (!response.isError) {
                setError('');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('avatar', response.data.avatar);
                notifySuccess();
                setTimeout(() => navigate("/"), 1500)
            }
        }
        catch (error) {
            setLoading(false)
            notifyError()
            console.log(error)
        }
    }
    return (
        <div className="w-content min-h-[500px] flex items-center flex-col relative">
            {
                loading &&
                <div class='absolute w-[100%] h-full z-20 opacity-40'>
                    <ReactLoading
                        type="spinningBubbles" color="black"
                        height={'5%'} width={'5%'}
                        className="absolute left-1/2 top-[30%]  "
                    />
                </div>
            }
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

export default Login;