import multer from 'multer';

const fileType=  ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];
const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        if(fileType.includes(file.mimetype)){
            cb(null, 'src/uploads/');
        }else{
            cb(false, 'src/uploads/');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50 // 5 MB
    },
    fileFilter: (req, file, cb) => {
        if(fileType.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error('Invalid file type'), false);
        }
    }
});