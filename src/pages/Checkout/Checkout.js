import React, {useState} from 'react';
import Paypal from '../../components/Paypal/Paypal';

export default function Checkout({ Order, TotalPrice }) {
  console.log("Order: ", Order);
  console.log("TotalPrice: ", TotalPrice);
  const [usePaypal, setUsePaypal] = useState(false);

  return (
    <div    
    className='min-h-[300px] w-[60%] flex flex-col justify-start pt-[50px]'>
      <h1 className="text-[50px] uppercase text-center p-[20px]">Thanh toán</h1>

      <div className="flex flex-row justify-between p-[20px]">
        <div className="rounded-lg basis-2/3 drop-shadow-2xl border border-rose-[500] p-[50px]">
          <h1 className="text-[30px] mb-[10px] text-center">Payment</h1>
          <div
           className='flex flex-wrap'>
            <div className="p-[20px] ">
                {
                    usePaypal ? (
                        <>
                            <Paypal order={TotalPrice} />
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
                    onClick={() => {
                    alert("Thanh toán bằng ví tiền mặt");
                    }}
                >
                    Thanh toán bằng tiền mặt
                </button>
            </div>
            
          </div>
        </div>
        <div className="rounded-lg basis-1/10 drop-shadow-2xl border border-rose-[500] p-[50px]">
          <h1 className="text-[30px] mb-[10px] text-center">Order</h1>
          <div className="p-[20px] ">
            {Order && Order.items ? (
              <ul>
                {Order.items.map((item, index) => (
                  <li key={index} className="mb-[10px]">
                    {item.name} - {item.quantity} x {item.price} VND
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in the order.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
