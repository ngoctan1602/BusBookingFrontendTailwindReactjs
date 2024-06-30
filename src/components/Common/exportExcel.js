import * as XLSX from 'xlsx'
const exportDataToExcel = async (data, notifySuccess, notifyError) => {
    try {
        // Chuyển đổi userAccount thành một worksheet
        const ws = XLSX.utils.json_to_sheet(data);
        // Tạo một workbook mới và thêm worksheet vào
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Định nghĩa các tùy chọn cho trình chọn tệp để lưu
        const options = {
            types: [{
                description: 'Tệp Excel',
                accept: {
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
                }
            }],
            suggestedName: 'du_lieu_xuat.xlsx'
        };

        // Hiển thị trình chọn tệp để lưu
        const handle = await window.showSaveFilePicker(options);
        const writable = await handle.createWritable();

        // Ghi tệp
        const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        await writable.write(buffer);

        // Đóng tệp
        await writable.close();
        notifySuccess("Lưu tệp thành công")
    } catch (err) {
        notifyError(err)
    }
};
export default exportDataToExcel;