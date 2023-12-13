import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"
const Location = ({ item, onChange, name, selectedBusStop }) => {
    return (
        <>
            <div class='w-full'>
                <div class='w-full flex items-center'>
                    <input name={name} class='w-[20px] h-[20px]' type="radio"
                        onClick={(e) => onChange(name, item.ticketStopId, item.address, item.departureTime)}
                        checked={item.ticketStopId === selectedBusStop[name]}
                    ></input>

                    <p class='p-sm mx-sm text-16'>{new Date(item.arrivalTime)
                        .toLocaleString("en-CA",
                            {
                                hour: 'numeric',
                                minute: 'numeric',
                                // second: 'numeric',
                                hour12: false, // Use 24-hour format
                            }
                        )
                    } - {item.station}</p>
                </div>
                <div class='w-full ml-md flex justify-center items-center text-12 text-txt'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p class='p-sm mx-sm '>
                        {item.address}
                        <Link to='/' class='text-button'>
                            Xem vị trí chi tiết
                        </Link>
                    </p>

                </div>


            </div>
        </>
    );
}

export default Location;