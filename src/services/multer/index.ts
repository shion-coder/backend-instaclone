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

/**
 * Handle upload single file
 */

export const multerUploadSingle = multer({ storage }).single('image');

/**
 * Handle upload multi file
 */

export const multerUploadMulti = multer({ storage }).array('images');
