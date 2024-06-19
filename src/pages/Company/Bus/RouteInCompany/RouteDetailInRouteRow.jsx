import { Checkbox } from "antd";

const RouteDetailInRouteRow = ({ item, selectedList, totalItem, changeSelectedList }) => {
    return (
        <tr class='grid grid-cols-12 p-sm py-lg items-center border-collapse border-t-[1px] border-border-top'
        >
            <Checkbox onChange={() => changeSelectedList(item.id)} disabled={item.indexStation === 1 || item.indexStation === totalItem} checked={selectedList.includes(item.id) ? true : false}></Checkbox>
            <td class='col-span-1 col-start-2 '>{item.indexStation}</td>
            <td class='col-span-2'>{item.busStationName}</td>
            {
                item.indexStation === 1 ?
                    <td class='col-span-2'></td>
                    :
                    <td class='col-span-2'>{item.arrivalTime}</td>
            }
            {
                item.indexStation === totalItem ?
                    <td class='col-span-2' ></td> :
                    <td class='col-span-2' >{item.departureTime}</td>
            }
            <td class='col-span-2'>{item.discountPrice} %</td>
            <td class='col-span-2'> {
                item.addDay
            }</td>
        </tr >
    );
}

export default RouteDetailInRouteRow;