
import PopUpShowDetail from "./PopupShowDetail";
import avatar from "../../../../../../src/assets/images/avatar.png"
import { Tooltip } from "antd";

const CompanyRow = ({ item, onChangeStatus, onUpdate }) => {

    const companyProps = [

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
            name: "introduction",
            content: "Giới thiệu:"
        }
    ]
    return (
        <tr class='grid grid-cols-12 p-sm  border-txt my-[10px]'
        >
            <td class='col-span-3 truncate'>
                <Tooltip class='col-span-2 ' title={item.name}>
                    <p class='col-span-2 truncate'>{item.name}</p>
                </Tooltip>
            </td>
            <td class='col-span-2'><img class='w-[60px] h-[60px]' src={item.logo ? item.logo : avatar}></img></td>
            <td class='col-span-2 truncate'>
                <Tooltip class='col-span-2 ' title={item.email}>
                    <p class='col-span-2 truncate'>{item.email}</p>
                </Tooltip>
            </td>
            <td class='col-span-2 pl-md truncate'>
                <Tooltip class='col-span-2 ' title={item.phoneNumber}>
                    <p class='col-span-2 truncate'>{item.phoneNumber}</p>
                </Tooltip>
            </td>
            <td className='col-span-2'>
                <select
                    className={`rounded-lg p-[5px] ${item.status === 0 ? 'bg-danger' : item.status === 1 ? 'bg-success' : item.status === 4 ? "bg-disable" : ""}`}
                    value={item.status} // Sử dụng value để xác định option được chọn
                    onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}
                >
                    <option className="bg-danger" value={0}>Ngưng hoạt động</option>
                    <option className="bg-disable" value={4}>Khoá</option>
                    <option className="bg-success" value={1}>Hoạt động</option>
                </select>
            </td>

            {
                <td class='col-span-1'>
                    <PopUpShowDetail items={item} companyProps={companyProps} />
                </td>
            }
        </tr >
    );
}

export default CompanyRow;