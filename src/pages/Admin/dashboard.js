import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    BarElement,
    LinearScale,
    PointElement,
    Legend,
    ArcElement,
    Tooltip
} from 'chart.js'

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Tooltip,
    Legend
)
const DashBoard = () => {
    const data = {
        labels: ['Khách hàng', 'Nhà xe'],
        datasets: [
            {
                label: 'Thống kê tài khoản thiết lập',
                backgroundColor: ['red', 'blue'],
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [20, 30],
            },
        ],
    };

    const options = {
        scales: {
            x: {
                categoryPercentage: 0.2, // Thiết lập chiều rộng của cột (80% của khoảng trục x)
                barPercentage: 0.2,
                grid: {
                    display: false, // Ẩn đường viền trục x
                },
                ticks: {
                    display: true, // Hiển thị nhãn trục x

                },
            },
            y: {

                grid: {
                    display: false, // Ẩn đường viền trục y
                },
                ticks: {
                    display: true, // Hiển thị nhãn trục y

                },
            },
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart',
        },
        legend: {
            display: true,
            position: 'top',
        },
        indexAxis: 'y',

    };

    const option1 = {

        plugins: {
            legend: {
                position: 'left', // Hiển thị hình chữ U ở bên phải
            },
            cutoutPercentage: 50,
        },
        rotation: -Math.PI, // Đặt góc quay để nhãn nằm bên phải
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart',
        },
        legend: {
            display: true,
            position: 'end',
        },


    };

    const top5TypeBus = {
        labels: ['Xe 12 chỗ', 'Xe 20 chỗ', 'Xe 32 chỗ', 'Xe 46 chỗ', 'Xe 36 chỗ'],
        datasets: [
            {
                label: 'Thống kê loại xe được sử dụng',
                backgroundColor: ['red', 'blue', 'orange', 'yellow', 'pink'],
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [20, 30, 40, 50, 10],
            },
        ],
    };



    return (
        <div className='w-full h-full grid grid-cols-12 grid-rows-12 gap-xl'>
            <div className=''>
            </div>

        </div>
    );
};

export default DashBoard;
