import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "social-media-app",
  } as unknown as Options,
});

const cloudUploader = multer({ storage });

export default cloudUploader;
