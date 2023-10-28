import { useState } from "react";

import magnifyingGlass from "../../assets/images/icons8-magnifying-glass-32.png"
import OrderCard from "../../components/Layout/Components/OderCard";

const Order = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [search, setSearch] = useState("");
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(0);
    const [listAbout, setListAbout] = useState(
        [
            {
                id: 1, content: "Tất cả đơn hàng", active: true
            },
            {
                id: 2, content: "Chờ xác nhận", active: false
            },
            {
                id: 3, content: "Đã hoàn thành", active: false
            },
            {
                id: 4, content: "Đã hủy", active: false
            },
        ]
    )
    const activeListAbout = (offsetWidth, offsetLeft, id) => {
        const updatedItems = listAbout.map(item => {
            if (item.id === id) {
                return { ...item, active: true };
            }

            return { ...item, active: false };

        });

        setOffsetLeft(offsetLeft);
        setOffsetWidth(offsetWidth);
        setListAbout(updatedItems);
    }

    const listOrder = [
        {
            id: 1, company: "Thanh Thủy",
            distance: "Nha Trang - Sài Gòn",
            seat: "A1, A2, A3",
            startLocation: "Bến xe Vạn Giã",
            endLocation: "Bến xe Nông Lâm",
            totalPrice: 200000,
            status: "complete"
        },
        {
            id: 2, company: "Phương Trang",
            distance: "Daknong - Sài Gòn",
            seat: "B1, B2, B3",
            startLocation: "Bến xe Dak Nong",
            endLocation: "Bến xe Nông Lâm",
            totalPrice: 300000,
            status: "cancel"
        },
        {
            id: 3, company: "Liên Hưng",
            distance: "Phú Yên - Sài Gòn",
            seat: "B1, B2, B3",
            startLocation: "Bến xe Tuy Hòa",
            endLocation: "Bến xe Nông Lâm",
            totalPrice: 300000,
            status: "confirm"
        },
        {
            id: 1, company: "Thanh Thủy",
            distance: "Nha Trang - Sài Gòn",
            seat: "A1, A2, A3",
            startLocation: "Bến xe Vạn Giã",
            endLocation: "Bến xe Nông Lâm",
            totalPrice: 200000,
            status: "complete"
        },
        {
            id: 2, company: "Phương Trang",
            distance: "Daknong - Sài Gòn",
            seat: "B1, B2, B3",
            startLocation: "Bến xe Dak Nong",
            endLocation: "Bến xe Nông Lâm",
            totalPrice: 300000,
            status: "cancel"
        },
        {
            id: 3, company: "Liên Hưng",
            distance: "Phú Yên - Sài Gòn",
            seat: "B1, B2, B3",
            startLocation: "Bến xe Tuy Hòa",
            endLocation: "Bến xe Nông Lâm",
            totalPrice: 300000,
            status: "confirm"
        }

    ]

    const listOrderComplete = listOrder.filter((order) => order.status === "complete")

    const listOrderCancle = listOrder.filter((order) => order.status === "cancel")

    const listOrderConfirm = listOrder.filter((order) => order.status === "confirm")



    return (
        <div class='w-full h-full flex border-none outline-none  rounded-lg overflow-hidden text-txt text-16'>
            <div class='w-full shrink-0 bg-[#e1e1e1] flex flex-col items-center '>
                <p class='font-bold p-lg text-center mx-md bg-button w-full'>Quản lý đơn hàng</p>
                <div class='w-content grid grid-flow-row grid-cols-4 relative'>
                    {
                        listAbout.map((item, index) => (
                            <div class='text-center border-b-[2px] border-txt cursor-pointer py-sm'
                                style={{ color: item.active ? " #00B873" : "" }}
                                onClick={(e) => activeListAbout(e.target.offsetWidth, e.target.offsetLeft, item.id)}>
                                {item.content}
                            </div>
                        ))
                    }
                    <span class='h-[2px] bottom-position ease-in-out duration-500 bg-button' style={{ left: `${offsetLeft}px`, width: `${offsetWidth}px` }}></span>
                </div>
                <div class=' w-content my-md h-[50px] text-txt border-[1px] border-txt text-16 rounded-md overflow-hidden duration-75'
                    style={{ border: isFocus ? "2px solid #00B873" : "" }}>
                    <div class='grid grid-flow-row grid-cols-12 h-full rounded-md'>
                        <div class='col-span-1 text-center  flex items-center justify-center'>
                            <img class='w-[20px] h-[20px]' src={magnifyingGlass} />
                        </div>
                        <input placeholder="Tìm đơn hàng theo mã đơn hàng, nhà xe, ngày đi"
                            class='bg-[#e1e1e1] col-span-10 focus:outline-none focus:border-none' onFocus={() => setIsFocus(!isFocus)}
                            onBlur={() => setIsFocus(!isFocus)}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        >
                        </input>
                        <div class='col-span-1 text-center  flex items-center justify-center border-l-[2px]   
                        my-sm   '
                            style={{ borderLeft: isFocus ? "2px solid #00B873" : "" }}>
                            <p class='col-span-1 text-center cursor-pointer hover:text-button hover:underline'
                                onClick={() => alert(search)}>Tìm kiếm</p>
                        </div>
                    </div>



                </div>

                {
                    listAbout[0].active ?
                        listOrder.map((item, index) => (
                            <OrderCard item={item}></OrderCard>
                        )) :
                        listAbout[2].active ?
                            listOrderComplete.map((item, index) => (
                                <OrderCard item={item}></OrderCard>
                            )) :
                            listAbout[1].active ?
                                listOrderConfirm.map((item, index) => (
                                    <OrderCard item={item}></OrderCard>
                                )) : listAbout[3].active &&
                                listOrderCancle.map((item, index) => (
                                    <OrderCard item={item}></OrderCard>
                                ))

                }

            </div>

        </div>
    );
}

export default Order;