import { useState } from "react";

const CheckBusStationRow = ({ item, onUpdate }) => {

    // const updateCheck = (name, value) => {
    //     onUpdate(name, value);
    // }
    return (
        <tr class='grid  grid-cols-12 p-sm'
            style={{ background: item.status === 0 ? "#75718a" : "", color: item.status === 0 ? "#F2ECFF" : "" }}
        >
            <td>
                <input className="w-[20px] h-[20px]"
                    type="checkbox" name="check"
                    //  value={item.id}
                    //   onClick={() => updateCheck(nameRadio, item.id)} checked={item.id === objectAdd[nameRadio] ? true : false}
                    onClick={(e) => onUpdate(e, item.id, item = {
                        BusStationId: item.id,
                        NameBusStation: item.name,
                        IndexStation: 0,
                        ArrivalTime: '00:00:00',
                        DepartureTime: '00:00:00',
                        AddDay: 0,
                        DiscountPrice: 0
                    })}
                >

                </input>
            </td>
            {/* <td class='col-span-1'>{item.id}</td> */}
            <td class='col-span-4'>{item.name}</td>
            {/* <td class='col-span-3'>{item.description}</td> */}

            <td class='col-span-5'>
                {item.addressDb}
            </td>

        </tr >
    );
}

export default CheckBusStationRow;