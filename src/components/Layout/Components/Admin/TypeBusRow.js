import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import PopupUpdate from "./PopupUpdate";

const TypeBusRow = ({ item, onChangeStatus, onUpdate }) => {
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
                id: 4, name: "totalSeat", content: "Số chỗ ngồi", spanWidth: 160, placeholder: "Số chỗ ngồi", value: item.totalSeat
            }
        ],
    })

    const [updateTypeBus, setUpdateTypeBus] = useState({
        id: item.id,
        name: item.name,
        description: item.description,
        totalSeat: item.totalSeat,
        status: item.status
    });

    const updateItemValue = (id, newValue) => {

        const updatedItem = itemUpdate.item.map(item => {
            if (item.id === id) {
                setUpdateTypeBus({ ...updateTypeBus, [item.name]: newValue })
                return { ...item, value: newValue };
            }
            return item;
        });


        setItemUpdate({
            ...itemUpdate,
            item: updatedItem
        });
    };


    const success = useCallback(() => {
        let isSuccess = true;
        itemUpdate.item.map(item => {
            if (item.value === "") {
                isSuccess = false
            }

        });

        return isSuccess
    }, [itemUpdate])

    return (
        <tr class='grid  grid-cols-12 p-sm border-t-[1px] border-txt'
            style={{ background: item.status === 0 ? "#75718a" : "", color: item.status === 0 ? "#F2ECFF" : "" }}
        >
            <td class='col-span-2'>{item.id}</td>
            <td class='col-span-3'>{item.name}</td>
            <td class='col-span-3'>{item.description}</td>
            <td class='col-span-2'>{item.totalSeat}</td>
            <td class='col-span-1'>
                {/* onChange={() => onChange(item.id, value)} */}
                <select class='bg-[#e1e1e1]' style={{ background: item.status === 0 ? "#75718a" : "" }} onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}>
                    <option selected={item.status === 0 ? true : false} value={0} >Xóa</option>
                    <option selected={item.status === 1 ? true : false} value={1} >Hiển thị</option>
                </select>
            </td>
            {
                // item.status === 0 ?
                //     <td td class='col-span-1 text-center' disabled>
                //         <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                //     </td>
                //     :
                //     <td td class='col-span-1 text-center cursor-pointer'

                //     >
                //         <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                //     </td>
                <td class='col-span-1 text-center'>
                    <PopupUpdate item={itemUpdate} status={item.status} onChange={updateItemValue} updateTypeBus={updateTypeBus} success={success} />
                </td>
            }
        </tr >
    );
}

export default TypeBusRow;