import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
});

class UploadService {
  static async uploadImage(file: any) {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(file, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
  }
}

export default UploadService;
