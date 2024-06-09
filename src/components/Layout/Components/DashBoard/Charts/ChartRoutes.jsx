

import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, ResponsiveContainer, Sector } from 'recharts';
// call api => set data ở đây
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
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                <tspan x={cx} dy={0}>{payload.name}</tspan>
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
            {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" /> */}
            {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
            {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Tổng cộng ${value} lượt`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Tổng ${(percent * 100).toFixed(2)}%)`}
            </text> */}
        </g>
    );
};

export default class Example extends PureComponent {
    state = {
        activeIndex: 0,
    };

    onPieEnter = (_, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    render() {
        return (
            <div width={700} height={400} className="box-shadow" style={{ overflow: 'visible' }}>
                <p className='w-full text-center' style={{ fontWeight: "500", fontSize: 20 }}>Top 5 chuyến đi phổ biến nhất</p>
                <PieChart width={600} height={400} >
                    <style>{`
                    .recharts-wrapper .recharts-pie-sector {
                        outline: none;
                        cursor:pointer;
                    }
                `}</style>
                    <Pie
                        activeIndex={this.state.activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        animationBegin={0}
                        animationDuration={800}
                        cx="50%"
                        cy="50%"
                        innerRadius={120}
                        outerRadius={160}
                        dataKey="value"
                        onMouseEnter={this.onPieEnter}
                    />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                    // wrapperStyle={{
                    //     right: 20,
                    //     // top: 0,
                    //     bottom: 30,
                    //     lineHeight: '24px',
                    // }}
                    />

                </PieChart>

            </div>
        );
    }
}

