import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "antd";
import { useSpring, animated } from 'react-spring';
const CardPolicy = ({ content, color }) => {
    console.log(color)
    return (
        <div className="flex items-center box-shadow w-full min-h-[100px] max-h-[100px]" style={{ borderBottom: `2px ${color} solid` }} >
            <p className="text-16  text-center w-full" >
                {content}
            </p>
        </div>
    );
}

export default CardPolicy;