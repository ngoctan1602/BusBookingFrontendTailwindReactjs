import { faBan, faHourglassStart, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyFormat from "react-currency-format";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ReactStars from "react-rating-stars-component";
import InputConfirmInfo from "./InputConfirmInfo";
import { useState } from "react";
import * as ReviewSV from "../../../services/ReviewSV"
import * as BillServices from "../../../services/BillServices"
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoCompanyNull from "../../../../src/assets/images/defaultCompanyLogo.jpg"
import { Button } from "antd";
const OrderCard = ({ item }) => {
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };

    let seatItems = []
    item.items.map(
        (item) => {
            seatItems.push(item.seatNumber)
        }
    )
    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const cancelOrder = async () => {
        try {
            const resp = await BillServices.changeIsDelete({ id: item.id });
            if (resp.isError) {
                notifyError(resp.data)
                return
            }
            notifySuccess("Hủy chuyến đi thành công")
        } catch (error) {
            console.log(error.data)
        }
    }
    const [rating, setRating] = useState();
    const ratingChanged = (newRating) => {
        setRating(newRating)
    };
    const [review, setReview] = useState("");
    const submitReview = async (close) => {
        const objectCancel = {
            busId: item.items[1].busId,
            Rate: rating,
            Reviews: review
        }
        try {
            setLoading(true)
            const resp = await ReviewSV.createReview(objectCancel)
            setLoading(false)
            notifySuccess()
            setTimeout(
                () => close(), 2000
            )
            console.log(resp)
        } catch (error) {
            console.log(error)
            notifyError()
        }
        console.log(objectCancel)
    }
    const [loading, setLoading] = useState(false)
    return (
        <div class=' w-content flex flex-col justify-center my-md   border-b-[1px]'>
            {
                item.status === 7 ?
                    <div class='flex items-center text-[#00B873]'>
                        < FontAwesomeIcon icon={faTruckFast} />
                        <p class='p-sm'>Chuyến đi đã hoàn thành</p>
                    </div>
                    : item.status === 5  || item.status === 6 ?
                        <div class='flex items-center text-[#071952]'>
                            < FontAwesomeIcon icon={faHourglassStart} />
                            <p class='p-sm'>Chuyến đi sắp tới</p>
                        </div>
                        :
                        <div class='flex items-center text-[#FE0000]'>
                            < FontAwesomeIcon icon={faBan} />
                            <p class='p-sm'>Chuyến đi đã hủy</p>
                        </div>


            }


            <div class=' text-16 text-txt w-full grid grid-flow-row grid-cols-10 gap-x-1.5 relative border-t-[1px] min-h-[110px]'>


                <div class='col-span-1 flex items-center overflow-hidden'>
                    <img class='w-[80px] h-[80px] object-cover rounded-md'
                        src={LogoCompanyNull}
                    //  src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg" 
                    />
                </div>
                <div class='col-span-4 flex justify-center flex-col min-h-[120px] px-sm'>
                    <p class='mx-md'>Nhà xe : {item.items[0].company}</p>
                    {/* <p class='mx-md'>Chuyến đi: {item.distance}</p> */}
                    <p class='mx-md'>Biển số xe : {item.items[0].busNumber}</p>
                    <p class='mx-md'>Mã ghế đã đặt : {seatItems.join(', ')}</p>

                </div>
                <div class='col-span-4 flex justify-center flex-col min-h-[120px] px-sm'>
                    <p>Ngày mua vé: {new Date(item.dateCreate).toLocaleString()}</p>
                    <p>Điểm đón: {item.busStationStart}</p>
                    <p>Điểm đến: {item.busStationEnd}</p>
                    <p>Giờ khởi hành: {new Date(item.dateDeparture).toLocaleString()}</p>
                </div>
                <div class='col-span-1  flex justify-center flex-col'>
                    <p>Tổng Tiền</p>
                    <CurrencyFormat value={item.totalPrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                </div>
            </div>

            <div class='flex items-center justify-end my-md '>
                <Popup trigger={<button class={item.status === 7 ? "confirm-button-new mx-md" : "hidden"}> Đánh giá chuyến đi</button>} position="right center"
                    modal
                    nested
                    closeOnDocumentClick={false}
                    {... { contentStyle }}
                >
                    {
                        close => (

                            <div class='text-16 text-txt relative'>
                                {
                                    loading &&
                                    <div className='absolute bg-hover-txt w-[100%] h-full z-20 opacity-40 '>
                                        <ReactLoading
                                            type="spinningBubbles" color="#e1e1e1e1"
                                            height={'5%'} width={'5%'}
                                            className="absolute left-1/2 top-[40%]  "
                                        />
                                    </div>
                                }
                                <p class='text-20 text-center font-bold'>Đánh giá chuyến đi</p>

                                {/* <div class='flex items-center justify-center'> */}
                                <div class='grid w-full grid-cols-12 '>
                                    {/* <p class='w-[60px] shrink-0'>Bình luận</p> */}
                                    {
                                        <div class='col-span-4 col-start-5'>

                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={30}
                                                activeColor="#EEF296"
                                            />
                                        </div>
                                    }
                                    <div class='col-span-8 col-start-3'>

                                        <textarea
                                            value={review}
                                            placeholder="Nhập bình luận"
                                            onChange={(e) => setReview(e.target.value)}
                                            class='text-txt text-16 bg-bgPopup border-[1px] start-lg overflow-y-auto w-full h-[200px] outline-none rounded-md p-md resize-none'>
                                        </textarea>

                                    </div>
                                </div>

                                <div class='flex justify-center my-md'>
                                    <button class='w-[100px] shrink-0 confirm-button mx-md'
                                        onClick={(e) => submitReview(close)}
                                    >Xác nhận</button>
                                    <button class='w-[100px] shrink-0 confirm-button' onClick={close}>Hủy</button>

                                </div>

                            </div>
                        )
                    }
                </Popup>

                {
                    (item.status === 5 || item.status === 6) &&

                    <button class='confirm-button-new' onClick={cancelOrder} >Hủy chuyến đi</button>
                }
                <ToastContainer
                    position="bottom-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />

            </div>
        </div>
    );
}

export default OrderCard;