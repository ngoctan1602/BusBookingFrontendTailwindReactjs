import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"
const Location = ({ item }) => {
    return (
        <>
            <div class='w-full'>
                <div class='w-full flex items-center'>
                    <input name="chooseLocation" class='w-[20px] h-[20px]' type="radio"></input>

                    <p class='p-sm mx-sm text-16'>{item.time} - {item.station}</p>
                </div>
                <div class='w-full ml-md flex justify-center items-center text-12 text-txt'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p class='p-sm mx-sm '>
                        {item.desLocation}
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