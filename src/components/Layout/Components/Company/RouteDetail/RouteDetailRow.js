import PopUpShowDetail from "./PopupShowDetail";

const RouteDetailRow = ({ item }) => {

    return (
        <tr class='grid  grid-cols-12 p-sm my-[10px] items-center'

        >
            <td class='col-span-4'>{item.stationStartName} - {item.stationEndName}</td>
            <td class='col-span-3'>{item.stationStartName}</td>
            <td class='col-span-3'>{item.stationEndName}</td>
            <td class='col-span-1'>
                <PopUpShowDetail items={item.routeDetailResponses}></PopUpShowDetail>
            </td>

        </tr >
    );
}

export default RouteDetailRow;