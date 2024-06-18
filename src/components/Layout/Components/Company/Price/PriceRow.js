import { useCallback, useState } from "react";
// import PopupUpdate from "./PopupUpdate";
import CurrencyFormat from "react-currency-format";
import ReactLoading from 'react-loading';
const PriceRow = ({ item, onChangeStatus, onUpdate, fecthData }) => {

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
        <tr class='grid grid-cols-12 p-sm py-lg items-center border-collapse border-t-[1px] border-border-top'

        >
            <td class='col-span-6'>{item.stationStart} - {item.stationEnd}</td>
            <td class='col-span-2'>
                <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
            </td>
            <td class='col-span-2'>
                <CurrencyFormat value={item.surcharges} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
            </td>
            <td className="col-span-2">
                <div>
                    {item.status === 2 ? <span className="rounded-lg p-[5px] bg-danger">Đang chờ</span> : <span className="rounded-lg p-[5px] bg-success">Hoạt động</span>}
                </div>
            </td>
        </tr >
    );
}

export default PriceRow;