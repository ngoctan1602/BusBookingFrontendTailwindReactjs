import React, { createContext, useEffect, useState } from 'react';
import getConnection from '../services/SignalRService';
import { toast } from 'react-toastify';


export const NotificationContext = createContext();

function NotifcationProvider ({children}){
    const [notification, setNotification] = useState([]);
    const addNotification = (notification) => {
    }

    const [counter, addCounter] = useState(0);

    const notifySuccess = () => toast.success('thông báo', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    useEffect(() => {
        (
            async () => {
                const connection = await getConnection();
                connection.on('ReceiveNotification', (message, count, href) => {
                    setNotification(message);
                    addCounter(count);
                    notifySuccess();
                    console.log('Nhận thông báo:', message, count, href);
                })
                
                connection.on("ReceiveCountUnReadingNotification", (count) => {
                    // Xử lý số thông báo chưa đọc
                    addCounter(count);
                    console.log('Số thông báo chưa đọc:', count);
                    // Hiển thị số thông báo chưa đọc cho admin
                });
            }
        )();
    }, []);
    return (
        <NotificationContext.Provider 
        value={{
            counter,
            notification
            }}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotifcationProvider;