import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
const Input = (props) => {
    let placeholder = props.placeholder;
    let content = props.content;
    let width = props.width;
    let type = props.type;
    let id = props.id;
    let toggle = props.toggle;
    let onClick = props.onClick;
    let isOpen = props.isOpen;
    let sit = props.sit;
    let name = props.name;
    let checked = props.checked;
    let onChange = props.onChange;

    return (
        <>
            {
                width === "search"
                    ?
                    < div className="box-border flex flex-col w-[100%]  text-txt my-md" >
                        <label>
                            {content}
                        </label>

                        <input type={type} placeholder={placeholder} onChange={props.onChange} className="bg-bg p-sm rounded-md border-[0.3px] border-txt outline-none focus:border-black focus:border-[2px]">
                        </input>
                    </div >
                    : type === 'radio'
                        ?
                        <div key={id} class='w-full my-[4px] flex'>
                            <input
                                checked={checked} type={type} id={id} value={content} name={name}
                                onChange={() => onChange(id)}
                                class='w-[20px] h-[20px] border-none outline-none cursor-pointer' />
                            <label htmlFor={id} class='text-txt text-16 mx-sm'>{content}</label>
                        </div>
                        : type === 'checkbox'
                            ? toggle === 'true'
                                ?
                                < div className="w-content m-sm flex" >
                                    {
                                        isOpen
                                            ?
                                            <FontAwesomeIcon icon={faCaretDown} size="lg" class='mr-sm w-[10%] h-[20px] text-txt duration-1000 ease-in-out' onClick={onClick}></FontAwesomeIcon>
                                            :
                                            <FontAwesomeIcon icon={faCaretRight} size="lg" class='mr-sm w-[10%] h-[20px] text-txt duration-1000 ease-in-out' onClick={onClick}></FontAwesomeIcon>
                                    }

                                    <input type={type} id={id} value={content} name="start_time" class='w-[10%] h-[20px] border-none outline-none cursor-pointer' />
                                    <label htmlFor={id} class='w-[80%] text-txt text-16 mx-sm'>{content}</label>
                                </div >
                                : sit === 'true'
                                    ?
                                    < div className="box-border m-sm flex items-center justify-between w-content text-txt my-md" >
                                        <label>
                                            {content}
                                        </label>
                                        <input type={type} placeholder={placeholder} onChange={props.onChange} className="w-[20px] h-[20px] bg-bg p-sm rounded-md border-[0.3px] border-txt outline-none focus:border-black focus:border-[2px]">
                                        </input>
                                    </div >
                                    :
                                    < div className="w-full m-sm flex items-center" >
                                        <input type={type} id={id} value={content} name="start_time" class='w-[20px] h-[20px] border-none outline-none cursor-pointer' />
                                        <label htmlFor={id} class='w-[80%] text-txt text-16 mx-sm'>{content}</label>
                                    </div >
                            :
                            < div className="box-border flex flex-col w-full text-txt my-md" >
                                <label>
                                    {content}
                                </label>

                                <input type={type} placeholder={placeholder} onChange={props.onChange} className="bg-bg p-sm rounded-md border-[0.3px] border-txt outline-none focus:border-black focus:border-[2px]">
                                </input>
                            </div >
            }
        </>
    );
}

export default Input;