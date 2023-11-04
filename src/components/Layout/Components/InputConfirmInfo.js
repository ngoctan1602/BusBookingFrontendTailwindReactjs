import { useState } from "react";

const InputConfirmInfo = ({ item, onChange }) => {
    const [isFocus, setIsFocus] = useState(false);
    const [checkEmty, setCheckEmty] = useState(false);
    const handleOutFocus = () => {
        setIsFocus(!isFocus)

        if (item.value)
            setCheckEmty(false)
        else
            setCheckEmty(true)

    }
    const setType = () => {
        item.type = "date"
    }
    return (
        <div class='w-[full] h-[40px] relative my-md'>
            <input type={item.type} class='w-full h-[40px] p-sm border-[1px] outline-none bg-bg rounded-md
                ease-in-out duration-100
                focus:border-[3px] focus:border-button focus:border-solid
            '
                onFocus={() => setIsFocus(!isFocus)}
                // onFocus={() => setType()}
                onBlur={handleOutFocus}
                onChange={(e) => onChange(item.id, e.target.value)}
                style={{ borderColor: checkEmty && !isFocus ? "red" : "", background: item.background }}
                value={item.value}
                disabled={item.disable}
            >
            </input>
            {


                <span
                    class={
                        (isFocus || item.value != "") ?
                            'absolute block  border-none outline-none bg-bg h-[20px] right-[94%] translate-x-[94%] top-[-20%] translate-y-[-20%] ease-in-out duration-200'
                            : item.type != "text" ?
                                'absolute hidden border-none outline-none h-[20px] bg-bg mx-[-8px] pointer-events-none top-1/2 right-full translate-x-full translate-y-[-50%] ease-in-out duration-200'
                                : 'absolute  border-none outline-none h-[20px] bg-bg mx-[-8px] pointer-events-none top-1/2 right-full translate-x-full translate-y-[-50%] ease-in-out duration-200'


                    }
                    style={{ width: item.spanWidth, background: item.background }}>

                    {item.placeholder}
                </span>
            }
            {
                !isFocus && checkEmty && <p class='text-16 text-[red]'>Vui lòng {item.placeholder}</p>
            }
        </div >

    );
}

export default InputConfirmInfo;