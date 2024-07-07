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
import { Button, Empty } from "antd";
import Search from "antd/es/input/Search";

const CreateRouteDetail = () => {
    let navigate = useNavigate();
    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = (message) => toast.error(message, {
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
        fetchData()
    }, [currentPage]);
    useEffect(() => {
        getData()
    }, []);

    const [route, setRoute] = useState([])

    const [loading, setLoading] = useState(false)
    // useEffect(() => {
    //     fetchData();
    // }, [currentPage])
    const fetchData = async (startId, endId) => {
        setLoading(true)
        try {

            // const routerresp = await RoutesSV.getAllRoutes();
            // setRoute(routerresp.data.items)
            const respBusStation = await BusStationSv.getAllBusStationWithParams({ pageSize: 10, pageIndex: currentPage + 1 });

            if (!respBusStation.isError) {

                const filteredItems = respBusStation.data.items.filter(item => {
                    // Replace the condition below with your filtering criterion
                    return (item.id !== startId && item.id !== endId);
                });

                const a = respBusStation.data.items.filter(item => { return (item.id === startId || item.id === endId) })
                const b = a.map(item => {
                    if (item.id === startId) {

                        return {
                            BusStationId: item.id,
                            NameBusStation: item.name,
                            IndexStation: 1,
                            ArrivalTime: '00:00:00',
                            DepartureTime: '00:00:00',
                            AddDay: 0,
                            DiscountPrice: 0
                        }
                    } else
                        return {
                            BusStationId: item.id,
                            NameBusStation: item.name,
                            IndexStation: 2,
                            ArrivalTime: '00:00:00',
                            DepartureTime: '00:00:00',
                            AddDay: 0,
                            DiscountPrice: 0
                        }
                })

                setBusStation(filteredItems)
                setPageTotal(respBusStation.data.pageTotal)
                setItemSelected(b.sort((a, b) => a.IndexStation - b.IndexStation))
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

    const filterElements = (tableA, tableB) => {
        const idsInB = new Set(tableB.map(itemB => itemB.id));
        return tableA.filter(itemA => !idsInB.has(itemA.id));
    };
    const getData = async () => {
        try {

            const routerresp = await RoutesSV.getAllRoutesWithParams({ pageSize: 200 });
            const routeInCompany = await RoutesSV.getAllRoutesByCompany({ pageSize: 200 })
            if (!routerresp.isError && routerresp.data.items.length > 0
                && !routeInCompany.isError && routeInCompany.data.items.length >= 0
            ) {
                // const filter = routerresp.data.items.filter(item => item.routes.length === 0)
                // setRoute(routerresp.data.items)
                const filteredElements = filterElements(routerresp.data.items, routeInCompany.data.items);
                setRoute(filteredElements)
                // setRoute(filter)
            }
            setBusStation([])
            setCurrentPage(0)
            setSelectedIds([])

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [routeId, setRouteId] = useState(0)
    const handleChangeRoute = (value) => {
        const data = JSON.parse(value)
        // if (data.id > 0) {

        console.log(data.stationStartId)
        setRouteId(data.id)
        setCurrentPage(0)
        fetchData(data.stationStartId, data.stationEndId)
        // }
        // fetchData(1, 3)
    }
    const [loadingCreate, setLoadingCreate] = useState(false);
    const createRouteDetail = async () => {
        // const object = { Items: { ...selectedItem } }
        const object = selectedItem.map(item => { return ({ ...item, RouteId: routeId }) })
        console.log(object)
        const objectAdd = ({ Items: object })
        console.log(objectAdd)
        setLoadingCreate(true)
        try {
            const resp = await RouteDetailSV.createRoute(objectAdd);
            setLoadingCreate(false)
            if (!resp.isError) {
                notifySuccess("Tạo mới thành công");
                getData()
                setItemSelected([])
                setCurrentPage(0)
                setPageTotal(0)
                setBusStation([])
                setRoute([])
                setRouteId(0)
            }
            else {
                notifyError("Tạo mới lộ trình thất bại")
            }

        } catch (error) {
            console.log(error)
        }
        console.log(object)
    }

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedItem, setItemSelected] = useState([]);
    const handleSwap = (index1, index2) => {
        console.log(index1, index2)
        if (selectedItem.length >= 4 && index1 > 0 && index2 > 0 && index1 < (selectedItem.length - 1) & index2 < (selectedItem.length - 1)) {

            const newArray = [...selectedItem];
            // Create a copy of the array
            console.log(newArray)
            console.log(newArray[index1])
            console.log(newArray[index2])
            const temp = newArray[index1];
            newArray[index1] = newArray[index2];
            newArray[index2] = temp;

            newArray.forEach((item, index) => {
                item.IndexStation = index + 1;
            });
            setItemSelected(newArray)
            // console.log(newArray)
            // setItemSelected(newArray)
            // setItemSelected(newItems.sort((a, b) => a.IndexStation - b.IndexStation));
        }

    };

    const handleCheckboxChange = (event, id, item) => {

        if (event.target.checked) {
            // Nếu được chọn, thêm ID vào mảng
            setSelectedIds(prevIds => [...prevIds, id]);
            // setItemSelected(prevItem => [...prevItem, item]);
            ///Cái này mới
            const newItemIndex = (selectedItem[selectedItem.length - 2].IndexStation + selectedItem[selectedItem.length - 1].IndexStation) / 2;
            const newItem = {
                ...item, IndexStation: newItemIndex
            }
            const updatedItems = [...selectedItem, newItem];
            updatedItems.sort((a, b) => a.IndexStation - b.IndexStation);
            updatedItems[updatedItems.length - 1].IndexStation = updatedItems.length;
            const updatedItemsRounded = updatedItems.map(item => ({
                ...item,
                IndexStation: Math.round(item.IndexStation),
            }));
            setItemSelected(updatedItemsRounded);

        } else {
            // Nếu không được chọn, loại bỏ ID khỏi mảng
            setSelectedIds(prevIds => prevIds.filter(prevId => prevId !== id));
            // setItemSelected(prevItem => prevItem.filter(prevItem => prevItem.BusStationId !== id));
            setItemSelected(prevItems => {
                const newItems = prevItems.filter(prevItem => prevItem.BusStationId !== id);

                // Cập nhật chỉ mục của các phần tử ở sau
                for (let i = 0; i < newItems.length; i++) {
                    newItems[i].IndexStation = i + 1;
                }

                return newItems;
            });
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
        <div class='w-full rounded-md bg-bg p-md text-txt txt-16 relative box-shadow-content min-h-[600px]'>
            <div class='grid grid-cols-12 grid-flow-row gap-4 items-center mt-md'>
                <p class='col-span-2 font-bold text-20'>Quản lý lộ trình</p>
                <select className="col-start-4 col-span-3 outline-none p-sm rounded-md border-[1px] border-hover-txt"
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
                <select className="col-start-4  col-span-3 outline-none p-sm rounded-md border-[1px] border-hover-txt"
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
                {/* <button className="col-span-3 col-start-9 border-[1px] rounded-md border-button
                                hover:bg-button hover:text-bg ease-in-out duration-300 "
                    onClick={createRouteDetail}
                >
                    Tạo lộ trình
                </button> */}
            </div>

            <div className="w-full grid grid-flow-row grid-cols-12 mt-lg ">
                <div class='col-span-12 col-start-1 grid grid-flow-row grid-cols-12'>
                    <p className="col-start-1 text-[18px] col-span-3">
                        Chọn các điểm đón trả:
                    </p>
                    <div class='col-span-6 col-start-4'>
                        <Search placeholder="Tìm kiếm điểm đón trả" className="w-full" />
                    </div>
                    <div class='col-span-2 col-start-11'>
                        <Button className="w-full" onClick={createRouteDetail} >Tạo lộ trình </Button>
                    </div>
                </div>
                <div class='col-span-12 col-start-1 mb-lg min-h-[300px] '>
                    <table class="w-full my-sm rounded-md border-collapse  text-txt text-16 relative">
                        {
                            loading &&
                            <div className="animate-pulse bg-hover-txt w-full h-[300px] text-bg text-center">
                            </div>
                        }
                        <thead>
                            <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                                {/* <th class='col-start-2 col-span-2'>Mã bến</th> */}
                                <th class='col-span-4 col-start-2'>Tên bến xe</th>
                                <th class='col-span-5'>Địa chỉ</th>
                            </tr>
                        </thead>
                        <tbody class='relative'>
                            {
                                !loading &&
                                    busStation.length > 0 ?
                                    <PaginatedItemsWithAPI currentPage={currentPage} handleClick={handlePageClick} componentToRender={BusStationRow} items={busStation} pageCount={pageTotal} fetchData={fetchData}
                                        // nameRadio={"check"} type="checkbox"
                                        onUpdate={handleCheckboxChange}
                                    ></PaginatedItemsWithAPI>
                                    :
                                    (!loading &&
                                        busStation.length === 0) &&
                                    <Empty className="mt-sm" description="Không có tuyến đi nào" />
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full grid grid-flow-row grid-cols-12 ">
                <div class='col-span-12 col-start-1 text-[18px]'>Các điểm đón trả đã chọn:</div>
                <div class='col-span-12 col-start-1 max-h-[800px]'>
                    <table class="w-full my-sm border-collapse  text-txt text-16 max-h-[800px] overflow-y-auto">
                        {
                            loading &&
                            <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                            </div>
                        }
                        <thead>
                            <tr class='grid bg-button grid-cols-12 p-sm text-left gap-md'>
                                {/* <th class='col-span-1'>Mã bến</th> */}
                                <th class='col-span-1'>Thứ tự</th>
                                <th class='col-span-2'>Tên bến xe</th>
                                <th class='col-span-2'>Giờ cập bến</th>
                                <th class='col-span-2'>Giờ xuất bến</th>
                                <th class='col-span-2'>Giảm giá</th>
                                <th class='col-span-2'>Ngày so với bến xuất phát</th>
                            </tr>
                        </thead>
                        <tbody class=''>
                            {
                                loading ?
                                    <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                                    </div> :
                                    !loading &&
                                        selectedItem.length > 0 ?
                                        selectedItem.map((item) => (
                                            <tr className="grid grid-cols-12 p-sm text-left gap-md">
                                                {/* <td class='col-span-1'>{item.BusStationId}</td> */}
                                                <td class='col-span-1'>
                                                    <input className="w-full text-center rounded-sm outline-none px-sm  border-[1px] border-hover-txt"
                                                        type="number"
                                                        min={2}
                                                        max={selectedItem.length - 1}
                                                        disabled={(item.IndexStation === 1 || item.IndexStation === selectedItem.length) ? true : false}
                                                        value={item.IndexStation}
                                                        // onChange={(e) => updateItems(item.BusStationId, "IndexStation", Number(e.target.value))}
                                                        onChange={(e) => handleSwap(Number(e.target.value - 1), Number(item.IndexStation - 1))}
                                                    >
                                                    </input>
                                                </td>
                                                <td class='col-span-2'>{item.NameBusStation}</td>
                                                <td class='col-span-2'>
                                                    <input className="w-full text-center rounded-sm outline-none px-sm  border-[1px] border-hover-txt"
                                                        type="time"
                                                        hidden={item.IndexStation === 1}
                                                        value={item.ArrivalTime}
                                                        onChange={(e) => updateItems(item.BusStationId, "ArrivalTime", e.target.value + ":00")}
                                                    >
                                                    </input>
                                                </td>
                                                <td class='col-span-2'>
                                                    <input className="w-full text-center rounded-sm outline-none px-sm border-[1px] border-hover-txt"
                                                        type="time"
                                                        hidden={item.IndexStation === (selectedItem.length)}
                                                        value={item.DepartureTime}
                                                        onChange={(e) => updateItems(item.BusStationId, "DepartureTime", e.target.value + ":00")}
                                                    >
                                                    </input>
                                                </td>
                                                <td class='col-span-2'>
                                                    <input className="w-full text-center rounded-sm outline-none px-sm  border-[1px] border-hover-txt"
                                                        type="number"
                                                        min={0}
                                                        value={item.DiscountPrice}
                                                        onChange={(e) => updateItems(item.BusStationId, "DiscountPrice", Number(e.target.value))}
                                                    >
                                                    </input>
                                                </td>
                                                <td class='col-span-2'>
                                                    <input className="w-full text-center rounded-sm outline-none px-sm  border-[1px] border-hover-txt"
                                                        type="number"
                                                        min={0}
                                                        value={item.AddDay}
                                                        onChange={(e) => updateItems(item.BusStationId, "AddDay", Number(e.target.value))}
                                                    >
                                                    </input>
                                                </td>
                                            </tr>
                                        ))
                                        : <Empty className="mt-sm" description="Chưa chọn tuyến đi."></Empty>
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