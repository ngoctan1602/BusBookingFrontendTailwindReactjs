import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
const PopUpShowDetail = ({ items, userAccountProps }) => {
    const contentStyle = { backgroundColor: '#e1e1e1', borderRadius: "8px", width: "40%" };
    return (
        <Popup trigger={<button class="flex justify-center"> <FontAwesomeIcon icon={faMagnifyingGlass} color="#00B873" class='cursor-pointer confirm-button border-button p-sm border-[1px] w-[34px] h-[34px] mr-sm'></FontAwesomeIcon></button>} position="right center"
            modal
            nested
            closeOnDocumentClick={false}
            {... { contentStyle }}
        >
            {
                close => (

                    <div class='p-md text-16 text-txt min-h-[200px]'>
                        <div class='relative'>
                            <p class='text-20 text-center font-bold'>Chi tiết tài khoản người dùng</p>

                            <div class='closeButton cursor-pointer '
                                onClick={close}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </div>

                        <div class='w-full h-[1px] bg-txt my-sm' ></div>

                        {
                            userAccountProps.map((item, index) => (
                                <div class='grid grid-cols-12 grid-flow-row p-sm'>
                                    <p class='col-span-4 col-start-2 font-semibold'>{item.content}</p>
                                    <div class='col-span-6'>
                                        {
                                            (item.name === "status" && items[item.name] === 1)
                                            && <p>Hoạt động</p>
                                        }
                                        {
                                            (item.name === "status" && items[item.name] === 0)
                                            && <p>Ngưng hoạt động</p>
                                        }
                                        {
                                            (item.name === "dateOfBirth")
                                            && new Date(items[item.name]).getDate() + "/"
                                            + (new Date(items[item.name]).getMonth() + 1)
                                            + "/" + new Date(items[item.name]).getFullYear()
                                        }
                                        {
                                            (item.name === "avatar")
                                            && <img class='w-[60px] h-[60px]' src={items[item.name]}></img>
                                        }
                                        {
                                            (
                                                item.name != "status" &&
                                                item.name != "avatar" &&
                                                item.name != "dateOfBirth"
                                            )
                                            &&
                                            items[item.name]
                                        }

                                    </div>
                                </div>

                            ))
                        }


                    </div>
                )
            }

        </Popup>
    );
}

export default PopUpShowDetail;