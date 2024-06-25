import MultiRangeSlider from "multi-range-slider-react";
import Input from "../../components/Layout/Components/Input";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
// import Rating from "../../components/Layout/Components/Rating";
// import { Rating } from 'react-simple-star-rating';
import ReactStars from "react-rating-stars-component";
import BusCard from "../../components/Layout/Components/BusCard";
import PaginatedItems from "../../components/Layout/Components/Paginate";
import SearchHeader from "../../components/Layout/Components/SearchHeader";
import ticketService from "../../services/TicketService";
import ReactLoading from 'react-loading';
import { Carousel, Col, Row, Skeleton } from "antd";
const Search = () => {

    const [sort, setSort] = useState([
        { id: 3, content: 'Giá tăng dần', checked: true },
        { id: 4, content: 'Giá giảm dần', checked: false },
    ])

    const [startTime, setStartTime] = useState([
        { id: 1, name: 'Sáng', from: '04:00', to: '12:00', checked: false },
        { id: 2, name: 'Chiều', from: '12:00', to: '17:00', checked: false },
        { id: 3, name: 'Tối', from: '17:00', to: '21:00', checked: false },
        { id: 4, name: 'Khuya', from: '21:00', to: '04:00', checked: false }
    ]);

    const [company, setCompany] = useState([])

    const [sit, setSit] = useState(
        [
            {
                id: 1, content: "Hàng ghế đầu"
            },
            {
                id: 2, content: "Hàng ghế giữa"
            },
            {
                id: 3, content: "Hàng ghế cuối"
            }

        ]
    )

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(1000000)

    const deleteSort = () => (
        alert("Xóa lọc")
    )
    const sortByTime = (id) => {
        const updatedItems = startTime.map(item => {
            if (item.id === id) {
                if (item.checked)
                    return { ...item, checked: false };
                else
                    return { ...item, checked: true };
            }
            return item;
        });
        setStartTime(updatedItems);
    }

    const handleInput = (e) => {
        setMin(e.minValue);
        setMax(e.maxValue);
    };

    const [startLocation, setStartLocation] = useState([
        {
            id: 1,
            content: "Vạn Giã",
            children: [
                {
                    id: 2,
                    content: "Tu Bông",
                },
                {
                    id: 3,
                    content: "Vạn Hưng",
                }
            ],
            isOpen: false,
        },
        {
            id: 4,
            content: "Ninh Hòa",
            children: [
                {
                    id: 5,
                    content: "Ninh Ích",
                },
                {
                    id: 6,
                    content: "Ninh Vân",
                }
            ],
            isOpen: true,
        }

    ])

    const [destination, setDestination] = useState([
        {
            id: 1,
            content: "Vạn Giã",
            children: [
                {
                    id: 2,
                    content: "Tu Bông",
                },
                {
                    id: 3,
                    content: "Vạn Hưng",
                }
            ],
            isOpen: false,
        },
        {
            id: 4,
            content: "Ninh Hòa",
            children: [
                {
                    id: 5,
                    content: "Ninh Ích",
                },
                {
                    id: 6,
                    content: "Ninh Vân",
                }
            ],
            isOpen: true,
        }

    ])

    const [rating, setRating] = useState([
        {
            id: 1, star: 1, sum: 70
        },
        {
            id: 2, star: 2, sum: 70
        },
        {
            id: 3, star: 3, sum: 70
        },
        {
            id: 4, star: 4, sum: 70
        },
        {
            id: 5, star: 5, sum: 70
        }

    ])


    const toggleStartLocation = (id) => {
        const updatedItems = startLocation.map(item => {
            if (item.id === id) {
                if (item.isOpen)
                    return { ...item, isOpen: false };
                else
                    return { ...item, isOpen: true };
            }
            return item;
        });
        setStartLocation(updatedItems);
    }

    const toggleDestination = (id) => {
        const updatedItems = destination.map(item => {
            if (item.id === id) {
                if (item.isOpen)
                    return { ...item, isOpen: false };
                else
                    return { ...item, isOpen: true };
            }
            return item;
        });
        setDestination(updatedItems);
    }



    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    const [busInfo, setBusInfo] = useState();
    const [loading, setLoading] = useState();



    const handSearch = async (search) => {
        // alert(selectedRadio)
        search.companyIds = company.map((item) => item.companyId);
        search.timeInDays = startTime.filter((item) => item.checked).map((item) => item.id);
        search.priceIsDesc = selectedRadio === 4 ? true : false
        console.log(search);
        setLoading(true)
        try {
            const response = await ticketService.findTicket(search)
            setBusInfo(response.data.items)
            const companies = [];
            setCompany(companies)
            busInfo.forEach((item) => {
                let isExist = false;

                for (const company of companies) {
                    if (company.companyId === item.companyId) {
                        isExist = true;
                        break;
                    }
                }

                // Nếu chưa có, thêm vào mảng companies
                if (!isExist) {
                    companies.push({
                        companyId: item.companyId,
                        companyName: item.company,
                    });
                }
            });

            setCompany(companies)

            console.log(response)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }

    }
    const onChangeRadioSort = (value) => {
        // const updatedItems = sort.map(item => {
        //     if (item.id === id) {
        //         return { ...item, checked: true }
        //     }
        //     return { ...item, checked: true };
        // });
        // setSort(updatedItems);
        setSelectedRadio(value)
        // alert(selectedRadio)
    }
    const [selectedRadio, setSelectedRadio] = useState(1)
    const contentStyle = {
        margin: "0px 20px",
        height: '300px',
        color: '#fff',
        width: "80%",
        // lineHeight: '160px',
        // textAlign: 'center',
        background: '#364d79',
    };
    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };
    return (
        // <div className="w-full h-full  bg-[#F2F2F2] flex flex-col items-center">
        //     <div class='min-h-[1000px] w-content flex flex-col items-center my-xl'>
        //         {/* <div class='h-[120px] bg-[#e1e1e1] border-none outline-none w-search rounded-lg my-md grid items-center justify-items-center'>
        //         <SearchHeader onSearch={handSearch} ></SearchHeader>
        //     </div> */}
        //         <div className="h-[120px] grid grid-flow-row grid-cols-12 w-full bg-text-red">
        //             <div className=" bg-bg shadow-2xl rounded-md col-span-8 col-start-4">
        //                 <SearchHeader onSearch={handSearch} ></SearchHeader>
        //             </div>
        //         </div>
        //         <div class='h-full w-full flex'>
        //             <div class='sidebar m-sm'>

        //                 {/* Đây là phần sắp xếp */}
        //                 <div class='h-[220px] bg-transparent  rounded-lg box-shadow-content  bg-bg'>
        //                     <p class='text-txt text-18 font-bold mt-sm mx-md'>Sắp xếp</p>
        //                     <div class='h-[160px] sort bg-transparent'>
        //                         {
        //                             sort.map((item, index) => (
        //                                 // <Input type="radio" name="sort" id={item.id} content={item.content}>

        //                                 // </Input>
        //                                 <div className="grid grid-flow-row grid-cols-12 gap-sm my-sm">
        //                                     <input type="radio" className="col-span-2" name="radiosort"
        //                                         onChange={(e) => onChangeRadioSort(Number(e.target.value))}
        //                                         value={item.id}
        //                                         checked={selectedRadio === item.id}
        //                                     >
        //                                     </input>
        //                                     <p className="col-span-10">
        //                                         {item.content}
        //                                     </p>
        //                                 </div>

        //                             ))
        //                         }
        //                     </div>
        //                 </div>

        //                 {/* Đây là phần lọc */}
        //                 <div class='h-[500px] bg-transparent rounded-lg box-shadow-content my-lg  bg-bg'>
        //                     {/* Đây là button xóa lọc */}
        //                     <div class='flex justify-between items-center'>
        //                         <p class='text-txt text-18 font-bold mt-sm mx-md'>Lọc</p>
        //                         <button onClick={deleteSort} type="button" class='ease-in-out duration-500 border-[1px] font-bold rounded-md border-solid m-sm border-button hover:bg-button hover:text-bg p-sm'>Xóa lọc</button>
        //                     </div>

        //                     {/* Đây là giờ đi */}
        //                     <div class='h-[180px] w-full'>
        //                         <p class='text-txt text-16 mt-sm mx-md'>Giờ đi</p>
        //                         <div class='w-full flex flex-wrap'>
        //                             {
        //                                 startTime.map((item, idex) => (
        //                                     <button onClick={() => sortByTime(item.id)} class={item.checked ? 'border-button w-[42%] h-[70px] border-[2px] m-sm rounded-md text-txt text-16' : 'w-[42%] h-[70px] border-[1px] m-sm rounded-md text-txt text-16'}>
        //                                         {item.name} <br></br>{item.from + " - " + item.to}
        //                                     </button>)
        //                                 )
        //                             }
        //                         </div>
        //                     </div>

        //                     {/* Đây là nhà xe */}
        //                     <div class='h-[190px] overflow-auto w-full my-xl flex flex-col items-center'>
        //                         <p class='text-txt text-16 mt-sm mx-md w-content'>Nhà xe</p>
        //                         <input type='text' placeholder="Tìm trong danh sách"
        //                             class='text-16 text-txt w-[90%] mx-sm bg-bg outline-none border-[1px] border-txt opacity-70 p-[4px] ease-in-out duration-300 rounded-md hover:border-button'>
        //                         </input>
        //                         <div class='w-full flex flex-wrap overflow-y-scroll'>
        //                             {
        //                                 company.map((item, index) => (
        //                                     <Input type='checkbox' content={item.companyName}></Input>
        //                                 ))
        //                             }
        //                         </div>
        //                     </div>

        //                 </div>

        //             </div>
        //             <div class='content my-sm ml-0 mr-sm flex flex-col items-center bg-text-red'>
        //                 {/* <div class='bg-bg w-content min-h-[10px] mx-sm'>
        //                 Kết quả
        //             </div> */}
        //                 <div class='w-content h-content mt-sm relative '>
        //                     {
        //                         loading ?
        //                             // <div class='absolute bg-hover-txt w-full h-[500px] z-20 opacity-40'>
        //                             //     <ReactLoading
        //                             //         type="spinningBubbles" color="#ffffff"
        //                             //         height={'5%'} width={'5%'}
        //                             //         className="absolute bg-hover-txt left-1/2 top-[50%]  "
        //                             //     />
        //                             // </div>
        //                             <div>
        //                                 <Skeleton className="my-md" active></Skeleton>
        //                                 <Skeleton className="my-md" active></Skeleton>
        //                                 <Skeleton className="my-md" active></Skeleton>
        //                                 <Skeleton className="my-md" active></Skeleton>
        //                             </div>
        //                             :

        //                             (!busInfo || busInfo.length === 0) && !loading ?
        //                                 <div className="w-full h-full">

        //                                     <Carousel autoplay autoplaySpeed={3000}>
        //                                         <div className="rounded-md h-[150px] overflow-hidden">
        //                                             <img src="https://carshop.vn/wp-content/uploads/2022/07/images1151040_xekhach.jpg" alt="Ảnh 1" style={imageStyle} />
        //                                         </div>
        //                                         <div className="rounded-md h-[150px] overflow-hidden">
        //                                             <img src="https://carshop.vn/wp-content/uploads/2022/07/maxresdefault.jpg" alt="Ảnh 1" style={imageStyle} />
        //                                         </div>
        //                                         <div className="rounded-md h-[150px] overflow-hidden">
        //                                             <img src="https://carshop.vn/wp-content/uploads/2022/07/hyundai-universe-4-15466488907371579447485.jpg" alt="Ảnh 1" style={imageStyle} />
        //                                         </div>
        //                                         <div className="rounded-md h-[150px] overflow-hidden">
        //                                             <img src="https://carshop.vn/wp-content/uploads/2022/07/xe-vung-tau-bien-hoa-dong-nai-5.jpg" alt="Ảnh 1" style={imageStyle} />
        //                                         </div>
        //                                     </Carousel>
        //                                     <p className="m-md text-center w-full text-20 font-medium">Không tìm thấy chuyến đi trong hôm nay. Vui lòng tìm kiếm ngày xuất phát muộn hơn</p>
        //                                 </div>
        //                                 :
        //                                 <PaginatedItems itemsPerPage={5} items={busInfo} componentToRender={BusCard} ></PaginatedItems>
        //                     }
        //                 </div>

        //             </div>
        //         </div>

        //     </div>
        // </div>
        <div className="w-full min-h-[700px] bg-bgContent">
            <Row className="w-full my-md min-h-[80px]">
                <Col className=" bg-bg box-shadow-content rounded-md" span={14} offset={6}>
                    <SearchHeader onSearch={handSearch} ></SearchHeader>
                </Col>
            </Row>
            <Row className="w-full min-h-[500px] ">
                <Col span={4} offset={1} >
                    <div class='h-[220px] bg-transparent  rounded-lg box-shadow-content  bg-bg'>
                        <p class='text-txt text-18 font-bold mt-sm mx-md'>Sắp xếp</p>
                        <div class='h-[160px] sort bg-transparent'>
                            {
                                sort.map((item, index) => (
                                    // <Input type="radio" name="sort" id={item.id} content={item.content}>

                                    // </Input>
                                    <div className="grid grid-flow-row grid-cols-12 gap-sm my-sm">
                                        <input type="radio" className="col-span-2" name="radiosort"
                                            onChange={(e) => onChangeRadioSort(Number(e.target.value))}
                                            value={item.id}
                                            checked={selectedRadio === item.id}
                                        >
                                        </input>
                                        <p className="col-span-10">
                                            {item.content}
                                        </p>
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                    <div class='h-[500px] bg-transparent rounded-lg box-shadow-content my-lg  bg-bg'>
                        {/* Đây là button xóa lọc */}
                        <div class='flex justify-between items-center'>
                            <p class='text-txt text-18 font-bold mt-sm mx-md'>Lọc</p>
                            <button onClick={deleteSort} type="button" class='ease-in-out duration-500 border-[1px] font-bold rounded-md border-solid m-sm border-button hover:bg-button hover:text-bg p-sm'>Xóa lọc</button>
                        </div>

                        {/* Đây là giờ đi */}
                        <div class='h-[180px] w-full'>
                            <p class='text-txt text-16 mt-sm mx-md'>Giờ đi</p>
                            <div class='w-full flex flex-wrap'>
                                {
                                    startTime.map((item, idex) => (
                                        <button onClick={() => sortByTime(item.id)} class={item.checked ? 'border-button w-[42%] h-[70px] border-[2px] m-sm rounded-md text-txt text-16' : 'w-[42%] h-[70px] border-[1px] m-sm rounded-md text-txt text-16'}>
                                            {item.name} <br></br>{item.from + " - " + item.to}
                                        </button>)
                                    )
                                }
                            </div>
                        </div>

                        {/* Đây là nhà xe */}
                        <div class='h-[190px] overflow-auto w-full my-xl flex flex-col items-center'>
                            <p class='text-txt text-16 mt-sm mx-md w-content'>Nhà xe</p>
                            <input type='text' placeholder="Tìm trong danh sách"
                                class='text-16 text-txt w-[90%] mx-sm bg-bg outline-none border-[1px] border-txt opacity-70 p-[4px] ease-in-out duration-300 rounded-md hover:border-button'>
                            </input>
                            <div class='w-full flex flex-wrap overflow-y-scroll'>
                                {
                                    company.map((item, index) => (
                                        <Input type='checkbox' content={item.companyName}></Input>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </Col>
                <Col offset={1} span={14} >

                    {/* <div class='bg-bg w-content min-h-[10px] mx-sm'>
                        Kết quả
                    </div> */}
                    <div class='w-full h-content mt-sm relative '>
                        {
                            loading ?
                                // <div class='absolute bg-hover-txt w-full h-[500px] z-20 opacity-40'>
                                //     <ReactLoading
                                //         type="spinningBubbles" color="#ffffff"
                                //         height={'5%'} width={'5%'}
                                //         className="absolute bg-hover-txt left-1/2 top-[50%]  "
                                //     />
                                // </div>
                                <div>
                                    <Skeleton className="my-md" active></Skeleton>
                                    <Skeleton className="my-md" active></Skeleton>
                                    <Skeleton className="my-md" active></Skeleton>
                                    <Skeleton className="my-md" active></Skeleton>
                                </div>
                                :

                                (!busInfo || busInfo.length === 0) && !loading ?
                                    <div className="w-full h-full">

                                        <Carousel autoplay autoplaySpeed={3000}>
                                            <div className="rounded-md h-[150px] overflow-hidden">
                                                <img src="https://carshop.vn/wp-content/uploads/2022/07/images1151040_xekhach.jpg" alt="Ảnh 1" style={imageStyle} />
                                            </div>
                                            <div className="rounded-md h-[150px] overflow-hidden">
                                                <img src="https://carshop.vn/wp-content/uploads/2022/07/maxresdefault.jpg" alt="Ảnh 1" style={imageStyle} />
                                            </div>
                                            <div className="rounded-md h-[150px] overflow-hidden">
                                                <img src="https://carshop.vn/wp-content/uploads/2022/07/hyundai-universe-4-15466488907371579447485.jpg" alt="Ảnh 1" style={imageStyle} />
                                            </div>
                                            <div className="rounded-md h-[150px] overflow-hidden">
                                                <img src="https://carshop.vn/wp-content/uploads/2022/07/xe-vung-tau-bien-hoa-dong-nai-5.jpg" alt="Ảnh 1" style={imageStyle} />
                                            </div>
                                        </Carousel>
                                        <p className="m-md text-center w-full text-20 font-medium">Không tìm thấy chuyến đi trong hôm nay. Vui lòng tìm kiếm ngày xuất phát muộn hơn</p>
                                    </div>
                                    :
                                    // <PaginatedItems itemsPerPage={5} items={busInfo} componentToRender={BusCardNew} ></PaginatedItems>

                                    <PaginatedItems itemsPerPage={5} items={busInfo} componentToRender={BusCard} ></PaginatedItems>
                        }
                    </div>


                </Col>
                <Col span={4} >
                    <Carousel autoplay autoplaySpeed={3000} className="m-md">
                        <div className="rounded-md h-[700px] overflow-hidden">
                            <img src="https://carshop.vn/wp-content/uploads/2022/07/images1151040_xekhach.jpg" alt="Ảnh 1" style={imageStyle} />
                        </div>
                        <div className="rounded-md h-[700px] overflow-hidden">
                            <img src="https://carshop.vn/wp-content/uploads/2022/07/maxresdefault.jpg" alt="Ảnh 1" style={imageStyle} />
                        </div>
                        <div className="rounded-md h-[700px] overflow-hidden">
                            <img src="https://carshop.vn/wp-content/uploads/2022/07/hyundai-universe-4-15466488907371579447485.jpg" alt="Ảnh 1" style={imageStyle} />
                        </div>
                        <div className="rounded-md h-[700px] overflow-hidden">
                            <img src="https://carshop.vn/wp-content/uploads/2022/07/xe-vung-tau-bien-hoa-dong-nai-5.jpg" alt="Ảnh 1" style={imageStyle} />
                        </div>
                    </Carousel>
                </Col>
            </Row>
        </div>
    );
}

export default Search;