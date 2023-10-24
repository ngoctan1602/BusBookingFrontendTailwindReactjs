import bgSearch from "../../assets/images/bustrip.jpg"
import discount from "../../assets/images/discount.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { faIdBadge } from "@fortawesome/free-regular-svg-icons";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Layout/Components/Button";
import Input from "../../components/Layout/Components/Input";
import Card from "../../components/Layout/Components/Card";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Home = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        // prevArrow: false,
        // nextArrow: false,

        // autoplay: true,
        // autoplaySpeed: 3500
    };

    const [cards, setCards] = useState([
        { id: 1, location: 'Đà Nẵng- Sài Gòn', src: bgSearch, price: '120.000đ' },
        { id: 2, location: 'Nha Trang - Sài Gòn', src: bgSearch, price: '200.000đ' },
        { id: 3, location: 'Hà Nội - Nha Trang', src: bgSearch, price: '100.000đ' },
        { id: 4, location: 'Hà Nội - Nha Trang', src: bgSearch, price: '100.000đ' },
        { id: 5, location: 'Hà Nội - Nha Trang', src: bgSearch, price: '100.000đ' },
    ])

    const [discounts, setDiscounts] = useState([
        { id: 1, content: 'Giảm giá 50%', src: discount, type: 'discount' },
        { id: 2, content: 'Giảm giá 30%', src: discount, type: 'discount' },
        { id: 3, content: 'Giảm giá 20%', src: discount, type: 'discount' },
        { id: 4, content: 'Giảm giá 10%', src: discount, type: 'discount' },
        { id: 5, content: 'Giảm giá 30%', src: discount, type: 'discount' },
    ])

    const [introduce, setIntroduce] = useState([
        {
            intro: '2000+ nhà xe chất lượng cao', content: '5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.'
            , src: faBus, type: 'introduce'
        },
        {
            intro: 'Đặt vé dễ dàng', content: 'Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện.'
            , src: faTicket, type: 'introduce'
        },
        {
            intro: 'Đảm bảo có vé', content: 'Hoàn ngay 150% nếu không có vé, mang đến hành trình trọn vẹn.'
            , src: faIdBadge, type: 'introduce'
        },
        {
            intro: 'Nhiều ưu đãi', content: 'Hàng ngàn ưu đãi cực chất độc quyền tại Y-Trip.'
            , src: faGift, type: 'introduce'
        },

    ])

    const [comments, setComments] = useState([
        {
            id: 1, content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
            , name: "Nguyễn Thái Ngọc Tân", type: 'comment', src: bgSearch
        },
        {
            id: 2, content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
            , name: "Nguyễn Thái Ngọc Phước", type: 'comment', src: bgSearch
        },
        {
            id: 3, content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
            , name: "Nguyễn Thái Ngọc Tân", type: 'comment', src: bgSearch
        },
        {
            id: 4, content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
            , name: "Nguyễn Thái Ngọc Phước", type: 'comment', src: bgSearch
        },

    ])

    return (
        <div className="w-screen min-h-[700px] flex flex-col items-center">
            <div className="w-[100%] h-[400px] flex relative">
                <div className="z-20 items-center justify-center flex flex-col w-[100%] h-[100%]">
                    <h4 className="mb-md font-bold text-bg text-[32px]">
                        Nơi nào đang chờ bạn khám phá ?
                    </h4>
                    <div className="bg-bg w-search rounded-xl h-[180px] opacity-70 flex items-center justify-center">
                        <div className="flex w-[80%] rounded-md border-txt border-[0.5px] h-1/2  m-sm">
                            <div className="flex items-center border-r-[0.5px] px-sm">
                                <FontAwesomeIcon icon={faLocationDot} size="2xl" className="p-sm"></FontAwesomeIcon>
                                <Input content="Nơi xuất phát" width="search" />
                            </div>
                            <div className="flex items-center border-r-[0.5px] px-sm">
                                <FontAwesomeIcon icon={faLocationArrow} size="2xl" className="p-sm"></FontAwesomeIcon>
                                <Input content="Nơi đến" width="search" />
                            </div>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faLocationDot} size="2xl" className="p-sm"></FontAwesomeIcon>
                                <Input content="Chọn ngày đi" type="date" width="search" />
                            </div>

                        </div>
                        <Button type="search" content="Tìm chuyến">

                        </Button>
                    </div>
                </div>
                <img src={bgSearch} className="w-[100%] object-cover h-[100%] z-1 absolute">

                </img>
            </div>


            <div className="min-h-[300px] w-[80%] flex flex-col justify-between">
                <h4 className="font-bold text-[24px] my-md">Chuyến đi nổi bật</h4>
                <div className="flex min-h-[80%] w-full ">

                    {
                        cards.map((item, index) => (
                            <Card price={item.price} location={item.location} src={item.src}>
                            </Card>
                        ))
                    }
                </div>
            </div>


            <div className="min-h-[300px] w-[80%] flex flex-col justify-between mt-md">
                <h4 className="font-bold text-[24px] my-md">Ưu đãi nổi bật</h4>
                <div className="flex min-h-[80%] w-full ">
                    {
                        discounts.map((item, index) => (
                            <Card content={item.content} src={item.src} type={item.type}>
                            </Card>
                        ))
                    }
                </div>
            </div>


            <div class='min-h-[420px] w-[80%] my-md'>
                <p class='font-bold text-[24px] my-md'>Khách hàng nói gì về Y-Trip</p>
                <Slider {...settings}>
                    {
                        comments.map((item, index) => (
                            <Card content={item.content} name={item.name} src={item.src} type={item.type}>
                            </Card>
                        ))
                    }
                </Slider>
            </div>

            <div class='w-wrapper min-h-[200px] my-md flex flex-col'>
                <p className="font-bold text-[24px] my-md">Nền tảng kết nối người dùng và nhà xe</p>
                <div class='flex justify-between w-full h-[80%]'>
                    {/* <Card type="introduce">
                    </Card>
                    <Card type="introduce">
                    </Card>
                    <Card type="introduce">
                    </Card>
                    <Card type="introduce">
                    </Card> */}
                    {
                        introduce.map((item, index) => (
                            <Card content={item.content} intro={item.intro} src={item.src} type={item.type}>
                            </Card>
                        ))
                    }
                </div>
            </div>




        </div>
    );
}

export default Home;