import { Button, Col, DatePicker, Divider, Form, Row, message } from "antd";
import { useEffect, useState } from "react";
import SelectOption from "../../../components/Layout/Components/Common/SelectOption";
import * as RoutesSV from "../../../services/RoutesSV";
import * as BusSV from "../../../services/Company/BusSV";
import * as PriceClassSV from "../../../services/PriceClassSV";
import * as RouteDetailSV from "../../../services/Company/RouteDetailSV";
import RouteDetailInRouteRow from "../Bus/RouteInCompany/RouteDetailInRouteRow";
import PaginatedItemsWithAPI from "../../../components/Layout/Components/PaginateWithApi";
const CreateTicket = () => {
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
    const [currentPageRouteDetail, setCurrentRouteDetail] = useState(1);
    const [loadingPageRouteDetail, setLoadingPageRouteDetail] = useState(false);
    const [totalRouteDetail, setTotalRouteDetail] = useState(0);
    const handleChangePageRouteDetail = (page) => {
        setLoadingPageRouteDetail(page);
    }

    const fecthDataRouteDetail = async () => {
        try {
            setLoadingPageRouteDetail(true)
            const response = await RouteDetailSV.getInRoute({ routeId: routeSelected, pageSize: 10, pageIndex: currentPageRouteDetail });
            if (!response.isError && response.data !== null && response.data !== undefined
                && response.data.items !== null && response.data.items !== undefined
            ) {
                setRouteDetail(response.data.items);
                setTotalRouteDetail(response.data.pageTotal)
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
            const response = await PriceClassSV.getAllInCompany({ pageSize: 10, pageIndex: currentPagePriceClass });
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
        name: "priceSelected",
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
    return (
        <div className="w-full h-full">
            <div class='w-full min-h-[300px] text-txt txt-16 bg-bg py-[20px] px-[10px] rounded-md box-shadow-content mb-md' >
                <Row className="w-full">
                    <p className="font-bold w-full text-20 uppercase text-center">Tạo vé</p>
                </Row>
                <Form form={formCreate}
                    layout="horizontal"
                    style={{
                        margin: "16px 0px",
                        width: "100%", minHeight: "300px",
                        // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                    }}
                    className="custom-form"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                >
                    {
                        loadingRoute ? <Col>
                            <SelectOption loading={true} props={propRouteOption}></SelectOption>
                        </Col> :
                            !loadingRoute &&
                            <Col>
                                <SelectOption handleChangeSelected={handleChangeRoute} handleChangePage={handleChangePageRoute} loading={loadingRoute} props={propRouteOption} data={{ totalPage: totalRoute, pageCurrent: curentPageRoute, data: route }}></SelectOption>
                            </Col>
                    }
                    <Col>
                        <Form.Item
                            name="date"
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
                    {
                        loadingPriceClass ? <Col>
                            <SelectOption loading={true} props={propPriceClass}></SelectOption>
                        </Col> :
                            !loadingPriceClass &&
                            <Col>
                                <SelectOption handleChangePage={handleChangePagePriceClass} loading={loadingPriceClass} props={propPriceClass} data={{ totalPage: totalPriceClass, pageCurrent: currentPagePriceClass, data: PriceClass }}></SelectOption>
                            </Col>
                    }
                    {
                        (loadingPageBus && routeSelected !== 0) ? <Col>
                            <SelectOption loading={true} props={propBus}></SelectOption>
                        </Col> :
                            (!loadingPageBus && routeSelected !== 0) &&
                            <Col >
                                <SelectOption handleChangePage={handleChangePageBus} loading={loadingPageBus} props={propBus} data={{ totalPage: totalBus, pageCurrent: currentPageBus, data: bus }}></SelectOption>
                            </Col>
                    }
                    <Divider></Divider>
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
                                {
                                    loadingPageRouteDetail ?
                                        <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                                        </div>
                                        :
                                        !loadingPageRouteDetail &&
                                            (routeDetail !== null && routeDetail.length > 0 && routeDetail !== undefined)
                                            ?
                                            <PaginatedItemsWithAPI componentToRender={RouteDetailInRouteRow} items={routeDetail} pageCount={totalRouteDetail} fetchData={fecthDataRouteDetail}></PaginatedItemsWithAPI>
                                            :
                                            <tr style={{ width: "100%", position: "absolute", top: 100, textAlign: "center" }}>
                                                Chưa có chi tiết tuyến đi
                                            </tr>
                                }
                            </tbody>
                        </table>
                    </Row>

                    <Col offset={20} span={4}>
                        <Button onClick={() => formCreate.submit()} style={
                            { width: "100%" }
                        }>Tạo vé</Button>
                    </Col>
                </Form>
            </div>
        </div >
    );
}

export default CreateTicket;