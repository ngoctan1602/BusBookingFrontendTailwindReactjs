import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Input from "../Components/Input";
import { useEffect, useState } from "react";
import { AutoComplete, Col, DatePicker, Row } from "antd";
import { Form } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../../../../src/store/slice/searchSlice";
const SearchHeader = ({ onSearch }) => {
    const dispatch = useDispatch();
    const searchSlice = useSelector((state) => state.search);
    // const search = JSON.parse(localStorage.getItem('formSearch'));
    const [options, setOptions] = useState([
        { value: 'Nha Trang' },
        { value: 'Hải Phòng' },
        { value: 'Sài Gòn' },
        { value: 'Gia Lai' },
        { value: 'Bình Định' },

    ]);

    useEffect(() => {
        const fetchData = () => {
            if (searchSlice)
                onSearch(searchSlice)
        };

        fetchData();
    }, []);

    const [formSearch, setFormSearch] = useState({
        stationStart: searchSlice ? searchSlice.stationStart : '',
        stationEnd: searchSlice ? searchSlice.stationEnd : '',
        dateTime: searchSlice ? moment(searchSlice.dateTime) : moment(),
    });

    const [dateValue, setDateValue] = useState(searchSlice ? moment(searchSlice.dateTime) : moment());
    const onChangeDate = (date, dateString) => {
        setDateValue(date)
        setFormSearch({ ...formSearch, ["dateTime"]: dateString })
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormSearch({ ...formSearch, [name]: value });
    }

    const btnClick = () => {
        // localStorage.setItem("formSearch", JSON.stringify(formSearch));
        // dispatch(setSearch(formSearch))
        onSearch(formSearch)
    }

    return (

        <div className='w-full grid grid-cols-12 h-full'>
            <div className='mr-md col-span-3 col-start-1 h-full text-hover-txt grid grid-cols-6 grid-flow-row'>
                <div className="col-span-1 flex items-center justify-center h-[100%]">
                    <FontAwesomeIcon icon={faLocationDot} className='w-full h-[30px]' />
                </div>
                <div className="col-span-5 flex flex-col justify-center h-[100%]">
                    <div>Chọn điểm xuất phát</div>
                    <AutoComplete
                        options={options}
                        className="w-full"
                        onChange={(value) => setFormSearch({ ...formSearch, ["stationStart"]: value })}
                        fieldNames="stationStart"
                        allowClear
                        value={formSearch.stationStart}
                        placeholder="Chọn điểm xuất phát"
                        filterOption={(inputValue, option) =>
                            option.value.toLowerCase().includes(inputValue.toLowerCase())
                        }
                    />
                    {/* <Input placeholder={'Nơi đi'} content='Nơi đi' onChange={onChange} name="stationStart" value={formSearch.stationStart}></Input> */}
                </div>
            </div>

            <div className='col-span-3 h-full text-hover-txt grid grid-cols-6 grid-flow-row'>
                <div className="col-span-1 flex items-center justify-center h-[100%]">
                    <FontAwesomeIcon icon={faLocationCrosshairs} className='w-full h-[30px]' />
                </div>
                <div className="col-span-5 flex flex-col justify-center h-[100%]">
                    <div>Chọn điểm đến</div>
                    <AutoComplete
                        options={options}
                        allowClear
                        className="w-full"
                        onChange={(value) => setFormSearch({ ...formSearch, ["stationEnd"]: value })}
                        fieldNames="stationEnd"
                        value={formSearch.stationEnd}
                        placeholder="Chọn điểm đến"
                        filterOption={(inputValue, option) =>
                            option.value.toLowerCase().includes(inputValue.toLowerCase())
                        }
                    />
                    {/* <Input placeholder={'Nơi đến'} content='Nơi đến' onChange={onChange} name="stationEnd" value={formSearch.stationEnd}></Input> */}
                </div>
            </div>

            <div className='col-span-3  h-full text-hover-txt grid grid-cols-6 grid-flow-row'>
                <div className="col-span-1 flex items-center justify-center h-[100%]">
                    <FontAwesomeIcon icon={faCalendarDays} className='w-full h-[20px]' />
                </div>
                <div className="col-span-5 flex flex-col justify-center h-[100%]">
                    <div>Chọn ngày xuất phát</div>
                    <DatePicker
                        placeholder="Chọn ngày xuất phát"
                        value={dateValue}
                        onChange={(date, dateString) => onChangeDate(date, dateString)}
                        name="dateTime"
                        format="YYYY-MM-DD"
                    >
                    </DatePicker>
                    {/* <Input type="date" placeholder={'01/01/2000'} content='Ngày xuất phát' onChange={onChange} name="dateTime" value={formSearch.dateTime}></Input> */}
                </div>
            </div>
            <div className='col-span-2 col-start-10 h-full text-hover-txt relative ml-sm'>
                <button className='w-full p-[2px] absolute h-[30px] bottom-[16px] text-hover-txt border-hover-txt border-[1px] border-solid rounded-md' onClick={btnClick}>Tìm chuyến</button>
            </div>
        </div >

    );
}

export default SearchHeader;