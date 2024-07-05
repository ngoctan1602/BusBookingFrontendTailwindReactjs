import { useCallback, useState } from "react";
import PopupUpdate from "./PopupUpdate";
import CurrencyFormat from "react-currency-format";
import ReactLoading from 'react-loading';
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopupUpdateTypeSeat from "./PopupUpdateSeatType";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { setTypeSeat } from "../../../../../store/slice/typeseatSlice"
import { useSelector, useDispatch } from 'react-redux';
const SeatTypeRow = ({ item, onChangeStatus, onUpdate, fetchData }) => {
    const dispatch = useDispatch();
    const dispatchUpdate = () => {
        changeOpen(true)
        dispatch(setTypeSeat(item))
    }
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
    const [open, setOpen] = useState(false);
    const changeOpen = (value) => {
        setOpen(value)
    }
    return (
        <tr class='grid  grid-cols-12 p-sm  border-txt my-[10px] items-center'
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
                <select
                    className={`rounded-lg p-[5px] ${item.status === 3 ? 'bg-danger' : item.status === 1 ? 'bg-success' : item.status === 2 ? "bg-warning" : ""}`}
                    style={{ background: item.status === 3 ? "#75718a" : "" }} onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}>
                    <option className="bg-danger" selected={item.status === 3 ? true : false} value={3} >Ngưng hoạt động</option>
                    <option className="bg-success" selected={item.status === 1 ? true : false} value={1} >Hoạt động</option>
                </select>
            </td>
            {/* {
                item.status === 3 ?
                    <td class='col-span-1 hidden'>
                        <PopupUpdate item={itemUpdate} status={item.status} onChange={updateItemValue} updateTypeBus={updateTypeBus} success={success} closePopup={closePopup} />
                    </td>
                    :
                    <td class='col-span-1'>
                        <PopupUpdate item={itemUpdate} status={item.status} onChange={updateItemValue} updateTypeBus={updateTypeBus} success={success} closePopup={closePopup} fetchData={fetchData} />
                    </td>
            } */}

            {
                <td class='col-span-1 text-center' >
                    {/* Chỉnh sửa */}
                    {
                        !open

                        && <Button icon={<FontAwesomeIcon color="#00B873" icon={faPenToSquare}></FontAwesomeIcon>} onClick={dispatchUpdate} ></Button>
                    }
                    {
                        open &&
                        <PopupUpdateTypeSeat changeOpen={changeOpen} refetchData={fetchData}></PopupUpdateTypeSeat>
                    }
                    {/* <PopupUpdate item={itemUpdate} status={item.status} onChange={updateItemValue} updateTypeBus={updateTypeBus} success={success} closePopup={closePopup} fetchData={fetchData} /> */}
                </td>
            }
        </tr >
    );
}

export default SeatTypeRow;