import { useState } from "react";
import ReviewCard from "../../components/Layout/Components/ReviewCard";

const HisReview = () => {

    const [offsetLeft, setOffsetLeft] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(0);
    const [listAbout, setListAbout] = useState(
        [
            {
                id: 1, content: "Chờ đánh giá", active: true
            },
            {
                id: 2, content: "Đã đánh giá", active: false
            },

        ]
    )
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

    return (



        <div class='w-full h-full flex border-none outline-none  rounded-lg overflow-hidden text-txt text-16'>
            <div class='w-full shrink-0 bg-[#e1e1e1]'>
                <div class='w-full min-h-[80px] flex flex-col items-center bg-button mb-md'>

                    <p class='w-content text-center font-bold m-md text-18 bg-button'>Đánh giá chuyến đi</p>
                    <div class='w-full grid grid-flow-row grid-cols-2 bg-[#e1e1e1] relative'>

                        {
                            listAbout.map((item, index) => (
                                <div class='span-col-1 text-center py-md border-b-[2px] ease-in-out duration-500 cursor-pointer'
                                    style={{ color: item.active ? "#00B873" : "", fontWeight: item.active ? "bold" : "" }}
                                    onClick={(e) => activeListAbout(e.target.offsetWidth, e.target.offsetLeft, item.id)}>
                                    {item.content} </div>
                            ))
                        }
                        <span class='h-[2px] bottom-position ease-in-out duration-500 bg-button' style={{ left: `${offsetLeft}px`, width: `${offsetWidth}px` }}></span>
                    </div>
                </div>

                <div class='flex justify-center'>
                    <ReviewCard></ReviewCard>
                </div>

            </div>
        </div>
    );
}

export default HisReview;