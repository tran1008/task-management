// tạo ra một token random cả chuỗi và số
module.exports.generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        // sinh ra số ngẫu nhiên từ 0 đến 1 xong nhân với độ dài chuỗi và làm tròn xuống cuối cùng gán vào result
    }
    return result;
};

module.exports.generateRandomNumber = (length) => {
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        // sinh ra số ngẫu nhiên từ 0 đến 1 xong nhân với độ dài chuỗi và làm tròn xuống cuối cùng gán vào result
    }
    return result;
};