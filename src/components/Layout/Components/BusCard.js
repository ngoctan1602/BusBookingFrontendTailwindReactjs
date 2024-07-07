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
import LogoCompanyNull from "../../../../src/assets/images/defaultCompanyLogo.jpg"
import * as BillSV from "../../../services/BillServices"
import * as ReviewSV from "../../../services/ReviewSV"
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard"
import Paypal from "../../Paypal/Paypal";
import { Button, Col, Divider, Row } from "antd";
import PaginatedItemsWithAPI from "./PaginateWithApi";
import BusReviewCard from "./Company/Bus/BusReview/BusReviewCard";
import Seat from "./Company/Bus/Seat";
import { useDispatch, useSelector } from 'react-redux';
import { setPreviousUrl } from "../../../store/slice/userSlice"
import { setDetail, setTotalPrice, setTimeCheckout, setNameItem, setTimeItem, setNameStation } from "../../../store/slice/checkoutSlice"
import CheckCheckout from "./Common/CheckCheckout";
const BusCard = ({ item }) => {
    // console.log(item.itemResponses.slice(0, item.itemResponses.length / 2))
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
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

    const notifyError = (message) => toast.error(message, {
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

    const [loading, setLoading] = useState(false);
    const openAbout = () => {
        setAbout(!about);
        setIsChooseTrip(false);
    }

    const [isChooseTrip, setIsChooseTrip] = useState(false);
    const toggleChooseTrip = () => {
        if (hasCheckout) {
            notifyWarning("Bạn đang có hóa đơn cần thanh toán. Vui lòng thanh toán trước khi chọn chuyến đi")
            return;
        }
        setIsChooseTrip(!isChooseTrip);
        setAbout(false);
    }

    const [seatBooking, setSeatBooking] = useState(
        [
            {
                id: 1, icon: seat, content: "Ghế trống", color: "black"
            },
            {
                id: 2, icon: seatActive, content: "Ghế đang chọn", color: "green"
            },
            {
                id: 3, icon: seatError, content: "Ghế đã có người mua", color: "red"
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
    const [nameSelectedSeat, setNameSeateSelected] = useState([]);
    const hasCheckout = CheckCheckout();
    const handleClickSeatOneFloor = (id, name) => {
        let total = 0;
        const updatedItems = oneStFloor.map(item => {
            if (item.id === id) {
                if (item.status === 1) { // 1 là đang trống
                    total += item.price;
                    setSelectedIdSeats(prevIds => [...prevIds, id]);
                    setNameSeateSelected(prevNames => [...prevNames, name]);
                    return { ...item, status: 2 }; // 2 là đang chọn
                }
                setSelectedIdSeats(prevIds => prevIds.filter(prevId => prevId !== id));
                setNameSeateSelected(prevNames => prevNames.filter(prevName => prevName !== name));
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

    const handleClickSeatSecondFloor = (id, name) => {
        let total = 0;
        const updatedItems = secondFloor.map(item => {
            if (item.id === id) {
                if (item.status === 1) {
                    total += item.price;
                    setSelectedIdSeats(prevIds => [...prevIds, id]);
                    setNameSeateSelected(prevNames => [...prevNames, name]);
                    return { ...item, status: 2 };
                }
                setSelectedIdSeats(prevIds => prevIds.filter(prevId => prevId !== id));
                setNameSeateSelected(prevNames => prevNames.filter(prevName => prevName !== name));
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
        if (name === "busStationStartId") {
            for (let i = 0; i < item.listStation.length; i++) {
                // console.log(item.listStation[i])
                if (item.listStation[i].ticketRouteDetailId === id) {
                    let arr = [];
                    item.listStation.map(
                        (e, j) => {
                            if (j >= i)
                                arr.push(e)
                        }
                    )
                    setEndLocation(arr)
                }
            }
        }
        else {
            for (let i = 0; i < item.listStation.length; i++) {
                // console.log(item.listStation[i])
                if (item.listStation[i].ticketRouteDetailId === id) {
                    let arr = [];
                    item.listStation.map(
                        (e, j) => {
                            if (j <= i)
                                arr.push(e)
                        }
                    )
                    setStartLocation(arr)
                }
            }
        }

    }



    const [isOpenVoucherYTrip, setOpenVoucherYTrip] = useState(false);
    const [isOpenVoucher, setOpenVoucher] = useState(false);
    const [applyVoucher, setApplyVoucher] = useState({ active: false, value: 0 })
    const createBill = async () => {
        const items =
            selectedIdSeats.map((item,) => {
                return { ticketItemId: item }
            })

        const objectAdd = {
            TicketRouteDetailStartId: selectedBusStop.busStationStartId,
            TicketRouteDetailEndId: selectedBusStop.busStationEndId,
            itemsRequest: items
        }
        dispatch(setDetail(objectAdd))
        dispatch(setTotalPrice(totalPrice1 + totalPrice2))
        dispatch(setTimeCheckout())
        dispatch(setNameItem(nameSelectedSeat))
        dispatch(setTimeItem(timeDepature));
        dispatch(setNameStation(nameSelectedBusStop))

        if (isLoggedIn) {
            try {
                setLoading(true)
                //Reserve
                const resp = await BillSV.reserve(objectAdd);
                if (!resp.isError && resp.isError !== undefined) {
                    // const timeCheckoutValue = Date.now() + 1000 * 60 * 5;
                    dispatch(setDetail(objectAdd))
                    dispatch(setTotalPrice(totalPrice1 + totalPrice2))
                    dispatch(setTimeCheckout())
                    // notifySuccess()
                    navigate("/checkout")
                    // setTimeout(() => navigate("/checkout", { state: { Order: objectAdd, TotalPrice: totalPrice1 + totalPrice2 } }), 2000);
                }
                else {
                    notifyError(resp.data)
                }
                setLoading(false)
            } catch (error) {
                notifyError(error)
            }
        }
        if (!isLoggedIn) {
            notifyWarning("Hãy đăng nhập")
            dispatch(setPreviousUrl("/search"))
            setTimeout(
                () =>
                    navigate("/login")
                , 2000
            )
            return

        }


    }
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const dateOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    const timeForecast = () => {
        const arrivalTime = new Date(item.listStation[0].departureTime);
        const lastStationTime = new Date(item.listStation[item.listStation.length - 1].arrivalTime);

        const diffInMilliseconds = Math.abs(arrivalTime - lastStationTime);

        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        const remainingHours = diffInHours % 24;
        const remainingMinutes = diffInMinutes % 60;
        const remainingSeconds = diffInSeconds % 60;

        return `Dự kiện: ${diffInDays} ngày, ${remainingHours} giờ, ${remainingMinutes} phút`;
    }

    const [timeExpect, setTimeExpect] = useState('');

    useEffect(() => {
        const resp = timeForecast();
        setTimeExpect(resp);
    }, [item]);

    const [reviewBus, setReviewBus] = useState([]);
    const [loadingReview, setLoadingReview] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const fetchData = async () => {
        try {
            setLoadingReview(true);
            const resp = await ReviewSV.getAllInBus({ busId: item.busId, pageIndex: currentPage });
            if (!resp.isError && resp.data && resp.data.items) {
                setReviewBus(resp.data.items);
                setTotalPage(resp.data.pageTotal);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoadingReview(false);
        }
    };
    useEffect(() => {
        fetchData();

        // Cleanup function (if needed)
        // Example: cancel ongoing requests or subscriptions
        return () => {
            // Perform cleanup tasks here if necessary
        };
    }, [item, currentPage]);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    return (
        <div class='bg-bg w-full flex flex-col my-md rounded-md box-shadow-content hover:shadow-xl  ease-in-out duration-150 '>
            {/* Đây là phần chính của card */}

            <div class='w-full h-[200px] flex'>
                <div class='m-sm w-[120px]'>
                    <img class='w-[120px] h-[120px] object-cover rounded-md' src={item.companyLogo ? item.companyLogo : LogoCompanyNull}>

                    </img>
                </div>

                <div class="m-sm w-[300px] text-txt">
                    <div class='flex items-center'>
                        <p class='mx-sm text-16 font-bold'>{item.company}</p>
                    </div>
                    <p class='m-sm'>{item.busNumber} - {item.busType}</p>
                    <div class='m-sm flex text-txt items-center'>
                        <FontAwesomeIcon icon={faCircleDot} class='text-hover-txt w-[14px] h-[14px]' />
                        <p class='mx-sm'>{item.listStation[0].station} - </p>
                        <p >{new Date(item.listStation[0].departureTime)
                            .toLocaleString("en-CA", timeOptions)

                        }
                            <span> </span>
                            {new Date(item.listStation[0].departureTime).
                                toLocaleString("en-CA", dateOptions).split('-').reverse().join('-')
                            }

                        </p>
                    </div>
                    <div class='m-sm flex items-center'>
                        <div class=' mx-[6px] w-[1px] h-[30px] bg-txt'>
                        </div>
                        {timeExpect}
                    </div>
                    <div class='m-sm flex items-center'>
                        <FontAwesomeIcon icon={faLocationDot} class='text-hover-txt w-[16px] h-[16px]' />
                        <p class='mx-sm'>{item.listStation[item.listStation.length - 1].station} - </p>
                        <p>
                            {new Date(item.listStation[item.listStation.length - 1].arrivalTime)
                                .toLocaleString("en-CA", timeOptions)

                            }
                            <span> </span>
                            {new Date(item.listStation[item.listStation.length - 1].arrivalTime).
                                toLocaleString("en-CA", dateOptions).split('-').reverse().join('-')
                            }
                        </p>
                    </div>
                </div>

                <div class='relative flex flex-grow'>
                    <button class='about-position text-txt-blue font-bold underline cursor-pointer flex items-center ' onClick={() => openAbout()}>
                        <p class='mr-sm'>Xem đánh giá nhà xe</p>
                        {
                            about
                                ?
                                <FontAwesomeIcon icon={faCaretUp} size="lg"></FontAwesomeIcon>
                                :
                                <FontAwesomeIcon icon={faCaretDown} size="lg"></FontAwesomeIcon>
                        }
                    </button>
                    <div class='price-position flex flex-col items-end text-txt text-16'>
                        <p class='text-txt-blue font-bold text-[20px] my-sm' >
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
                about && !loadingReview && reviewBus.length > 0 &&
                <div class='w-full min-h-[200px] flex flex-col items-center'>
                    <div class='w-content h-[1px] bg-txt'>
                    </div>
                    <PaginatedItemsWithAPI handleClick={handlePageClick} items={reviewBus} componentToRender={BusReviewCard} currentPage={currentPage} pageCount={totalPage}>

                    </PaginatedItemsWithAPI>
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
                                    'flex items-center justify-center p-sm border-b-button-confirm border-b-[2px] text-button-confirm'
                                    :
                                    'flex items-center justify-center p-sm border-b-txt-gray border-b-[2px] text-hover-gray'
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
                                            <Seat color={item.color} select={index}></Seat>
                                            {/* <img src={item.icon}></img> */}
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
                                                    onPointerOver={(e) => setSeatHover("Mã ghế: " + item.seatNumber + " ,Giá: " + item.price)}
                                                    onClick={(e) => { (item.status === 1 || item.status === 2) && handleClickSeatOneFloor(item.id, item.seatNumber) }}
                                                    data-tooltip-id="my-tooltip"
                                                    class={item.status === 3 ?
                                                        'flex justify-center items-center my-sm cursor-not-allowed hover:scale-105' :
                                                        'flex justify-center items-center my-sm cursor-pointer hover:scale-105'
                                                    }
                                                >
                                                    {
                                                        item.status === 1 ?
                                                            <Seat color={seatBooking[0].color} select={0} />
                                                            : item.status === 2 ?
                                                                <Seat color={seatBooking[1].color} select={1} />
                                                                :
                                                                <Seat color={seatBooking[2].color} select={2} />
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
                                    <div class='min-h-[200px] m-sm justify-items-center grid grid-flow-row grid-rows-4 grid-cols-3'>
                                        {
                                            secondFloor.map((item, index) => (
                                                <div
                                                    onPointerOver={(e) => setSeatHover("Mã ghế: " + item.seatNumber + " ,Giá: " + item.price)}
                                                    onClick={(e) => { (item.status === 1 || item.status === 2) && handleClickSeatSecondFloor(item.id, item.seatNumber) }}
                                                    data-tooltip-id="my-tooltip"
                                                    class={item.status === 3 ?
                                                        ' flex justify-center items-center my-sm cursor-not-allowed hover:scale-105' :
                                                        ' flex justify-center items-center my-sm cursor-pointer hover:scale-105'
                                                    }
                                                >
                                                    {
                                                        item.status === 1 ?
                                                            <Seat color={seatBooking[0].color} select={0} />
                                                            : item.status === 2 ?
                                                                <Seat color={seatBooking[1].color} select={1} />
                                                                :
                                                                <Seat color={seatBooking[2].color} select={2} />
                                                    }


                                                </div>

                                            ))
                                        }
                                        <ReactTooltip
                                            id="my-tooltip"
                                            place="top"
                                            variant="info"
                                            style={{ backgroundColor: "#090808", color: "#fafafa" }}
                                            content={seatHover}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        stepBooking[1].active &&
                        <div class='my-sm text-txt grid grid-flow-row grid-rows-1 grid-cols-2 justify-items-center w-search min-h-[200px] '>
                            <div class='w-[270px]'>
                                <p class='font-bold  text-16'>Điểm đón</p>
                                <div class='h-[200px] flex flex-col overflow-x-hidden overflow-y-scroll'>
                                    {
                                        startLocation.map((item, index) => (
                                            index !== startLocation.length - 1 && (
                                                <Location item={item} onChange={onSelectBusStop} name={"busStationStartId"} selectedBusStop={selectedBusStop} isStart={true}></Location>
                                            )
                                        ))
                                    }
                                </div>
                            </div>
                            <div class='ml-[30px] w-[270px]'>
                                <p class='font-bold  text-16'>Điểm trả</p>
                                <div class='h-[200px] flex flex-col overflow-x-hidden overflow-y-scroll'>
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
                        <div className='my-sm w-content min-h-[400px] grid grid-cols-10 grid-flow-row '>

                            <div className='col-span-8  col-start-2 relative'>
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
                                        Tài khoản: {localStorage.getItem("username") ? localStorage.getItem("username") : ""}
                                    </p>
                                    <p className="col-span-5 col-start-7 flex items-center ">
                                        Mã ghế đã chọn: {selectedIdSeats && selectedIdSeats.join(",") && nameSelectedSeat.join(',')}
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


                </div >
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

    );
}

export default BusCard;