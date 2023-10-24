import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-solid-svg-icons";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Button = (props) => {
    const type = props.type;
    const content = props.content;
    const onClick = props.onClick;
    return (

        // condition1 ? value1
        // : condition2 ? value2
        // : condition3 ? value3
        // : value4;
        <>
            {
                type === "solid"
                    ?
                    <div className="h-[50px] rounded-md w-[30%] bg-button hover:opacity-80 hover:scale-90 cursor-pointer flex justify-center items-center">
                        <FontAwesomeIcon icon={faGoogle} size="sm" className="text-bg px-sm h-[30px]"></FontAwesomeIcon>
                        <button className=" button text-bg ease-in-out duration-200" onClick={onClick}>
                            {content}
                        </button>
                    </div>
                    : type === "search"
                        ?
                        <div className=" rounded-md bg-button hover:opacity-80 hover:scale-90 cursor-pointer flex justify-center items-center">
                            <button className=" button text-txt ease-in-out duration-200" onClick={onClick}>
                                {content}
                            </button>
                        </div>

                        : type === "border"
                            ? <button className="hover:opacity-80 hover:scale-90 rounded-8 button bg-transparent border-2 border-neutral-400 text-bg" onClick={onClick}>
                                {content}
                            </button>
                            : <button className="" onClick={onClick}>
                                {content}
                            </button>
            }
        </>

    );
}

export default Button;