import PopUpShowDetail from "./PopupShowDetail"

const OrderRow = ({ item, onChangeStatus, onUpdate }) => {
    let seat = ""
    item.seats.map((i, index) => {
        seat += i.name + " "
    })
    const orderProps = [
        {
            name: "billId",
            content: "Id:"
        },
        {
            name: "busNumber",
            content: "Biển số xe:"
        },
        {
            name: "status",
            content: "Trạng thái:"
        },
        {
            name: "fullName",
            content: "Khách hàng"
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
            name: "stationStart",
            content: "Điểm đón:"
        },
        {
            name: "stationEnd",
            content: "Điểm đến:"
        },
        {
            name: "dateDeparture",
            content: "Ngày khởi hành"
        }

    ]
    return (
        <tr class='grid grid-cols-12 p-sm border-t-[1px] border-txt '
        // style={{ background: item.status === 0 ? "#75718a" : "", color: item.status === 0 ? "#F2ECFF" : "" }}
        >

            {/* <td class='col-span-1'>{item.companyID}</td>
            <td class='col-span-2'>{item.name}</td>
            <td class='col-span-1'><img class='w-[60px] h-[60px]' src={item.logo}></img></td>
            <td class='col-span-2 break-words'>{item.email}</td>
            <td class='col-span-2 pl-md'>{item.phoneNumber}</td>
            <td class='col-span-1'>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</td>
         
            <td class='col-span-2'>

                <select class='bg-[#FFFF]' style={{ background: item.status === 0 ? "#75718a" : "" }} onChange={(e) => onChangeStatus(item.companyID, Number(e.target.value))}>
                    <option selected={item.status === 0 ? true : false} value={0} >Ngưng hoạt động</option>
                    <option selected={item.status === 1 ? true : false} value={1} >Hoạt động</option>
                </select>
            </td> */}

            <td class='col-span-1'>{item.billId}</td>
            <td class='col-span-1'>{item.busNumber}</td>
            <td class='col-span-2'>{item.fullName}</td>
            <td class='col-span-2'>{item.email}</td>
            <td class='col-span-1 text-center'>{item.dateCreate.getDate()}/{item.dateCreate.getMonth() + 1}/{item.dateCreate.getFullYear()}</td>
            <td class='col-span-2 text-center'>{seat}</td>
            <td class='col-span-2'>
                <select 
                        className={`rounded-lg p-[5px] ${item.status === 0 ? 'bg-danger' : item.status === 1 ? 'bg-success' : item.status === 2 ? "bg-warning" : ""}`}  style={{ background: item.status === 0 ? "#75718a" : "" }} onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}>
                        <option className="bg-danger" selected={item.status === 0 ? true : false} value={0} >Đã hủy</option>
                        <option className="bg-success" selected={item.status === 1 ? true : false} value={1} >Đã hoàn thành</option>
                        <option className="bg-warning" selected={item.status === 2 ? true : false} value={2} >Chờ xác nhận</option>
                </select>       
            </td>

            {
                <td class='col-span-1'>
                    <PopUpShowDetail items={item} orderProps={orderProps} />

                    {/* <PopupUpdate item={itemUpdate} status={item.status} onChange={updateItemValue} updateTypeBus={updateTypeBus} success={success} /> */}
                </td>
            }
        </tr >
    );
}

export default OrderRow;