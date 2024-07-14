import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "antd";
import { useSpring, animated } from 'react-spring';
import { useEffect, useState } from "react";
import * as CustomerService from "../../../../../../services/CustomerServices";
const CardTotalAccount = () => {

    const [accounts, setAccount] = useState(0);
    const [rate, setRate] = useState(0);
    const propsNumber = useSpring({
        from: { number: 0 },
        number: accounts,
        delay: 200,
        config: { duration: 100 }
    });

    const propsPercent = useSpring({
        from: { number: 0 },
        number: rate,
        delay: 200,
        config: { duration: 2000 }
    });

    useEffect(() => {
        fetchData();
    }, []);
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await CustomerService.StatisticalCustomer();
            if (response.isError !== undefined && !response.isError) {
                setAccount(response.data.totalCustomer);
                setRate(response.data.rateCustomer);
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false)
    };

    return (
        <div className="box-shadow border-bottom green" >
            <Row>

                <p className="text-16 font-bold text-center" style={{ width: "100%" }}>
                    Tổng người dùng
                </p>
            </Row>
            {
                !loading &&

                <Row>

                    <p className="text-16 text-center" style={{ width: "100%" }}>
                        +  <animated.span>
                            {propsNumber.number.to(n => n.toFixed(0))}
                        </animated.span>
                    </p>
                </Row>
            }
            {
                !loading &&
                <Row style={{ display: "flex", alignItems: "center" }}>
                    <p className="w-full text-center">
                        {/* Nếu tăng thì dùng up, giảm thì down */}
                        <FontAwesomeIcon icon={faChevronUp} color="#77DD77" />
                        {/* <FontAwesomeIcon icon={faChevronDown} color="#E72929" /> */}
                        <span> </span>
                        <animated.span>
                            {propsPercent.number.to(n => n.toFixed(0))}
                        </animated.span> %
                        Người dùng không hoạt động
                    </p>
                </Row>
            }

        </div>
    );
}
export default CardTotalAccount;