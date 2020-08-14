import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

/* -------------------------------------------------------------------------- */

const storage = cloudinaryStorage({
  cloudinary,
  params: {
    folder: 'sample',
    format: 'jpg',
    allowed_formats: ['jpg', 'png', 'gif'],
  },
});

export const multerUploadSingle = multer({ storage }).single('image');

export const multerUploadMulti = multer({ storage }).array('images');
