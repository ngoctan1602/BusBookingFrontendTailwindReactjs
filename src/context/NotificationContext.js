import React, { createContext, useEffect, useState } from 'react';
import getConnection from '../services/SignalRService';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";

export const NotificationContext = createContext();

function NotificationProvider({ children }) {
    const [notification, setNotification] = useState();
    const [counter, setCounter] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const notifySuccess = (message, href, id) => {
        const basePath = location.pathname.split('/')[1];
        toast.info(message, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClick: async () => {
                if (href) {
                    navigate(`/${basePath}${href}`);
                    try {
                        const connection = await getConnection();
                        await connection.invoke("ReadNotification", id);
                    } catch (error) {
                        console.error('Failed to read notification:', error);
                    }
                }
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const connection = await getConnection();
            try {
                connection.on('ReceiveNotification', (message, count, href, id) => {
                    setNotification(message);
                    setCounter(count);
                    notifySuccess(message, href, id);
                    console.log("Phảnhổi fdi: ", message)
                });

                connection.on("ReceiveCountUnReadingNotification", (count) => {
                    // Xử lý số thông báo chưa đọc
                    setCounter(count);
                    console.log('Số thông báo chưa đọc:', count);
                    // Hiển thị số thông báo chưa đọc cho admin
                });
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();

        return () => {
            // Clean up khi component unmount
            // Xóa các event listeners, subscriptions, vv.
        };
    }, []);

    return (
        <NotificationContext.Provider value={{ counter, notification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export default NotificationProvider;
