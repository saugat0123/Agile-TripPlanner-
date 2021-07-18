const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./images')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})



//filtering file
const filter=function(req,file,cb){
    if(file.mimetype=='image/jpeg' || file.mimetype=='image/jpg' || file.mimetype=='image/png' || file.mimetype=='image/gif'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const upload=multer({
    storage:storage
})

// const uploadMultiple = upload.fields({ name: 'image', maxCount: 10 })

module.exports=upload;