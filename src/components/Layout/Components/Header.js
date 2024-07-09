import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logotrip.png"
import Button from "./Button";
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faPhone } from "@fortawesome/free-solid-svg-icons";
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import avatarDefault from '../../../assets/images/avatar.png'
import configs from "../../../configs";
import { Icon } from "@mui/material";
import { Menu, Modal, Statistic } from "antd";
import Popup from "reactjs-popup";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { faBell, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { NotificationContext } from "../../../context/NotificationContext";
import getConnection from '../../../services/SignalRService'
import { setTimeCheckoutPayload, resetCheckoutState } from "../../../store/slice/checkoutSlice";
import purgeSpecificReducers from '../../../store/purgeReducers';
import CheckCheckout from "./Common/CheckCheckout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { SubMenu } = Menu;
const { Countdown } = Statistic;


const Header = () => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.isLoggedIn)
    const role = useSelector((state) => state.user.role);
    const Order = useSelector((state) => state.checkout)
    const timeCheckout = localStorage.getItem("TimeCheckout");
    const isCheckout = CheckCheckout();
    console.log(Order.timeCheckout, Date.now())
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
        localStorage.removeItem("roleName")
        setLogoutOpen(false)
        setTimeout(
            () => {
                purgeSpecificReducers(['user', 'checkout']);
                navigate("/login")
                // window.location.reload();
            }, 1000
        )
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn((token === null || token === undefined || localStorage.getItem("roleName") !== "CUSTOMER") ? false : true);
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
    const cancelCheckout = () => {
        console.log(Date.now() > Number(timeCheckout))
        if (Date.now() > Number(timeCheckout)) {
            notifyWarning("Đã hết thời gian thanh toán. Hãy chọn lại vé nếu bạn vẫn còn nhu cầu")
            navigate("/search")
            purgeSpecificReducers(['checkout'])
        }
    }
    const notifyWarning = (message) => toast.warning(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    return (
        <div className="flex justify-center bg-[#629d2d] overflow-hidden  ">
            <div className="w-[90%] h-[80px] flex items-center justify-between ">
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
                        {(login && role === "CUSTOMER") ? (
                            <Menu className="mx-md custom-menu">
                                <SubMenu className="custom-submenu" >
                                    <Menu.Item onClick={() => setLogoutOpen(true)} key="1">Đăng xuất</Menu.Item>
                                    <Menu.Item onClick={() => navigate("/info")} key="2">Thông tin cá nhân</Menu.Item>
                                    <Menu.Item onClick={() => navigate("/order")} key="3">Quản lý chuyến đi</Menu.Item>
                                    {/* <Menu.Item onClick={() => navigate("/his-review")} key="4">Đánh giá của tôi</Menu.Item> */}
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
                        {
                            login && role === "CUSTOMER" &&
                            <div className="w-[30px]">

                                <div
                                    className="relative">
                                    <Popup
                                        trigger={<button
                                            className="flex justify-center cursor-default"
                                        >
                                            <button
                                                className=""
                                                onClick={getNotifications}>
                                                <FontAwesomeIcon icon={faBell} color="#fff"
                                                    className='cursor-pointer w-[full] h-[20px] hover:text-[#307BFD] ease-in-out duration-200'>
                                                </FontAwesomeIcon>
                                                <span className="text-text-red text-[14px] absolute top-[-50%] left-[38%]">{counter}</span>
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
                        }
                        {
                            // login &&
                            // Order.TicketRouteDetailEndId !== 0 && Order.TicketRouteDetailStartId !== 0
                            // && Order.itemsRequest.length !== 0
                            // && timeCheckout > Date.now()
                            // &&
                            // checkCheckout() === true ?
                            isCheckout &&
                            <div className="w-[60px] h-[60px] flex flex-col hover:cursor-pointer" onClick={() => navigate("/checkout")}>
                                <Countdown className="w-[40px] custom-countdown " value={Number(timeCheckout)} onFinish={() => cancelCheckout()} />
                                <FontAwesomeIcon size="lagre" icon={faCreditCard}></FontAwesomeIcon>
                            </div>
                        }
                    </div>
                </div>
            </div >
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
        </div >
    );
}

export default Header;