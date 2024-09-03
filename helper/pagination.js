module.exports=(objectPagination,query,countRecords)=>{
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objectPagination.limitItems = parseInt(query.limit);
    }
// đoạn này đang xử lý bên backend chưa truyền ra cập nhật giao diện cho người dùng
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems; // tính số sản phẩm hiển thị trên một page
    const totalPage = Math.ceil(countRecords / objectPagination.limitItems); // tính số trang
    objectPagination.totalPage = totalPage;
    return objectPagination;
}