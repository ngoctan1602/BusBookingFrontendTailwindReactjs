import { Col, Divider, Row } from "antd";
import imageUser from "../../../../../../assets/images/avatar.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
};

const dateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
};


const BusReviewCard = ({ item }) => {
    const arrayFromNumber = Array.from({ length: item.rate }, (_, index) => index);
    const arrayFromNumber1 = Array.from({ length: 5 - item.rate }, (_, index) => index);
    return (
        <Row className="m-sm w-full h-[80px]">
            <Col span={4} className="flex justify-center items-center min-h-full ">
                <img class='w-[60px] h-[60px] object-cover rounded-md' src={imageUser}>
                </img>
            </Col>
            <Col className="min-h-full" span={20}>
                <Row className="w-full">
                    {item.fullName}
                </Row>
                <Row className="w-full">
                    <Col span={3} className="flex">
                        <div>
                            {

                                arrayFromNumber.map((item, index) => (
                                    <FontAwesomeIcon icon={faStar} color="#FFC100"></FontAwesomeIcon>
                                ))
                            }
                        </div>
                        <div>
                            {

                                arrayFromNumber1.map((item, index) => (
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#7b808a" }} />
                                ))
                            }
                        </div>
                    </Col>
                    <Col>
                        <p className="w-full">
                            {new Date(item.dateUpdate)
                                .toLocaleString("en-CA", timeOptions)

                            }
                            <span> </span>
                            {new Date(item.dateUpdate).
                                toLocaleString("en-CA", dateOptions).split('-').reverse().join('-')
                            }
                        </p>
                    </Col>
                </Row>
                <Row className="w-full min-h-[40px]">
                    {item.reviews}
                </Row>
            </Col>

        </Row>
    );
}

export default BusReviewCard;