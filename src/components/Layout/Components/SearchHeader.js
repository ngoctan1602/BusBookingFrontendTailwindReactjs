import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Input from "../Components/Input";
import { useState } from "react";
import InputConfirmInfo from "./InputConfirmInfo";
const SearchHeader = ({ onSearch }) => {

    const [formSearch, setFormSearch] = useState({
        stationStart:'',
        stationEnd:'',
        dateTime: ''
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormSearch({ ...formSearch, [name]: value });
    }

    const btnClick = () => {
        onSearch(formSearch)
    }

    return (
        <div className='flex w-content h-[80px]  bg-[#e1e1e1]  items-center justify-between text-txt' >
            <div className='w-[80%] rounded-lg  p-sm  h-full shrink-0 bg-transparent grid grid-cols-3 grid-flow-row gap-sm'>
                <div className=' flex items-center '>
                    <FontAwesomeIcon icon={faLocationDot} className='w-[20px] h-[20px] shrink-0' />
                    <Input placeholder={'Nơi đi'} content='Nơi đi' onChange={onChange} name="stationStart" value={formSearch.stationStart}></Input>
                </div>
                <div className=' flex items-center'>
                    <FontAwesomeIcon icon={faLocationCrosshairs} className='w-[20px] h-[20px] shrink-0' />
                    <Input placeholder={'Nơi đến'} content='Nơi đến' onChange={onChange} name="stationEnd" value={formSearch.stationEnd}></Input>
                </div>
                <div className=' flex items-center '>
                    <FontAwesomeIcon icon={faCalendarDays} className='w-[20px] h-[20px] shrink-0' />
                    <Input type="date" placeholder={'01/01/2000'} content='Ngày xuất phát' onChange={onChange} name="dateTime" value={formSearch.dateTime}></Input>
                    {/* <InputConfirmInfo item={{ placeholder: "Ngày đi", value: "", spanWidth: 60, type: "date" }}></InputConfirmInfo> */}
                </div>

            </div>
            <div className='h-full w-[16%] shrink-0  grid items-center'>
                <button className='button-hover' onClick={btnClick}>Tìm chuyến</button>
            </div>
        </div>
    );
}

export default SearchHeader;