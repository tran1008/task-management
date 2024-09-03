module.exports=(query)=>{
    const objectSearch={
        keyword:""
    }
    if(query.keyword){
        // console.log(req.query.status);
        objectSearch.keyword=query.keyword;
        const regex=new RegExp(objectSearch.keyword,"i");
        objectSearch.regex=regex; // gán lại cái key title bằng với keyword
    }
    return objectSearch;
}