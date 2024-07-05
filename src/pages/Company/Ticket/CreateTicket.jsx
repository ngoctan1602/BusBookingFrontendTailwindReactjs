import { Button, Col, DatePicker, Divider, Form, Row, message } from "antd";
import { useEffect, useState } from "react";
import SelectOption from "../../../components/Layout/Components/Common/SelectOption";
import * as RoutesSV from "../../../services/RoutesSV";
import * as BusSV from "../../../services/Company/BusSV";
import * as PriceClassSV from "../../../services/PriceClassSV";
import * as RouteDetailSV from "../../../services/Company/RouteDetailSV";
import * as TicketSV from "../../../services/Company/Ticket";
import RouteDetailInRouteRow from "../Bus/RouteInCompany/RouteDetailInRouteRow";
import PaginatedItemsWithAPI from "../../../components/Layout/Components/PaginateWithApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateTicket = () => {

    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyWarning = (message) => toast.warning(message, {
        position: "bottom-right",
        autoClose: 300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const [routeSelected, SetRoutSelected] = useState(0);


    const [totalRoute, setTotalRoute] = useState(0);
    const [curentPageRoute, setCurrentPageRoute] = useState(1);
    const [loadingRoute, setLoadingRoute] = useState(false);
    const [route, setRoute] = useState();
    const handleChangePageRoute = (page) => {
        setCurrentPageRoute(page);
    }
    const handleChangeRoute = (value) => {
        formCreate.resetFields([
            'busId'
        ]);
        SetRoutSelected(value);
    }

    const [totalPriceClass, setTotalPriceClass] = useState(0);
    const [currentPagePriceClass, setCurrentPagePriceClass] = useState(1);
    const [loadingPriceClass, setLoadingPriceClass] = useState(false);
    const [PriceClass, setPriceClass] = useState();
    const handleChangePagePriceClass = (page) => {
        setCurrentPagePriceClass(page);
    }

    const [busSlected, setBusSelected] = useState(0);
    const [totalBus, setTotalBus] = useState(0);
    const [currentPageBus, setCurrentPageBus] = useState(1);
    const [loadingPageBus, setLoadingPageBus] = useState(false);
    const [bus, setBus] = useState();
    const handleChangePageBus = (page) => {
        setCurrentPageBus(page);
    }



    const [routeDetail, setRouteDetail] = useState(0);
    const [currentPageRouteDetail, setCurrentRouteDetail] = useState(0);
    const [loadingPageRouteDetail, setLoadingPageRouteDetail] = useState(false);
    const [totalRouteDetail, setTotalRouteDetail] = useState(0);
    const [totalItemRouteDetail, setTotalItemRouteDetail] = useState(0);
    const handleChangePageRouteDetail = (page) => {
        setCurrentRouteDetail(page);
    }
    const [routeDetailSelected, setRouteDetailSelected] = useState([])
    const fecthDataRouteDetail = async () => {
        try {
            setLoadingPageRouteDetail(true)
            if (routeSelected === 0) {
                setRouteDetail([])
                setLoadingPageRouteDetail(false);
                return
            }
            const response = await RouteDetailSV.getInRoute({ routeId: routeSelected, pageSize: 200 });
            if (!response.isError && response.data !== null && response.data !== undefined
                && response.data.items !== null && response.data.items !== undefined
            ) {
                let ids = response.data.items.map(item => item.id).filter(id => id !== null)
                setRouteDetailSelected(ids);
            }
            const response1 = await RouteDetailSV.getInRoute({ routeId: routeSelected, pageSize: 10, pageIndex: currentPageRouteDetail + 1 });
            if (!response1.isError && response1.data !== null && response1.data !== undefined
                && response1.data.items !== null && response1.data.items !== undefined
            ) {
                setRouteDetail(response1.data.items);
                setTotalRouteDetail(response1.data.pageTotal)
                setTotalItemRouteDetail(response1.data.items.length)
            }
            setLoadingPageRouteDetail(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            // setLoading(false);
        }
    };

    const fectchDataBusInRoute = async () => {
        try {
            setLoadingPageBus(true)
            setBusSelected(0)
            const response = await BusSV.GetInRoute({ routeId: routeSelected, pageSize: 10, pageIndex: currentPageBus });

            if (!response.isError && response.data !== null && response.data !== undefined
                && response.data.items !== null && response.data.items !== undefined
            ) {
                setBus(response.data.items)
                setTotalBus(response.data.pageTotal * 10)
            }
            setLoadingPageBus(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            // setLoading(false);
        }
    };

    const fetchDataRoute = async () => {
        try {
            setLoadingRoute(true)
            const response = await RoutesSV.getAllRoutesByCompany({ pageSize: 10, pageIndex: curentPageRoute });
            if (!response.isError && response.data !== null && response.data !== undefined
                && response.data.items !== null && response.data.items !== undefined
            ) {
                setRoute(response.data.items)
                setTotalRoute(response.data.pageTotal * 10)
            }
            setLoadingRoute(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            // setLoading(false);
        }
    };

    const fetchDataPriceClass = async () => {
        try {
            setLoadingPriceClass(true)
            const response = await PriceClassSV.getActiveInCompany({ pageSize: 10, pageIndex: currentPagePriceClass });
            if (!response.isError && response.data !== null && response.data !== undefined
                && response.data.items !== null && response.data.items !== undefined
            ) {
                setPriceClass(response.data.items)
                setTotalPriceClass(response.data.pageTotal * 10)
            }
            setLoadingPriceClass(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            // setLoading(false);
        }
    };
    useEffect(
        () => {
            fetchDataRoute();
            fetchDataPriceClass();
        }, []
    )

    useEffect(
        () => {
            fetchDataRoute();
        }, [curentPageRoute]
    )

    useEffect(
        () => {
            fectchDataBusInRoute();
        }, [routeSelected, currentPageBus]
    )

    useEffect(
        () => {
            fecthDataRouteDetail();
        }, [routeSelected, currentPageRouteDetail]
    )
    useEffect(
        () => {
            fetchDataPriceClass();
        }, [currentPagePriceClass]
    )


    const propRouteOption = {
        name: "routeSelected",
        label: "Chọn tuyến đường",
        message: "Không được bỏ trống tuyến đường",
        placeholder: "Vui lòng chọn tuyến đường",
        key: ["stationStartName", "stationEndName"]
    }

    const propPriceClass = {
        name: "PriceClassificationId",
        label: "Chọn loại giá",
        message: "Không được bỏ trống loại giá",
        placeholder: "Vui lòng chọn loại giá",
        key: ["name", "value"]
    }
    const propBus = {
        name: "busId",
        label: "Chọn xe buýt",
        message: "Không được bỏ trống buýt",
        placeholder: "Vui lòng chọn buýt",
        key: ["busNumber", "busType"]
    }
    const [formCreate] = Form.useForm();
    const changeSelectedRouteDetail = (id) => {
        if (routeDetailSelected.includes(id)) {
            // Nếu không được chọn, loại bỏ ID khỏi mảng
            setRouteDetailSelected(prevIds => prevIds.filter(prevId => prevId !== id));
        }
        else {
            // Nếu được chọn, thêm ID vào mảng
            setRouteDetailSelected(prevIds => [...prevIds, id]);
        }

    }
    const [loadingCreate, setLoadingCreate] = useState(false);
    const onSuccess = async () => {
        setLoadingCreate(true)
        // notifyWarning("Đang tạo vé vui lòng không thoát khỏi trang.")
        const TicketStations = routeDetailSelected.map((id) => {
            return { RouteDetailId: id };
        });
        const objectAdd = {
            dateOnly:
                new Date(formCreate.getFieldValue("DateOnly")).toISOString().split('T')[0],
            busId: formCreate.getFieldValue("busId"),
            PriceClassificationId: formCreate.getFieldValue("PriceClassificationId"),
            TicketStations: TicketStations
        }
        try {
            const resp = await TicketSV.createTicket(objectAdd)
            setLoadingCreate(false)
            if (!resp.isError) {
                formCreate.resetFields();
                setRouteDetail([])
                setTotalRouteDetail(0)
                setRouteDetailSelected([])
                notifySuccess("Tạo vé thành công");
            }
            else {
                notifyError(resp.data)
            }
        } catch (error) {
            notifyError(error)
        }
        console.log(objectAdd);
    }
    return (
        <div className="w-full h-full">
            <div class='w-full min-h-[300px] text-txt txt-16 bg-bg py-[20px] px-[10px] rounded-md box-shadow-content mb-md' >
                <Row className="w-full">
                    <p className="font-bold w-full text-20 uppercase text-center">Tạo vé</p>
                </Row>
                <Form form={formCreate}
                    layout="horizontal"
                    onFinish={onSuccess}
                    style={{
                        margin: "16px 0px",
                        width: "100%", minHeight: "300px",
                    }}
                    className="custom-form"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            {loadingRoute ? (
                                <SelectOption loading={true} props={propRouteOption}></SelectOption>
                            ) : (
                                <SelectOption handleChangeSelected={handleChangeRoute} handleChangePage={handleChangePageRoute} loading={loadingRoute} props={propRouteOption} data={{ totalPage: totalRoute, pageCurrent: curentPageRoute, data: route }}></SelectOption>
                            )}
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="DateOnly"
                                label="Chọn ngày xuất bến"
                                rules={[
                                    {
                                        required: true,
                                        message: "Không được bỏ trống ngày xuất bến"
                                    }
                                ]}
                            >
                                <DatePicker placeholder="Vui lòng chọn ngày xuất bến" style={{ width: "100%" }} format={'DD/MM/YY'}></DatePicker>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            {loadingPriceClass ? (
                                <SelectOption loading={true} props={propPriceClass}></SelectOption>
                            ) : (
                                <SelectOption handleChangePage={handleChangePagePriceClass} loading={loadingPriceClass} props={propPriceClass} data={{ totalPage: totalPriceClass, pageCurrent: currentPagePriceClass, data: PriceClass }}></SelectOption>
                            )}
                        </Col>
                        <Col span={12}>
                            {(loadingPageBus && routeSelected !== 0) ? (
                                <SelectOption loading={true} props={propBus}></SelectOption>
                            ) : (
                                (!loadingPageBus && routeSelected !== 0) && (
                                    <SelectOption handleChangePage={handleChangePageBus} loading={loadingPageBus} props={propBus} data={{ totalPage: totalBus, pageCurrent: currentPageBus, data: bus }}></SelectOption>
                                )
                            )}
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <table class="w-full min-h-[200px] my-md rounded-md border-collapse  text-txt text-16 overflow-hidden relative">
                            <thead>
                                <tr class='grid bg-bg grid-cols-12 p-sm text-left gap-md ' style={{ fontWeight: 400 }}>
                                    <th class='col-span-1 col-start-2 '>Thứ tự</th>
                                    <th class='col-span-2'>Tên bến xe</th>
                                    <th class='col-span-2'>Giờ cập bến</th>
                                    <th class='col-span-2'>Giờ xuất bến</th>
                                    <th class='col-span-2'>Giảm giá</th>
                                    <th class='col-span-2'>Ngày so với bến xuất phát</th>
                                </tr>
                            </thead>
                            <tbody class='bg-[#FFFF]'>
                                {loadingPageRouteDetail ? (
                                    <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center"></div>
                                ) : (
                                    !loadingPageRouteDetail &&
                                        (routeDetail !== null && routeDetail.length > 0 && routeDetail !== undefined) ? (
                                        <PaginatedItemsWithAPI currentPage={currentPageRouteDetail} handleClick={handleChangePageRouteDetail} changeSelectedList={changeSelectedRouteDetail} totalItem={totalItemRouteDetail} selectedList={routeDetailSelected} componentToRender={RouteDetailInRouteRow} items={routeDetail} pageCount={totalRouteDetail} fetchData={fecthDataRouteDetail}></PaginatedItemsWithAPI>
                                    ) : (
                                        <tr style={{ width: "100%", position: "absolute", top: 100, textAlign: "center" }}>
                                            Chưa có chi tiết tuyến đường. Vui lòng chọn tuyến đường
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </Row>
                    <Col offset={20} span={4}>
                        <Button loading={loadingCreate ? true : false} onClick={() => formCreate.submit()} style={{ width: "100%" }}>
                            Tạo vé
                        </Button>
                    </Col>
                </Form>

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
        </div >
    );
}

export default CreateTicket;