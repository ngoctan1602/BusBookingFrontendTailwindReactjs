import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const InfoLayout = ({ children }) => {
    const [info, setInfo] = useState([
        {
            id: 1, content: "Thông tin tài khoản", icon: faUser, active: true, path: '/info'
        },
        {
            id: 2, content: "Thông báo của tôi", icon: faBell, active: false, path: '/notification'
        },
        {
            id: 3, content: "Quản lý đơn hàng", icon: faCartShopping, active: false, path: '/notification'
        },
        {
            id: 4, content: "Chuyến đi yêu thích", icon: faHeart, active: false, path: '/history'
        },
        {
            id: 5, content: "Đánh giá của tôi", icon: faStar, active: false, path: '/his-review'
        }
    ])
    useEffect(() => {
        // const ii = listImg.filter(item => item.id == imgId);
        // setCurrentImg(ii);
        // return () => {
        //     console.log(ii[0])
        // };
    }, [info]);

    const seatActive = (id) => {
        const updatedItems = info.map(item => {
            if (item.id === id) {
                return { ...item, active: true };
            }

            return { ...item, active: false };

        });
        setInfo(updatedItems);
    }

    return (

        <div>
            <Header>

            </Header>
            <div class='w-screen min-h-[700px] flex flex-col items-center'>
                <div class='w-content min-h-[600px] my-xl flex text-txt text-16'>

                    <div class='w-[20%] shrink-0 flex flex-col'>
                        <div class='w-full min-h-[80px] flex justify-center items-center'>
                            <div class='w-[80px] h-[80px] shrink-0 rounded-full overflow-hidden '>
                                <img src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg"
                                    class='object-cover '></img>
                            </div>
                            <p class='w-[80%] shrink-0'>Tài khoản của <br></br> Nguyễn Thái Ngọc Tân</p>
                        </div>
                        {
                            info.map((item, index) => (
                                <Link key={item.id}
                                    onClick={seatActive(item.id)}
                                    style={item.active ? { backgroundColor: "#e1e1e1" } : { backgroundColor: "" }}
                                    class='flex items-center w-content h-[50px] hover:bg-[#e1e1e1] cursor-pointer' to={item.path}>
                                    <FontAwesomeIcon class='w-[20px] h-[20px] shrink-0' icon={item.icon}></FontAwesomeIcon>
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