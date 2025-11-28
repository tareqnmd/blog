import { CloudinaryFolder, EnvField } from '@/enum';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env[EnvField.CLOUDINARY_CLOUD_NAME],
  api_key: process.env[EnvField.CLOUDINARY_API_KEY],
  api_secret: process.env[EnvField.CLOUDINARY_API_SECRET],
});

export const extractPublicId = (url: string) => {
  try {
    const regex = /\/upload(?:-v\d+)?\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};

export const uploadFileToCloudinary = async (
  file: File,
  folder: CloudinaryFolder,
  oldUrl?: string
): Promise<string> => {
  try {
    if (oldUrl) {
      const publicId = extractPublicId(oldUrl);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Failed to delete old image:', error);
        }
      }
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: folder,
            resource_type: 'auto',
            quality: 'auto',
            fetch_format: 'auto',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve(result);
            } else {
              reject(new Error('Upload failed'));
            }
          }
        )
        .end(buffer);
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Image upload failed');
  }
};

export const deleteFileFromCloudinary = async (url: string) => {
  const publicId = extractPublicId(url);
  if (publicId) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  }
};

export default cloudinary;
