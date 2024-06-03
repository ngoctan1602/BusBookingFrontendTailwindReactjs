import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";

const GuestLogin = () => {
    const layout = {

        labelCol: { offset: 4, span: 4 },  // Định nghĩa chiều rộng của label
        wrapperCol: { span: 10 },  // Định nghĩa chiều rộng của input
    };
    const onFinish = (values) => {
        console.log(values)
        setTimeout(
            () => {
                setOnSubmit(false);
            }, 2000
        )

    }
    const onFailed = (values) => {
        console.log(values)
        setOnSubmit(false)
    }
    const [onSubmit, setOnSubmit] = useState(false);
    const [formLogin] = new Form.useForm();
    const formSubmit = () => {
        formLogin.submit()
        setOnSubmit(true);
    }
    return (
        <div style={{ width: "80%" }}>

            <p style={{ textAlign: "center" }}>Đăng nhập vào tài khoản của bạn
            </p>
            <p style={{ textAlign: "center" }}>Đăng nhập vào tài khoản của bạn
            </p>
            <Form {...layout}
                form={formLogin}
                onFinish={onFinish}
                onFinishFailed={onFailed}
            >
                <Form.Item label="Tên đăng nhập"
                    name="username"
                    hasFeedback
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                    ]}
                    validateTrigger="onSubmit"
                >
                    <Input allowClear></Input>
                </Form.Item>

                <Form.Item label="Mật khẩu"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu' },
                    ]}
                    validateTrigger="onSubmit"
                    name="password"
                >
                    <Input.Password allowClear ></Input.Password>
                </Form.Item>
                <Col span={10} offset={8}>
                    <Button onClick={formSubmit} loading={onSubmit} style={{ width: "100%" }}
                    // htmlType="submit"
                    >
                        Đăng nhập</Button>
                </Col>


            </Form>

        </div >
    );
}

export default GuestLogin;