import { Col } from "antd";
import logo from "../../assets/images/logotrip.png"
import logoUser from "../../assets/images/avatar.png"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="width-full heigh-80 header-color ">
            <Col offset={1} span={10} className="flex-class" style={{ justifyContent: "center" }}>
                <img onClick={() => navigate("/guest-home")} src={logo} className="header-logo" />
            </Col>
            <Col offset={5} span={8} className="flex-colum">
                <p className="item-header-margin duration-100 " onClick={() => navigate("/company/login")}>
                    Trở thành đối tác
                </p>
                <p className="item-header-margin ">
                    Chính sách
                </p>
                <p style={{ width: "1px", height: "12px", background: "black", margin: "0px 8px" }}>

                </p>
                <div className="item-header-margin ">
                    <FontAwesomeIcon icon={faPhone} />
                    0923140493
                </div>
                <p onClick={() => navigate("/guest-login")} className="item-header-margin">
                    <img src={logoUser} className="header-logo-user" />
                </p>
            </Col>
        </div>
    );
}

export default Header;