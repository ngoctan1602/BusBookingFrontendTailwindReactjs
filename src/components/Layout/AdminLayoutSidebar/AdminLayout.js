import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";

const AdminLayout = ({ children }) => {
    const [info, setInfo] = useState([
        {
            id: 1, content: "Quản lý tài khoản khách hàng", icon: faUser, active: true, path: '/manage-account'
        },
        {
            id: 2, content: "Quản lý nhà xe", icon: faBusinessTime, active: false,/* path: '/manage-company' */
        },
        {
            id: 3, content: "Quản lý loại xe", icon: faBusSimple, active: false, path: '/manage-typebus'
        },
        {
            id: 4, content: "Quản lý bến bãi", icon: faMapLocation, active: false, path: '/manage-busstation'
        }
    ])


    const [content, setContent] = useState("Quản lý tài khoản khách hàng")
    const seatActive = useCallback((id) => {
        return () => {
            const updatedItems = info.map(item => {
                if (item.id === id) {
                    setContent(item.content);
                    return { ...item, active: true };
                }

                return { ...item, active: false };

            });
            setInfo(updatedItems);
        }
    }, [info])



    return (

        <div class='flex flex-col w-full h-[100vh] bg-bg'>


            <div class='h-[80px] shrink-0 bg-button'>
                Đây là Header admin page
            </div>
            <div class='flex w-full h-[100vh] bg-bg'>

                <div class='flex flex-col w-[20%] shrink-0 bg-txt text-bg'>
                    {
                        info.map((item, index) => (
                            <Link key={item.id}
                                onClick={seatActive(item.id)}
                                style={item.active ? { backgroundColor: "#75718a" } : { backgroundColor: "" }}
                                class='px-md flex items-center w-full h-[50px] hover:bg-[hover-txt] cursor-pointer' to={item.path}>
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
            </div>

        </div >
    );
}

export default AdminLayout;