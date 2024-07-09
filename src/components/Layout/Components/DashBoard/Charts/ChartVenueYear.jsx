import { duration, easing } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import * as BillService from '../../../../../services/BillServices';
import { useEffect, useState } from 'react';
import { Empty, Skeleton } from 'antd';
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
    // const [xLabels, setXlabel] = useState([])
    const daysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    }

    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     let [year, month] = selectedMonth.split('-');
    //     let a = daysInMonth(year, month)
    //     let array = Array.from({ length: a }, (v, k) => k + 1);
    //     setXlabel(array)
    // }, [selectedMonth]);
    useEffect(() => {
        fetchData();
    }, [selectedMonth])
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await BillService.statistical({ dateOnly: selectedMonth });
            if (response.isError !== undefined && !response.isError) {
                setDataset(() => handleData(response.data))
            }
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
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
        // console.log(resp.slice(0, xLabels.length));
        // console.log(xLabels.length);
        // console.log(xLabels);
        // return resp.slice(0, xLabels.length);
    }
    const checkValue = () => {
        for (let i = 0; i < dataset.length; i++) {
            if (dataset[i] !== 0)
                return true
        }
        return false;
    }
    return (
        <div className='bg-bgContent rounded-md w-full' style={{ boxShadow: " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
            <p className='w-full text-center ' style={{ fontWeight: "500", fontSize: 20 }}>Thống kê doanh thu theo tháng</p>
            <div className='w-full m-sm flex items-center justify-center'>

                <input type="month" class="w-[66%] rounded-md border border-solid border-button p-sm"
                    value={selectedMonth} onChange={(e) => onChangeMonth(e.target.value)} />
            </div>
            {
                loading &&
                <div className='max-h-[400px] overflow-hidden'>

                    <Skeleton active>

                    </Skeleton>
                    <Skeleton active>

                    </Skeleton>

                    <Skeleton active>

                    </Skeleton>
                    <Skeleton active>

                    </Skeleton>
                </div>
            }
            {
                !loading && checkValue() &&

                < LineChart
                    width={450}
                    height={400}
                    sx={{ padding: '5px' }}
                    series={[
                        { data: dataset, label: 'Doanh thu (Trăm triệu)', curve: "catmullRom", showMark: false },
                    ]}
                    animation={{
                        duration: 3000,
                        easing: "easeOut"
                    }}
                    xAxis={[{
                        scaleType: 'point', data: xLabels, label: 'Ngày',
                        tickInterval: xLabels.filter((_, index) => index % 5 === 0)
                    }]}
                    yAxis={[{ min: 0, tickLabelPlacement: "middle" }]}

                />
            }

            {
                !loading && !checkValue() &&
                <Empty className='h-[400px]' description="Chưa có doanh thu trong tháng" />
            }
        </div>
    );
}


export default ChartVenueYear;