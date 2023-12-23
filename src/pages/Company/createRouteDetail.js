import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PopupAdd from "../../components/Layout/Components/Company/RouteDetail/PopupAdd";
import * as busServices from "../../services/Company/BusSV";
import * as ticketSV from "../../services/Company/Ticket";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import BusStationRow from "../../components/Layout/Components/Company/RouteDetail/CheckBusStationRow";
import PaginatedItemsWithAPI from "../../components/Layout/Components/PaginateWithApi";
import * as BusStationSv from "../../services/BusStationSv"
import * as RoutesSV from "../../services/RoutesSV"
import * as RouteDetailSV from "../../services/Company/RouteDetailSV"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CreateRouteDetail = () => {
    let navigate = useNavigate();
    const notifySuccess = () => toast.success('Cập nhật trạng thái thành công!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = () => toast.error('Cập nhật trạng thái thất bại', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    document.title = "Thêm mới lộ trình";

    const [busStation, setBusStation] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    // useEffect(() => {
    //     fetchData();
    // }, [currentPage]);

    useEffect(() => {
        getData()
    }, []);

    const [route, setRoute] = useState([])

    const [loading, setLoading] = useState(false)
    const fetchData = async (startId, endId) => {
        setLoading(true)
        try {

            // const routerresp = await RoutesSV.getAllRoutes();
            // setRoute(routerresp.data.items)
            const respBusStation = await BusStationSv.getAllBusStationWithParams({ pageSize: 200, pageIndex: currentPage + 1 });

            if (!respBusStation.isError) {

                const filteredItems = respBusStation.data.items.filter(item => {
                    // Replace the condition below with your filtering criterion
                    return (item.id !== startId && item.id !== endId);
                });
                const a = respBusStation.data.items.filter(item => { return (item.id === startId || item.id === endId) })
                const b = a.map(item => {
                    return {
                        BusStationId: item.id,
                        NameBusStation: item.name,
                        IndexStation: 1,
                        ArrivalTime: '19:00:00',
                        DepartureTime: '19:00:00',
                        AddDay: 0,
                        DiscountPrice: 0
                    }
                })
                setBusStation(filteredItems)
                setPageTotal(respBusStation.data.pageTotal)
                setItemSelected(b)
                setSelectedIds([])
            }
            // console.log(filteredItems)
            // console.log(a)
            // console.log(b)
            setLoading(false)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getData = async () => {
        try {

            const routerresp = await RoutesSV.getAllRoutes();
            if (!routerresp.isError)
                setRoute(routerresp.data.items)


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [routeId, setRouteId] = useState(0)
    const handleChangeRoute = (value) => {
        const data = JSON.parse(value)
        console.log(data.stationStartId)
        setRouteId(data.id)
        fetchData(data.stationStartId, data.stationEndId)
        // fetchData(1, 3)
    }
    const createRouteDetail = async () => {
        // const object = { Items: { ...selectedItem } }
        const object = selectedItem.map(item => { return ({ ...item, RouteId: routeId }) })
        console.log(object)
        const objectAdd = ({ Items: object })
        console.log(objectAdd)
        try {
            const resp = await RouteDetailSV.createRoute(objectAdd);
            if (!resp.isError) {
                notifySuccess();
            }
            else {
                notifyError()
            }
        } catch (error) {
            console.log(error)
        }
        console.log(object)
    }

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedItem, setItemSelected] = useState([]);
    const handleCheckboxChange = (event, id, item) => {

        if (event.target.checked) {
            // Nếu được chọn, thêm ID vào mảng
            setSelectedIds(prevIds => [...prevIds, id]);
            setItemSelected(prevItem => [...prevItem, item]);

        } else {
            // Nếu không được chọn, loại bỏ ID khỏi mảng
            setSelectedIds(prevIds => prevIds.filter(prevId => prevId !== id));
            setItemSelected(prevItem => prevItem.filter(prevItem => prevItem.BusStationId !== id));

        }

    };
    const updateItems = (id, name, value) => {
        const update = selectedItem.map(item => {
            if (item.BusStationId === id)
                return { ...item, [name]: value }
            return { ...item }
        })
        setItemSelected(update)
    }



    return (
        <div class='w-full text-txt txt-16 '>

            <div class='grid grid-cols-12 grid-flow-row gap-4 items-center'>
                <p class='col-span-2 font-bold text-20'>Quản lý lộ trình</p>
                <select className="col-span-3 outline-none p-sm rounded-md bg-bgPopup border-[1px] border-hover-txt"
                    onChange={(e) => navigate(e.target.value)}
                >
                    <option selected >
                        Thêm mới lộ trình
                    </option>
                    <option value={'/company/route-detail'}>
                        Cập nhật lộ trình
                    </option>
                </select>

            </div>
            <div className="w-full grid grid-cols-12 grid-flow-row mt-lg">
                <div className="col-span-2 col-start-1 flex items-center text-[18px]">
                    Chọn tuyến đi
                </div>
                <select className="col-span-3 outline-none p-sm rounded-md bg-bgPopup border-[1px] border-hover-txt"
                    onChange={(e) => handleChangeRoute(e.target.value)}
                >
                    <option value={0}>
                        Chọn tuyến đi
                    </option>
                    {
                        route.length > 0 &&
                        route.map(item =>
                        (<option value={JSON.stringify(item)}>
                            {item.stationStartName + " - " + item.stationEndName}
                        </option>))
                    }
                </select>
                <button className="col-span-3 col-start-9 border-[1px] rounded-md border-button
                                hover:bg-button hover:text-bg ease-in-out duration-300 "
                    onClick={createRouteDetail}
                >
                    Tạo lộ trình
                </button>
            </div>

            <div className="w-full grid grid-flow-row grid-cols-12 mt-lg">
                <div class='col-span-12 col-start-1 text-[18px]'>Chọn các điểm đón trả: </div>
                <div class='col-span-10 col-start-2 overflow-y-auto overflow-x-auto mb-lg h-[300px] shadow-lg'>
                    <table class="w-full my-sm rounded-md border-collapse  text-txt text-16 relative">
                        {
                            loading &&
                            <div class='absolute bg-hover-txt  w-[100%] h-[248px] z-20 '>
                                <ReactLoading
                                    type="spinningBubbles" color="#e1e1e1"
                                    height={'10%'} width={'10%'}
                                    className="absolute left-[50%] top-[30%]  "
                                />
                            </div>
                        }
                        <thead>
                            <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                                <th class='col-start-2 col-span-2'>Mã bến</th>
                                <th class='col-span-4'>Tên bến xe</th>
                                <th class='col-span-5'>Địa chỉ</th>
                            </tr>
                        </thead>
                        <tbody class='bg-[#e1e1e1] relative'>
                            {
                                // loading &&
                                // <div class='absolute  w-[100%] h-full z-20 '>
                                //     <ReactLoading
                                //         type="spinningBubbles" color="#090808"
                                //         height={'10%'} width={'10%'}
                                //         className="absolute left-[50%] top-[-50%]  "
                                //     />
                                // </div>
                                // :
                                !loading &&
                                    busStation.length > 0 ?
                                    <PaginatedItemsWithAPI handleClick={handlePageClick} componentToRender={BusStationRow} items={busStation} pageCount={pageTotal} fetchData={fetchData}
                                        // nameRadio={"check"} type="checkbox"
                                        onUpdate={handleCheckboxChange}
                                    ></PaginatedItemsWithAPI>
                                    :
                                    (!loading &&
                                        busStation.length === 0) &&
                                    <tr>
                                        <td className="text-center h-[240px]">Không có bến nào</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full grid grid-flow-row grid-cols-12 mt-lg relative">
                {
                    loading &&
                    <div class='absolute bg-hover-txt  w-[100%] h-[248px] z-20 '>
                        <ReactLoading
                            type="spinningBubbles" color="#e1e1e1"
                            height={'10%'} width={'10%'}
                            className="absolute left-[50%] top-[30%]  "
                        />
                    </div>
                }
                <div class='col-span-12 col-start-1 text-[18px]'>Các điểm đón trả đã chọn: {selectedIds.join(',')}</div>
                <div class='col-span-12 col-start-1 overflow-y-auto overflow-x-auto mb-lg max-h-[300px] shadow-lg'>
                    <table class="w-full my-sm rounded-md border-collapse  text-txt text-16 ">
                        <thead>
                            <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                                <th class='col-span-1'>Mã bến</th>
                                <th class='col-span-1'>Thứ tự</th>
                                <th class='col-span-2'>Tên bến xe</th>
                                <th class='col-span-2'>Giờ cập bến</th>
                                <th class='col-span-2'>Giờ xuất bến</th>
                                <th class='col-span-2'>Giảm giá</th>
                                <th class='col-span-2'>Ngày so với bến xuất phát</th>
                            </tr>
                        </thead>
                        <tbody class='bg-[#e1e1e1]'>
                            {
                                selectedItem.length > 0 &&
                                selectedItem.map((item) => (
                                    <tr className="grid grid-cols-12 p-sm text-left gap-md">
                                        <td class='col-span-1'>{item.BusStationId}</td>
                                        <td class='col-span-1'>
                                            <input className="w-full text-center rounded-sm outline-none px-sm bg-bgPopup border-[1px] border-hover-txt"
                                                type="number"
                                                min={1}
                                                value={item.IndexStation}
                                                onChange={(e) => updateItems(item.BusStationId, "IndexStation", Number(e.target.value))}
                                            >
                                            </input>
                                        </td>
                                        <td class='col-span-2'>{item.NameBusStation}</td>
                                        <td class='col-span-2'>
                                            <input className="w-full text-center rounded-sm outline-none px-sm bg-bgPopup border-[1px] border-hover-txt"
                                                type="time"
                                                value={item.ArrivalTime}
                                                onChange={(e) => updateItems(item.BusStationId, "ArrivalTime", e.target.value + ":00")}
                                            >
                                            </input>
                                        </td>
                                        <td class='col-span-2'>
                                            <input className="w-full text-center rounded-sm outline-none px-sm bg-bgPopup border-[1px] border-hover-txt"
                                                type="time"
                                                value={item.DepartureTime}
                                                onChange={(e) => updateItems(item.BusStationId, "DepartureTime", e.target.value + ":00")}
                                            >
                                            </input>
                                        </td>
                                        <td class='col-span-2'>
                                            <input className="w-full text-center rounded-sm outline-none px-sm bg-bgPopup border-[1px] border-hover-txt"
                                                type="number"
                                                min={0}
                                                value={item.DiscountPrice}
                                                onChange={(e) => updateItems(item.BusStationId, "DiscountPrice", Number(e.target.value))}
                                            >
                                            </input>
                                        </td>
                                        <td class='col-span-2'>
                                            <input className="w-full text-center rounded-sm outline-none px-sm bg-bgPopup border-[1px] border-hover-txt"
                                                type="number"
                                                min={0}
                                                value={item.AddDay}
                                                onChange={(e) => updateItems(item.BusStationId, "AddDay", Number(e.target.value))}
                                            >
                                            </input>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />

        </div>
    );
}

export default CreateRouteDetail;