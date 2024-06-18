const RouteDetailInRouteRow = ({ item, onChangeStatus, onUpdate, fecthData }) => {
    return (
        <tr class='grid grid-cols-12 p-sm py-lg items-center border-collapse border-t-[1px] border-border-top'

        >
            <td class='col-span-1 col-start-2 '>{item.indexStation}</td>
            <td class='col-span-2'>{item.busStationName}</td>
            <td class='col-span-2'>{item.arrivalTime}</td>
            <td class='col-span-2'>{item.departureTime}</td>
            <td class='col-span-2'>{item.discountPrice}</td>
            <td class='col-span-2'> {
                item.addDay
            }</td>
        </tr >
    );
}

export default RouteDetailInRouteRow;