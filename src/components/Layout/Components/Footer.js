import { Link } from "react-router-dom"
import lienhung from "../../../assets/images/logolienhung.jpg"
import phuongtrang from "../../../assets/images/logophuongtrang.png"
import saoviet from "../../../assets/images/logosaoviet.png"
import tienoanh from "../../../assets/images/logotienoanh.png"

const Footer = () => {
    return (
        <footer className="w-[100%] min-h-[200px] flex justify-center bg-no-repeat bg-footerImg bg-cover">
            <div className="w-[50%] min-h-[100%] my-xl flex">
                <ul className="p-md pt-[0px] flex flex-col mr-xl">
                    <p className="font-bold">Về chúng tôi</p>
                    <Link className="hover:underline hover:text-txt my-[2px]">
                        Giới thiệu Y-Trip
                    </Link>
                    <Link className="hover:underline hover:text-txt my-[2px]">
                        Tin tức
                    </Link>
                    <Link className="hover:underline hover:text-txt my-[2px]">
                        Liên hệ
                    </Link>

                </ul>

                <ul className="p-md pt-[0px] flex flex-col  mr-xl">
                    <p className="font-bold">Hỗ trợ</p>
                    <Link className="hover:underline hover:text-txt my-[2px]">
                        Hướng dẫn thanh toán
                    </Link>
                    <Link className="hover:underline hover:text-txt my-[2px]">
                        Điều khoản và chính sách
                    </Link>
                    <Link className="hover:underline hover:text-txt my-[2px]">
                        Câu hỏi thường gặp
                    </Link>
                    <Link className="hover:underline hover:text-txt my-[2px]">
                        Tra cứu đơn hàng
                    </Link>

                </ul>

                <ul className="p-md pt-[0px] flex flex-col mr-xl">
                    <p className="font-bold">Chuyển đi phổ biến</p>
                    <Link className="hover:underline hover:text-txt my-[2px]">
                        Khánh Hòa - TP.HCM
                    </Link>
                    <Link className="hover:underline hover:text-txt my-[2px]">
                        Sapa - Hà Nội
                    </Link>
                    <Link className="hover:underline hover:text-txt my-[2px]">
                        Đà Lạt - TP.HCM
                    </Link>
                    <Link className="hover:underline hover:text-txt my-[2px]">
                        Vinh - Hà Nội
                    </Link>

                </ul>


            </div>
            <div className="w-[30%] min-h-[100%] my-xl font-bold">
                Nhà xe phổ biến
                <div className="flex">
                    <Link to={"/hehe"} className="m-sm hover:scale-95 ease-in-out duration-300">
                        <img src={lienhung} className="w-[80px] h-[80px]">
                        </img>
                    </Link>
                    <Link to={"/hehe"} className="m-sm hover:scale-95 ease-in-out duration-300">
                        <img src={phuongtrang} className="w-[80px] h-[80px]">
                        </img>
                    </Link>
                    <Link to={"/hehe"} className="m-sm hover:scale-95 ease-in-out duration-300">
                        <img src={tienoanh} className="w-[80px] h-[80px]">
                        </img>
                    </Link>
                    <Link to={"/hehe"} className="m-sm hover:scale-95 ease-in-out duration-300">
                        <img src={saoviet} className="w-[80px] h-[80px]">
                        </img>
                    </Link>

                </div>
            </div>
        </footer>
    );
}

export default Footer;