import React, { useState } from 'react';
import Paypal from '../../components/Paypal/Paypal';
import * as BillService from '../../services/BillServices';
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import purgeSpecificReducers from '../../store/purgeReducers';
import { useEffect } from 'react';
import CheckCheckout from '../../components/Layout/Components/Common/CheckCheckout';
import CurrencyFormat from 'react-currency-format';
import { Button, Col, Row } from 'antd';
// { Order, TotalPrice }
export default function Checkout() {
  let navigate = useNavigate();
  // console.log(Order, TotalPrice);
  const isCheckout = CheckCheckout();
  const Order = useSelector((state) => state.checkout)
  const TotalPrice = useSelector((state) => state.checkout.ToltalPrice)
  useEffect(
    () => {
      const checkState = () => {
        if (!isCheckout
        ) {
          notifyWarning(
            "Vui lòng chọn vé trước khi thanh toán"
          )
          setTimeout(
            () => {
              navigate("/search")
            }, [2000]
          )
        }

      }
      checkState();
    }, []
  )
  const notifySuccess = () => toast.success('Đặt chỗ thành công!', {
    position: "bottom-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notifyError = () => toast.error('Đặt chỗ thất bại', {
    position: "bottom-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const notifyWarning = (message) =>
    toast.warning(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [loading, setLoading] = useState(false)
  const [usePaypal, setUsePaypal] = useState(false);

  const paymentDirection = async (order) => {
    try {
      setLoading(true);
      const response = await BillService.paymentDirec(order);
      setLoading(false);
      if (!response.isError) {
        notifySuccess();
        purgeSpecificReducers(['checkout']);
        setTimeout(() => navigate("/"), 2000);
      }
      else {
        notifyWarning(response.data);
      }
      console.log(response);
    } catch (error) {
      notifyError();
      console.log(error);
    }
  }

  return (
    <div
      className='min-h-[300px] w-[60%] flex flex-col justify-start '>
      {/* {
        loading &&

        <div class='absolute  w-full h-[500px] z-20 opacity-40'>
          <ReactLoading
            type="spinningBubbles" color="black"
            height={'5%'} width={'5%'}
            className="absolute  left-1/2 top-[50%]  "
          />
        </div>
      } */}
      <h1 className="text-[50px] uppercase text-center p-[20px]">Thanh toán</h1>

      <div className="flex flex-row justify-between p-[20px] w-full ">
        <Col span={12} className="rounded-lg border border-rose-[500] p-[50px]">
          <h1 className="text-[30px] mb-[10px] text-center">Chọn phương thức thanh toán</h1>
          <div
            className='flex flex-wrap justify-between  min-w-[250px]'>
            <div className="p-[20px] min-w-[250px]">
              {
                usePaypal ? (
                  <>
                    <Paypal totalPrice={TotalPrice} order={Order} />
                  </>
                ) : (
                  <Button

                    onClick={() => {
                      setUsePaypal(true);
                    }}
                    disabled={!isCheckout ? true : false || loading ? true : false}
                    className='w-[250px]  button-hover text-16 text-txt place-items-center'
                  >
                    Thanh toán bằng paypal
                  </Button>
                )
              }
            </div>
            <div
              className='p-[20px] '>
              <Button
                loading={loading}
                className="w-[250px] button-hover text-16 text-txt place-items-center"
                onClick={() => paymentDirection(Order)}
                disabled={!isCheckout ? true : false}
              >
                Thanh toán bằng tiền mặt
              </Button>
            </div>

          </div>
        </Col>
        <Col span={12} className="rounded-lg border border-rose-[500] p-[50px]">
          <h1 className="text-[30px] mb-[10px] text-center">Hóa đơn</h1>
          <div className='w-full min-h-[300px] '>
            {isCheckout && Order.nameItems ? (
              <Row >
                <Row className='text-16'>
                  <Col className='text-16 font-[500]'>
                    Điểm đón:
                  </Col>
                  {new Date(Order.timeItems["busStationStartId"]).toLocaleString()} - {Order.nameStations["busStationStartId"]}
                </Row>
                <Row className='text-16'>
                  <Col className='text-16 font-[500]'>
                    Điểm đến:
                  </Col>
                  <Col className='text-16'>
                    {new Date(Order.timeItems["busStationEndId"]).toLocaleString()} - {Order.nameStations["busStationStartId"]}
                  </Col>
                </Row>
                <Row className='text-16'>
                  <Col className='font-[500] text-16'>
                    Ghế đã chọn :
                  </Col>
                  <Col className='ml-sm'>
                    {Order.nameItems.map((item, index) => (
                      <Col className='text-16'>
                        {item}
                      </Col>
                    ))}
                  </Col>
                </Row>
                <Row>
                  <Col className='font-[500] my-sm text-16'>
                    Tổng tiền: <span></span>
                    <CurrencyFormat class='my-sm' value={TotalPrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                  </Col>
                </Row>
              </Row>
            ) : <Row>
              Chưa có hóa đơn
            </Row>
            }
          </div>
        </Col>
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
    </div>
  );
}
