import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "antd";
import { useSpring, animated } from 'react-spring';
import { useEffect, useState } from "react";
import * as BillService from '../../../../../services/BillServices';

const CardTotal = () => {

    const [totalBill, setTotalBill] = useState(0);
    const [rate, setRate] = useState(0);

    // Call api và gán số vào number = 50
    const propsNumber = useSpring({
        from: { number: 0 },
        number: totalBill,
        delay: 200,
        config: { duration: 2000 }
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

    const fetchData = async () => {
        try {
            const response = await BillService.TotalBill();
            if (response.isError !== undefined && !response.isError) {
                setTotalBill(response.data.totalBill.value);
                setRate(response.data.totalBill.rate);
            }
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    return (
        <div className="box-shadow border-bottom green" >
            <Row>

                <p className="text-16 font-bold text-center" style={{ width: "100%" }}>
                    Số người đặt vé
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

export default CardTotal;