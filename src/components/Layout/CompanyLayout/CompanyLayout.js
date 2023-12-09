import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faCartFlatbed, faCat, faChartColumn, faChartLine, faChevronDown, faRightFromBracket, faTicket, faTurnDown, faUpDown, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { faBusinessTime, faBus, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import adminlogo from "../../../assets/images/AdminLogo.png"
import { Link } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import Popup from "reactjs-popup";

import { useNavigate } from "react-router-dom";
const CompanyLayout = ({ children }) => {
    const navigate = useNavigate();
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "400px" };
    const [info, setInfo] = useState([
        {
            id: 1, content: "Quản lý điểm đón trả khách", icon: faCartFlatbed, active: false, path: '',
            children: [

            ]
        },
        {
            id: 2, content: "Quản lý xe", icon: faBus, active: true, path: '',
            children: [
                {
                    id: "c1", content: "Tổng quan", icon: faLocationCrosshairs, active: false, path: '/company/bus/overview'
                },
                {
                    id: "c2", content: "Quản lý điểm đón trả khách", icon: faLocationCrosshairs, active: false, path: ''
                },
                {
                    id: "c3", content: "Quản lý loại xe", icon: faLocationCrosshairs, active: false, path: ''
                },
                {
                    id: "c4", content: "Quản lý loại chỗ ngồi", icon: faLocationCrosshairs, active: false, path: ''
                }
            ]
        },
        {
            id: 3, content: "Quản lý đơn hàng", icon: faCartFlatbed, active: false, path: '',
            children: [

            ]
        },

        {
            id: 4, content: "Thống kê", icon: faChartLine, active: false, path: '',
            children: [
                {
                    id: "c2", content: "Thống kê doanh thu", active: false, path: '', icon: faTicket
                },
                {
                    id: "c3", content: "Thống kê số lượng vé", active: false, path: '', icon: faChartColumn
                }
            ]
        },

    ])

    // const [isShowChildren, setIsShowChildren] = useState(
    //     [
    //         { id: 1, active: false },
    //         { id: 2, active: false },
    //         { id: 3, active: false }
    //     ]
    // );
    // const [content, setContent] = useState("Quản đơn hàng")

    // const updateParent = useCallback((id) => {

    //     return () => {
    //         const updatedItem = info.map(item => {
    //             let hasActiveChild = false;

    //             return {
    //                 ...item,
    //                 children: item.children.map(i => {
    //                     if (i.id === id) {
    //                         document.title = i.content
    //                         // setContent(i.content)
    //                         hasActiveChild = true
    //                         return {
    //                             ...i,
    //                             active: true,
    //                         };
    //                     }
    //                     return {
    //                         ...i,
    //                         active: false,
    //                     };
    //                 }),
    //                 active: hasActiveChild
    //             }
    //         });

    //         setInfo(updatedItem);
    //     }
    // }, [info])




    // const clickParent = useCallback((id) => {
    //     return () => {
    //         const updatedItems = isShowChildren.map(item => {
    //             if (item.id === id) {
    //                 return { ...item, active: !item.active };
    //             }

    //             return { ...item };

    //         });
    //         setIsShowChildren(updatedItems);


    //     }
    // }, [isShowChildren])




    return (

        <div class='flex flex-col w-full min-h-full bg-bg'>


            <div class='h-[60px] shrink-0 bg-gradient-to-br from-button to-[#B0D9B1] grid grid-flow-row grid-cols-11 items-center text-txt text-16'>

                <div class='col-span-2 col-start-1 flex items-center ml-md'>
                    <img class='h-[40px] w-[100px]' src={adminlogo} >

                    </img>
                    <p class='ml-sm font-bold uppercase'>Company Page</p>
                </div>
                <div class='col-span-1 col-start-10 flex items-center'>
                    <img class='h-[40px] w-[40px] rounded-full' src={adminlogo} >

                    </img>
                    <p>Ngọc Tân</p>
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
                                    <Link class='col-start-3 col-span-3 col confirm-button text-center' to='/admin/login'>Xác nhận</Link>
                                    <button class='col-span-3 confirm-button' onClick={close}>Hủy</button>

                                </div>


                            </div>
                        )
                    }

                </Popup>
            </div>
            <div class='flex w-full h-[100vh] bg-bg'>

                <div class='flex flex-col h-[700px] w-[20%] shrink-0 bg-txt text-bg'>
                    {
                        info.map((item, index) => (
                            <div>
                                <Link key={item.id}
                                    // onClick={clickParent(item.id)}
                                    // style={{ backgroundColor: (item.active && !isShowChildren[index].active) ? "#75718a" : "", transitionTimingFunction: "esea-in-out", transitionDuration: "2000ms", transitionProperty: "backgroundColor" }}
                                    class='px-md flex items-center w-full h-[50px] hover:bg-[#75718a] cursor-pointer ease-in-out duration-200' to={item.path}>
                                    <FontAwesomeIcon class='w-[20px] h-[20px] shrink-0' icon={item.icon}></FontAwesomeIcon>
                                    <p class='mx-sm shrink-0'> {item.content}</p>
                                    <FontAwesomeIcon icon={faChevronDown} ></FontAwesomeIcon>
                                </Link>

                                {
                                    // (isShowChildren[index].active && item.id === isShowChildren[index].id) &&
                                    (item.children).map((i, index) => (

                                        <Link key={i.id}
                                            // onClick={() => navigate(i.path)}
                                            // onClick={updateParent(i.id)}
                                            // style={i.active ? { backgroundColor: "#75718a" } : { backgroundColor: "" }}
                                            class='px-xl flex items-center w-full h-[50px] hover:bg-[#75718a] cursor-pointer ease-in-out duration-150' to={i.path}>
                                            <FontAwesomeIcon class='w-[20px] h-[20px] shrink-0' icon={i.icon}></FontAwesomeIcon>
                                            <p class='mx-sm shrink-0'> {i.content}</p>
                                        </Link>

                                    ))
                                }

                            </div>
                        ))
                    }
                </div>
                <div class='flex w-[80%] h-full shrink-0 ' >
                    <div class='w-full p-md h-full'>
                        {children}
                    </div>
                </div>
            </div>

        </div >
    );
}

export default CompanyLayout;