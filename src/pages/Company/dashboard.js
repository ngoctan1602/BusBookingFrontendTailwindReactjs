import React, { useEffect, useState } from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import * as billServices from "../../services/BillServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import {
    Chart as ChartJS,
    CategoryScale,
    BarElement,
    LinearScale,
    PointElement,
    Legend,
    ArcElement,
    Tooltip,
    LineElement
} from 'chart.js'

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Tooltip,
    Legend
)
const notifyWarning = (message) => toast.warning(message, {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
});

const DashBoardCompany = () => {
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Tháng",
                    position: "start",
                },
                grid: {
                    display: false, // Ẩn đường viền trục x
                },
                ticks: {
                    display: true, // Hiển thị nhãn trục x

                },
            },
            y: {
                title: {
                    display: true,
                    text: "Đồng",
                },
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
        indexAxis: 'x',

    };

    const [totalRevenue, setTotalRevenue] = useState([]);
    const a = Array.from({ length: 12 }, (_, index) => index + 1);
    const arrayMonth = Array.from({ length: 12 }, (_, index) => index + 1);
    const [c, setC] = useState(Array(12).fill(0));
    const [loading, setLoading] = useState(false);
    const fetchData = async (year) => {
        setLoading(true)
        try {
            const resp = await billServices.getRevenueStatistics({ year: year });
            setLoading(false)
            if (!resp.isError) {
                const e = resp.data.map((item) => item.month);
                const f = resp.data.map((item) => item.totalRevenue);
                const updatedC = arrayMonth.map((value, index) => (e.includes(value) ? f[e.indexOf(value)] : c[index]));
                setTotalRevenue(updatedC);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const [year, setYear] = useState(new Date().getFullYear())
    useEffect((data) => {
        fetchData(data);
    }, []);

    const data = {
        labels: arrayMonth,
        datasets: [
            {
                label: 'Thống kê doanh thu',
                backgroundColor: ['red', 'blue'],
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: totalRevenue.length > 0 ? totalRevenue : []
            },
        ],
    };

    const [option, setOption] = useState([
        {
            content: "Thống kê theo năm"
        },
        {
            content: "Thống kê theo quý"
        },
        {
            content: "Thống kê theo tháng"
        }
    ])
    const [error, setError] = useState(false)
    const handleBlur = (value) => {
        if (value > 2100 || value < 2017) {
            setError(true);
            notifyWarning("Năm nhập vào phải lớn hơn 2017 và nhỏ hơn 2100")
        }
        else {
            setError(false)
            setYear(value)
        }
    }
    const handleFind = () => {
        setC(Array(12).fill(0))
        fetchData(year)
    }

    return (
        <div className='w-full h-full grid grid-cols-12 grid-rows-12 gap-xl relative'>


            <div className='col-span-12 grid grid-cols-12 grid-flow-row h-[100px]'>
                <select className='col-start-4 col-span-6 p-sm bg-bgPopup outline-none shadow-lg'>
                    {
                        option.map(item => (
                            <option value={item.content}>
                                {item.content}
                            </option>
                        )
                        )
                    }
                </select>
                <input placeholder='Nhập năm' type='number' min={2017} max={2100}
                    className='col-start-4 col-span-3 p-sm my-sm rounded-md'
                    onBlur={(e) => handleBlur(e.target.value)}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    style={{ border: error ? "1px solid red" : "" }}
                ></input>
                <button
                    onClick={handleFind}
                    className='col-start-8 col-span-2 p-sm my-sm border-button border-[1px] rounded-md
                hover:bg-button hover:text-bg ease-in-out duration-300
                
                '>
                    Tìm kiếm
                </button>
            </div>
            <div className='col-start-2 col-span-10 bg-bgPopup shadow-lg rounded-md min-h-[500px] relative'>

                {

                    loading ?
                        <div class='absolute bg-hover-txt w-[100%] h-full z-20 opacity-40'>
                            <ReactLoading
                                type="spinningBubbles" color="#e1e1e1"
                                height={'10%'} width={'10%'}
                                className="absolute left-[50%] top-[40%]  "
                            />
                        </div>
                        :

                        !loading &&
                        data.labels.length > 0 && data.datasets[0].data.length > 0 &&
                        <Line data={data} options={options}></Line>
                }
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </div>
    );

};

export default DashBoardCompany;
