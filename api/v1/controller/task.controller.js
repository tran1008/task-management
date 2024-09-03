const Task = require("../models/tasks.model");
const paginationHelper = require('../../../helper/pagination.js')
const searchHelper = require('../../../helper/search.js')
//[GET] api/v1/tasks
module.exports.index = async (req, res) => {
    // bộ lọc trạng thái
    const find = {
        $or:[
            {createdBy:req.user.id},
            {listUser:req.user.id}
        ],
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status
    }
    const objectSearch = searchHelper(req.query)

    // console.log(objectSearch);
    //req.query là trả nên những câu query trên url 
    // req.query.status trả nên những câu query tương ứng trên URL với đoạn nối chuỗi là  ?status=active
    // nó hiểu là tìm từ keyword trong database chứ không phải  từ người dùng nhập vào 
    if (objectSearch.regex) { // gán lại objectSearch cho     
        find.title = objectSearch.regex;
    }
    let initPagination = {
        currentPage: 1,
        limitItems: 2   // default là 4 sản phẩm ở đây
    }
    const countTasks = await Task.countDocuments(find)
    const objectPagination = paginationHelper(
        initPagination,
        req.query,
        countTasks
    )
    // bộ lọc theo tiêu chí
    // tạo ra một object sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    const listTask = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip)
    res.json(listTask);
}
//[GET] api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const listTask = await Task.findOne({
            _id: id,
            deleted: false
        })
        res.json(listTask);

    } catch (error) {
        res.json("Không tìm thấy")
    }
}
//[PATCH] api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id=req.params.id;
        const status=req.body.status;
        await Task.updateOne({
            _id:id
        },{
            status:status
        })
        res.json({
            code:200,
            message:"Cập nhật trạng thái thành công"
        })
        
    } catch (error) {
        res.json({
            code:400,
            message:"Lỗi cập nhật trạng thái"
        })
    }
}
module.exports.changeMulti = async (req, res) => {
    try {
        const {ids,key,value}=req.body
        switch (key) {
            case "status":
                await Task.updateMany({
                    _id:{$in:ids}
                },{
                    status:value
                })
                res.json({
                    code:200,
                    message:"Cập nhật nhiều trạng thái thành công"
                })
                break;
            case "delete":
                await Task.updateMany({
                    _id:{$in:ids}
                },{
                    deleted:true
                })
                res.json({
                    code:200,
                    message:"Xóa thành công"
                })
                break;
            default:
                res.json({
                    code:400,
                    message:"Lỗi cập nhật"
                })
                break;
        }
        
    } catch (error) {
        res.json({
            code:400,
            message:"Lỗi cập nhật"
        })
    }
}
// sau khi đăng ký thành công thì đã trả về cho ô front end một cái token rồi
module.exports.createPost = async (req, res) => {
    try {
        req.body.createdBy=req.user.id // lưu id của user đã tạo task đó
        // lưu thêm những user đã tham gia vào task đó
        //khi ô c tạo ra thì sẽ thấy id của ô c trong list user đó còn nếu đăng nhập bằng ô d thì chỉ thấy
        const task =new Task(req.body)
        const data=await task.save();
        res.json({
            code:200,
            message:"Tạo mới công việc thành công",
            data:data
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Lỗi cập nhật",
        })
    }
}
module.exports.edit = async (req, res) => {
    try {
        const id=req.params.id;
        await Task.updateOne({
            _id:id
        },
             req.body
        )
        res.json({
            code:200,
            message:"Chỉnh sửa công việc thành công",
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Lỗi chỉnh sửa công việc",
        })
    }
}
module.exports.delete = async (req, res) => {
    try {
        const id=req.params.id;
        await Task.updateOne({  
            _id:id
        },{
            deleted:true,
            deleteAt:new Date()
        })
        res.json({
            code:200,
            message:"Xóa công việc thành công",
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Xóa công việc thất bại",
        })
    }
}