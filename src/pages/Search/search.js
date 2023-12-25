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
const Search = () => {

    const [sort, setSort] = useState([
        { id: 1, content: 'Mặc định' },
        { id: 2, content: 'Giờ đi sớm nhất' },
        { id: 3, content: 'Giờ đi muộn nhất' },
        { id: 4, content: 'Giá tăng dần' },
        { id: 5, content: 'Giá giảm dần' },
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

    // const [busInfo, setBusInfo] = useState([
    //     {
    //         id: 1,
    //         img: "https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg",
    //         company: "Thanh Thủy",
    //         category: "Limousine 32 chỗ ngồi có WC",
    //         star: 4,
    //         totalComment: 370,
    //         startTime: "7:30",
    //         startLocation: "Bến xe Vạn Giã",
    //         destination: "Bến xe Nông Lâm",
    //         intendTime: 12,
    //         price: 450000,
    //         emtySit: 35,
    //     },
    //     {
    //         id: 2,
    //         img: "https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg",
    //         company: "Ngọc Tân",
    //         category: "Limousine 24 chỗ ngồi có WC",
    //         star: 3,
    //         totalComment: 220,
    //         startTime: "8:30",
    //         startLocation: "Bến xe Vạn Giã",
    //         destination: "Bến xe Nông Lâm",
    //         intendTime: 12,
    //         price: 200000,
    //         emtySit: 20,
    //     },
    //     {
    //         id: 1,
    //         img: "https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg",
    //         company: "Phương Trang",
    //         category: "Limousine 64 chỗ ngồi có WC",
    //         star: 4,
    //         totalComment: 370,
    //         startTime: "7:30",
    //         startLocation: "Bến xe Ninh Hòa",
    //         destination: "Bến xe Nông Lâm",
    //         intendTime: 12,
    //         price: 450000,
    //         emtySit: 35,
    //     },
    //     {
    //         id: 2,
    //         img: "https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg",
    //         company: "Ngọc Tân",
    //         category: "Limousine 24 chỗ ngồi có WC",
    //         star: 3,
    //         totalComment: 220,
    //         startTime: "8:30",
    //         startLocation: "Bến xe Vạn Giã",
    //         destination: "Bến xe Nông Lâm",
    //         intendTime: 12,
    //         price: 200000,
    //         emtySit: 20,
    //     },
    //     {
    //         id: 1,
    //         img: "https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg",
    //         company: "Thanh Thủy",
    //         category: "Limousine 32 chỗ ngồi có WC",
    //         star: 4,
    //         totalComment: 370,
    //         startTime: "7:30",
    //         startLocation: "Bến xe Vạn Giã",
    //         destination: "Bến xe Nông Lâm",
    //         intendTime: 12,
    //         price: 450000,
    //         emtySit: 35,
    //     },
    //     {
    //         id: 2,
    //         img: "https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg",
    //         company: "Ngọc Tân",
    //         category: "Limousine 24 chỗ ngồi có WC",
    //         star: 3,
    //         totalComment: 220,
    //         startTime: "8:30",
    //         startLocation: "Bến xe Vạn Giã",
    //         destination: "Bến xe Nông Lâm",
    //         intendTime: 12,
    //         price: 200000,
    //         emtySit: 20,
    //     }
    // ])


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
        search.companyIds = company.map((item) => item.companyId);
        search.timeInDays = startTime.filter((item) => item.checked).map((item) => item.id);
        search.priceIsDesc = sort.id === 5 ? true : false;
        search.timeIsDesc = sort.id === 3 ? true : false;
        console.log(search);
        setLoading(true)
        try {
            const response = await ticketService.findTicket(search)
            setBusInfo(response.data.items)
            const companies = busInfo.map((item) => ({
                companyId: item.companyId,
                companyName: item.company,
            }));

            setCompany(companies)

            console.log(response)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    return (
        <div class='min-h-[1000px] w-content flex flex-col items-center my-xl'>
            {/* <div class='h-[120px] bg-[#e1e1e1] border-none outline-none w-search rounded-lg my-md grid items-center justify-items-center'>
                <SearchHeader onSearch={handSearch} ></SearchHeader>
            </div> */}
            <div className="h-[120px] grid grid-flow-row grid-cols-12 w-full">
                <div className=" bg-[#e1e1e1] shadow-md rounded-md col-span-8 col-start-4">
                    <SearchHeader onSearch={handSearch} ></SearchHeader>
                </div>
            </div>
            <div class='h-full w-full flex'>
                <div class='sidebar m-sm'>

                    {/* Đây là phần sắp xếp */}
                    <div class='h-[220px] bg-transparent border-[1px] rounded-lg shadow-md'>
                        <p class='text-txt text-18 font-bold mt-sm mx-md'>Sắp xếp</p>
                        <div class='h-[160px] sort bg-transparent flex flex-col ml-md '>
                            {
                                sort.map((item, index) => (
                                    <Input type="radio" name="sort" id={item.id} content={item.content}>

                                    </Input>
                                ))
                            }
                        </div>
                    </div>

                    {/* Đây là phần lọc */}
                    <div class='h-[700px] bg-transparent border-[1px] rounded-lg shadow-md my-lg'>
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
                        <div class='h-[190px] w-full my-xl flex flex-col items-center'>
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

                        {/* Đây là giá vé */}
                        <div class='h-[100px] w-full my-xl flex flex-col items-center'>
                            <p class='text-txt text-16 mt-sm mx-md w-content'>Giá vé</p>
                            {/* <input type="range" min="0" id="min" max="2000" value={min} class='text-button' onChange={(e) => setMin(e.target.value)}></input>
                            <input type="number" max='2000' value={min} onChange={(e) => setMin(e.target.value)}></input> */}
                            <MultiRangeSlider
                                min={0}
                                max={1000000}
                                step={5}
                                style={{ width: '90%', margin: '0 12px', boxShadow: 'none', border: 'none' }}
                                label='false'
                                ruler='false'
                                barInnerColor='#00B873'
                                minValue={min}
                                maxValue={max}
                                onInput={(e) => {
                                    handleInput(e);
                                }}
                            />
                            <div class='flex justify-between w-content'>
                                <CurrencyFormat value={min} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                                <CurrencyFormat value={max} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                            </div>


                        </div>

                        {/* Đây là xếp hạng */}

                        <div class='w-full h-[100px] '>
                            <p class='text-txt text-16 mt-sm mx-md w-content'>Đánh giá</p>
                            <div class='w-content flex items-center m-sm'>
                                {

                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={30}
                                        activeColor="#ffd700"
                                    />

                                }
                                <p>({rating[1].sum})</p>
                            </div>
                        </div>


                    </div>

                </div>
                <div class='content my-sm ml-0 mr-sm flex flex-col items-center'>
                    {/* <div class='bg-bg w-content min-h-[10px] mx-sm'>
                        Kết quả
                    </div> */}
                    <div class='w-content h-content mt-sm relative'>
                        {
                            loading ?
                                <div class='absolute bg-hover-txt w-full h-[500px] z-20 opacity-40'>
                                    <ReactLoading
                                        type="spinningBubbles" color="#ffffff"
                                        height={'5%'} width={'5%'}
                                        className="absolute bg-hover-txt left-1/2 top-[50%]  "
                                    />
                                </div>
                                :

                                (!busInfo || busInfo.length === 0) && !loading ?
                                    <p>Không tìm thấy chuyến đi</p>
                                    :
                                    <PaginatedItems itemsPerPage={5} items={busInfo} componentToRender={BusCard} ></PaginatedItems>
                        }
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Search;