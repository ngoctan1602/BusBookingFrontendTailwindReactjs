import PopUpShowDetail from "./PopupShowDetail";
import * as AddressSv from "../../../../../services/AddressSv"
import { useState } from "react"
import { Tooltip } from "antd";
const BusStationRow = ({ item, onChangeStatus, address }) => {
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
    const busStationProps = [
        {
            name: "name",
            content: "Tên bến xe:"
        },
        {
            name: "status",
            content: "Trạng thái:"
        },
        {
            name: "description",
            content: "Giới thiệu:"
        },
        {
            name: "addressDb",
            content: "Địa chỉ:"
        },
    ]

    return (
        <tr class='grid  grid-cols-12 p-sm border-txt my-[10px]'
        >
            {/* <td class='col-span-1'>{item.id}</td> */}
            <td class='col-span-3'>{item.name}</td>
            {/* <td class='col-span-3'>{item.description}</td> */}

            <td class='col-span-6 truncate'>
                <Tooltip title={item.addressDb}>
                    <p class='col-span-6 truncate'>
                        {item.addressDb}
                    </p>
                </Tooltip>
            </td>
            <td class='col-span-2 bg'>
                {/* onChange={() => onChange(item.id, value)} */}
                <select
                    class={`rounded-lg p-[5px] ${item.status === 3 ? 'bg-danger' : item.status === 1 ? 'bg-success' : item.status === 2 ? "bg-warning" : ""}`} onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}>
                    <option className="bg-danger" selected={item.status === 3 ? true : false} value={0} >Khóa</option>
                    <option className="bg-success" selected={item.status === 1 ? true : false} value={1} >Hoạt động</option>
                    {/* <option className="bg-warning" selected={item.status === 2 ? true : false} value={2} >Đang chờ</option> */}
                </select>
            </td>
            {
                <td class='col-span-1 text-center'>
                    <PopUpShowDetail items={item} companyProps={busStationProps} address={address}></PopUpShowDetail>
                    {/* <PopupUpdate item={itemUpdate} status={item.status} /> */}
                </td>
            }
        </tr >
    );
}

export default BusStationRow;