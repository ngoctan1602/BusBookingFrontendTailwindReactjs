import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faRightFromBracket, faRoute, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import adminlogo from "../../../assets/images/AdminLogo.png"
import { Link, useLocation } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import Popup from "reactjs-popup";
const AdminLayout = ({ children }) => {
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "400px" };
    const [info, setInfo] = useState([
        {
            id: 1, content: "Quản lý tài khoản người dùng", icon: faUser, active: false, path: '/manage-user-account'
        },
        {
            id: 2, content: "Quản lý nhà xe", icon: faBusinessTime, active: false, path: '/manage-company'
        },
        {
            id: 3, content: "Quản lý loại xe", icon: faBusSimple, active: false, path: '/manage-typebus'
        },
        {
            id: 4, content: "Quản lý loại ghế", icon: faBusSimple, active: false, path: '/manage-seattype'
        },
        {
            id: 5, content: "Quản lý bến bãi", icon: faMapLocation, active: false, path: '/manage-busstation'
        },
        {
            id: 6, content: "Quản lý loại giá/bảng giá", icon: faDollarSign, active: false, path: '/admin/prices'
        },
        {
            id: 7, content: "Quản lý tuyến đường", icon: faRoute, active: false, path: '/admin/routes',
        },
    ])

    let navigate = useNavigate();
    const location = useLocation()
    // const [content, setContent] = useState("Quản lý tài khoản người dùng")
    const seatActive = useCallback(() => {
        return () => {
            const updatedItems = info.map(item => {
                if (location.pathname === item.path) {
                    // setContent(item.content);
                    document.title = item.content
                    return { ...item, active: true };
                }

                return { ...item, active: false };

            });
            setInfo(updatedItems);
        }
    }, [info, location.pathname])

    useEffect(() => {
        const checkData = () => {
            if (localStorage.getItem("adminUsername") === null || localStorage.getItem("adminUsername") === '') {
                navigate("/admin/login")
            }
        };

        const updateSeats = seatActive();

        updateSeats(); // Call the returned function to update seats
        checkData();
    }, []);

    const signOut = () => {
        localStorage.clear();
        navigate("/admin/login")
    }

    return (

        <div class='w-full h-[100vh] bg-bg'>


            <div class='w-full h-[60px] shrink-0 bg-gradient-to-br from-button to-[#B0D9B1] grid grid-flow-row grid-cols-11 items-center text-txt text-16'>

                <div class='col-span-2 col-start-1 flex items-center ml-md'>
                    <img class='h-[40px] w-[100px]' src={adminlogo} >

                    </img>
                    <p class='ml-sm font-bold uppercase'>Admin Page</p>
                </div>
                <div class='col-span-1 col-start-10 flex items-center'>
                    <img class='h-[40px] w-[40px] rounded-full' src={adminlogo} >

                    </img>
                    <p>{localStorage.getItem("adminUsername")}</p>
                </div>

                <Popup trigger={<button class="flex justify-center cursor-default">
                    <FontAwesomeIcon icon={faRightFromBracket} color="#474554"
                        class='cursor-pointer w-[full] h-[20px] hover:text-bg ease-in-out duration-200"'>
                    </FontAwesomeIcon></button>} position="right center"
                    modal
                    nested
                    closeOnDocumentClick={false}
                    {... { contentStyle }}
                >
                    {
                        close => (

                            <div class='p-md text-16 text-txt min-h-[100px]'>
                                <div class='relative'>
                                    <p class='text-20 text-center font-bold'>Bạn chắc chắn đăng xuất</p>

                                    <div class='closeButton cursor-pointer '
                                        onClick={close}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>

                                </div>
                                <div class='w-full h-[1px] bg-txt my-sm' ></div>
                                <div class='w-full my-md gap-sm grid grid-cols-10'>
                                    {/* <Link class='col-start-3 col-span-3 col confirm-button text-center' to='/admin/login'>Xác nhận</Link> */}
                                    <button class='col-span-4 col-start-2 confirm-button' onClick={signOut}>Xác nhận</button>
                                    <button class='col-span-4 col-start-6 confirm-button' onClick={close}>Hủy</button>

                                </div>


                            </div>
                        )
                    }

                </Popup>
            </div>
            {/* <div class='flex w-full h-[100vh] bg-bg'>

                <div class='flex flex-col w-[20%] shrink-0 bg-txt text-bg'>
                    {
                        info.map((item, index) => (
                            <Link key={item.id}
                                onClick={seatActive()}
                                style={item.active ? { backgroundColor: "#75718a" } : { backgroundColor: "" }}
                                class='px-md flex items-center w-full h-[50px] hover:bg-[#75718a] cursor-pointer ease-in-out duration-150' to={item.path}>
                                <FontAwesomeIcon class='w-[20px] h-[20px] shrink-0' icon={item.icon}></FontAwesomeIcon>
                                <p class='mx-sm shrink-0'> {item.content}</p>
                            </Link>
                        ))
                    }
                </div>
                <div class='flex w-[80%] shrink-0 h-full' >
                    <div class='w-full p-md h-full'>
                        {children}
                    </div>
                </div>
            </div> */}
            <div className="w-full h-full grid grid-flow-row grid-cols-10 gap-sm">
                <div className="col-span-2  h-full grid grid-cols-1 grid-flow-row ">
                    <div className=" h-[400px] col-span-1 grid grid-cols-1 grid-flow-row  text-16">
                        {
                            info.map((item, index) => (
                                <Link key={item.id}
                                    onClick={seatActive()}
                                    to={item.path}
                                >
                                    {
                                        item.active ?
                                            <div
                                                className=" h-[60px] col-span-1 m-sm border-button bg-bgPopup  border-[3px] rounded-md shadow-sm grid grid-cols-12 grid-flow-row place-items-center"
                                            >
                                                <FontAwesomeIcon class='ml-sm col-span-2 h-[20px] shrink-0' icon={item.icon} color="#474E68"></FontAwesomeIcon>
                                                <p class='mx-sm col-span-10'> {item.content}</p>

                                            </div> :
                                            <div className="
                                            hover:bg-bgPopup ease-in-out duration-150 hover:scale-[98%]
                                            h-[60px] col-span-1 m-sm border-txt-final border-[1px] rounded-md shadow-sm grid grid-cols-12 grid-flow-row place-items-center">
                                                <FontAwesomeIcon class='ml-sm w-[20px] h-[20px] shrink-0' icon={item.icon} color="#474E68"></FontAwesomeIcon>
                                                <p class='mx-sm col-span-10'>  {item.content}</p>

                                            </div>

                                    }
                                </Link>
                            ))
                        }

                    </div>

                </div>
                <div className="col-span-8 h-full">
                    <div class='w-full p-md h-full'>
                        {children}
                    </div>
                </div>
            </div>

        </div >
    );
}

export default AdminLayout;