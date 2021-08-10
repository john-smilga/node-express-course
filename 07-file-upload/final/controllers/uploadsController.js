const path = require('path');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
// make sure to use V2!!!!
const claudinary = require('cloudinary').v2;

const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No file Uploaded');
  }

  let productImage = req.files.image;

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      `Please upload image smaller than 1 MB`
    );
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

// claudinary
// const uploadProductImage = async (req, res) => {
//   const result = await claudinary.uploader.upload(
//     req.files.image.tempFilePath,
//     { use_filename: true, folder: 'file-upload' }
//   );

//   return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
// };

module.exports = {
  uploadProductImage,
};
