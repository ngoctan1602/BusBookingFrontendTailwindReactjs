import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography, Box, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { Select } from 'antd';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = [
    { month: 1, location: 'Location A', type: 'dropoff', count: 350 },
    { month: 1, location: 'Location B', type: 'pickup', count: 250 },
    { month: 2, location: 'Location B', type: 'dropoff', count: 350 },
    { month: 2, location: 'Location C', type: 'pickup', count: 250 },
    { month: 3, location: 'Location A', type: 'dropoff', count: 350 },
    { month: 3, location: 'Location B', type: 'pickup', count: 250 },
    { month: 4, location: 'Location B', type: 'dropoff', count: 350 },
    { month: 4, location: 'Location C', type: 'pickup', count: 250 },
    { month: 5, location: 'Location A', type: 'dropoff', count: 350 },
    { month: 5, location: 'Location B', type: 'pickup', count: 250 },
    { month: 6, location: 'Location B', type: 'dropoff', count: 350 },
    { month: 6, location: 'Location C', type: 'pickup', count: 250 },
    { month: 7, location: 'Location B', type: 'dropoff', count: 350 },
    { month: 7, location: 'Location C', type: 'pickup', count: 250 },
    { month: 8, location: 'Location B', type: 'dropoff', count: 350 },
    { month: 8, location: 'Location C', type: 'pickup', count: 250 },
    { month: 9, location: 'Location B', type: 'dropoff', count: 350 },
    { month: 9, location: 'Location C', type: 'pickup', count: 250 },
    { month: 10, location: 'Location B', type: 'dropoff', count: 350 },
    { month: 10, location: 'Location C', type: 'pickup', count: 250 },
    { month: 11, location: 'Location B', type: 'dropoff', count: 350 },
    { month: 11, location: 'Location C', type: 'pickup', count: 250 },
    { month: 12, location: 'Location B', type: 'dropoff', count: 350 },
    { month: 12, location: 'Location C', type: 'pickup', count: 250 },
    // Add other data points here
];

// Tính tổng số điểm đón và trả cho mỗi tháng
const monthlyData = {};
data.forEach(item => {
    const key = `Tháng ${item.month}`;
    if (!monthlyData[key]) {
        monthlyData[key] = { pickup: 0, dropoff: 0, details: [] };
    }
    monthlyData[key][item.type] += item.count;
    monthlyData[key].details.push({ location: item.location, type: item.type, count: item.count });
});

const chartData = {
    labels: Object.keys(monthlyData),
    datasets: [
        {
            label: 'Điểm đón',
            data: Object.values(monthlyData).map(monthData => monthData.pickup),
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red color
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
        {
            label: 'Điểm trả',
            data: Object.values(monthlyData).map(monthData => monthData.dropoff),
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Điểm đón trả nổi bật',
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    const details = monthlyData[context.label].details;
                    return details.map(detail => `${detail.location}: ${detail.count}`).join('\n');
                }
            }
        }
    },
};

// Styled Card Component
const StyledCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#f9f9f9',
}));


const ChartBusStop = () => {

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        years.push(year);
    }

    return (
        <StyledCard>
            <CardContent>
                <Box mb={2}>
                    <Typography variant="h5" component="div" gutterBottom>
                        Thống kê điểm đón trả nổi bật theo năm
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                    <Box>
                        <Select style={{ width: 500 }}
                        //  value={selectedYear} 
                        //  onChange={handleYearChange}
                        >

                            {
                                years.map((year) => (
                                    <MenuItem value={year}>
                                        {year}
                                    </MenuItem>)
                                )
                            }

                        </Select>
                    </Box>
                </Box>
                <Box height={400}>
                    <Bar width={700} data={chartData} options={options} />
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default ChartBusStop;



