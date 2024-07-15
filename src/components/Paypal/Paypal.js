import React, { useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import * as BillService from '../../services/BillServices';
import purgeSpecificReducers from '../../store/purgeReducers';


const loadPaypalScript = (clientId, currency) => {
  const script = document.createElement('script');
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
  script.async = true;
  document.body.appendChild(script);
};

export default function Paypal({ order, totalPrice }) {

  const paymentPaypal = async (data) => {
    const response = await BillService.paymentPaypal(data);
    console.log(response)
  }

  let navigate = useNavigate();
  const paypal = useRef()
  useEffect(() => {
    console.log(order)
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Booking Ticket",
                amount: {
                  currency_code: "USD",
                  value: Math.ceil(totalPrice / 24000),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const bill = await actions.order.capture();

          const updatedOrder = { ...order, PaypalTransactionId: bill.purchase_units[0].payments.captures[0].id };
          console.log(updatedOrder);
          await paymentPaypal(updatedOrder);
          purgeSpecificReducers(['checkout']);
          navigate("/")
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);


  return (
    <div ref={paypal}></div>
  )
}
