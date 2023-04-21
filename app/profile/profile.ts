// import { v2 as cloudinary } from 'cloudinary';
// import slugify from 'slugify';
// export const uploadImage = async (imagePath: string,name: string) => {

//     // Use the uploaded file's name as the asset's public ID and 
//     // allow overwriting the asset with new versions
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     };
  
//     try {
//       // Upload the image
//       const result = await cloudinary.uploader.upload(imagePath, {public_id:slugify(name).toLowerCase()});
//       return result;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };