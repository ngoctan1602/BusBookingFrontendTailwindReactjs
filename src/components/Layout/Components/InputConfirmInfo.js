import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


const InputConfirmInfo = ({ item, onChange, onChangeShowPassword }) => {
    const [isFocus, setIsFocus] = useState(false);
    const [checkEmty, setCheckEmty] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const handleOutFocus = () => {
        setIsFocus(!isFocus)
        if (!item.value || (item.type === "number" && item.value === 0))
            setCheckEmty(true)
        else
            setCheckEmty(false)
    }

    const handleSetTypePassword = () => {
        onChangeShowPassword(isShow)
        setIsShow(!isShow)
    }

    return (
        <div class='w-[full] h-[40px] relative my-md'>
            <input type={item.type} class='w-full h-[40px] p-sm border-[1px] outline-none rounded-md
                ease-in-out duration-100
                focus:border-[3px] focus:border-button focus:border-solid'
                onFocus={() => setIsFocus(!isFocus)}
                onBlur={handleOutFocus}
                onChange={(e) => onChange(item.id, e.target.value)}
                style={{ borderColor: checkEmty && !isFocus ? "red" : "", background: item.background, paddingRight: item.type === "password" ? "50px" : "0px" }}
                value={item.value}
                disabled={item.disable}
            >
            </input>
            {
                (item.pw === "password" && !isShow) &&
                <div class='absolute right-[5%] top-[20%] cursor-pointer ' onClick={handleSetTypePassword}>
                    <FontAwesomeIcon icon={faEyeSlash} />
                </div>

            }
            {
                (item.pw === "password" && isShow) &&
                <div class='absolute right-[5%] top-[20%] cursor-pointer' onClick={handleSetTypePassword}>
                    <FontAwesomeIcon icon={faEye} />
                </div>

            }

            {
                <span
                    class={
                        (isFocus || item.value != "") ?
                            'absolute block  border-none outline-none bg-bg h-[20px] right-[94%] translate-x-[94%] top-[-20%] translate-y-[-20%] ease-in-out duration-200'
                            : (item.type === "text" || item.type === "password") ?
                                'absolute  border-none outline-none h-[20px] bg-bg mx-[-8px] pointer-events-none top-1/2 right-full translate-x-full translate-y-[-50%] ease-in-out duration-200'
                                : 'absolute hidden border-none outline-none h-[20px] bg-bg mx-[-8px] pointer-events-none top-1/2 right-full translate-x-full translate-y-[-50%] ease-in-out duration-200'


                    }
                    style={{ width: item.spanWidth, background: item.background }}>

                    {item.placeholder}
                </span>
            }
            {
                !isFocus && checkEmty
                && item.type === "number" && <p class='text-16 text-[red]'>{item.placeholder} khác 0</p>
            }

            {
                !isFocus && checkEmty && item.type === "text" && <p p class='text-16 text-[red]'>Vui lòng nhập {item.placeholder}</p>
            }
        </div >

    );
}

export default InputConfirmInfo;