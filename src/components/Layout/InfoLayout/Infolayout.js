import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import avatarDefault from '../../../assets/images/avatar.png'
import { useNavigate } from "react-router-dom";
const InfoLayout = ({ children }) => {
    const location = useLocation()
    const navigate = useNavigate();
    const [info, setInfo] = useState([
        {
            id: 1, content: "Thông tin tài khoản", icon: faUser, active: false, path: '/info', color: "#7EA1FF"
        },
        {
            id: 2, content: "Thông báo của tôi", icon: faBell, active: false, path: '/notification', color: "#FFF455"
        },
        {
            id: 3, content: "Quản lý chuyến đi", icon: faCartShopping, active: false, path: '/order', color: "#06D001"
        },
        // {
        //     id: 4, content: "Chuyến đi yêu thích", icon: faHeart, active: false, path: '/favourite'
        // },
        // {
        //     id: 5, content: "Đánh giá của tôi", icon: faStar, active: false, path: '/his-review', color: "#FF5F00"
        // }
    ])

    const avatar = localStorage.getItem('avatar') === 'null' ? avatarDefault : localStorage.getItem('avatar');


    const username = localStorage.getItem('username')

    const seatActive = useCallback(() => {
        return () => {
            const updatedItems = info.map(item => {
                if (location.pathname === item.path) {
                    return { ...item, active: true };
                }

                return { ...item, active: false };
            });
            setInfo(updatedItems);
        };
    }, [info, location.pathname]); // Include location.pathname in the dependency array
    useEffect(() => {
        if (localStorage.getItem("roleName") !== "CUSTOMER" || localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
            navigate("/login")
        }
    }, [])
    useEffect(() => {
        const updateSeats = seatActive(); // Call the returned function
        updateSeats(); // Call the returned function to update seats
    }, []); // Empty dependency array to run the effect only once
    return (

        <div>
            <Header>

            </Header>
            <div class='w-full min-h-[700px] flex flex-col items-center bg-bgContent overflow-hidden'>
                <div class='w-full min-h-[700px]  flex text-txt text-16mx-sm '>
                    <div class='w-[20%] shrink-0 flex flex-col box-shadow-content'>
                        <div class='w-full min-h-[80px] flex justify-center items-center mb-md'>
                            {/* <div class='w-[100px] h-[80px] shrink-0  overflow-hidden z-1 relative '>
                                <img src={avatar}
                                    class=' w-[80px] h-[80px] object-cover rounded-full'>
                                </img>
                            </div> */}
                            <p class='w-[80%] shrink-0'>Tài khoản của <br></br> {username}</p>
                        </div>
                        {
                            info.map((item, index) => (
                                <Link key={item.id}
                                    onClick={seatActive()}
                                    style={location.pathname === item.path ? { backgroundColor: "#e1e1e1" } : { backgroundColor: "" }}
                                    class='p-md hover-link-new  flex items-center w-[95%] h-[50px] cursor-pointer' to={item.path}>
                                    <FontAwesomeIcon color={item.color} class='w-[20px] h-[20px] shrink-0' icon={item.icon}></FontAwesomeIcon>
                                    <p class='mx-sm shrink-0'> {item.content}</p>
                                </Link>
                            ))
                        }
                    </div>
                    <div class='w-[80%] shrink-0'>
                        {children}
                    </div>
                </div>
            </div>
            <Footer>

            </Footer>
        </div >
    );
}

export default InfoLayout;