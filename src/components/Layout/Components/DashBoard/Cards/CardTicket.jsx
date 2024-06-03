import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "antd";
import { useSpring, animated } from 'react-spring';
const CardTicket = () => {

    // Call api và gán số vào number = 50
    const propsNumber = useSpring({
        from: { number: 0 },
        number: 50,
        delay: 200,
        config: { duration: 2000 }
    });

    const propsPercent = useSpring({
        from: { number: 0 },
        number: 20,
        delay: 200,
        config: { duration: 2000 }
    });

    return (
        <div className="box-shadow border-bottom blue" >
            <Row>
                <p className="text-16 font-bold text-center" style={{ width: "100%" }}>
                    Số lượng vé tháng này
                </p>
            </Row>
            <Row>

                <p className="text-16 text-center" style={{ width: "100%" }}>
                    +  <animated.span>
                        {propsNumber.number.to(n => n.toFixed(0))}
                    </animated.span>
                </p>
            </Row>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <p className="w-full text-center">
                    {/* Nếu tăng thì dùng up, giảm thì down */}
                    {/* <FontAwesomeIcon icon={faChevronUp} color="#77DD77" /> */}
                    <FontAwesomeIcon icon={faChevronDown} color="#E72929" />
                    <span> </span>
                    <animated.span>
                        {propsPercent.number.to(n => n.toFixed(0))}
                    </animated.span> %
                    so với tháng trước
                </p>
            </Row>

        </div>
    );
}

export default CardTicket;