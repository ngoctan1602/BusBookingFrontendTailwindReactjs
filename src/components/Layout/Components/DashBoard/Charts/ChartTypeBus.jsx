import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { styled } from '@mui/system';
import { Card, CardContent, Typography, Box, MenuItem } from '@mui/material';
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
    const dataset = [
        {
            value: 20,
            name: 'Xe hạng A',
        },
        {
            value: 20,
            name: 'Xe hạng B',
        },
        {
            value: 30,
            name: 'Xe hạng c',
        },
        {
            value: 40,
            name: 'Xe hạng D',
        },
        {
            value: 50,
            name: 'Xe hạng E',
        },

    ];
    const valueFormatter = (value) => `${value} chiếc`;
    return (
        <StyledCard>
            <CardContent>
                <BarChart
                    dataset={dataset}
                    yAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                    series={[{ dataKey: 'value', label: 'Thống kê loại xe', valueFormatter }]}
                    layout="horizontal"
                    {...chartSetting}
                />
            </CardContent>
        </StyledCard>
    );
}






