import { Col, Row } from 'antd';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CardTotalAccount from '../../components/Layout/Components/DashBoard/Cards/admin/CardToltalAccount';
import CardTotalCompany from '../../components/Layout/Components/DashBoard/Cards/admin/CardTotalCompany';
import BusTypeChartAdmin from '../../components/Layout/Components/DashBoard/Charts/admin/ChartBusType';
import ChartBusStation from '../../components/Layout/Components/DashBoard/Charts/admin/ChartBusStation';

const DashBoard = () => {

    return (
        <div className='w-full h-full'>
            <div className='w-full text-txt txt-16 bg-bg py-[20px] px-[10px] rounded-md box-shadow-content mb-md min-h-[1000px]'>
                <Row className='w-full'>
                    <Col offset={1} span={10}>
                        <CardTotalAccount></CardTotalAccount>
                    </Col>
                    <Col offset={1} span={10}>
                        <CardTotalCompany></CardTotalCompany>
                    </Col>
                </Row>
                <Row className='w-full my-[40px]'>
                    <Col span={12} className=''>
                        <BusTypeChartAdmin />
                    </Col>
                    <Col span={12} className=''>
                        <ChartBusStation />
                    </Col>
                </Row>
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
        </div >
    );
};

export default DashBoard;
