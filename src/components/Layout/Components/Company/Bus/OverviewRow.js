
import { useNavigate } from "react-router-dom";
const OverviewRow = ({ item, onChangeStatus }) => {
    const navigate = useNavigate();

    return (

        <tr class='grid grid-cols-12 p-sm border-t-[1px] border-txt gap-md '
            style={{ background: item.status === 3 ? "#75718a" : "" }}
        >

            {/* <td class='col-span-2'>{item.id}</td> */}
            <td class='col-span-3'>{item.busNumber}</td>
            <td class='col-span-3'>{item.busType}</td>
            <td class='col-span-2'>{item.totalSeat}</td>
            <td class='col-span-2'>
                <select class='bg-[#e1e1e1] outline-none'
                    style={{ background: item.status === 3 ? "#75718a" : "" }}
                    onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}
                >
                    <option selected={item.status === 1 ? true : false} value={1} >Hoạt động</option>
                    <option selected={item.status === 3 ? true : false} value={3} >Ngưng hoạt động</option>

                </select>
            </td>

            {
                <td class='col-span-1 col-start-12 underline cursor-pointer hover:text-button'
                    onClick={() => navigate(`/company/bus/${item.id}`, { state: item })}>
                    Chi tiết
                </td>
            }
        </tr >
    );
}

export default OverviewRow;