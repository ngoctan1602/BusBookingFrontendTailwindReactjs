
import { useNavigate } from "react-router-dom";
const ManageTicketRow = ({ item, onChangeStatus }) => {
    const navigate = useNavigate();

    return (
        <>
            {
                item !== undefined && item !== null
                &&

                <tr class='grid grid-cols-12 p-sm py-lg  border-collapse border-t-[1px] border-border-top'
                >
                    <td class='col-span-2'>{item.busNumber}</td>
                    <td class='col-span-2'>
                        <p> {item.listStation[0].station} - 
                        </p>
                        
                        <p>
                        {item.listStation[item.listStation.length - 1].station}
                        </p></td>
                    <td class='col-span-3'>{item.busType}</td>
                    <td class='col-span-2'>{new Date(item.date).toLocaleString()}</td>
                    <td class='col-span-1'>{item.totalEmptySeat}</td>
                    <td class='col-span-2'>
                        <select
                            className={`rounded-lg p-[5px] ${item.status === 0 ? 'bg-danger text-txt-light' : item.status === 7 ? 'bg-success' : item.status === 1 ? "bg-warning" : ""}`}  onChange={(e) => onChangeStatus(item.id, Number(e.target.value))}>
                            <option className="bg-warning" selected={item.status === 1 ? true : false} value={1} >Chờ xuất bến</option>
                            <option className="bg-danger" selected={item.status === 0 ? true : false} value={0} >Hủy</option>
                            <option className="bg-success" selected={item.status === 7 ? true : false} value={7} >Đã hoàn thành</option>

                        </select>

                    </td>

                </tr >

            }
        </>
    );
}

export default ManageTicketRow;