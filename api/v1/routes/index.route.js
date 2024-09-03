const taskRoutes=require("./task.route")
const userRoutes=require("./user.route")
const authMiddleware=require("../../../api/v1/middleware/auth.middleware.js")
module.exports=(app)=>{
    const version="/api/v1"
    app.use(version +"/tasks",authMiddleware.requireAuth,taskRoutes);
    app.use(version +"/users",userRoutes);
}
// ./  hiện thị các file trong cùng một thư mục