import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Sector } from 'recharts';
import * as BillServices from '../../../../../services/BillServices';
import { Empty, Skeleton } from 'antd';

// Dummy data if needed
const data = [
    { name: 'Hà Nội - Gia Lai', value: 10, fill: '#8884d8' },
    { name: 'Phú Thọ - Yên Bái', value: 20, fill: '#83a6ed' },
    { name: 'Nha Trang - Sài Gòn', value: 30, fill: '#8dd1e1' },
    { name: 'Huế - Hà Nội', value: 20, fill: '#82ca9d' },
    { name: 'Quảng Ninh - Hải Phòng', value: 10, fill: '#a4de6c' },
    { name: 'Còn lại', value: 10, fill: '#77DD77' },
];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={-20} textAnchor="middle" fill={fill}>
                {/* <tspan x={cx} dy={0}>{payload.name}</tspan> */}
                <tspan x={cx} dy={20}>{`Tổng cộng ${value} lượt`}</tspan>
                <tspan x={cx} dy={20}>{`(Tổng ${(percent * 100).toFixed(2)}%)`}</tspan>
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
        </g>
    );
};

const Example = () => {
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [dataSet, setDataSet] = useState([]);
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const resp = await BillServices.TopRoute();
            if (!resp.isError) {
                let newDatas = resp.data.map((item) => ({
                    name: `${item.StationStart} - ${item.StationEnd}`,
                    value: item.TOTAL,
                    fill: getRandomColor(),
                }));
                setDataSet(newDatas);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <div className="bg-bgContent rounded-md" style={{ width: 450, height: 486, overflow: 'visible', boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
            <p className='w-full text-center' style={{ fontWeight: "500", fontSize: 20 }}>Top 5 chuyến đi phổ biến nhất</p>
            {
                loading &&
                <div className='w-full max-h-[400px] overflow-hidden'>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </div>
            }
            {!loading && dataSet.length > 0 && (
                <PieChart width={450} height={400}>
                    <style>{`
                        .recharts-wrapper .recharts-pie-sector {
                            outline: none;
                            cursor: pointer;
                        }
                    `}</style>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={dataSet}
                        animationBegin={0}
                        animationDuration={800}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={100}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                    <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                </PieChart>
            )}

            {!loading && dataSet.length === 0 && (
                <Empty className='w-full h-[400px]' description="Không có dữ liệu"></Empty>
            )}
        </div>
    );
};

export default Example;
