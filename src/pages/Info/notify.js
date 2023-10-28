import { useState } from "react";

const Notification = () => {

    const [notify, setNotify] = useState(
        [
            {
                id: 1,
                date: "19/03/2023",
                content: "Tài khoản của bạn đủ điều kiện tham gia chương trình Mua trước trả sau Home PayLater. Đăng ký ngay để mua sắm và được giảm đến 500K khi thanh toán bằng Home PayLater"
            },
            {
                id: 2,
                date: "19/03/2023",
                content: "Tài khoản của bạn đủ điều kiện tham gia chương trình Mua trước trả sau Home PayLater. Đăng ký ngay để mua sắm và được giảm đến 500K khi thanh toán bằng Home PayLater"
            },
            {
                id: 2,
                date: "19/03/2023",
                content: "Tài khoản của bạn đủ điều kiện tham gia chương trình Mua trước trả sau Home PayLater. Đăng ký ngay để mua sắm và được giảm đến 500K khi thanh toán bằng Home PayLater"
            },
            {
                id: 2,
                date: "19/03/2023",
                content: "Tài khoản của bạn đủ điều kiện tham gia chương trình Mua trước trả sau Home PayLater. Đăng ký ngay để mua sắm và được giảm đến 500K khi thanh toán bằng Home PayLater"
            }
        ]
    )
    return (
        <div class='w-full h-full flex border-none outline-none  rounded-lg overflow-hidden text-txt text-16'>
            <div class='w-full shrink-0 bg-[#e1e1e1] '>
                <p class='font-bold m-md'>Thông báo của tôi</p>
                {/* <div class='grid grid-flow-row grid-cols-10 mx-md'>
                    <div class='col-span-2'>1</div>
                    <div class='col-span-7'>2</div>
                    <div class='col-span-1'>3</div>
                </div> */}
                {
                    notify.map((item, index) =>
                    (
                        <div class='grid grid-flow-row grid-cols-10 m-md border-b-[1px] min-h-[80px]' key={item.id}>
                            <div class='col-span-1'>{item.date}</div>
                            <div class='col-span-8'>{item.content}
                                <a class='text-button'> Xem chi tiết</a>
                            </div>
                            <div class='col-span-1 text-end cursor-pointer ease-in-out duration-100 font-bold hover:text-button hover:underline'>Xóa</div>
                        </div>
                    )
                    )
                }

            </div>
        </div>
    );
}

export default Notification; 