import { Empty, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis, CartesianGrid, LabelList, Label } from "recharts";

const BusTypeChartAdmin = () => {
    const [data, setData] = useState([
        {
            "name": "Xe 22 chỗ",
            "value": 1000,
        },

        {
            "name": "Xe 33 chỗ",
            "value": 4000,
        },
        {
            "name": "Xe 44 chỗ",
            "value": 3000,
        },
        {
            "name": "Xe 44 chỗ",
            "value": 1000,
        },
        {
            "name": "Xe 66 chỗ",
            "value": 3000,
        },

    ])
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        try {
            // call api ở đây
            setData([
                {
                    "name": "Xe 22 chỗ",
                    "value": 1000,
                },

                {
                    "name": "Xe 33 chỗ",
                    "value": 4000,
                },
                {
                    "name": "Xe 44 chỗ",
                    "value": 3000,
                },
                {
                    "name": "Xe 44 chỗ",
                    "value": 1000,
                },
                {
                    "name": "Xe 66 chỗ",
                    "value": 3000,
                },

            ])
            // setData([])
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
                            <XAxis dataKey="name">
                            </XAxis>
                            <YAxis label={{ value: 'Xe', angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value) => `${value} xe`} />
                            <Bar dataKey="value" fill={color} maxBarSize={40}>

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