import { faMagnifyingGlass, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import PopUpShowDetail from "./PopupShowDetail";
import avatar from "../../../../../../src/assets/images/avatar.png"

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
    return (
        <tr class='grid grid-cols-11 p-sm border-txt gap-md p-sm  border-txt my-[10px] items-center'
            style={{ background: item.status === 0 ? "#75718a" : "", color: item.status === 0 ? "#F2ECFF" : "" }}
        >

            <td class='col-span-2'>{item.username}</td>
            <td class='col-span-2'>{item.fullName}</td>
            <td class='col-span-2'><img class='w-[60px] h-[60px]' src={item.avatar ? item.avatar : avatar}></img></td>
            <td class='col-span-2 break-words'>{item.email}</td>
            {/* <td class='col-span-1'>Hiển thị</td> */}
            <td class='col-span-2'>

                <select class='bg-[#e1e1e1]' style={{ background: item.status === 0 ? "#75718a" : "" }} onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}>
                    <option selected={item.status === 1 ? true : false} value={1} >Hoạt động</option>
                    <option selected={item.status === 0 ? true : false} value={0} >Ngưng hoạt động</option>
                    <option selected={item.status === 4 ? true : false} value={4} >Khóa</option>

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