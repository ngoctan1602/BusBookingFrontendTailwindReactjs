import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logotrip.png"
import Button from "./Button";
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import avatarDefault from '../../../assets/images/avatar.png'
import configs from "../../../configs";
import { Icon } from "@mui/material";
import { Menu, Modal } from "antd";
import Popup from "reactjs-popup";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import {useContext } from "react";
import { faBell, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { NotificationContext } from "../../../context/NotificationContext";
import getConnection from '../../../services/SignalRService'
const { SubMenu } = Menu;

const Header = () => {
    const contentStyle = {
        backgroundColor: '#FFFF',
        borderRadius: "8px",
        width: "400px",
        padding: "0",
        position: "absolute",
        top: "65px",
        right: "25px",
    };
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const logout = () => {
        // setLogoutOpen(true)
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("avatar")
        setLogoutOpen(false)
        setTimeout(
            () => {

                navigate("/login")
                window.location.reload();
            }, 1000
        )
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn((token === null || token === undefined) ? false : true);
    }, []);

    const avatar = localStorage.getItem('avatar') === 'null' ? avatarDefault : localStorage.getItem('avatar');

    dayjs.extend(relativeTime);
    dayjs.locale('vi');

    const { counter } = useContext(NotificationContext);
    const [notifiData, setNotifiData] = useState([])
    const getNotifications = async () => {
        const connection = await getConnection();
        connection.invoke("GetNotifications");
        connection.on("ReceiveNotifications", (notifications) => {
            setNotifiData(notifications);
        });
    }
    const directNotification = async (item) => {
        const connection = await getConnection();
        connection.invoke("ReadNotification", item.id);
        navigate(item.href)
    }
    return (

        <header className="flex justify-center bg-[#97D163]">
            <div className="w-100% h-[80px] flex items-center justify-between w-[90%]">
                <Link className="hover:opacity-95" to="/">
                    <img src={logo} className="w-[120px] h-[60px] rounded-8 object-cover" />
                </Link>
                <div className="my-4">
                    <div className="flex items-center justify-between text-bg text-16">
                        {/* <Link className="hoverLink" to="/introduce">
                            Giới thiệu
                        </Link> */}
                        <Link className="hoverLink" to="/introduce">
                            Trở thành đối tác
                        </Link>
                        <Link className="hoverLink" to="/introduce">
                            Chính sách của Y-Trip
                        </Link>
                        <div className="h-[20px] bg-bg w-[0.1px]">

                        </div>
                        <Link className="flex items-center justify-center px-8" to="/contact">
                            <FontAwesomeIcon icon={faPhone} beat className="p-sm m-sm" />
                            <p className="hover:underline cursor-pointer">0923140493</p>
                        </Link>


                        <Modal
                            title="Bạn có muốn đăng xuất"
                            open={logoutOpen}
                            onOk={logout}
                            onCancel={() => setLogoutOpen(false)}
                            // okText="Ok"
                            okButtonProps={{ style: { background: "#1677FF" } }}
                            cancelText="Hủy"
                        >

                        </Modal>
                        {isLoggedIn ? (
                            <Menu className="mx-md custom-menu">
                                <SubMenu className="custom-submenu" >
                                    <Menu.Item onClick={() => setLogoutOpen(true)} key="1">Đăng xuất</Menu.Item>
                                    <Menu.Item onClick={() => navigate("/info")} key="2">Thông tin cá nhân</Menu.Item>
                                    <Menu.Item onClick={() => navigate("/order")} key="3">Quản lý chuyến đi</Menu.Item>
                                    <Menu.Item onClick={() => navigate("/his-review")} key="4">Đánh giá của tôi</Menu.Item>
                                </SubMenu>
                            </Menu>
                            // <Link to={configs.routers.profile} id="NotLogin" className="px-[10px]">
                            //     <div class='w-[100px] h-[40px] shrink-0  overflow-hidden z-1 relative '>
                            //         <img class=' w-[40px] h-[40px] object-cover rounded-full' src={avatar} alt="Avatar"></img>
                            //     </div>
                            // </Link>
                        ) : (
                            <Link to={"/login"} className="px-4" id="Login">
                                <Button type="border" content="Đăng nhập">

                                </Button>
                            </Link>
                        )}
                    </div>

                    {/*@this is notification UI  --Start*/}
                <div className="col-span-1 col-start-11">

<div
    className="relative">
    <Popup
        trigger={<button
            className="flex justify-center cursor-default"
        >
            <button
                className=""
                onClick={getNotifications}>
                <FontAwesomeIcon icon={faBell} color="#5C98FF"
                    className='cursor-pointer w-[full] h-[20px] hover:text-[#307BFD] ease-in-out duration-200'>
                </FontAwesomeIcon>
                <span className="text-text-red text-[14px] absolute top-[-50%] left-[10%]">{counter}</span>
            </button>
        </button>}
        position="top right"
        modal
        nested
        closeOnDocumentClick={true}
        {... { contentStyle }}
    >
        {
            close => (

                <div className='text-16 text-txt min-h-[100px] relative'>
                    <div className='bg-[#3F5F97] p-[10px] rounded-[8px] w-full h-[100px] text-center'>
                        <p className='text-20 text-txt-light p-[5px]'>Thông báo của bạn</p>
                        <p className='text-10 text-txt-light p-[5px]'>Bạn đang có <span className="font-bold">{counter}</span> thông báo chưa đọc</p>

                    </div>

                    <div className='w-full my-md gap-sm grid max-h-[300px] min-h-[300px] overflow-auto'>
                        {notifiData.length > 0 ? (
                            <div className="grid h-[100px]">
                                {notifiData.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            directNotification(item);
                                            close();
                                        }}
                                        className={`p-[10px] rounded-lg ${item.status === 2 ? 'bg-notification' : ''} hover:bg-notificationNotRead flex justify-between`}
                                    >
                                        <div className="px-[5px]">
                                            {item.content}
                                            <div className="text-[12px] ml-[20px] mt-[1px] text-left text-txt-final">
                                                {dayjs(item.dateCreate).from()}
                                            </div>
                                        </div>
                                        {item.status === 2 && <div><p className="text-text-red">*</p></div>}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-txt"></div>
                        )}
                    </div>
                </div>
            )
        }

    </Popup>
</div>
</div>

{/*@this is notification UI  --End*/}
                </div>
            </div >
        </header >
    );
}

export default Header;