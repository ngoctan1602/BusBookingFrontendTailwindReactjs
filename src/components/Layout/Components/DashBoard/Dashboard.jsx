
import { Col, Row } from "antd";
import { ToastContainer } from "react-toastify"; // Add this line
import CardTotal from "./Cards/CardTotal";
import CardRenue from "./Cards/CardRunue";
import CardTicket from "./Cards/CardTicket";
import ChartVenueYear from "./Charts/ChartVenueYear";
import ChartRoute from "./Charts/ChartRoutes";
import ChartBusStop from "./Charts/ChartBusStop";
import ChartBusType from "./Charts/ChartTypeBus";


const DashBoardNew = () => {
    return (
        <div className="w-full h-full">
            <div class='w-full text-txt txt-16 bg-bg py-[20px] px-[10px] rounded-md box-shadow-content mb-md' >
                <Row style={{ width: "100%", margin: "8px 8px" }}>
                    <Col offset={2} span={6}>
                        <CardTotal></CardTotal>
                    </Col>
                    <Col offset={1} span={6}>
                        <CardRenue></CardRenue>
                    </Col>
                    <Col span={6} offset={1}>
                        <CardTicket></CardTicket>
                    </Col>
                </Row>
                <Row style={{ width: "100%", margin: "24px 0px" }}>
                    <Col className="p-sm" span={12}>
                        <ChartVenueYear></ChartVenueYear>
                    </Col>
                    <Col className="p-sm" span={12} >
                        <ChartRoute></ChartRoute>
                    </Col>
                </Row>
                <Row style={{ width: "100%", margin: "24px 0px" }}>
                    <Col className="p-sm" span={24}>
                        <ChartBusStop></ChartBusStop>
                    </Col>
                </Row>
                <Row style={{ width: "100%", margin: "24px 0px" }}>
                    <Col className="p-sm" span={24}>
                        <ChartBusType></ChartBusType>
                    </Col>
                </Row>
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
    )
}

export default DashBoardNew;