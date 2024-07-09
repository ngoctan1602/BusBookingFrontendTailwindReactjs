import { duration, easing } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import * as BillService from '../../../../../services/BillServices';
import { useEffect, useState } from 'react';
const ChartVenueYear = () => {

    const [dataset, setDataset] = useState([])

    const y2022Data = [0, 1, 2, 3, 3, 2, 1, 4, 5, 6, 6, 5, 4];
    const y2023Data = [0, 3, 2, 1, 10, 11, 1, 4, 5, 6, 6, 5, 4];
    const y2024Data = [0, 10, 9, 8, 7, 5, 6, 4, 5, 6, 3, 2, 1];
    const xLabels = [
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
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
    ];
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedMonth]);

    const fetchData = async () => {
        try {
            const response = await BillService.statistical({dateOnly: selectedMonth});
            if (response.isError !== undefined && !response.isError) {
                setDataset(() => handleData(response.data))
            }
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const onChangeMonth = async (month) => {
        setSelectedMonth(month)
        // fetchData()
        //Gọi api 
    }

    const handleData = (data) => {
        return data.map(item => item.TotalPrice)
    }
    return (
        <div className='bg-bgContent rounded-md w-full' style={{ boxShadow: " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
            <input type="month" class="col-span-2 rounded-md border border-solid border-button p-sm"
                        value={selectedMonth} onChange={(e) => onChangeMonth(e.target.value)} />
            <p className='w-full text-center ' style={{ fontWeight: "500", fontSize: 20 }}>Thống kê doanh thu 3 năm gần nhất</p>
            <LineChart
                width={450}
                height={400}
                series={[
                    { data: dataset, label: '2024', curve: "catmullRom", showMark: false },
                ]}
                animation={{
                    duration: 3000,
                    easing: "easeOut"
                }}
                xAxis={[{
                    scaleType: 'point', data: xLabels, label: 'Ngày',

                }]}
                yAxis={[{ label: 'trăm triệu VND' }]}

            />
        </div>
    );
}


export default ChartVenueYear;