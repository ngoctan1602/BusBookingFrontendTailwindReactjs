import { Button, Col, Divider, Form, Input, Row, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import TextArea from "antd/es/input/TextArea";
// import React, { useState, useEffect } from 'react';
import { Select, Pagination, Spin } from 'antd';
import RowInCompany from "./RouteInCompany/RouteInCompanyRow";
import * as SeatService from "../../../services/Company/SeatSV"
import * as TypeBusServices from "../../../services/TypeBusServices"
import * as BusStationSv from "../../../services/BusStationSv"
import * as BusSV from "../../../services/Company/BusSV"
import * as RoutesSV from "../../../services/RoutesSV"
import PaginatedItemsWithAPI from "../../../components/Layout/Components/PaginateWithApi";
import { ToastContainer, toast } from 'react-toastify';
const { Option } = Select;

const itemsPerPage = 10; // Số lượng item mỗi trang
const CreateNewBus = () => {
    document.title = "Tạo mới xe buýt";
    const navigate = useNavigate();


    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [typeBus, setTypeBus] = useState([]);
    const [totalTypeBus, setTotalTypeBus] = useState(0);
    const [currentPageTypeBus, setCurrentPageTypeBus] = useState(1);
    const [loadingTypeBus, setLoadingTypeBus] = useState(false);

    const [routes, setRoutes] = useState([]);
    const [totalRoutes, setTotalRoutes] = useState(0);
    const [currentPageRoute, setCurrentPageRoute] = useState(0);
    const [loadingPageRoute, setLoadingPageRoute] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);
    const handlePageClick = (selectedPage) => {
        setCurrentPageRoute(selectedPage);
    }
    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            // Nếu không được chọn, loại bỏ ID khỏi mảng
            setSelectedIds(prevIds => prevIds.filter(prevId => prevId !== id));

        }
        else {
            // Nếu được chọn, thêm ID vào mảng
            setSelectedIds(prevIds => [...prevIds, id]);
        }

    };
    const handlePageChange = (page) => {
        currentPage(page);
    };
    const handlePageChangeTypeBus = (page) => {
        setCurrentPageTypeBus(page);
    };
    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true)
            try {

                const response = await SeatService.getAllSeatCompany({ pageSize: 10, pageIndex: currentPage });
                // console.log(response)
                if (!response.isError && response.data.items !== null && response.data.items !== undefined) {
                    setData(response.data.items);
                    setTotalItems(Number(response.data.pageTotal) * itemsPerPage);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                // setLoading(false)
            }
        };

        fetchData();

    }, [currentPage]);


    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true)
            try {


                const restypebus = await TypeBusServices.getAllTypeBusParams({ pageSize: 10, pageIndex: currentPage });
                // console.log(restypebus)
                if (!restypebus.isError && restypebus.data !== null && restypebus.data !== undefined
                    && restypebus.data.items !== null && restypebus.data.items !== undefined
                ) {

                    setTypeBus(restypebus.data.items);
                    setTotalTypeBus(restypebus.data.pageTotal * itemsPerPage);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                // setLoading(false)
            }
        };

        fetchData();

    }, [currentPageTypeBus]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingPageRoute(true)
                const respRoute = await RoutesSV.getAllRoutesByCompany({ pageSize: 10, pageIndex: currentPageRoute + 1 });
                if (!respRoute.isError && respRoute.data !== null && respRoute.data !== undefined
                    && respRoute.data.items !== null && respRoute.data.items !== undefined
                ) {
                    setRoutes(respRoute.data.items)
                    setTotalRoutes(respRoute.data.pageTotal)
                }
                setLoadingPageRoute(false)

            } catch (error) {
                console.error('Error fetching data:', error);
                // setLoading(false)
            }
        };

        fetchData();

    }, [currentPageRoute]);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const submit = async (values) => {
        console.log(values)

        if (selectedIds.length == 0) {
            notifyWarning("Vui lòng chọn lộ trình")
            return
        }
        const object = { ...values, listRouteId: selectedIds }
        try {
            setLoadingSubmit(true)
            const res = await BusSV.createBus(object);
            if (res.isError) {
                notifyError(res.data)
                return
            }
            notifySuccess("Thêm mới xe buýt thành công")
            form.resetFields();
            setSelectedIds([])
            setLoadingSubmit(false)
        } catch (error) {
            console.log("", error)
        }
    }
    const [form] = Form.useForm();

    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const notifyWarning = (message) => toast.warning(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    return (
        <div className="w-full h-full">
            <div class='w-full text-txt txt-16 bg-bg py-[20px] px-[10px] rounded-md box-shadow-content mb-md' >
                <Row style={{ width: "100%" }}>
                    <Breadcrumb style={{ fontSize: 18, fontWeight: "500" }}>
                        <Breadcrumb.Item onClick={() => navigate("/company/bus")}>  <span style={{ cursor: "pointer", fontWeight: 500 }}>Quản lý xe</span></Breadcrumb.Item>
                        <Breadcrumb.Item>Thêm mới xe</Breadcrumb.Item>
                    </Breadcrumb>

                    {/* <Divider></Divider> */}
                </Row>

                {/* <Form
                    form={form}
                    onFinish={submit}
                    onFinishFailed={() => console.log(form.getFieldsError())}
                    layout="horizontal"
                    style={{
                        margin: "16px 0px",
                        width: "100%", minHeight: "500px",
                    }}
                    className="custom-form"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                >
                    <Row style={{ width: "100%", maxHeight: "500px", fontSize: 20, fontWeight: "400", }}>
                        <Col span={24}>
                            <Form.Item
                                name="busTypeID"
                                label="Chọn loại xe"
                                rules={[
                                    {
                                        required: true,
                                        message: "Không được bỏ trống loại xe"
                                    }
                                ]}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    placeholder="Vui lòng chọn loại xe"
                                    dropdownRender={menu => (
                                        <>
                                            {loadingTypeBus ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                                                    <Spin />
                                                </div>
                                            ) : (
                                                <>
                                                    {menu}
                                                    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                                                        <Pagination
                                                            simple
                                                            current={currentPageTypeBus}
                                                            pageSize={itemsPerPage}
                                                            total={totalTypeBus}
                                                            onChange={handlePageChangeTypeBus}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                >
                                    {typeBus.map((item, index) => (
                                        <Option key={item.id} value={item.id} >
                                            {item.name} - {item.totalSeats} chỗ
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Không được bỏ trống loại ghế"
                                    }
                                ]}
                                label="Chọn loại ghế"
                                name="seatTypeID"
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    placeholder="Vui lòng chọn loại ghế"
                                    dropdownRender={menu => (
                                        <>
                                            {loading ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                                                    <Spin />
                                                </div>
                                            ) : (
                                                <>
                                                    {menu}
                                                    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                                                        <Pagination
                                                            simple
                                                            current={currentPage}
                                                            pageSize={itemsPerPage}
                                                            total={totalItems}
                                                            onChange={handlePageChange}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                >
                                    {data.map((item, index) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.type} - {item.price} đồng
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Biển số xe"
                                name="busNumber"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Không được để trống bản số xe"
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập biển số xe" allowClear>
                                </Input>
                            </Form.Item>
                        </Col>
                        <Col span={24}>

                            <Form.Item
                                label="Mô tả"
                                name="description"
                            >
                                <TextArea style={{ minHeight: '80px', maxHeight: '200px', overflowY: 'auto' }} >

                                </TextArea>
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row style={{ width: "100%", minHeight: "100px" }}>
                        <table class="w-full my-md rounded-md border-collapse  text-txt text-16 overflow-hidden relative" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", minHeight: "200px" }}>

                            <thead>
                                <tr class='grid bg-hover-txt grid-cols-12 p-sm text-left gap-md border-b-2' style={{ borderBottom: "1px solid black" }}>
                                    <th className="col-span-2"></th>
                                    <th class='col-span-10'>Tuyến đi</th>

                                </tr>


                            </thead>
                            <tbody class='bg-[#ffff]' style={{ position: "relative" }}>
                                {loadingPageRoute ?
                                    <div className="animate-pulse bg-hover-txt w-full h-[120px] text-bg text-center">
                                    </div>
                                    :
                                    !loadingPageRoute && routes.length > 0 && routes !== undefined && routes !== null
                                        ?
                                        <PaginatedItemsWithAPI selectedList={selectedIds} changeSelectedList={handleCheckboxChange} handleClick={handlePageClick} componentToRender={RowInCompany} items={routes} pageCount={totalRoutes} currentPage={currentPageRoute}></PaginatedItemsWithAPI>
                                        :

                                        <p style={{ position: "absolute", bottom: 80, left: 150 }}>
                                            Nhà xe chưa đăng kí tuyến đi. <span onClick={() => navigate("/company/create-route-detail")} style={{ cursor: "pointer", textDecorationLine: "underline", fontStyle: "italic" }}>
                                                Tạo lộ trình
                                            </span>
                                        </p>
                                }

                            </tbody>
                        </table>
                    </Row>

                    <Row style={{ width: "100%" }}>
                        <Col span={4} offset={20}>

                            <Button loading={loadingSubmit} onClick={() => form.submit()} style={{ width: "100%" }}>Tạo mới</Button>
                        </Col>
                    </Row>
                </Form> */}

                <Form
                    form={form}
                    onFinish={submit}
                    onFinishFailed={() => console.log(form.getFieldsError())}
                    layout="horizontal"
                    style={{
                        margin: "16px 0px",
                        width: "100%",
                        minHeight: "500px",
                    }}
                    className="custom-form"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
                >
                    <Row style={{ width: "100%", maxHeight: "500px", fontSize: 20, fontWeight: "400" }}>
                        <Col span={12}>
                            <Form.Item
                                name="busTypeID"
                                label="Chọn loại xe"
                                rules={[
                                    {
                                        required: true,
                                        message: "Không được bỏ trống loại xe",
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    placeholder="Vui lòng chọn loại xe"
                                    dropdownRender={(menu) => (
                                        <>
                                            {loadingTypeBus ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                                                    <Spin />
                                                </div>
                                            ) : (
                                                <>
                                                    {menu}
                                                    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                                                        <Pagination
                                                            simple
                                                            current={currentPageTypeBus}
                                                            pageSize={itemsPerPage}
                                                            total={totalTypeBus}
                                                            onChange={handlePageChangeTypeBus}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                >
                                    {typeBus.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name} - {item.totalSeats} chỗ
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="seatTypeID"
                                label="Chọn loại ghế"
                                rules={[
                                    {
                                        required: true,
                                        message: "Không được bỏ trống loại ghế",
                                    },
                                ]}
                                hasFeedback
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    placeholder="Vui lòng chọn loại ghế"
                                    dropdownRender={(menu) => (
                                        <>
                                            {loading ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                                                    <Spin />
                                                </div>
                                            ) : (
                                                <>
                                                    {menu}
                                                    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                                                        <Pagination
                                                            simple
                                                            current={currentPage}
                                                            pageSize={itemsPerPage}
                                                            total={totalItems}
                                                            onChange={handlePageChange}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                >
                                    {data.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.type} - {item.price} đồng
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ width: "100%", maxHeight: "500px", fontSize: 20, fontWeight: "400" }}>
                        <Col span={12}>
                            <Form.Item
                                name="busNumber"
                                label="Biển số xe"
                                rules={[
                                    {
                                        required: true,
                                        message: "Không được để trống biển số xe",
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Nhập biển số xe" allowClear />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                            >
                                <TextArea style={{ minHeight: '80px', maxHeight: '200px', overflowY: 'auto' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="w-full flex justify-center h-[1px]">
                        <div className="w-full bg-hover-txt h-[1px]"></div>
                    </div>
                    <Row style={{ width: "100%", minHeight: "100px" }}>
                        <table
                            class="w-full my-md rounded-md border-collapse text-txt text-16 overflow-hidden relative"
                            style={{
                                // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                minHeight: "200px"
                            }
                            }
                        >
                            <thead>
                                <tr
                                    class="grid  grid-cols-12 p-sm text-left gap-md "
                                // style={{ borderBottom: "1px solid black" }}
                                >
                                    <th className="col-span-2"></th>
                                    <th class="col-span-10">Tuyến đi</th>
                                </tr>
                            </thead>
                            <tbody class="bg-[#ffff]" style={{ position: "relative" }}>
                                {loadingPageRoute ? (
                                    <div className="animate-pulse bg-hover-txt w-full h-[300px] text-bg text-center"></div>
                                ) : !loadingPageRoute && routes.length > 0 && routes !== undefined && routes !== null ? (
                                    <PaginatedItemsWithAPI
                                        selectedList={selectedIds}
                                        changeSelectedList={handleCheckboxChange}
                                        handleClick={handlePageClick}
                                        componentToRender={RowInCompany}
                                        items={routes}
                                        pageCount={totalRoutes}
                                        currentPage={currentPageRoute}
                                    />
                                ) : (
                                    <p style={{ position: "absolute", bottom: 80, left: 150 }}>
                                        Nhà xe chưa đăng kí tuyến đi.{" "}
                                        <span
                                            onClick={() => navigate("/company/create-route-detail")}
                                            style={{ cursor: "pointer", textDecorationLine: "underline", fontStyle: "italic" }}
                                        >
                                            Tạo lộ trình
                                        </span>
                                    </p>
                                )}
                            </tbody>
                        </table>
                    </Row>

                    <Row style={{ width: "100%" }}>
                        <Col span={4} offset={20}>
                            <Button loading={loadingSubmit} onClick={() => form.submit()} style={{ width: "100%" }}>
                                Tạo mới
                            </Button>
                        </Col>
                    </Row>
                </Form>

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
        </div>
    );
}

export default CreateNewBus;

