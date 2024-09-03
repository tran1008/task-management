const mongoose = require('mongoose');
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const ForgotSchema= new mongoose.Schema({ 
   // user_id:String, // khi người đùng đặt hàng thì người ta cần biết thông tin tài khoản đã đăng nhập để mua hàng là gì
    email:String,
    otp:String,
    expireAt:{
        type:Date,
        expires: 0
    }
},{
    timestamps: true 
});
const Forgot = mongoose.model('Forgot', ForgotSchema,'forgot-password');
module.exports=Forgot;