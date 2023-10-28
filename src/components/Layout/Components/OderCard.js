import { faBan, faHourglassStart, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyFormat from "react-currency-format";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import InputConfirmInfo from "./InputConfirmInfo";
const OrderCard = ({ item }) => {
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };
    return (
        <div class=' w-content flex flex-col justify-center my-md   border-b-[1px]'>
            {
                item.status === "complete" ?
                    <div class='flex items-center text-[#00B873]'>
                        < FontAwesomeIcon icon={faTruckFast} />
                        <p class='p-sm'>Chuyến đi đã hoàn thành</p>
                    </div>
                    : item.status === "cancel"
                        ?
                        <div class='flex items-center text-[#FE0000]'>
                            < FontAwesomeIcon icon={faBan} />
                            <p class='p-sm'>Chuyến đi đã hủy</p>
                        </div>
                        :
                        <div class='flex items-center text-[#071952]'>
                            < FontAwesomeIcon icon={faHourglassStart} />
                            <p class='p-sm'>Chuyến đi chờ xác nhận</p>
                        </div>
            }

            <div class='text-16 text-txt w-full grid grid-flow-row grid-cols-10 gap-x-1.5 relative border-t-[1px] min-h-[110px]'>

                <div class='col-span-1 flex items-center overflow-hidden'>
                    <img class='w-[80px] h-[80px] object-cover rounded-md' src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg" />
                </div>
                <div class='col-span-4 flex justify-center flex-col '>
                    <p class='mx-md'>Nhà xe : {item.company}</p>
                    <p class='mx-md'>Chuyến đi: {item.distance}</p>
                    <p class='mx-md'>Ghế đã đặt : {item.seat}</p>

                </div>
                <div class='col-span-4 flex justify-center flex-col'>
                    <p>Điểm đón: {item.startLocation}</p>
                    <p>Điểm đến: {item.endLocation}</p>
                    <p>Giờ khởi hành: 7 giờ 30 phút ngày 29/10/2023</p>
                </div>
                <div class='col-span-1  flex justify-center flex-col'>
                    <CurrencyFormat value={item.totalPrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                </div>
            </div>

            <div class='flex items-center justify-end my-md '>
                <Popup trigger={<button class={item.status === "complete" ? "confirm-button mx-md" : "hidden"}> Đánh giá chuyến đi</button>} position="right center"
                    modal
                    nested
                    closeOnDocumentClick={false}
                    {... { contentStyle }}
                >
                    {
                        close => (

                            <div class='p-md text-16 text-txt'>
                                <p class='text-20 text-center font-bold'>Đánh giá chuyến đi</p>
                                <div class='w-full h-[1px] bg-txt my-sm' ></div>
                                <div class='flex items-center justify-center'>
                                    {/* <p class='w-[60px] shrink-0'>Bình luận</p> */}
                                    <div class='w-[300px]'>
                                        <textarea class='text-txt text-16 overflow-y-auto w-full h-[200px] outline-none rounded-md p-md resize-none'> At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.</textarea>

                                    </div>
                                </div>

                                <div class='flex justify-center my-md'>
                                    <button class='w-[100px] shrink-0 confirm-button mx-md'>Xác nhận</button>
                                    <button class='w-[100px] shrink-0 confirm-button' onClick={close}>Hủy</button>
                                </div>
                            </div>
                        )
                    }
                </Popup>

                {/* <button class={item.status === "complete" ? "confirm-button mx-md" : "hidden"} >Đánh giá chuyến đi</button> */}
                <button class='confirm-button' >Đặt lại chuyến đi</button>
            </div>
        </div>
    );
}

export default OrderCard;