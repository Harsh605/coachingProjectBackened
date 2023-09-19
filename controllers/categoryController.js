import slugify from "slugify";
import shortid from "shortid";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Category from "../models/category-model.js";
import cloudinary from "cloudinary"

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      // categoryImage: cate.categoryImage,
      categoryList: cate.categoryList,
      parentId: cate.parentId,
      type: cate.type,
      createdAt: cate.createdAt,
      updatedAt: cate.updatedAt,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

export const addCategory = catchAsyncError(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.catImg, {
  //   folder: "category",

  // })
  
  const categoryObj = {
    name: req.body.name,
    // categoryImage: {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url
    // },
    slug: `${slugify(req.body.name)}`,
    createdBy: req.user.id,
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const product = await Category.create(categoryObj)
  res.status(201).json({
    success: true,
    product
  })

});

export const getCategories = catchAsyncError(async (req, res, next) => {
  const data = await Category.find({})

  const categoryList = createCategories(data)
  // categoryList.categoryImage = data.image
  res.status(200).json({
    success: true,
    categoryList
  })

});

export const updateCategories = catchAsyncError(async (req, res, next) => {
  const { _id, name, parentId, image } = req.body;
  
  // await Category.findOneAndUpdate(
  //           { _id: _id[i] },
  //           category,
  //           { new: true }
  //         );

});

// export const updateCategories = async (req, res) => {
//   const { _id, name, parentId, type } = req.body;
//   const updatedCategories = [];
//   if (name instanceof Array) {
//     for (let i = 0; i < name.length; i++) {
//       const category = {
//         name: name[i],
//         type: type[i],
//       };
//       if (parentId[i] !== "") {
//         category.parentId = parentId[i];
//       }

//       const updatedCategory = await Category.findOneAndUpdate(
//         { _id: _id[i] },
//         category,
//         { new: true }
//       );
//       updatedCategories.push(updatedCategory);
//     }
//     return res.status(201).json({ updateCategories: updatedCategories });
//   } else {
//     const category = {
//       name,
//       type,
//     };
//     if (parentId !== "") {
//       category.parentId = parentId;
//     }
//     const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
//       new: true,
//     });
//     return res.status(201).json({ updatedCategory });
//   }
// };

export const deleteCategories = catchAsyncError(async (req, res, next) => {
  let ids = req.body['ids[]']; // Get the 'ids[]' directly from req.body
  
  if (!Array.isArray(ids)) {
    // If 'ids' is not an array, create an array with a single element
    ids = [ids];
  }
  
  const deletedCategories = [];
  
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findByIdAndRemove({ _id: ids[i] });
    deletedCategories.push(deleteCategory);
  }

  res.status(200).json({
    success: true,
  });
});


