import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
const PopUpShowDetail = ({ items }) => {
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };
    console.log(items)
    return (
        <Popup trigger={<button class="flex justify-center"> <FontAwesomeIcon icon={faMagnifyingGlass} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[34px] h-[34px] mr-sm'></FontAwesomeIcon></button>} position="right center"
            modal
            nested
            closeOnDocumentClick={false}
            {... { contentStyle }}
        >
            {
                close => (

                    <div class='p-md text-16 text-txt max-h-[400px] overflow-auto'>
                        <div class='relative'>
                            <p class='text-20 text-center font-bold'>Chi tiết lộ trình</p>

                            <div class='closeButton cursor-pointer '
                                onClick={close}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </div>

                        

                        {
                            items.map((item, index) => (
                                <div class='grid grid-cols-12 grid-flow-row p-sm'>
                                    {/* <p class='col-span-4 col-start-2 font-semibold'>{item.content}</p> */}
                                    <div class='col-span-6 col-start-4'>
                                        <p className="font-bold">{item.busStationName}</p>
                                        {
                                            item.indexStation !== 1 && <p>Giờ cập bến: {item.arrivalTime}</p>
                                        }
                                        {
                                            item.indexStation !== items.length &&
                                            <p>Giờ xuất bến: {item.departureTime}</p>
                                        }

                                        <p>Ngày so với ngày xuất bến: {item.addDay}</p>

                                    </div>
                                </div>

                            ))
                        }


                    </div>
                )
            }

        </Popup>
    );
}

export default PopUpShowDetail;