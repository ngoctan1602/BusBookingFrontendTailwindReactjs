import PopUpShowDetail from "./PopupShowDetail";

const RouteDetailRow = ({ item }) => {

    return (
        <tr class='grid grid-cols-12 p-sm py-lg items-center border-collapse border-t-[1px] border-border-top'>
            <td class='col-span-5'>{item.stationStartName} - {item.stationEndName}</td>
            <td class='col-span-3'>{item.stationStartName}</td>
            <td class='col-span-3'>{item.stationEndName}</td>
            <td class='col-span-1'>
                <PopUpShowDetail items={item.routeDetailResponses}></PopUpShowDetail>
            </td>

        </tr >
    );
}

export default RouteDetailRow;