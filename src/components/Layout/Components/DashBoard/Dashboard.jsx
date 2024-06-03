
import { Col, Row } from "antd";
import CardTotal from "./Cards/CardTotal";
import CardRenue from "./Cards/CardRunue";
import CardTicket from "./Cards/CardTicket";
import ChartVenueYear from "./Charts/ChartVenueYear";
import ChartRoute from "./Charts/ChartRoutes";
import ChartBusStop from "./Charts/ChartBusStop";
import ChartBusType from "./Charts/ChartTypeBus";


const DashBoardNew = () => {
    return (
        <div style={{ width: "100%", minHeight: "500px" }}>
            <Row style={{ width: "100%", margin: "8px 8px" }}>
                <Col offset={1} span={6}>
                    <CardTotal></CardTotal>
                </Col>
                <Col offset={1} span={6}>
                    <CardRenue></CardRenue>
                </Col>
                <Col offset={1} span={6}>
                    <CardTicket></CardTicket>
                </Col>
            </Row>
            <Row style={{ width: "100%", margin: "40px 0px" }}>
                <Col offset={1} span={11}>
                    <ChartVenueYear></ChartVenueYear>
                </Col>
                <Col offset={1} span={11}>
                    <ChartRoute></ChartRoute>
                </Col>
            </Row>

            <Row style={{ width: "100%", margin: "40px 0px" }}>
                <Col offset={1} span={23}>
                    <ChartBusStop></ChartBusStop>
                </Col>
            </Row>
            <Row style={{ width: "100%", margin: "40px 0px" }}>
                <Col offset={1} span={23}>
                    <ChartBusType></ChartBusType>
                </Col>
            </Row>
        </div>
    )
}

export default DashBoardNew;