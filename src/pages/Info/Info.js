
import InputConfirmInfo from "../../components/Layout/Components/InputConfirmInfo";
import { useState } from "react";
const Info = () => {

    const [type, setType] = useState("text")

    return (
        <div class='w-full h-full flex border-none outline-none bg-[#e1e1e1]'>
            <div class='w-1/2 shrink-0'>
                <p>Thông tin cá nhân</p>
                <div class='flex my-lg items-center'>
                    <div class='w-[80px] h-[80px] shrink-0  overflow-hidden z-1 relative '>
                        <img src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg"
                            class=' w-[80px] h-[80px] object-cover rounded-full'></img>
                        <input type={type} class='bg-[black]  z-10 cursor-pointer w-[10px] h-[10px] absolute right-[0px] bottom-[20%]' onFocus={() => setType("file")}></input>
                    </div>
                    {/* <input type="file" class='w-[100px]'></input> */}
                    <div class='flex items-center'>
                        <p class='mx-sm'>Họ và tên</p>
                        <InputConfirmInfo item={{ placeholder: "Nhập họ và tên", value: "", spanWidth: 120, type: "text" }}></InputConfirmInfo>
                    </div>
                </div>
                <div class='grid grid-flow-row grid-rows-1 grid-cols-4 '>
                    <p>Ngày sinh</p>
                    <p>1</p>
                    <p>02</p>
                    <p>2002</p>
                </div>
                <div class='grid grid-flow-row grid-rows-1 grid-cols-4 '>
                    <p>Giới tính</p>
                    <p>Nam</p>
                    <p>Nữ</p>
                    <p>Khác</p>
                </div>
                <div class='grid grid-flow-row grid-rows-1 grid-cols-4 '>
                    <p>Khánh Hòa</p>
                    <p>Vạn Ninh</p>
                    <p>Vạn Phú</p>
                    <p>Tân Phú</p>
                </div>
                <button>Lưu thay đổi</button>
            </div>
            <div class='w-1/2 shrink-0 bg-txt'>
                <p>Số điện thoại</p>
                <p>hehe</p>

            </div>
        </div>
    );
}

export default Info;