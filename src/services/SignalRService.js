import { HubConnectionBuilder , LogLevel} from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:5107/Notification',{
        accessTokenFactory: () => localStorage.getItem('token')
    } )
    .configureLogging(LogLevel.Information)
    .build();

connection.on('ReceiveNotification', (message) => {
    // Xử lý thông báo nhận được
    console.log('Nhận thông báo:', message);
    // Hiển thị thông báo cho admin
});

connection.on("ReceiveCountUnReadingNotification", (count) => {
    // Xử lý số thông báo chưa đọc
    console.log('Số thông báo chưa đọc:', count);
    // Hiển thị số thông báo chưa đọc cho admin
});


connection.start()
    .then(() => console.log('Kết nối thành công!'))
    .catch(err => console.error('Lỗi kết nối:', err));
