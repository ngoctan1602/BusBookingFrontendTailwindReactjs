import React, { useRef,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import BillService from '../../services/BillServices';

export default function Paypal({order}) {

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
                  value: Math.ceil(order/24000),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();

          console.log(order.id);
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
