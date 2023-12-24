import { useCallback, useState } from "react";
import PopupUpdate from "./PopupUpdate";
import CurrencyFormat from "react-currency-format";
import ReactLoading from 'react-loading';
const SeatTypeRow = ({ item, onChangeStatus, onUpdate, fetchData }) => {

    const [itemUpdate, setItemUpdate] = useState({
        title: "Cập nhật loại ghế",
        item: [
            {
                id: 1, name: "id", content: "Id", spanWidth: 20, placeholder: "Id", value: item.id
            },
            {
                id: 2, name: "type", content: "Tên loại ghế", spanWidth: 120, placeholder: "Tên loại ghế", value: item.type
            },
            {
                id: 3, name: "description", content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả", value: item.description
            },
            {
                id: 4, name: "price", content: "Đơn giá", spanWidth: 100, placeholder: "Thêm đơn giá", value: item.price
            }
        ],
    })

    const [updateTypeBus, setUpdateTypeBus] = useState({
        id: item.id,
        type: item.type,
        description: item.description,
        price: item.price,

    });
    const closePopup = () => {
        setUpdateTypeBus({
            id: item.id,
            type: item.type,
            description: item.description,
            price: item.price,

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
    return (
        <tr class='grid  grid-cols-12 p-sm border-t-[1px] border-txt'
            style={{ background: item.status === 3 ? "#75718a" : "" }}
        >
            {/* <td class='col-span-1'>{item.id}</td> */}
            <td class='col-span-3'>{item.type}</td>
            <td class='col-span-4'>{item.description}</td>
            <td class='col-span-2'>

                <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />

            </td>
            <td class='col-span-2' >
                {/* onChange={() => onChange(item.id, value)} */}
                <select class='bg-[#e1e1e1] outline-none' style={{ background: item.status === 3 ? "#75718a" : "" }} onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}>
                    <option selected={item.status === 3 ? true : false} value={3} >Ngưng hoạt động</option>
                    <option selected={item.status === 1 ? true : false} value={1} >Hoạt động</option>
                </select>
            </td>
            {
                item.status === 3 ?
                    <td class='col-span-1 hidden'>
                        <PopupUpdate item={itemUpdate} status={item.status} onChange={updateItemValue} updateTypeBus={updateTypeBus} success={success} closePopup={closePopup} />
                    </td>
                    :
                    <td class='col-span-1'>
                        <PopupUpdate item={itemUpdate} status={item.status} onChange={updateItemValue} updateTypeBus={updateTypeBus} success={success} closePopup={closePopup} fetchData={fetchData} />
                    </td>
            }
        </tr >
    );
}

export default SeatTypeRow;