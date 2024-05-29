
import { useNavigate } from "react-router-dom";
const ManageTicketRow = ({ item, onChangeStatus }) => {
    const navigate = useNavigate();

    return (

        <tr class='grid grid-cols-12 p-sm my-[10px] items-center '
        >
            <td class='col-span-2'>{item.busNumber}</td>
            <td class='col-span-3'>{item.busType}</td>
            <td class='col-span-2'>{new Date(item.date).toLocaleString()}</td>
            <td class='col-span-2'>{item.totalEmptySeat}</td>


            <td class='col-span-2'>
            <select 
                    className={`rounded-lg p-[5px] ${item.status === 0 ? 'bg-danger' : item.status === 7 ? 'bg-success' : item.status === 1 ? "bg-warning" : ""}`}  style={{ background: item.status === 0 ? "#75718a" : "" }} onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}>
                    <option className="bg-warning" selected={item.status === 1 ? true : false} value={1} >Chờ xuất bến</option>
                    <option className="bg-danger" selected={item.status === 0 ? true : false} value={0} >Hủy</option>
                    <option className="bg-success" selected={item.status === 7 ? true : false} value={7} >Đã hoàn thành</option>

                </select>       

            </td>



        </tr >
    );
}

export default ManageTicketRow;