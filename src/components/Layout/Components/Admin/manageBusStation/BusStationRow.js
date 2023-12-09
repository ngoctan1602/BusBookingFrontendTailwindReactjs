import PopUpShowDetail from "./PopupShowDetail";
import * as AddressSv from "../../../../../services/AddressSv"
import { useState } from "react"
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
            name: "id",
            content: "Id:"
        },
        {
            name: "name",
            content: "Tên bến xe:"
        },
        {
            name: "status",
            content: "Trạng thái:"
        },
        {
            name: "address",
            content: "Địa chỉ:"
        },
        {
            name: "description",
            content: "Giới thiệu:"
        },
    ]

    return (
        <tr class='grid  grid-cols-12 p-sm border-t-[1px] border-txt'
            style={{ background: item.status === 0 ? "#75718a" : "", color: item.status === 0 ? "#F2ECFF" : "" }}
        >
            <td class='col-span-1'>{item.id}</td>
            <td class='col-span-3'>{item.name}</td>
            {/* <td class='col-span-3'>{item.description}</td> */}

            <td class='col-span-6'>{address &&
                item.address + ", " + address.fullName + ", " + address.district + ", " + address.province}</td>
            <td class='col-span-1'>
                {/* onChange={() => onChange(item.id, value)} */}
                <select class='bg-[#e1e1e1]' style={{ background: item.status === 0 ? "#75718a" : "" }} onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}>
                    <option selected={item.status === 0 ? true : false} value={0} >Xóa</option>
                    <option selected={item.status === 1 ? true : false} value={1} >Hiển thị</option>
                    <option selected={item.status === 2 ? true : false} value={2} >Đang chờ</option>
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