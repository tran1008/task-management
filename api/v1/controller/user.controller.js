const md5 = require("md5")
const User=require("../../../api/v1/models/user.model")
const ForgotPassword=require("../../../api/v1/models/forgot-password.model.js")
const generateHelper=require("../../../helper/generate.js")
const sendMailHelper=require("../../../helper/sendMail.js")
module.exports.register = async (req, res) => {
    req.body.password=md5(req.body.password);
    const existEmail=await User.findOne({
        email:req.body.email,
        deleted:false
    })
    // dấu chấm than cho biết chưa tồn tại 
    if(existEmail){
        res.json({
            code:400,
            message:"Email đã tồn tại trong hệ thống",
        })
    }else{
        const user =new User({
            fullName:req.body.fullName,
            email:req.body.email,
            password:req.body.password,
            token:generateHelper.generateRandomString(30)
        });
        await user.save();
        const token=user.token;
        res.cookie("token",token);
        res.json({
            code:200,
            message:"Đăng ký tài khoản thành công",
            token:token
        })
    }
}

module.exports.login = async (req, res) => {
    // khi đăng nhập thành công thì nó sẽ trả về một cái gọi là cookie
    const email=req.body.email;
    const password=req.body.password;
    const user=await User.findOne({
        email:email,
        deleted:false
    })
    if(!user){
        res.json({
            code:400,
            message:"email không trong hệ thống"
        })
        return;
    }
    if(md5(password) !== user.password){
        res.json({
            code:400,
            message:"Sai mật khẩu"
        })
        return;
    }
    const token =user.token;
    res.cookie("token",token);
    res.json({
        code:200,
        message:"Đăng nhập thành công"
    })
}
module.exports.forgotPassword = async (req, res) => {
    const email=req.body.email
    const user=await User.findOne({
        email:email,
        deleted:false
    })
    if(!user){
        res.json({
            code:200,
            message:"email không tồn tại trong hệ thống"
        }) 
    }
    // lưu otp vào database
    const otp=generateHelper.generateRandomNumber(8)
    const timeExpire=5;
    const objectForgotPassword={
        email:email,
        otp:otp,
        expireAt:Date.now() +timeExpire*60*1000
    }
    const forgotPasword=new ForgotPassword(objectForgotPassword);
    await forgotPasword.save();
    const subject= 'Tasks-Management: Password Reset';
    const html= `<h2 style='color: #2877fd' >Tasks-Management!</h2>
    <span>Your new password is: </span>${otp}`;
    sendMailHelper.sendMail(email,subject,html);
    // gửi otp qua mail
    res.json({
        code:200,
        message:"lấy Otp thành công"
    })
}
module.exports.otpPassword = async (req, res) => {
    const email=req.body.email;
    const otp=req.body.otp;
    const result=ForgotPassword.findOne({
        email:email,
        otp:otp
    })
    if(!result){
        res.json({
            code:400,
            message:"Mã Otp Không hợp lệ"
        })
    }
    const user=await User.findOne({
        email:email
    })
    const token=user.token
    res.cookie("token",token)
    res.json({
        code:200,
        message:"Nhập mã OTP thành công"
    })
}
// ô frontend gửi lên cái token như này thì sau đó sẽ lấy ra user có token như vậy
module.exports.resetPassword = async (req, res) => {
    const token=req.cookies.token;
    const password=req.body.password;
    const user=await User.findOne({
        token:token
    })
    if(md5(password) === user.password){
        res.json({
            code:400,
            message:"Vui lòng nhập mật khẩu khác với mật khẩu cũ"
        })
        return;
    }
    await User.updateOne({
        token:token,
    },{
        password:md5(password)
    })
    res.json({
        code:200,
        message:"Đổi mật khẩu thành công"
    })
}
module.exports.detail = async (req, res) => {
    const token=req.cookies.token;
    res.json({
        code:200,
        message:"Thành công",
        info:req.user
    })
}
module.exports.list = async (req, res) => {
    const users=await User.find({
        deleted:false
    }).select("fullName id")
    res.json({
        code:200,
        message:"List user tham gia vào task này",
        users:users
    })
}