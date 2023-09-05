import { v2 as cloudinary } from "cloudinary";
import { PostModel } from "../models";
import { BadRequest } from "../cores/error.response";

cloudinary.config({
  secure: true,
});

class UploadService {
  static async uploadImage(postId: string, file: any) {
    const post = await PostModel.findById(postId);
    // cloudinary.uploader.
    console.log("Here");
    if (!post) {
      await cloudinary.uploader.destroy(file.filename);
      throw new BadRequest("Post not found!");
    }

    await post.updateOne({
      $push: {
        imageIds: {
          url: file.path,
          id: file.filename,
        },
      },
    });

    return { link: file.path };
  }

  static async destroyImage(filename: string) {
    console.log("Destrouyyyy");
    return await cloudinary.uploader.destroy(filename);
  }
}

export default UploadService;
