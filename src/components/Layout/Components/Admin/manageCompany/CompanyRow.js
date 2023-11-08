import { faMagnifyingGlass, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import PopUpShowDetail from "./PopupShowDetail";


const CompanyRow = ({ item, onChangeStatus, onUpdate }) => {
    let date = item.dateCreate;
    // const [itemUpdate, setItemUpdate] = useState({
    //     title: "Cập nhật loại xe",
    //     item: [
    //         {
    //             id: 1, name: "id", content: "Id", spanWidth: 20, placeholder: "Id", value: item.id
    //         },
    //         {
    //             id: 2, name: "name", content: "Tên loại xe", spanWidth: 120, placeholder: "Tên loại xe", value: item.name
    //         },
    //         {
    //             id: 3, name: "description", content: "Mô tả", spanWidth: 100, placeholder: "Thêm mô tả", value: item.description
    //         },
    //         {
    //             id: 4, name: "totalSeat", content: "Số chỗ ngồi", spanWidth: 160, placeholder: "Số chỗ ngồi", value: item.totalSeat
    //         }
    //     ],
    // })

    // const [updateTypeBus, setUpdateTypeBus] = useState({
    //     id: item.id,
    //     name: item.name,
    //     description: item.description,
    //     totalSeat: item.totalSeat,
    //     status: item.status
    // });

    // const updateItemValue = (id, newValue) => {

    //     const updatedItem = itemUpdate.item.map(item => {
    //         if (item.id === id) {
    //             setUpdateTypeBus({ ...updateTypeBus, [item.name]: newValue })
    //             return { ...item, value: newValue };
    //         }
    //         return item;
    //     });


    //     setItemUpdate({
    //         ...itemUpdate,
    //         item: updatedItem
    //     });
    // };


    // const success = useCallback(() => {
    //     let isSuccess = true;
    //     itemUpdate.item.map(item => {
    //         if (item.value === "") {
    //             isSuccess = false
    //         }

    //     });

    //     return isSuccess
    // }, [itemUpdate])

    const companyProps = [
        {
            name: "companyID",
            content: "Id:"
        },
        {
            name: "name",
            content: "Tên nhà xe:"
        },
        {
            name: "logo",
            content: "Logo:"
        },
        {
            name: "status",
            content: "Trạng thái:"
        },
        {
            name: "email",
            content: "Email:"

        },
        {
            name: "phoneNumber",
            content: "Số điện thoại:"
        },
        {
            name: "dateCreate",
            content: "Ngày tạo:"
        },
        {
            name: "dateUpdate",
            content: "Ngày cập nhật:"
        },
        {
            name: "introduction",
            content: "Giới thiệu:"
        }
    ]
    return (
        <tr class='grid grid-cols-12 p-sm border-t-[1px] border-txt '
            style={{ background: item.status === 0 ? "#75718a" : "", color: item.status === 0 ? "#F2ECFF" : "" }}
        >

            <td class='col-span-1'>{item.companyID}</td>
            <td class='col-span-2'>{item.name}</td>
            <td class='col-span-1'><img class='w-[60px] h-[60px]' src={item.logo}></img></td>
            <td class='col-span-2 break-words'>{item.email}</td>
            <td class='col-span-2 pl-md'>{item.phoneNumber}</td>
            <td class='col-span-1'>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</td>
            {/* <td class='col-span-1'>Hiển thị</td> */}
            <td class='col-span-2'>

                <select class='bg-[#e1e1e1]' style={{ background: item.status === 0 ? "#75718a" : "" }} onChange={(e) => onChangeStatus(item.companyID, Number(e.target.value))}>
                    <option selected={item.status === 0 ? true : false} value={0} >Ngưng hoạt động</option>
                    <option selected={item.status === 1 ? true : false} value={1} >Hoạt động</option>
                </select>
            </td>
            {
                <td class='col-span-1'>
                    <PopUpShowDetail items={item} companyProps={companyProps} />

                    {/* <PopupUpdate item={itemUpdate} status={item.status} onChange={updateItemValue} updateTypeBus={updateTypeBus} success={success} /> */}
                </td>
            }
        </tr >
    );
}

export default CompanyRow;