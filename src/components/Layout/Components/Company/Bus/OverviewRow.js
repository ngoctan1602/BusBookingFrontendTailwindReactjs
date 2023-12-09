
import { useNavigate } from "react-router-dom";
const OverviewRow = ({ item }) => {
    const navigate = useNavigate();
    return (

        <tr class='grid grid-cols-12 p-sm border-t-[1px] border-txt gap-md '>

            <td class='col-span-2'>{item.id}</td>
            <td class='col-span-2'>{item.busNumber}</td>
            <td class='col-span-3'>{item.busType}</td>
            <td class='col-span-2'>{item.totalSeat}</td>
            <td class='col-span-2'>
                <select class='bg-[#e1e1e1]' style={{ background: item.status === 0 ? "#75718a" : "" }} >
                    <option selected={item.status === 1 ? true : false} value={0} >Hoạt động</option>
                    <option selected={item.status === 0 ? true : false} value={1} >Ngưng hoạt động</option>

                </select>
            </td>

            {
                <td class='col-span-1 underline cursor-pointer hover:text-button'
                    onClick={() => navigate(`/company/bus/${item.id}`, { state: item })}>
                    Chi tiết
                </td>
            }
        </tr >
    );
}

export default OverviewRow;