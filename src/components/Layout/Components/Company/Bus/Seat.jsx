import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Seat = ({ color, select }) => {
    return (
        <div className="w-[24px] relative h-[30px] rounded-[3px]" style={{
            border: `1px solid ${color}`
        }}>
            <div className=" absolute top-[0px] left-[6px] w-[10px] h-[10px] rounded-[50%] ">
                {
                    select === 1 ?
                        <FontAwesomeIcon icon={faCheck} color={color}></FontAwesomeIcon>
                        : select === 2 &&
                        <FontAwesomeIcon icon={faXmark} color={color}></FontAwesomeIcon>
                }

            </div>
            <div className="absolute bottom-[3px] left-[3px] w-[16px] h-[8px]" style={{ border: `1px solid ${color}` }}>

            </div>
        </div >
    );
}

export default Seat; 