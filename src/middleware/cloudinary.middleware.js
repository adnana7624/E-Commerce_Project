import {v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import { setUncaughtExceptionCaptureCallback } from "process";

dotenv.config();
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key    : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const uplaodOnCloudinary = async(localpath) => {
    try {
        const imageuplaod = await cloudinary.uploader.upload(localpath)
        fs.unlinkSync(localpath)
        return imageuplaod.secure_url;;
    } catch (error) {
        fs.unlinkSync(localpath)
        return null
    }
}

export {uplaodOnCloudinary}