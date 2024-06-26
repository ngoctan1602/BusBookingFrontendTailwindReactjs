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
// { Order, TotalPrice }
export default function Checkout() {
  let navigate = useNavigate();
  // console.log(Order, TotalPrice);
  const Order = useSelector((state) => state.checkout)
  const TotalPrice = useSelector((state) => state.checkout.ToltalPrice)
  useEffect(
    () => {
      const checkState = () => {
        if (Order.TicketRouteDetailEndId === 0 || Order.TicketRouteDetailStartId === 0 || TotalPrice === 0
          || Order.itemsRequest.length === 0
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
      className='min-h-[300px] w-[60%] flex flex-col justify-start pt-[50px]'>
      {
        loading &&

        <div class='absolute  w-full h-[500px] z-20 opacity-40'>
          <ReactLoading
            type="spinningBubbles" color="black"
            height={'5%'} width={'5%'}
            className="absolute  left-1/2 top-[50%]  "
          />
        </div>
      }
      <h1 className="text-[50px] uppercase text-center p-[20px]">Thanh toán</h1>

      <div className="flex flex-row justify-between p-[20px]">
        <div className="rounded-lg basis-2/3 drop-shadow-2xl border border-rose-[500] p-[50px]">
          <h1 className="text-[30px] mb-[10px] text-center">Payment</h1>
          <div
            className='flex flex-wrap justify-between'>
            <div className="p-[20px] ">
              {
                usePaypal ? (
                  <>
                    <Paypal totalPrice={TotalPrice} order={Order} />
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setUsePaypal(true);
                    }}
                    className='w-[200px]  button-hover text-16 text-txt place-items-center'
                  >
                    Thanh toán bằng paypal
                  </button>
                )
              }
            </div>
            <div
              className='p-[20px] '>
              <button
                className="w-[250px] button-hover text-16 text-txt place-items-center"
                onClick={() => paymentDirection(Order)}
              >
                Thanh toán bằng tiền mặt
              </button>
            </div>

          </div>
        </div>
        <div className="rounded-lg basis-1/10 drop-shadow-2xl border border-rose-[500] p-[50px]">
          <h1 className="text-[30px] mb-[10px] text-center">Order</h1>
          <div className="p-[20px] ">
            {Order && Order.itemsRequest ? (
              <ul>
                {Order.itemsRequest.map((item, index) => (
                  <li key={index} className="mb-[10px]">
                    {/* {item.name} - {item.quantity} x {item.price} VND */}
                    Mã ghế: {item.ticketItemId}
                  </li>
                ))}
                <p>Tổng tiền {TotalPrice}</p>
              </ul>
            ) : (
              <p>No items in the order.</p>
            )}
          </div>
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
    </div>
  );
}
