import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Try to load .env file if it exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(dirname(__dirname), '.env');

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config(); // Fallback to default loading
}

export const ACCESS_TOKEN_EXPIRE_TIME = '900';
export const REFRESH_TOKEN_EXPIRE_TIME = '604800';
export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: REFRESH_TOKEN_EXPIRE_TIME * 1000,
    path: '/',
    // Hoàn toàn bỏ thuộc tính domain, để trình duyệt tự xử lý
    // domain: process.env.NODE_ENV === 'production' 
    //     ? '.asia-southeast1.run.app' 
    //     : undefined
};
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const CLIENT_REDIRECT_URL = process.env.FRONTEND_URL;
export const GOOGLE_OAUTH_CLIENT = process.env.GOOGLE_OAUTH_CLIENT;
export const GOOGLE_OAUTH_SECRET = process.env.GOOGLE_OAUTH_SECRET;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const FRONTEND_URL = process.env.FRONTEND_URL;
