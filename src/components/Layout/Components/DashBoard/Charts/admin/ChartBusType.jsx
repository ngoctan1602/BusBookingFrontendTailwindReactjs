import { Empty, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis, CartesianGrid, LabelList, Label } from "recharts";
import * as BusTypeService from "../../../../../../services/TypeBusServices"

const BusTypeChartAdmin = () => {
    const [data, setData] = useState([
       
    ])
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        try {
            // call api ở đây
            const resp = await BusTypeService.statisticalByAdmin();
            if (resp.isError !== undefined && resp.isError === false )
            {
                setData(resp.data);
            }
            else
                setData([]);
        } catch (error) {

        }
    }
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const [color, setColor] = useState("");
    useEffect(() => {
        setColor(() => getRandomColor())
        fetchData()
    }, [])

    return (
        <div className="w-full min-h-[486px]  rounded-sm">
            <p className='w-full font-[500] text-center uppercase'>Thống kê loại buýt</p>
            {
                loading ?
                    <Skeleton active />
                    :
                    !loading && data.length > 0 ?
                        <BarChart
                            width={450}
                            // className="w-full"
                            height={480}
                            data={data}
                            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                        >
                            <XAxis dataKey="TotalSeats">
                            </XAxis>
                            <YAxis label={{ value: 'Xe', angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value) => `${value} xe`} />
                            <Bar dataKey="Total" fill={color} maxBarSize={40}>

                            </Bar>
                        </BarChart>
                        :
                        <Empty description="Không có dữ liệu" className="w-full h-[250px]">

                        </Empty>
            }
        </div>
    );
}

export default BusTypeChartAdmin;