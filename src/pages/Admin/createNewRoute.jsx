import { Breadcrumb, Button, Col, Empty, Row } from "antd";
import Search from "antd/es/input/Search";
import * as BusStationSv from "../../services/BusStationSv"
import * as RoutesSV from "../../services/RoutesSV"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginatedItemsWithAPI from "../../components/Layout/Components/PaginateWithApi";
import CheckBusStationRow from "../../components/Layout/Components/Admin/manageRoutes/CheckBusStationRow";
import { useNavigate } from "react-router-dom";

const CreateNewRoute = () => {
    document.title = "Thêm mới tuyến đi"
    const notifySuccess = (meseage) => toast.success(meseage, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = (meseage) => toast.error(meseage, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyWarning = (meseage) => toast.warning(meseage, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const [loading, setLoading] = useState(false);
    const [loadingEnd, setLoadingEnd] = useState(false);
    const [busStationStart, setBusStationStart] = useState([]);
    const [currentPageStart, setCurrentPageStart] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);

    const [busStationEnd, setBusStationEnd] = useState([]);
    const [currentPageEnd, setCurrentPageEnd] = useState(0);
    const [pageTotalEnd, setPageTotalEnd] = useState(0);
    const [objectAdd, setObjectAdd] = useState(
        {
            StationStartId: 0,
            StationEndId: 0,
        }
    )
    const fetchDataBusStationOnce = async () => {
        setLoading(true);
        try {
            const respBusStation = await BusStationSv.getAllBusStationWithParams({ pageSize: 10, pageIndex: 1 });
            if (!respBusStation.isError) {
                setBusStationStart(respBusStation.data.items)
                setBusStationEnd(respBusStation.data.items)
                setPageTotal(respBusStation.data.pageTotal)
                setPageTotalEnd(respBusStation.data.pageTotal)
            } else {
                notifyError(respBusStation.data)
            }
            setLoading(false)

        } catch (error) {
            setLoading(false)
            notifyError(error)
        }
    }
    const fetchDataBusStationStart = async () => {
        setLoading(true);
        try {
            const respBusStation = await BusStationSv.getAllBusStationWithParams({ pageSize: 10, pageIndex: currentPageStart + 1 });
            if (!respBusStation.isError) {
                // const filteredItems = respBusStation.data.items.filter(item => item.id !== objectAdd.StationEndId);
                const filteredItems = respBusStation.data.items.map(item => ({ ...item, isChoose: item.id !== objectAdd.StationEndId ? false : true }));

                setBusStationStart(filteredItems)
                setPageTotal(respBusStation.data.pageTotal)
                setLoading(false)
            } else {
                notifyError(respBusStation.data)
                setLoading(false)
            }
            setLoading(false)

        } catch (error) {
            setLoading(false)
            notifyError(error)
        }
    }
    const fetchDataBusStationEnd = async () => {
        setLoadingEnd(true);
        try {
            const respBusStationEnd = await BusStationSv.getAllBusStationWithParams({ pageSize: 10, pageIndex: currentPageEnd + 1 });
            if (!respBusStationEnd.isError) {
                // const filteredItems = respBusStationEnd.data.items.filter(item => item.id !== objectAdd.StationStartId);
                const filteredItems = respBusStationEnd.data.items.map(item => ({ ...item, isChoose: item.id !== objectAdd.StationStartId ? false : true }));
                setBusStationEnd(filteredItems)
                setPageTotalEnd(respBusStationEnd.data.pageTotal)
            } else {
                notifyError(respBusStationEnd.data)
            }
            setLoadingEnd(false)

        } catch (error) {
            setLoadingEnd(false)
            notifyError(error)
        }
    }
    useEffect(() => {
        // fetchDataBusStationStart();
        // fetchDataBusStationEnd();
        fetchDataBusStationOnce();
    }, [])
    // useEffect(() => {
    //     fetchDataBusStationEnd();
    // }, [objectAdd.StationStartId, currentPageEnd])
    // useEffect(() => {
    //     fetchDataBusStationStart();
    // }, [objectAdd.StationEndId, currentPageStart])
    useEffect(() => {
        fetchDataBusStationEnd();
    }, [currentPageEnd])
    useEffect(() => {
        fetchDataBusStationStart();
    }, [currentPageStart])
    const [loadingCreate, setLoadingCreate] = useState(false)
    const checkObjectAdd = () => {
        if (objectAdd.StationEndId <= 0 || objectAdd.StationStartId <= 0 || objectAdd.StationStartId === undefined || objectAdd.StationStartId === undefined
            || objectAdd.StationStartId === null || objectAdd.StationStartId === null
        ) {
            notifyWarning("Vui lòng chọn đầy đủ điểm xuất phát và điểm đến")
            return false;
        }
        else {
            return true
        }
    }
    const createNewRoute = async () => {
        if (checkObjectAdd()) {
            setLoadingCreate(true)
            try {
                const resp = await RoutesSV.createRoute(objectAdd);
                setLoadingCreate(false)
                if (!resp.isError) {
                    notifySuccess("Tạo tuyến đi mới thành công")
                    setObjectAdd({ StationEndId: 0, StationStartId: 0 })
                }
                else {
                    notifyError(resp.data)
                }

            } catch (error) {
                notifyError(error)
            }
        }

    }
    const filterCheckedStationStart = async () => {
        const filteredItems = busStationStart
            // .filter(item => item.id !== objectAdd.StationEndId)
            .map(item => ({ ...item, isChoose: item.id !== objectAdd.StationEndId ? false : true }));
        setBusStationStart(filteredItems);
    }
    const filterCheckedStationEnd = async () => {
        const filteredItems = busStationEnd
            // .filter(item => item.id !== objectAdd.StationStartId)
            .map(item => ({ ...item, isChoose: item.id !== objectAdd.StationStartId ? false : true }));
        setBusStationEnd(filteredItems);
    }
    useEffect(() => {
        filterCheckedStationStart()
    }, [objectAdd.StationEndId])
    useEffect(() => {
        filterCheckedStationEnd()
    }, [objectAdd.StationStartId])
    const onChangeName = (name, value) => {
        setObjectAdd({ ...objectAdd, [name]: value })
    }
    const handlePageClick = (selectedPage) => {
        setCurrentPageStart(selectedPage)
    }
    const handlePageClickEnd = (selectedPage) => {
        setCurrentPageEnd(selectedPage)
    }
    const navigate = useNavigate();
    return (
        <div className="w-full mt-[20px]">
            <Row className="w-full h-[40px]">

                <Col span={20}>
                    <Breadcrumb className="text-20 font-[500] uppercase">
                        <Breadcrumb.Item className="cursor-pointer" onClick={() => navigate("/admin/routes")}>
                            Quản lý tuyến đường
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Thêm mới tuyến đường
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col span={4} className="text-20 font-[500] uppercase"><Button className="confirm-button-new w-full" loading={loadingCreate} disabled={loadingCreate} onClick={() => createNewRoute()}>
                    Tạo tuyến đường
                </Button></Col>
            </Row>
            <Row className="w-full bg-bg min-h-[500px] box-shadow-content rounded-md">
                <Col className="p-md" span={12}>
                    <Row className="w-full mt-sm flex items-center">
                        <Col span={10} className="text-16 font-bold">
                            Chọn điểm xuất phát
                        </Col>
                        <Col span={12}>
                            <Search placeholder="Tìm kiếm điểm xuất phát" allowClear>

                            </Search>
                        </Col>
                        <Row className="w-full">
                            <table class="min-h-[300px] max-h-[500px]  w-full my-md rounded-md border-collapse text-16 overflow-hidden relative">
                                <thead>
                                    <tr class='grid bg-bg grid-cols-12 p-sm text-left gap-md' style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                                        <th class='col-start-2 col-span-3'>Tên bến xe</th>
                                        <th class='col-span-6'>Địa chỉ</th>
                                    </tr>
                                </thead>
                                <tbody class='bg-bg'>
                                    {
                                        loading ?
                                            <div className="animate-pulse bg-hover-txt w-full h-[500px] text-bg text-center">
                                            </div>
                                            :
                                            !loading && busStationStart.length > 0
                                                ?
                                                <PaginatedItemsWithAPI currentPage={currentPageStart} handleClick={handlePageClick} componentToRender={CheckBusStationRow} items={busStationStart} pageCount={pageTotal} fetchData={fetchDataBusStationStart} nameRadio="StationStartId" onUpdate={onChangeName} objectAdd={objectAdd}></PaginatedItemsWithAPI>
                                                :
                                                <Empty description="Không có bến nào" />
                                    }

                                </tbody>
                            </table>
                        </Row>

                    </Row>
                </Col>

                <Col className="p-md" span={12}>
                    <Row className="w-full mt-sm flex items-center">
                        <Col span={10} className="text-16 font-bold">
                            Chọn điểm đến
                        </Col>
                        <Col span={12}>
                            <Search placeholder="Tìm kiếm điểm đến" allowClear>

                            </Search>
                        </Col>
                        <Row className="w-full">
                            <table class="min-h-[300px] max-h-[500px] w-full my-md rounded-md border-collapse text-16 overflow-hidden relative">
                                <thead>
                                    <tr class='grid bg-bg grid-cols-12 p-sm text-left gap-md' style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                                        <th class='col-start-2 col-span-3'>Tên bến xe</th>
                                        <th class='col-span-6'>Địa chỉ</th>
                                    </tr>
                                </thead>
                                <tbody class='bg-bg'>
                                    {
                                        loadingEnd ?
                                            <div className="animate-pulse bg-hover-txt w-full h-[500px] text-bg text-center">
                                            </div>
                                            :
                                            !loadingEnd && busStationEnd.length > 0
                                                ?
                                                <PaginatedItemsWithAPI currentPage={currentPageEnd} handleClick={handlePageClickEnd} componentToRender={CheckBusStationRow} items={busStationEnd} pageCount={pageTotalEnd} fetchData={fetchDataBusStationEnd} nameRadio="StationEndId" onUpdate={onChangeName} objectAdd={objectAdd}></PaginatedItemsWithAPI>
                                                :
                                                <Empty description="Không có bến nào" />
                                    }

                                </tbody>
                            </table>
                        </Row>

                    </Row>
                </Col>

            </Row>
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

export default CreateNewRoute;