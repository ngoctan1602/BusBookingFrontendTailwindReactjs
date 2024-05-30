import React, { useRef,useEffect } from 'react'

export default function Paypal({order}) {

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
                  value: Math.round(order/24000),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
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
