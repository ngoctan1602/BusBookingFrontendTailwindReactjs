import { duration, easing } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
const ChartVenueYear = () => {

    const y2022Data = [0, 1, 2, 3, 3, 2, 1, 4, 5, 6, 6, 5, 4];
    const y2023Data = [0, 3, 2, 1, 10, 11, 1, 4, 5, 6, 6, 5, 4];
    const y2024Data = [0, 10, 9, 8, 7, 5, 6, 4, 5, 6, 3, 2, 1];
    const xLabels = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
    ];

    return (
        <div className='box-shadow' >
            <p className='w-full text-center ' style={{ fontWeight: "500", fontSize: 20 }}>Thống kê doanh thu 3 năm gần nhất</p>
            <LineChart
                width={600}
                height={400}
                series={[
                    { data: y2023Data, label: '2023', curve: "catmullRom", showMark: false, },
                    { data: y2024Data, label: '2024', curve: "catmullRom", showMark: false },
                    { data: y2022Data, label: '2022', curve: "catmullRom", showMark: false }
                ]}
                animation={{
                    duration: 3000,
                    easing: "easeOut"
                }}
                xAxis={[{
                    scaleType: 'point', data: xLabels, label: 'Tháng',

                }]}
                yAxis={[{ label: 'VND (tỷ)' }]}

            />
        </div>
    );
}


export default ChartVenueYear;