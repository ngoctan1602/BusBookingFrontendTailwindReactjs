import { HubConnectionBuilder , LogLevel} from '@microsoft/signalr';

const getConnection = async () => {
    const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5107/Notification', {
            accessTokenFactory: () => localStorage.getItem('token')
        })
        .configureLogging(LogLevel.Information)
        .build();

    try {
        await connection.start();
        console.log('Kết nối thành công!');
        return connection;
    } catch (error) {
        console.error('Kết nối thất bại:', error);
        // Có thể trả về null hoặc giá trị mặc định khác nếu kết nối không thành công
        return null;
    }
};



export default getConnection;
// connection.on('ReceiveNotification', (message, count, href) => {
//     // Xử lý thông báo nhận được
//     console.log('Nhận thông báo:', message, count, href);
//     // Hiển thị thông báo cho admin
// });

// connection.on("ReceiveCountUnReadingNotification", (count) => {
//     // Xử lý số thông báo chưa đọc
//     console.log('Số thông báo chưa đọc:', count);
//     // Hiển thị số thông báo chưa đọc cho admin
// });


// connection.start()
//     .then(() => console.log('Kết nối thành công!'))
//     .catch(err => console.error('Lỗi kết nối:', err));
