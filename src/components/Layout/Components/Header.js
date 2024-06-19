import { Link } from "react-router-dom";
import logo from "../../../assets/images/logotrip.png"
import Button from "./Button";
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import avatarDefault from '../../../assets/images/avatar.png'
import configs from "../../../configs";

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn((token === null || token === undefined) ? false : true);
    }, []);

    const avatar = localStorage.getItem('avatar') === 'null' ? avatarDefault : localStorage.getItem('avatar');
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

                        {isLoggedIn ? (
                            <Link to={configs.routers.profile} id="NotLogin" className="px-[10px]">
                                <div class='w-[100px] h-[40px] shrink-0  overflow-hidden z-1 relative '>
                                    <img class=' w-[40px] h-[40px] object-cover rounded-full' src={avatar} alt="Avatar"></img>
                                </div>
                            </Link>
                        ) : (
                            <Link to={"/login"} className="px-4" id="Login">
                                <Button type="border" content="Đăng nhập">

                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div >
        </header >
    );
}

export default Header;