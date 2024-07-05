import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import * as RoutesSV from "../../../../../services/RoutesSV";
import * as PriceSV from "../../../../../services/PriceSV";

import ReactLoading from 'react-loading';
import { Button, Col, ConfigProvider, Form, Input, Select, Row, Spin, Pagination, InputNumber } from "antd";
import { NumericFormat } from "react-number-format";
const { Option } = Select;
const PopupAdd = ({ refetchData }) => {
    const contentStyle = { backgroundColor: '#FFFF', borderRadius: "8px", width: "40%" };
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

    const [routeIncompany, setRouteInCompany] = useState([])
    const [pageCurrent, setPageCurrent] = useState(1);
    const [totalItem, setTotalItem] = useState(0);

    const fetchData = async () => {
        try {
            const routerresp = await RoutesSV.getAllRoutesByCompany({ pageSize: 10, pageIndex: pageCurrent });
            if (!routerresp.isError) {
                console.log(routerresp.data.items)
                setRouteInCompany(routerresp.data.items)
                setTotalItem(routerresp.data.pageTotal * 10)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleChangePage = (selectedPage) => {
        setPageCurrent(selectedPage)
    }
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        fetchData()
    }, [pageCurrent])
    const addNewPriceClass = async () => {
        // console.log(form.getFieldsValue())
        setLoading(true)
        try {
            const resp = await PriceSV.createPrice(form.getFieldsValue());
            if (!resp.isError) {
                notifySuccess("Thêm mới loại giá thành công")
                // setObjectAdd({ name: '', description: '', value: 0 })
                form.resetFields()
                refetchData()
                // fetchData()
            }
            else {
                notifyError(resp.data)
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        // console.log(objectAdd);
    }

    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    // const [objectAdd, setObjectAdd] = useState(
    //     {
    //         RouteId: 0,
    //         Surcharges: 0,
    //         Price: 0,
    //     }
    // )
    const getValueFromEvent = event => {
        const { value } = event.target;
        return value.replace(/[^\d]/g, '');
    };


    return (
        <Popup trigger={<button class="flex justify-center"> <FontAwesomeIcon icon={faPlus} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[40px] h-[40px]'></FontAwesomeIcon></button>} position="right center"
            modal
            nested
            closeOnDocumentClick={false}
            {... { contentStyle }}
        >
            {
                close => (

                    <div class='text-16 text-txt relative'>
                        <p class='text-20 text-center font-bold m-md'>Thêm mới bảng giá</p>

                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBorder: "#B4B4B8"
                                },
                                components: {
                                    Input: {
                                        paddingBlock: 8,
                                    },
                                },
                            }}
                        >


                            <Form
                                form={form}
                                layout="horizontal"
                                style={{ maxWidth: '600px', margin: '0 auto' }}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                onFinish={() => addNewPriceClass()}
                                onFinishFailed={() => notifyWarning("Vui lòng nhập đầy đủ các trường bắt buộc")}
                            >
                                <Form.Item
                                    name="RouteId"
                                    label="Lộ trình"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng không bỏ trống lộ trình"
                                        },
                                    ]}
                                >
                                    {/* <Input allowClear placeholder="Nhập tên loại giá" /> */}
                                    <Select
                                        style={{ width: "100%" }}
                                        placeholder="Vui lòng chọn lộ trình"
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
                                                                current={pageCurrent}
                                                                pageSize={10}
                                                                total={totalItem}
                                                                onChange={handleChangePage}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    >
                                        {routeIncompany.map((item) => (
                                            <Option key={item.id} value={item.id}>
                                                {item.stationStartName} - {item.stationEndName}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    hasFeedback
                                    name="Price"
                                    label="Giá"
                                    getValueFromEvent={getValueFromEvent}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng không bỏ trống giá"
                                        },
                                        {
                                            validator: (_, value) => {
                                                const numberValue = Number(value.replace(/[^\d]/g, ''));
                                                if (isNaN(numberValue) || numberValue < 0) {
                                                    return Promise.reject(new Error("Giá phải là số nguyên lớn hơn hoặc bằng 0"));
                                                }
                                                return Promise.resolve();
                                            }
                                        }
                                    ]}
                                >
                                    <NumericFormat
                                        allowEmptyFormatting
                                        thousandSeparator={true}
                                        suffix={' đ'}
                                        customInput={Input}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    hasFeedback
                                    name="Surcharges"
                                    label="Phụ phí"
                                    getValueFromEvent={getValueFromEvent}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng không bỏ trống phụ phí"
                                        },
                                        {
                                            validator: (_, value) => {
                                                const numberValue = Number(value.replace(/[^\d]/g, ''));
                                                if (isNaN(numberValue) || numberValue < 0) {
                                                    return Promise.reject(new Error("Phụ phí phải là số nguyên lớn hơn hoặc bằng 0"));
                                                }
                                                return Promise.resolve();
                                            }
                                        }
                                    ]}
                                >
                                    <NumericFormat
                                        allowEmptyFormatting
                                        thousandSeparator={true}
                                        suffix={' đ'}
                                        customInput={Input}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Form>
                        </ConfigProvider>
                        <div class='w-full my-md'
                            style={{ height: 50 }}>
                            <Row style={{ width: "100%", height: 50 }}>
                                <Col offset={6} span={7}>
                                    <Button loading={loading ? true : false} className="w-full" onClick={form.submit}>Xác nhận</Button>
                                </Col>
                                <Col offset={2} span={7}>
                                    <Button disabled={loading ? true : false} className="w-full" onClick={close}>Hủy</Button>
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
                    </div>
                )
            }

        </Popup>
    );
}

export default PopupAdd;