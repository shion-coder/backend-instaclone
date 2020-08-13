import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

/* -------------------------------------------------------------------------- */

const storage = cloudinaryStorage({
  cloudinary,
  params: {
    folder: 'sample',
    format: 'jpg',
    // transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

export const multerUpload = multer({ storage }).array('images');
