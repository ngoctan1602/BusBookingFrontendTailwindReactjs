import { Col, Layout, Row } from "antd";
import Header from "../../Guest/Header";


const UserLayout = ({ children }) => {
    return (
        // <Row className="guest-layout flex-class">
        //     <Header></Header>
        //     <Row className="width-full">
        //         {children}
        //     </Row>

        //     <Row className="width-full ">
        //         3
        //     </Row>
        // </Row>
        <div className="guest-layout flex-class" >
            <Header />
            <div style={{ minHeight: "500px", width: "100%", display: "flex", justifyContent: "center" }}>{children}</div>
            <div>Footer</div>
        </div>
    );
}

export default UserLayout;