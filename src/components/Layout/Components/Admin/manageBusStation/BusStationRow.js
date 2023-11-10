import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import PopupUpdate from "../PopupUpdate";

const TypeBusRow = ({ item, onChange }) => {
    const itemUpdate = {
        title: "Cập nhật bến bãi",
        item: [
            {
                id: 1, content: "Tên loại xe", spanWidth: 120, placeholder: "Tên loại xe", value: item.name
            },
            {
                id: 2, content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả", value: item.description
            },
            {
                id: 3, content: "Địa chỉ", spanWidth: 160, placeholder: "Số chỗ ngồi", value: item.address
            }
        ],
    }

    return (
        <tr class='grid  grid-cols-12 p-sm border-t-[1px] border-txt'
            style={{ background: item.status === 0 ? "#75718a" : "", color: item.status === 0 ? "#F2ECFF" : "" }}
        >
            <td class='col-span-2'>{item.id}</td>
            <td class='col-span-3'>{item.name}</td>
            <td class='col-span-3'>{item.description}</td>
            <td class='col-span-2'>{item.address}</td>
            <td class='col-span-1'>
                {/* onChange={() => onChange(item.id, value)} */}
                <select class='bg-[#e1e1e1]' style={{ background: item.status === 0 ? "#75718a" : "" }} onChange={(e) => onChange(item.id, Number(e.target.value))}>
                    <option selected={item.status === 0 ? true : false} value={0} >Xóa</option>
                    <option selected={item.status === 1 ? true : false} value={1} >Hiển thị</option>
                </select>
            </td>
            {
                <td class='col-span-1 text-center'>
                    <PopupUpdate item={itemUpdate} status={item.status} />
                </td>
            }
        </tr >
    );
}

export default TypeBusRow;