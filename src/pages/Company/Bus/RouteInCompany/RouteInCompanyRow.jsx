import { Checkbox } from "antd";

const RowInCompany = ({ item, selectedList, changeSelectedList }) => {
    // console.log(item)
    // console.log(selectedList)
    return (
        <tr class='grid grid-cols-12 p-sm my-[10px] items-center'
        >
            {/* <td class='col-span-2'>{item.id}</td> */}
            <td class='col-span-2' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Checkbox onClick={() => changeSelectedList(item.id)} checked={selectedList.includes(item.id) ? true : false} ></Checkbox>
            </td>
            <td class='col-span-10'>{item.stationStartName} -{item.stationEndName}</td>
        </tr >
    );
}

export default RowInCompany;