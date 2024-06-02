import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Input from "../Components/Input";
import { useEffect, useState } from "react";
const SearchHeader = ({ onSearch }) => {

    const search = JSON.parse(localStorage.getItem('formSearch'));


    useEffect(() => {
        const fetchData = () => {
            if (search)
                onSearch(search)
        };

        fetchData();


    }, []);

    const [formSearch, setFormSearch] = useState({
        stationStart: search ? search.stationStart : '',
        stationEnd: search ? search.stationEnd : '',
        dateTime: search ? search.dateTime : '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormSearch({ ...formSearch, [name]: value });
    }

    const btnClick = () => {
        localStorage.setItem("formSearch", JSON.stringify(formSearch));
        onSearch(formSearch)
    }

    return (
        // <div className='flex w-content h-[80px]   items-center justify-between text-txt' >
        //     <div className='w-[80%] rounded-lg  p-sm  h-full shrink-0 bg-transparent grid grid-cols-3 grid-flow-row gap-sm'>
        //         <div className=' flex items-center '>
        //             <FontAwesomeIcon icon={faLocationDot} className='w-[20px] h-[20px] shrink-0' />
        //             <Input placeholder={'Nơi đi'} content='Nơi đi' onChange={onChange} name="stationStart" value={formSearch.stationStart}></Input>
        //         </div>
        //         <div className=' flex items-center'>
        //             <FontAwesomeIcon icon={faLocationCrosshairs} className='w-[20px] h-[20px] shrink-0' />
        //             <Input placeholder={'Nơi đến'} content='Nơi đến' onChange={onChange} name="stationEnd" value={formSearch.stationEnd}></Input>
        //         </div>
        //         <div className=' flex items-center '>
        //             <FontAwesomeIcon icon={faCalendarDays} className='w-[20px] h-[20px] shrink-0' />
        //             <Input type="date" placeholder={'01/01/2000'} content='Ngày xuất phát' onChange={onChange} name="dateTime" value={formSearch.dateTime}></Input>
        //             {/* <InputConfirmInfo item={{ placeholder: "Ngày đi", value: "", spanWidth: 60, type: "date" }}></InputConfirmInfo> */}
        //         </div>

        //     </div>
        //     <div className='h-full w-[16%] shrink-0  grid items-center'>
        //         <button className='button-hover' onClick={btnClick}>Tìm chuyến</button>
        //     </div>
        // </div>
        <div className='w-full grid grid-cols-12 h-full'>

            <div className='col-span-3 col-start-1 h-full text-hover-txt grid grid-cols-6 grid-flow-row'>
                <div className="col-span-1 flex items-center">
                    <FontAwesomeIcon icon={faLocationDot} className='w-full h-[20px]' />
                </div>
                <div className="col-span-5 ">
                    <Input placeholder={'Nơi đi'} content='Nơi đi' onChange={onChange} name="stationStart" value={formSearch.stationStart}></Input>
                </div>
            </div>

            <div className='col-span-3 h-full text-hover-txt grid grid-cols-6 grid-flow-row'>
                <div className="col-span-1 flex items-center">
                    <FontAwesomeIcon icon={faLocationCrosshairs} className='w-full h-[20px]' />
                </div>
                <div className="col-span-5 ">
                    <Input placeholder={'Nơi đến'} content='Nơi đến' onChange={onChange} name="stationEnd" value={formSearch.stationEnd}></Input>
                </div>
            </div>

            <div className='col-span-3  h-full text-hover-txt grid grid-cols-6 grid-flow-row'>
                <div className="col-span-1 flex items-center">
                    <FontAwesomeIcon icon={faCalendarDays} className='w-full h-[20px]' />
                </div>
                <div className="col-span-5 ">
                    <Input type="date" placeholder={'01/01/2000'} content='Ngày xuất phát' onChange={onChange} name="dateTime" value={formSearch.dateTime}></Input>
                </div>
            </div>



            <div className='col-span-2 col-start-10 h-full text-hover-txt flex items-center'>
                <button className='w-full button-hover ml-md text-txt' onClick={btnClick}>Tìm chuyến</button>
            </div>
        </div>
    );
}

export default SearchHeader;