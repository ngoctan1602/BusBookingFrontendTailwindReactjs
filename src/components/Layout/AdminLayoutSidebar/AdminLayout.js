import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faRightFromBracket, faRoute, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
import { faBell, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import avatar from "../../../assets/images/avatar.png"
import logoTrip from "../../../assets/images/logotrip.png"
import { Link, useLocation } from "react-router-dom";
import { useEffect, useCallback, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../../context/NotificationContext";
import getConnection from '../../../services/SignalRService'
import Popup from "reactjs-popup";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';


const AdminLayout = ({ children }) => {
    dayjs.extend(relativeTime);
    dayjs.locale('vi');

    const { counter } = useContext(NotificationContext);

    const contentStyle = {
        backgroundColor: '#FFFF',
        borderRadius: "8px",
        width: "400px",
        padding: "0",
        position: "absolute",
        top: "65px",
        right: "25px",
    };
    const contentStyleNotification = { backgroundColor: '#FFFF', borderRadius: "8px", width: "400px", padding: "0" };

    const [info, setInfo] = useState([
        {
            id: 0, content: "Dashboard", icon: faHouse, active: false, path: '/admin/dashboard', color: '#1E3D73',
        },
        {
            id: 1, content: "Quản lý tài khoản người dùng", icon: faUser, active: false, path: '/admin/manage-user-account', color: '#1E3D73',
        },
        {
            id: 2, content: "Quản lý nhà xe", icon: faBusinessTime, active: false, path: '/admin/manage-company', color: '#FFBF43',
        },
        {
            id: 3, content: "Quản lý loại xe", icon: faBusSimple, active: false, path: '/admin/manage-typebus', color: '#FF72B9',
        },
        {
            id: 4, content: "Quản lý loại ghế", icon: faBusSimple, active: false, path: '/admin/manage-seattype', color: '#28CFFE',
        },
        {
            id: 5, content: "Quản lý bến bãi", icon: faMapLocation, active: false, path: '/admin/manage-busstation', color: '#FB766D',
        },
        {
            id: 6, content: "Quản lý loại giá/bảng giá", icon: faDollarSign, active: false, path: '/admin/prices', color: '#99F6CA',
        },
        {
            id: 7, content: "Quản lý tuyến đường", icon: faRoute, active: false, path: '/admin/routes', color: '#4C6EF8',
        },
    ])

    const [notifiData, setNotifiData] = useState([])
    const getNotifications = async () => {
        const connection = await getConnection();
        connection.invoke("GetNotifications");
        connection.on("ReceiveNotifications", (notifications) => {
            setNotifiData(notifications);
        });
    }


    let navigate = useNavigate();
    const location = useLocation()
    // const [content, setContent] = useState("Quản lý tài khoản người dùng")
    const seatActive = useCallback((path) => {
        return () => {
            StatusItem(path);
        }
    }, [info, location.pathname, setInfo])

    ///@this is function to set active item in sidebar
    const StatusItem = (path) => {
        const updatedItems = info.map(item => {
            if (path === item.path) {
                // setContent(item.content);
                document.title = item.content
                return { ...item, active: true };
            }

            return { ...item, active: false };

        });
        setInfo(updatedItems);
    }
    useEffect(() => {
        const checkData = () => {
            if (localStorage.getItem("adminUsername") === null || localStorage.getItem("adminUsername") === '') {
                navigate("/admin/login")
            }
        };

        seatActive(location.pathname)()
        checkData();
    }, []);

    const signOut = () => {
        localStorage.clear();
        navigate("/admin/login")
    }

    const directNotification = async (item) => {
        const connection = await getConnection();
        connection.invoke("ReadNotification", item.id);
        navigate('/admin' + item.href)
        StatusItem('/admin' + item.href)
    }
    return (

        <div className='w-full h-[100vh] bg-bg absolute'>


            <div className='w-full h-[60px] shrink-0 bg-bg shadow-xl grid grid-flow-row grid-cols-12 items-center text-txt text-16 fixed z-50 top-[0px] left-[0px] overflow-hidden'>

                <div className='col-span-2 col-start-1 flex items-center ml-md'>
                    <img className='h-[40px] w-[100px]' src={logoTrip} >

                    </img>
                    <p className='ml-sm font-bold uppercase'>Admin Page</p>
                </div>
                <div className='col-span-1 col-start-10 flex items-center'>
                    <img className='h-[40px] w-[40px] rounded-full' src={avatar} >

                    </img>
                    <p className="ml-sm">{localStorage.getItem("adminUsername")}</p>

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

                <Popup trigger={<button className="flex justify-center cursor-default">
                    <FontAwesomeIcon icon={faRightFromBracket} color="#474554"
                        className='cursor-pointer w-[full] h-[20px] hover:text-txt-gray ease-in-out duration-200"'>
                    </FontAwesomeIcon></button>} position="right center"
                    modal
                    nested
                    closeOnDocumentClick={false}
                    {... { contentStyle }}
                >
                    {
                        close => (

                            <div className='p-md text-16 text-txt min-h-[100px]'>
                                <div className='relative'>
                                    <p className='text-20 text-center font-bold'>Bạn chắc chắn đăng xuất</p>

                                    <div className='closeButton cursor-pointer '
                                        onClick={close}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>

                                </div>

                                <div className='w-full my-md gap-sm grid grid-cols-10'>
                                    {/* <Link className='col-start-3 col-span-3 col confirm-button text-center' to='/admin/login'>Xác nhận</Link> */}
                                    <button className='col-span-4 col-start-2 confirm-button' onClick={signOut}>Xác nhận</button>
                                    <button className='col-span-4 col-start-6 confirm-button' onClick={close}>Hủy</button>

                                </div>


                            </div>
                        )
                    }

                </Popup>
            </div>
            {/* <div className='flex w-full h-[100vh] bg-bg'>

                <div className='flex flex-col w-[20%] shrink-0 bg-txt text-bg'>
                    {
                        info.map((item, index) => (
                            <Link key={item.id}
                                onClick={seatActive()}
                                style={item.active ? { backgroundColor: "#75718a" } : { backgroundColor: "" }}
                                className='px-md flex items-center w-full h-[50px] hover:bg-[#75718a] cursor-pointer ease-in-out duration-150' to={item.path}>
                                <FontAwesomeIcon className='w-[20px] h-[20px] shrink-0' icon={item.icon}></FontAwesomeIcon>
                                <p className='mx-sm shrink-0'> {item.content}</p>
                            </Link>
                        ))
                    }
                </div>
                <div className='flex w-[80%] shrink-0 h-full' >
                    <div className='w-full p-md h-full'>
                        {children}
                    </div>
                </div>
            </div> */}
            <div className="w-full h-full  grid-flow-row grid-cols-10 gap-sm mt-[60px]">
                <div className="col-span-1 grid grid-cols-1 grid-flow-row fixed overflow-auto h-full shadow-2xl" >
                    <div className=" h-[400px] col-span-1 grid grid-cols-1 grid-flow-row  text-16">
                        {
                            info.map((item, index) => (
                                <Link key={item.id}
                                    to={item.path}
                                    onClick={seatActive(item.path)}
                                >
                                    {
                                        item.active ?
                                            <div
                                                className=" h-[60px] col-span-1 m-sm border-button bg-bgPopup  border-[3px] rounded-md shadow-sm grid grid-cols-12 grid-flow-row place-items-center"
                                            >
                                                <FontAwesomeIcon className='ml-sm col-span-2 h-[20px] shrink-0' icon={item.icon} color={item.color}></FontAwesomeIcon>
                                                <p className='mx-[40px] col-span-10'> {item.content}</p>

                                            </div> :
                                            <div className="
                                            hover:bg-bgPopup ease-in-out duration-150 hover:scale-[98%]
                                            h-[60px] col-span-1 m-sm border-txt-final rounded-md shadow-sm grid grid-cols-12 grid-flow-row place-items-stretch items-center">
                                                <FontAwesomeIcon className='ml-sm w-[20px] h-[20px] shrink-0' icon={item.icon} color={item.color}></FontAwesomeIcon>
                                                <p className='mx-[40px] col-span-10'>  {item.content}</p>

                                            </div>

                                    }
                                </Link>
                            ))
                        }

                    </div>

                </div>
                <div className="col-span-9 h-full  ml-[366px]">
                    <div className='w-full p-md h-full bg-bgContent'>
                        {children}
                    </div>
                </div>
            </div>

        </div >
    );
}

export default AdminLayout;