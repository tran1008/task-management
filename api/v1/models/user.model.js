const mongoose = require('mongoose');
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const UserSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token:String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date
}, {
    timestamps: true
});
const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;