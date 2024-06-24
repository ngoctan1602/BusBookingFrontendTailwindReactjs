import CurrencyFormat from "react-currency-format";
import { faCaretRight, faL, faStar } from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons"
import { faHammer } from "@fortawesome/free-solid-svg-icons"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import seat from "../../../assets/images/seat.png"
import seatActive from "../../../assets/images/seat_button.png"
import seatError from "../../../assets/images/seat-error.png"
import steeringWheel from "../../../assets/images/steering_wheel.png"
import { Tooltip as ReactTooltip, Tooltip } from "react-tooltip";
import Location from "./Location";
import Input from "./Input";
import InputConfirmInfo from "./InputConfirmInfo";
import LogoCompanyNull from "../../../../src/assets/images/logocompanynull.png"
import * as BillSV from "../../../services/BillServices"
import * as ReviewSV from "../../../services/ReviewSV"
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard"
import Paypal from "../../Paypal/Paypal";
const BusCard = ({ item }) => {
    // console.log(item.itemResponses.slice(0, item.itemResponses.length / 2))
    let navigate = useNavigate();
    const notifySuccess = () => toast.success('Đặt chỗ thành công!', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = () => toast.error('Đặt chỗ thất bại', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyWarning = (message) =>
        toast.warning(message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });


    const [about, setAbout] = useState(false);
    const [checkout, setCheckout] = useState(false);

    const [listAbout, setListAbout] = useState(
        [
            {
                id: 1, content: "Hình ảnh", active: true
            },
            {
                id: 2, content: "Tiện ích", active: false
            },
            {
                id: 3, content: "Điểm đón trả", active: false
            },
            {
                id: 4, content: "Chính sách", active: false
            },
            {
                id: 5, content: "Đánh giá", active: false
            }
        ]
    )
    const [loading, setLoading] = useState(false);
    const [listImg, setListImg] = useState(
        [
            {
                id: 1, img: "https://vcdn1-dulich.vnecdn.net/2022/07/04/11-5977-1656858349-1656932044-3356-1656932377.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wlMP_C-PBfELkksQF0D3kQ"
            },
            {
                id: 2, img: "https://tuart.net/wp-content/uploads/2023/06/z4476593426117_2098eb702b55775141c2afe719a0db24-scaled.jpg"
            },
            {
                id: 3, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmNIz8BYRBKwkFRlYBR4DcmL74qYrSDKP0vw&usqp=CAU"
            },
            {
                id: 4, img: "https://vcdn1-dulich.vnecdn.net/2022/07/04/11-5977-1656858349-1656932044-3356-1656932377.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wlMP_C-PBfELkksQF0D3kQ"
            },
            {
                id: 5, img: "https://tuart.net/wp-content/uploads/2023/06/z4476593426117_2098eb702b55775141c2afe719a0db24-scaled.jpg"
            },
            {
                id: 6, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmNIz8BYRBKwkFRlYBR4DcmL74qYrSDKP0vw&usqp=CAU"
            },
            {
                id: 7, img: "https://vcdn1-dulich.vnecdn.net/2022/07/04/11-5977-1656858349-1656932044-3356-1656932377.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wlMP_C-PBfELkksQF0D3kQ"
            },
            {
                id: 8, img: "https://tuart.net/wp-content/uploads/2023/06/z4476593426117_2098eb702b55775141c2afe719a0db24-scaled.jpg"
            },
            {
                id: 9, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmNIz8BYRBKwkFRlYBR4DcmL74qYrSDKP0vw&usqp=CAU"
            }
        ]
    );

    const [current, setCurrent] = useState(0);
    const selectImg = (current, next) => {
        if (!next && current >= 1)
            setCurrent(current - 1);
        else if (next && current < listImg.length - 1)
            setCurrent(current + 1);
        console.log(next + " " + current + " " + listImg.length)
    }

    const [imgId, setImgId] = useState(listImg[0].id);

    const [curentImg, setCurrentImg] = useState(listImg[0]);
    const [reviews, setReviews] = useState([])
    const [isloading, setIsLoading] = useState(false)
    useEffect(() => {
        const ii = listImg.filter(item => item.id == imgId);
        const params = {
            busId: item.busId,
            pageSize: 200,
        }
        setIsLoading(true)
        try {
            const resp = ReviewSV.getAllInBus({ busId: params.busId, pageSize: params.pageSize })
            // alert(resp.data.items[1].reviews)
            setIsLoading(false)
            setReviews(resp.data.items)

        } catch (error) {
            console.log(error)
        }
        setCurrentImg(ii);
        return () => {
            console.log(ii[0])
        };
    }, [imgId]);

    // useEffect(() => {


    //     return () => {
    //         console.log("Cal reviews")
    //     };
    // }, []);

    const openAbout = () => {
        setAbout(!about);
        setIsChooseTrip(false);
    }



    const [offsetLeft, setOffsetLeft] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(0);

    const [utilities, setUtilities] = useState([
        {
            id: 1, icon: faCakeCandles, content: "Bánh ngọt", description: "Xe có phục vụ bánh ngọt"
        },
        {
            id: 2, icon: faHammer, content: "Búa phá kính", description: "Dùng để phá kính ô tô thoát hiểm trong trường hợp khẩn cấp."
        }
    ])

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

    const [isChooseTrip, setIsChooseTrip] = useState(false);
    const toggleChooseTrip = () => {
        setIsChooseTrip(!isChooseTrip);
        setAbout(false);
    }

    const [seatBooking, setSeatBooking] = useState(
        [
            {
                id: 1, icon: seat, content: "Ghế trống"
            },
            {
                id: 2, icon: seatActive, content: "Ghế đang chọn"
            },
            {
                id: 3, icon: seatError, content: "Ghế đã có người mua"
            }
        ]
    )
    const [seatHover, setSeatHover] = useState();
    const [oneStFloor, setOneStFloor] = useState(
        item.itemResponses.slice(0, item.itemResponses.length / 2))
    const [secondFloor, setSecond] = useState(
        item.itemResponses.slice(item.itemResponses.length / 2)
    )




    const [stepBooking, setStepBooking] = useState(
        [
            {
                id: 1, icon: seatBooking[1].icon, content: "Chọn ghế", active: true, isPng: true
            },
            {
                id: 2, icon: faLocationDot, content: "Chọn điểm đón trả", active: false, isPng: false
            },
            {
                id: 3, icon: faInfoCircle, content: "Nhập thông tin", active: false, isPng: false
            }
        ]
    );

    const [currentStepBooking, setCurrentStepBooking] = useState(1);

    const nextStateBooking = () => {
        if (currentStepBooking === 1 && selectedIdSeats.length === 0) {

            notifyWarning("Vui lòng chọn ghế")

            return
        }
        if (currentStepBooking === 2 && (selectedBusStop.busStationEndId === -1 || selectedBusStop.busStationStartId === -1)) {
            notifyWarning("Vui lòng chọn điểm đón trả")
            return
        }



        if (currentStepBooking <= stepBooking.length - 1) {

            setCurrentStepBooking(currentStepBooking + 1);
            const updatedItems = stepBooking.map(item => {
                if (item.id === currentStepBooking + 1) {
                    return { ...item, active: true };
                }

                return { ...item, active: false };
            });

            setStepBooking(updatedItems);
        }


        console.log(stepBooking);
    }
    const prevStateBooking = () => {
        if (currentStepBooking > 1) {

            setCurrentStepBooking(currentStepBooking - 1);
            const updatedItems = stepBooking.map(item => {
                if (item.id === currentStepBooking - 1) {
                    return { ...item, active: true };
                }

                return { ...item, active: false };

            });
            setStepBooking(updatedItems);
        }
    }
    const [totalPrice1, setTotalPrice1] = useState(0);
    const [totalPrice2, setTotalPrice2] = useState(0);

    const [selectedIdSeats, setSelectedIdSeats] = useState([]);

    const handleClickSeatOneFloor = (id) => {
        let total = 0;
        const updatedItems = oneStFloor.map(item => {
            if (item.id === id) {
                if (item.status === 1) { // 1 là đang trống
                    total += item.price;
                    setSelectedIdSeats(prevIds => [...prevIds, id]);
                    return { ...item, status: 2 }; // 2 là đang chọn
                }
                setSelectedIdSeats(prevIds => prevIds.filter(prevId => prevId !== id));
                return { ...item, status: 1 };
            }
            if (item.status == 2) {

                total += item.price;
            }
            return { ...item };
        });
        setTotalPrice1(total);
        setOneStFloor(updatedItems);

    }

    const handleClickSeatSecondFloor = (id) => {
        let total = 0;
        const updatedItems = secondFloor.map(item => {
            if (item.id === id) {
                if (item.status === 1) {
                    total += item.price;
                    setSelectedIdSeats(prevIds => [...prevIds, id]);
                    return { ...item, status: 2 };
                }
                setSelectedIdSeats(prevIds => prevIds.filter(prevId => prevId !== id));
                return { ...item, status: 1 };
            }
            if (item.status === 2) {

                total += item.price;
            }
            return { ...item };
        });
        setTotalPrice2(total);
        setSecond(updatedItems);

    }

    const [startLocation, setStartLocation] = useState(
        item.listStation
    );

    const [endLocation, setEndLocation] = useState(
        item.listStation
    );

    const [selectedBusStop, setSelectedBusStop] = useState(
        {
            busStationStartId: -1,
            busStationEndId: -1,
        }
    );
    const [nameSelectedBusStop, setNameSelectedBusStop] = useState(
        {
            busStationStartId: "",
            busStationEndId: "",
        }
    );
    const [timeDepature, settimeDepature] = useState(
        {
            busStationStartId: "",
            busStationEndId: "",
        }
    );


    const onSelectBusStop = (name, id, nameStop, time) => {
        setSelectedBusStop({ ...selectedBusStop, [name]: Number(id) })
        setNameSelectedBusStop({ ...nameSelectedBusStop, [name]: nameStop })
        settimeDepature({ ...timeDepature, [name]: time })
    }



    const [inputName, setInputName] = useState(
        {
            placeholder: "Nhập họ và tên",
            value: "",
            spanWidth: 110,
            type: "text"
        }
    )
    const [inputEmail, setInputEmail] = useState(
        {
            placeholder: "Nhập email",
            value: "",
            spanWidth: 88,
            type: "text"
        }
    )
    const [inputPhone, setInputPhone] = useState(
        {
            placeholder: "Nhập số điện thoại",
            value: "",
            spanWidth: 136,
            type: "text"
        }
    )

    const ChangeName = (value) => {
        setInputName({ placeholder: inputName.placeholder, value: value, spanWidth: inputName.spanWidth });
    }

    const ChangEmail = (value) => {
        setInputEmail({ placeholder: inputEmail.placeholder, value: value, spanWidth: inputEmail.spanWidth });
    }
    const ChangePhone = (value) => {
        setInputPhone({ placeholder: inputPhone.placeholder, value: value, spanWidth: inputPhone.spanWidth });
    }

    const [isOpenVoucherYTrip, setOpenVoucherYTrip] = useState(false);
    const [isOpenVoucher, setOpenVoucher] = useState(false);
    const [applyVoucher, setApplyVoucher] = useState({ active: false, value: 0 })



    const createBill = async () => {
        if (
            (
                localStorage.getItem("token") === null ||
                localStorage.getItem("token") === undefined
            )) {
            notifyWarning("Hãy đăng nhập")
            setTimeout(
                () =>
                    navigate("/login")
                , 2000
            )
            return

        }
        const items =
            selectedIdSeats.map((item,) => {
                return { ticketItemId: item }
            })

        const objectAdd = {
            TicketRouteDetailStartId: selectedBusStop.busStationStartId,
            TicketRouteDetailEndId: selectedBusStop.busStationEndId,
            itemsRequest: items
        }

        try {
            setLoading(true)
            //Reserve
            const resp = await BillSV.reserve(objectAdd);
            if (!resp.isError && resp.isError !== undefined) {
                notifySuccess()
                setTimeout(() => navigate("/checkout", { state: { Order: objectAdd, TotalPrice: totalPrice1 + totalPrice2 } }), 2000);
            }
            else {
                notifyError()
            }
            setLoading(false)
        } catch (error) {
            notifyError()
        }

    }
    return (
        <div class='bg-[#e2e2e2] w-full flex flex-col my-md rounded-md box-shadow-content hover:shadow-xl hover:scale-[1.01] ease-in-out duration-150 '>
            {/* Đây là phần chính của card */}

            <div class='w-full h-[200px] flex'>
                <div class='m-sm w-[120px]'>
                    <img class='w-[120px] h-[120px] object-cover rounded-md' src={item.companyLogo ? item.companyLogo : LogoCompanyNull}>

                    </img>
                </div>

                <div class="m-sm w-[300px] text-txt">
                    <div class='flex items-center'>
                        <p class='mx-sm text-16 font-bold'>{item.company}</p>
                        <button class='bg-button flex items-center justify-between w-[70px] text-bg'>
                            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                            <p>{item.star}</p>
                            <p>({item.totalComment})</p>
                        </button>
                    </div>
                    <p class='m-sm'>{item.busType}</p>
                    <div class='m-sm flex text-txt items-center'>
                        <FontAwesomeIcon icon={faCircleDot} class='text-txt w-[14px] h-[14px]' />
                        <p class='mx-sm'>{item.listStation[0].station} - </p>
                        <p >{new Date(item.listStation[0].departureTime)
                            .toLocaleString("en-CA",
                                {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    // second: 'numeric',
                                    hour12: false, // Use 24-hour format
                                }
                            )}</p>
                    </div>
                    <div class='m-sm flex items-center'>
                        <div class=' mx-[6px] w-[1px] h-[30px] bg-txt'></div>
                        {item.intendTime} tiếng
                    </div>
                    <div class='m-sm flex items-center'>
                        <FontAwesomeIcon icon={faLocationDot} class='text-txt w-[16px] h-[16px]' />
                        <p class='mx-sm'>{item.listStation[item.listStation.length - 1].station} - </p>
                        <p>{new Date(item.listStation[item.listStation.length - 1].arrivalTime)
                            .toLocaleString("en-CA",
                                {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    // second: 'numeric',
                                    hour12: false, // Use 24-hour format
                                }
                            )}</p>
                    </div>
                </div>

                <div class='relative m-sm flex flex-grow'>
                    <button class='about-position text-button font-bold underline cursor-pointer flex items-center ' onClick={() => openAbout()}>
                        <p class='mr-sm'>Xem thông tin chi tiết</p>
                        {
                            about
                                ?
                                <FontAwesomeIcon icon={faCaretUp} size="lg"></FontAwesomeIcon>
                                :
                                <FontAwesomeIcon icon={faCaretDown} size="lg"></FontAwesomeIcon>
                        }
                    </button>
                    <div class='price-position flex flex-col items-end text-txt text-16'>
                        <p class='text-button font-bold text-[20px] my-sm' >
                            Chỉ từ <CurrencyFormat value={item.itemResponses[0].price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </p>
                        <CurrencyFormat class='line-through my-sm' value={item.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        <p >Còn {item.totalEmptySeat} chỗ trống</p>
                        <button class='my-sm border-[1px] rounded-md border-button opacity-90 p-sm
                     hover:bg-button hover:shadow-md hover:text-bg ease-in-out duration-300'
                            onClick={() => toggleChooseTrip()}>Chọn chuyến</button>
                    </div>
                </div>
            </div>

            {/* Đây là phần about */}

            {
                about &&
                <div class='w-full min-h-[200px] flex flex-col items-center'>
                    <div class='w-content h-[1px] bg-txt'>
                    </div>
                    <div class='w-content flex flex-col items-center'>
                        <div class='flex items-center bg-bg relative'>

                            {
                                listAbout.map((li, index) => (
                                    <p key={li.id}
                                        class={li.active ? 'box-border p-md text-button font-bold border-b-[1px] duration-500 '
                                            : 'cursor-pointer p-md border-b-[1px] border-txt'}

                                        onClick={(e) => activeListAbout(e.target.offsetWidth, e.target.offsetLeft, li.id)}
                                    >
                                        {li.content}

                                    </p>

                                ))

                            }
                            <span class='h-[3px] bottom-position ease-in-out duration-500 bg-button' style={{ left: `${offsetLeft}px`, width: `${offsetWidth}px` }}></span>
                        </div>

                        <div class='w-full min-h-[200px] my-md'>
                            {
                                listAbout[0].active
                                    ?
                                    <div class=' flex flex-col w-full items-center'>
                                        <div class='flex w-content justify-center items-center'>
                                            {
                                                current === 0 ?
                                                    <button onClick={() => selectImg(current, false)} class=' cursor-pointer'>

                                                        < FontAwesomeIcon icon={faCaretLeft} size="xl" color="red"
                                                        />
                                                    </button>
                                                    :
                                                    <button onClick={() => selectImg(current, false)} class='cursor-pointer'>
                                                        < FontAwesomeIcon icon={faCaretLeft} size="xl" color="white"
                                                            onClick={() => selectImg(current, false)}
                                                        />
                                                    </button>
                                            }
                                            {

                                                // < img src={listImg[current].img} class='animate-wiggle w-content h-[350px] object-cover' />
                                                < img src={curentImg[0].img} class='w-content h-[350px] object-cover' />
                                            }

                                            {
                                                current === listImg.length - 1 ?

                                                    <button onClick={() => selectImg(current, true)} class=' cursor-pointer'>

                                                        < FontAwesomeIcon icon={faCaretRight} size="xl" color="red"
                                                        />
                                                    </button>
                                                    :
                                                    <button onClick={() => selectImg(current, true)} class='cursor-pointer'>
                                                        < FontAwesomeIcon icon={faCaretRight} size="xl" color="white"

                                                        />
                                                    </button>
                                            }

                                        </div>

                                        {/* Đây là khu vực ảnh phụ */}
                                        <div class='w-content min-h-[130px] grid grid-rows-1 grid-flow-col gap-4 overflow-auto justify-items-center'>

                                            {
                                                listImg.map((item, index) => (

                                                    <>
                                                        {
                                                            item.id === imgId ?
                                                                <div class='h-[130px] w-[130px]  m-sm border-button border-[2px] scale-105' onClick={() => setImgId(item.id)}>
                                                                    <img src={item.img} class='h-full w-full object-cover'>
                                                                    </img>

                                                                </div>
                                                                :
                                                                <div class='h-[130px] w-[130px]  m-sm' onClick={() => setImgId(item.id)}>
                                                                    <img src={item.img} class='h-full w-full object-cover'>
                                                                    </img>

                                                                </div>
                                                        }
                                                    </>
                                                ))
                                            }


                                        </div>



                                    </div>
                                    :
                                    listAbout[1].active
                                        ?
                                        <div class='w-full min-h-[200px] grid grid-cols-3 grid-flow-row gap-sm'>

                                            {
                                                utilities.map((item, index) => (
                                                    <div key={item.id} class='h-[130px] bg-txt flex  text-16 text-bg opacity-80 rounded-md'>
                                                        <div class='h-full m-sm'>
                                                            <FontAwesomeIcon icon={item.icon} size="lg" />
                                                        </div>
                                                        <div class='h-[80px] m-sm relative'>
                                                            <p class='font-bold'>{item.content}</p>
                                                            <p class='h-[50px] w-fulltext-ellipsis overflow-hidden '>{item.description}  </p>
                                                        </div>
                                                    </div>
                                                ))
                                            }



                                        </div>
                                        :
                                        listAbout[2].active
                                            ?
                                            <p>Nội dung Điểm đón, trả</p>
                                            :
                                            listAbout[3].active
                                                ?
                                                <p>Nội dung Chính sách</p>
                                                :
                                                <div className="w-full h-[200px] overflow-y-auto">
                                                    {

                                                        // (!isloading && reviews.length > 0) &&
                                                        (!isloading) ?
                                                            reviews.map((item) =>
                                                                <ReviewCard item={item} />)
                                                            :
                                                            "Đang tải"
                                                    }
                                                </div>

                            }
                        </div>
                    </div>
                </div>
            }

            {
                isChooseTrip &&
                <div class='w-full min-h-[400px]  flex flex-col items-center relative pb-xl mb-sm'>
                    <div class='w-content h-[1px] bg-txt' />
                    <div class='flex justify-items-center items-center relative '>
                        {
                            stepBooking.map((item, index) => (
                                <div class={item.active ?
                                    'flex items-center justify-center p-sm border-b-button border-b-[2px] text-button'
                                    :
                                    'flex items-center justify-center p-sm border-b-txt border-b-[2px] text-txt'
                                }

                                >
                                    {
                                        item.isPng ?
                                            item.active ?
                                                <img class='h-[20px] w-[20px] text-button' src={item.icon}></img>
                                                :
                                                <img class='h-[20px] w-[20px] text-button' src={seat}></img>
                                            :
                                            <FontAwesomeIcon class='h-[20px] w-[20px]' icon={item.icon} />
                                    }
                                    <p>{item.content}</p>
                                </div>

                            ))
                        }


                    </div>

                    {
                        stepBooking[0].active &&
                        <div class='w-content my-xl min-h-[200px] justify-items-center grid grid-flow-row grid-rows-1 grid-cols-3 gap-sm'>
                            {/* Đây là chú thích */}
                            <div class='w-[200px] flex flex-col text-txt'>
                                <p class='font-16 font-bold'>Chú thích</p>

                                {
                                    seatBooking.map((item, index) =>
                                    (
                                        <div class='flex items-center my-lg'>
                                            <img src={item.icon}></img>
                                            <p class='text-16 ml-sm'>{item.content}</p>
                                        </div>
                                    )
                                    )
                                }
                            </div>
                            {/* Đây là tầng dưới */}
                            <div class='w-[200px] min-h-[400px]'>
                                <p class='font-bold text-16'>Tầng dưới</p>
                                <div class='border-[1px] rounded-md border-txt my-lg'>
                                    <img class='w-[40px] h-[40px] m-sm cursor-not-allowed' src={steeringWheel}></img>
                                    <div class='min-h-[200px] m-sm justify-items-center grid grid-flow-row grid-rows-4 grid-cols-3'>
                                        {
                                            oneStFloor.map((item, index) => (
                                                <div
                                                    onPointerOver={(e) => setSeatHover("Mã ghế: " + item.id + " ,Giá: " + item.price)}
                                                    onClick={(e) => { (item.status === 1 || item.status === 2) && handleClickSeatOneFloor(item.id) }}
                                                    data-tooltip-id="my-tooltip"
                                                    class={item.status === 3 ?
                                                        'flex justify-center items-center my-sm cursor-not-allowed hover:scale-105' :
                                                        'flex justify-center items-center my-sm cursor-pointer hover:scale-105'
                                                    }
                                                >
                                                    {
                                                        item.status === 1
                                                            ?
                                                            <img class='' src={seatBooking[0].icon}></img>
                                                            : item.status === 2 ?
                                                                <img class='' src={seatBooking[1].icon}></img>
                                                                :
                                                                <img class='' src={seatBooking[2].icon}></img>
                                                    }


                                                </div>

                                            ))
                                        }
                                        <ReactTooltip
                                            id="my-tooltip"
                                            place="top"
                                            variant="info"
                                            style={{ backgroundColor: "#00B873", color: "#222" }}
                                            content={seatHover}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Đây là tầng trên */}
                            <div class='w-[200px] min-h-[400px]'>
                                <p class='font-bold text-16'>Tầng trên</p>
                                <div class='border-[1px] rounded-md border-txt my-lg'>
                                    <div class='w-[40px] h-[40px] m-sm'></div>
                                    <div class='min-h-[300px] m-sm justify-items-center grid grid-flow-row grid-rows-4 grid-cols-3'>
                                        {
                                            secondFloor.map((item, index) => (
                                                <div
                                                    onPointerOver={(e) => setSeatHover("Mã ghế: " + item.id + " ,Giá: " + item.price)}
                                                    onClick={(e) => { (item.status === 1 || item.status === 2) && handleClickSeatSecondFloor(item.id) }}
                                                    data-tooltip-id="my-tooltip"
                                                    class={item.status === 3 ?
                                                        ' flex justify-center items-center my-sm cursor-not-allowed hover:scale-105' :
                                                        ' flex justify-center items-center my-sm cursor-pointer hover:scale-105'
                                                    }
                                                >
                                                    {
                                                        item.status === 1
                                                            ?
                                                            <img class='' src={seatBooking[0].icon}></img>
                                                            : item.status === 2 ?
                                                                <img class='' src={seatBooking[1].icon}></img>
                                                                :
                                                                <img class='' src={seatBooking[2].icon}></img>
                                                    }


                                                </div>

                                            ))
                                        }
                                        <ReactTooltip
                                            id="my-tooltip"
                                            place="top"
                                            variant="info"
                                            style={{ backgroundColor: "#00B873", color: "#222" }}
                                            content={seatHover}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        stepBooking[1].active &&
                        <div class='my-md text-txt grid grid-flow-row grid-rows-1 grid-cols-2 justify-items-center w-search min-h-[200px] '>
                            <div class='w-[270px]'>
                                <p class='font-bold  text-16'>Điểm đón</p>
                                <div class='h-[200px] flex flex-col overflow-x-hidden overflow-y-auto'>
                                    {
                                        startLocation.map((item, index) => (
                                            index !== startLocation.length - 1 && (
                                                <Location item={item} onChange={onSelectBusStop} name={"busStationStartId"} selectedBusStop={selectedBusStop} isStart={true}></Location>
                                            )
                                        ))
                                    }
                                </div>
                            </div>
                            <div class=' w-[270px]'>
                                <p class='font-bold  text-16'>Điểm trả</p>
                                <div class='h-[200px] flex flex-col overflow-x-hidden overflow-y-auto'>
                                    {
                                        endLocation.map((item, index) => (
                                            index !== 0 && (
                                                <Location item={item} onChange={onSelectBusStop} name={"busStationEndId"} selectedBusStop={selectedBusStop} isStart={false} ></Location>
                                            )
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    }

                    {
                        stepBooking[2].active &&
                        // <div class=' mt-md mb-xl text-txt grid grid-flow-row grid-rows-1 grid-cols-2 justify-items-center w-content min-h-[400px]'>
                        //     <div class='w-[300px] relative '>
                        //         <p class='text-20 text-center font-bold'>Nhập thông tin xác nhận đặt vé xe</p>
                        //         <div class='w-full flex-col'>
                        //             <p class='text-16 font-bold'>Họ và tên (*)</p>
                        //             <InputConfirmInfo item={inputName} onChange={ChangeName} />
                        //         </div>
                        //         <div class='w-full flex-col mt-[20px]'>
                        //             <p class='text-16 mt-sm font-bold'>Số điện thoại (*)</p>
                        //             <InputConfirmInfo item={inputPhone} onChange={ChangePhone} />
                        //         </div>
                        //         <div class='w-full flex-col my-[20px]'>
                        //             <p class='text-16 font-bold'>Email (*)</p>
                        //             <InputConfirmInfo item={inputEmail} onChange={ChangEmail} />
                        //         </div>
                        //         <p class='text-16 font-bold italic'>Các mục chứa (*) không được bỏ trống</p>
                        //     </div>
                        //     <div class='w-[300px] min-h-[400px]'>
                        //         <p class='text-20 text-center font-bold'>Thông tin đặt vé xe</p>
                        //         <div class='my-md text-16 text-txt'>
                        //             <div class='flex my-sm'>
                        //                 <p class='w-[40%] shrink-0 font-bold'>Ghế đã chọn: </p>
                        //                 <p>A2,A3,A4</p>
                        //             </div>
                        //             <div class='flex my-sm ' >
                        //                 <p class='w-[40%] shrink-0  font-bold'>Nơi xuất phát: </p>
                        //                 <p>Thôn Tân Phú, Xã Vạn Phú, Huyện Vạn Ninh, tỉnh Khánh Hòa</p>
                        //             </div>
                        //             <div class='flex my-sm'>
                        //                 <p class='w-[40%] shrink-0  font-bold'>Nơi đến: </p>
                        //                 <p>Thôn Tân Phú, Xã Vạn Phú, Huyện Vạn Ninh, tỉnh Khánh Hòa</p>
                        //             </div>
                        //             <div class='flex my-sm'>
                        //                 <p class='w-[40%] shrink-0  font-bold'>Giờ đi: </p>
                        //                 <p>9 giờ 30 phút ngày 29/3/2023</p>
                        //             </div>
                        //         </div>

                        //         <div>
                        //             <p class='font-bold text-txt text-16'>Lựa chọn giảm giá</p>
                        //             <div class=''>
                        //                 <div class='flex items-center' onClick={(e) => setOpenVoucherYTrip(!isOpenVoucherYTrip)}>
                        //                     <p class='pr-md' >Voucher của Y-Trip</p>
                        //                     <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                        //                 </div>
                        //                 {

                        //                     isOpenVoucherYTrip &&
                        //                     <div class='h-[80px] overflow-x-hidden overflow-y-auto'>
                        //                         <Input type="radio" content="Giảm giá 10%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 20%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 10%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 20%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 10%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 20%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 10%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 20%" name="voucher"></Input>
                        //                     </div>
                        //                 }
                        //             </div>
                        //             <div class=' w-full mb-sm'>
                        //                 <div class='flex items-center ' onClick={(e) => setOpenVoucher(!isOpenVoucher)}>
                        //                     <p class='pr-md'>Voucher của nhà xe</p>
                        //                     <FontAwesomeIcon icon={isOpenVoucher ? faCaretUp : faCaretDown}></FontAwesomeIcon>
                        //                 </div>
                        //                 {
                        //                     isOpenVoucher &&
                        //                     <div class='h-[80px] overflow-x-hidden overflow-y-auto'>
                        //                         <Input type="radio" content="Giảm giá 10%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 20%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 10%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 20%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 10%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 20%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 10%" name="voucher"></Input>
                        //                         <Input type="radio" content="Giảm giá 20%" name="voucher"></Input>
                        //                     </div>
                        //                 }

                        //             </div>


                        //         </div>
                        //     </div>
                        // </div>
                        <div className='my-sm w-content min-h-[400px] grid grid-cols-10 grid-flow-row '>

                            <div className='col-span-8  col-start-2 shadow-lg relative'>
                                {
                                    loading &&

                                    <div class='absolute  w-full h-[500px] z-20 opacity-40'>
                                        <ReactLoading
                                            type="spinningBubbles" color="black"
                                            height={'5%'} width={'5%'}
                                            className="absolute  left-1/2 top-[50%]  "
                                        />
                                    </div>
                                }
                                <p class='text-20 text-center font-bold'>Thông tin đặt vé xe</p>
                                <div className="grid h-[50px] grid-flow-row grid-col-12 w-full">
                                    <p className="col-span-5 col-start-1 p-md flex items-center ">
                                        Họ và tên: {localStorage.getItem("username") ? localStorage.getItem("username") : ""}
                                    </p>
                                    <p className="col-span-5 col-start-7 flex items-center ">
                                        Mã ghế đã chọn: {selectedIdSeats && selectedIdSeats.join(",")}
                                    </p>
                                </div>
                                <p className="col-span-5 col-start-1 p-md flex items-center ">
                                    Điểm đón: {new Date(timeDepature.busStationStartId).toLocaleString()} - {nameSelectedBusStop.busStationStartId}
                                </p>
                                <p className="col-span-5 col-start-1 p-md flex items-center ">
                                    Điểm trả: {new Date(timeDepature.busStationEndId).toLocaleString()} - {nameSelectedBusStop.busStationEndId}
                                </p>

                            </div>

                        </div>
                    }

                    {
                        currentStepBooking > 1 &&
                        <button button class='w-[100px] button-position-left button-hover text-16 text-txt'
                            onClick={() => prevStateBooking()}
                        >
                            Quay lại
                        </button>
                    }

                    {

                        applyVoucher.active ?
                            <p class='totalprice-position p-md'>
                                Tổng cộng:  &nbsp;

                                < CurrencyFormat class='line-through text-[red] pr-sm' value={totalPrice1 + totalPrice2} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                                <CurrencyFormat value={totalPrice1 + totalPrice2 - 2000} displayType={'text'} thousandSeparator={true} suffix={' đ'} />

                            </p> :
                            <p class='totalprice-position p-md'>
                                Tổng cộng:  &nbsp;

                                < CurrencyFormat value={totalPrice1 + totalPrice2} displayType={'text'} thousandSeparator={true} suffix={' đ'} />

                            </p>
                    }

                    {
                        stepBooking[2].active ? (
                            // <button class='w-[120px] button-position button-hover text-16 text-txt '
                            //     onClick={(e) => createBill()}
                            // >

                            //     Đặt vé
                            // </button>
                            checkout ? (
                                <>
                                    <Paypal order={totalPrice1 + totalPrice2} />
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        // setCheckout(true);
                                        createBill();
                                    }}
                                    className='w-[100px] button-position button-hover text-16 text-txt'
                                >
                                    Checkout
                                </button>
                            )
                        ) : (
                            <button
                                className='w-[100px] button-position button-hover text-16 text-txt'
                                onClick={() => nextStateBooking()}
                            >
                                Tiếp tục
                            </button>
                        )
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
                </div >
            }

        </div >

    );
}

export default BusCard;