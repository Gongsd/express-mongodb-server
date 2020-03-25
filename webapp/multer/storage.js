const path = require('path')

const multer = require('multer')

let storage = multer.diskStorage({
    destination : function(req, file, cb){

    },
    filename : function(req, file, cb){
        cb(null, file.fieldname + '-'+Date.now() + path.extname(file.filename))
    }
})

const upload = multer({storage: storage}).single('file');

module.exports = upload;