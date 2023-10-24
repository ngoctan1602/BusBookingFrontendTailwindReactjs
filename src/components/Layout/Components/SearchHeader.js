import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import InputConfirmInfo from "./InputConfirmInfo";
const SearchHeader = ({ onchangeStart, onchangeTime }) => {

    return (
        <div class='flex w-content h-[80px]  bg-[#e1e1e1]  items-center justify-between text-txt' >
            <div class='w-[80%] rounded-lg  p-sm  h-full shrink-0 bg-transparent grid grid-cols-3 grid-flow-row gap-sm'>
                <div class=' flex items-center '>
                    <FontAwesomeIcon icon={faLocationDot} class='w-[20px] h-[20px] shrink-0' />
                    <InputConfirmInfo item={{ placeholder: "Nơi đi", value: "", spanWidth: 46, type: "text" }}></InputConfirmInfo>
                </div>
                <div class=' flex items-center'>
                    <FontAwesomeIcon icon={faLocationCrosshairs} class='w-[20px] h-[20px] shrink-0' />
                    <InputConfirmInfo item={{ placeholder: "Nơi đến", value: "", spanWidth: 60, type: "text" }}></InputConfirmInfo>
                </div>
                <div class=' flex items-center '>
                    <FontAwesomeIcon icon={faCalendarDays} class='w-[20px] h-[20px] shrink-0' />
                    <InputConfirmInfo item={{ placeholder: "Ngày đi", value: "", spanWidth: 60, type: "date" }}></InputConfirmInfo>
                </div>

            </div>
            <div class='h-full w-[16%] shrink-0  grid items-center'>
                <button class='button-hover'>Tìm chuyến</button>
            </div>
        </div>
    );
}

export default SearchHeader;