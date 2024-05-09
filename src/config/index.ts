import { config } from 'dotenv';
config();

export const {
   NODE_ENV,
   PORT,
   SECRET_KEY,
   LOG_FORMAT,
   LOG_DIR,
   ORIGIN,
   MONGOOSE_URI,
   SESSION_KEY
} = process.env;

export const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
