import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { styled } from '@mui/system';
import { Card, CardContent, Typography, Box, MenuItem } from '@mui/material';
import * as BusTypeService from '../../../../../services/TypeBusServices';
import { useEffect } from 'react';
// Styled Card Component
const StyledCard = styled(Card)(({ theme }) => ({
    // margin: theme.spacing(2),
    // padding: theme.spacing(2),
    backgroundColor: '#f9f9f9',
}));


export default function ChartBusType() {
    const chartSetting = {
        xAxis: [
            {
                label: 'Xe (trăm chiếc) ',
            },
        ],
        // width: 800,
        // padding: { top: 20, right: 50, bottom: 20, left: 100 },
        margin: { left: 100 },
        height: 300,
    };

    const [dataset, setDataset] = React.useState([])

    const data = [
        {
            "id": 3,
            "name": "Xe 16 chỗ",
            "description": "16 chỗ",
            "totalSeats": 16,
            "status": 1,
            "totalBus": 0
        },
        {
            "id": 2,
            "name": "Xe giường nằm 48",
            "description": "Xe 48 chỗ",
            "totalSeats": 48,
            "status": 1,
            "totalBus": 0
        },
        {
            "id": 1,
            "name": "Xe giường nằm 40 chỗ",
            "description": "Xe giường nằm 40 chỗ",
            "totalSeats": 40,
            "status": 1,
            "totalBus": 3
        }]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BusTypeService.statistical();
                if (response.isError !== undefined && !response.isError) {
                    setDataset(response.data)
                }
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const valueFormatter = (value) => `${value} chiếc`;

    return (
        <StyledCard>
            <CardContent>
                <BarChart
                    dataset={dataset}
                    yAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                    series={[{ dataKey: 'totalBus', label: 'Thống kê loại xe', valueFormatter }]}
                    layout="horizontal"
                    {...chartSetting}
                />
            </CardContent>
        </StyledCard>
    );
}






