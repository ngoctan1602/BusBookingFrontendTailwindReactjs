
import { useCallback, useState } from "react";
import PopupUpdate from "./PopupUpdate";
import PopupUpdateTypeBus from "./manageTypeBus/PopupUpdateTypeBus";

import { setTypeBus } from "../../../../store/slice/typebusSlice"
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const TypeBusRow = ({ item, onChangeStatus, onUpdate, fetchData }) => {
    const dispatch = useDispatch();

    const [itemUpdate, setItemUpdate] = useState({
        title: "Cập nhật loại xe",
        item: [
            {
                id: 1, name: "id", content: "Id", spanWidth: 20, placeholder: "Id", value: item.id
            },
            {
                id: 2, name: "name", content: "Tên loại xe", spanWidth: 120, placeholder: "Tên loại xe", value: item.name
            },
            {
                id: 3, name: "description", content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả", value: item.description
            },
            {
                id: 4, name: "totalSeats", content: "Số chỗ ngồi", spanWidth: 160, placeholder: "Số chỗ ngồi", value: item.totalSeats
            }
        ],
    })

    const [updateTypeBus, setUpdateTypeBus] = useState({
        id: item.id,
        name: item.name,
        description: item.description,
        totalSeats: item.totalSeats,
        status: item.status
    });
    const closePopup = () => {
        setUpdateTypeBus({
            id: item.id,
            name: item.name,
            description: item.description,
            totalSeats: item.totalSeats,
            status: item.status
        })
    }
    const updateItemValue = (id, newValue) => {
        itemUpdate.item.map(item => {
            if (item.id === id) {
                setUpdateTypeBus({ ...updateTypeBus, [item.name]: newValue })
            }
        });
    };

    const success = useCallback(() => {
        let isSuccess = true;
        for (let a in updateTypeBus) {
            if (updateTypeBus[a] === "") {
                isSuccess = false
            }
        }
        return isSuccess
    }, [updateTypeBus])

    const dispatchUpdate = () => {
        // console.log("set dispatch")
        dispatch(setTypeBus(item))
        changeOpen(true);
    }
    const [open, setOpen] = useState(false);
    const changeOpen = (value) => {
        setOpen(value)
    }

    return (
        <tr class='grid  grid-cols-12 p-sm  border-txt my-[10px] items-center'
        >
            {/* <td class='col-span-1'>{item.id}</td> */}
            <td class='col-span-3'>{item.name}</td>
            <td class='col-span-4'>{item.description}</td>
            <td class='col-span-2'>{item.totalSeats}</td>
            <td class='col-span-2'>
                {/* onChange={() => onChange(item.id, value)} */}
                <select
                    className={`rounded-lg p-[5px] ${item.status === 0 ? 'bg-danger' : item.status === 1 ? 'bg-success' : item.status === 2 ? "bg-warning" : ""}`}
                    onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}>
                    <option className="bg-danger" selected={item.status === 0 ? true : false} value={0} >Ngưng hoạt động</option>
                    <option className="bg-success" selected={item.status === 1 ? true : false} value={1} >Hoạt động</option>
                </select>
            </td>
            {
                <td class='col-span-1 text-center' >
                    {/* Chỉnh sửa */}
                    {
                        !open

                        && <Button icon={<FontAwesomeIcon color="#00B873" icon={faPenToSquare}></FontAwesomeIcon>} onClick={dispatchUpdate} ></Button>
                    }
                    {
                        open &&
                        <PopupUpdateTypeBus changeOpen={changeOpen} refetchData={fetchData}></PopupUpdateTypeBus>
                    }
                    {/* <PopupUpdate item={itemUpdate} status={item.status} onChange={updateItemValue} updateTypeBus={updateTypeBus} success={success} closePopup={closePopup} fetchData={fetchData} /> */}
                </td>
            }
        </tr >
    );
}

export default TypeBusRow;