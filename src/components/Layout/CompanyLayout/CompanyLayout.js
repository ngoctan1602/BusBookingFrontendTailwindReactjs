import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faCartFlatbed, faCat, faChartColumn, faChartLine, faChevronDown, faDollar, faMapLocationDot, faRightFromBracket, faRoute, faTicket, faTurnDown, faUpDown, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { faBusinessTime, faBus, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import adminlogo from "../../../assets/images/AdminLogo.png"
import { Link } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import Button from "../Components/Button";
import SignOut from "../../../services/SignOut";
import Popup from "reactjs-popup";

import { useNavigate, useLocation } from "react-router-dom";
const CompanyLayout = ({ children }) => {

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const avatar = localStorage.getItem('avatar') == 'null' ? adminlogo : localStorage.getItem('avatar');
    // const username = localStorage.getItem('username');


    const handleConfirmClick = () => {
        // Gọi hàm SignOut ở đây
        // SignOut();
        localStorage.clear();
        navigate("/company/login")
    };

    const navigate = useNavigate();
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "400px" };
    const [info, setInfo] = useState([
        {
            id: 1, content: "Quản lí lộ trình", icon: faRoute, active: false, path: '/company/route-detail',
        },
        {
            id: 2, content: "Quản lí giá/bảng giá", icon: faDollar, active: false, path: '/company/priceclassification',
        },
        {
            id: 3, content: "Quản lý xe", icon: faBus, active: false, path: '/company/bus',
        },
        {
            id: 4, content: "Tạo vé", icon: faTicket, active: false, path: '/company/create-ticket',
        },
        {
            id: 5, content: "Quản lý chuyến đi", icon: faMapLocationDot, active: true, path: '/company/ticket',
        },
        {
            id: 6, content: "Thống kê", icon: faChartLine, active: false, path: '/company/statistic',
        },

    ])
    useEffect(() => {
        // const token = localStorage.getItem('token');
        // setIsLoggedIn(token !== null);
        const checkData = () => {
            if (localStorage.getItem("usernameCompany") === null || localStorage.getItem("usernameCompany") === '') {
                navigate("/company/login")
            }
        };
        const updateSeats = seatActive();

        updateSeats();
        checkData();
    }, []);

    // let navigate = useNavigate();
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


    return (

        <div class='flex flex-col w-full min-h-full bg-bg'>


            <div class='h-[60px] shrink-0 bg-gradient-to-br from-button to-[#B0D9B1] grid grid-flow-row grid-cols-11 items-center text-txt text-16'>

                <div class='col-span-2 col-start-1 flex items-center ml-md'>
                    <img class='h-[40px] w-[100px]' src={adminlogo} >

                    </img>
                    <p class='ml-sm font-bold uppercase'>Company Page</p>
                </div>

                {/* {isLoggedIn ? (
                    <div class='col-span-1 col-start-10 flex items-center'>
                        <img class='h-[40px] w-[40px] rounded-full' src={avatar} >

                        </img>
                        <p className="p-[20px]">{username}</p>
                    </div>
                ) : (
                    <Link to={"/login"} className="px-4" id="Login">
                        <Button type="border" content="Đăng nhập">

                        </Button>
                    </Link>
                )} */}


                <Popup trigger={<button class="flex justify-center cursor-default col-start-11 ">
                    <FontAwesomeIcon icon={faRightFromBracket} color="#474554"
                        class='cursor-pointer w-[full] h-[20px] hover:text-bg ease-in-out duration-200'>
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
                                    <button class='col-start-3 col-span-3 col confirm-button text-center' onClick={handleConfirmClick} >Xác nhận</button>
                                    <button class='col-span-3 confirm-button' onClick={close}>Hủy</button>

                                </div>


                            </div>
                        )
                    }

                </Popup>
            </div>
            {/* <div class='flex w-full h-[100vh] bg-bg'>

                <div class='flex flex-col h-[830px] w-[20%] shrink-0 bg-txt text-bg'>
                    {
                        info.map((item, index) => (
                            <div>
                                <Link key={item.id}
                                    class='px-md flex items-center w-full h-[50px] hover:bg-[#75718a] cursor-pointer ease-in-out duration-200' to={item.path}>
                                    <FontAwesomeIcon class='w-[20px] h-[20px] shrink-0' icon={item.icon}></FontAwesomeIcon>
                                    <p class='mx-sm shrink-0'> {item.content}</p>

                                </Link>


                            </div>
                        ))
                    }
                </div>
                <div class='flex w-[80%] h-full shrink-0 ' >
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

export default CompanyLayout;