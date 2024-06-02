import { faPenToSquare, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const ReviewCard = ({ item }) => {

    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };
    const length = 2; // Replace with your desired length
    const yellowStar = [];
    const grayStar = [];

    for (let i = 1; i <= length; i++) {
        yellowStar.push(i);
    }

    for (let i = length + 1; i <= 5; i++) {
        grayStar.push(i);
    }

    console.log(yellowStar);
    console.log(grayStar);
    return (

        <div class='w-content grid grid-cols-10 grid-flow-row'>
            <div className="col-span-2">
                <div class='w-[70%] flex items-center overflow-hidden'>
                    <img class='w-full h-[100px] object-cover rounded-md'
                        src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg" />

                </div>
                <p className="w-[70%] text-12 text-center">{item.fullName}</p>
            </div>

            <div class='col-span-7 col-start-3'>

                {
                    yellowStar.map((item, index) => (<FontAwesomeIcon key={index} icon={faStar} color="#FFFB73"></FontAwesomeIcon>))
                }
                {
                    grayStar.map((item, index) => (<FontAwesomeIcon key={index} icon={faStar} color="gray"></FontAwesomeIcon>))
                }
                <p>{item.reviews}</p>
            </div>
            {/* <div class='col-span-1 cursor-pointer'>


                <Popup trigger={<button class={""}>  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon></button>} position="right center"
                    modal
                    nested
                    closeOnDocumentClick={false}
                    {... { contentStyle }}
                >
                    {
                        close => (

                            <div class='p-md text-16 text-txt'>
                                <p class='text-20 text-center font-bold'>Chỉnh sửa đánh giá chuyến đi</p>
    
                                <div class='flex items-center justify-center'>
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

            </div> */}
        </div>

    );
}

export default ReviewCard;