import { faMagnifyingGlass, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import PopUpShowDetail from "./PopupShowDetail";
import avatar from "../../../../../../src/assets/images/avatar.png"
import { Tooltip } from "antd";

const UserAccountRow = ({ item, onChangeStatus }) => {

    const userAccountProps = [
        {
            name: "username",
            content: "Username:"
        },
        {
            name: "fullName",
            content: "Họ và tên"
        },
        {
            name: "avatar",
            content: "Avatar"
        },
        {
            name: "dateOfBirth",
            content: "Ngày sinh:"

        },
        {
            name: "email",
            content: "Email:"
        },
        {
            name: "address",
            content: "Địa chỉ:"
        },
        {
            name: "gender",
            content: "Giới tính:"
        },

        {
            name: "status",
            content: "Trạng thái:"
        },
    ]

    console.log(item)
    return (
        <tr class='grid grid-cols-11 gap-md p-sm  border-txt my-[10px]'
        >
            <td class='col-span-2 truncate'>
                <Tooltip title={item.username} class='col-span-2'>
                    <p class='col-span-2 truncate'>{item.username}</p>
                </Tooltip>
            </td>
            <td class='col-span-2 truncate'>
                <Tooltip title={item.fullName} class='col-span-2'>
                    <p class='col-span-2 truncate'> {item.fullName}</p>
                </Tooltip>
            </td>
            <td class='col-span-2'><img class='w-[60px] h-[60px]' src={item.avatar ? item.avatar : avatar}></img></td>
            <td class='col-span-2 truncate'>
                <Tooltip title={item.email} class='col-span-2'>
                    <p class='col-span-2 truncate'>{item.email}</p>
                </Tooltip>
            </td>
            {/* <td class='col-span-1'>Hiển thị</td> */}
            <td class='col-span-2'>

                <select
                    className={`rounded-lg p-[5px] ${item.status === 0 ? 'bg-danger text-txt-light' : item.status === 1 ? 'bg-success' : item.status === 4 ? "bg-disable" : ""}`} onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}
                >
                    <option className="bg-success" selected={item.status === 1 ? true : false} value={1} >Hoạt động</option>
                    <option className="bg-danger" selected={item.status === 0 ? true : false} value={0} >Ngưng hoạt động</option>
                    <option className="bg-disable" selected={item.status === 4 ? true : false} value={4} >Khóa</option>
                    <option disabled className="bg-warning" selected={item.status === 2 ? true : false} value={2}>Đang chờ</option>
                </select>
            </td>
            {
                <td class='col-span-1'>
                    <PopUpShowDetail items={item} userAccountProps={userAccountProps} />

                    {/* <PopupUpdate item={itemUpdate} status={item.status} onChange={updateItemValue} updateTypeBus={updateTypeBus} success={success} /> */}
                </td>
            }
        </tr >
    );
}

export default UserAccountRow;