import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import * as TypeBusServices from "../../../../../services/SeatTypeSV"


import { Button, Col, ConfigProvider, Form, Input, Row, } from "antd";
import { NumericFormat } from "react-number-format";
import TextArea from "antd/es/input/TextArea";

const PopupAddSeatType = ({ refetchData }) => {
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
    const addNewSeatType = async () => {
        setLoading(true)
        try {
            const objectAdd = {
                type: form.getFieldValue("type"),
                Price: Number(form.getFieldValue("price")),
                description: form.getFieldValue("description"),
            }
            const resp = await TypeBusServices.createSeatType(objectAdd);
            if (!resp.isError) {
                notifySuccess("Thêm mới loại giá thành công")
                form.resetFields()
                refetchData()
            }
            else {
                notifyError(resp.data)
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)

    }

    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

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
                        <p class='text-20 text-center font-bold m-md'>Thêm mới loại ghế</p>

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
                                onFinish={() => addNewSeatType()}
                                onFinishFailed={() => notifyWarning("Vui lòng nhập đầy đủ các trường bắt buộc")}
                            >
                                <Form.Item
                                    hasFeedback
                                    name="type"
                                    label="Tên loại ghế"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng không bỏ trống tên loại buýt"
                                        },

                                    ]}
                                >
                                    < Input allowClear style={{ width: '100%' }} />
                                </Form.Item>

                                <Form.Item
                                    name="description"
                                    label="Mô tả"
                                >
                                    < TextArea allowClear className="w-full min-h-[100px] max-h-[200px]" />
                                </Form.Item>

                                <Form.Item
                                    hasFeedback
                                    name="price"
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

export default PopupAddSeatType;