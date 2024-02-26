import Product from '../models/product.models.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => { 
const product = new Product(req.body) 
try {
await product.save()
return res.status(200).json({ 
message: "Product created"
})
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}


const list = async (req, res) => { 
try {
let product = await Product.find().select('name description price quantity category updated created') 
res.json(product)
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}


const userByID = async (req, res, next, id) => { 
try {
let product = await Product.findById(id) 
if (!product)
return res.status('400').json({ 
error: "User not found"
})
req.profile = product 
next()
} catch (err) {
return res.status('400').json({ 
error: "Could not retrieve user"
}) 
}
}

const read = (req, res) => {
req.profile.hashed_password = undefined 
req.profile.salt = undefined
return res.json(req.profile) 
}

const update = async (req, res) => { 
try {
let product = req.profile
product = extend(product, req.body) 
product.updated = Date.now() 
await product.save()
res.json(product) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}

const remove = async (req, res) => { 
try {
let product = req.profile
let deletedProduct = await product.deleteOne() 
res.json(deletedProduct) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}



const removeAll = async (req, res) => {
  try {
    await Product.deleteMany({}); // Delete all products

    res.json({ message: "All products deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};


const findbyName = async (req, res) => {
  try {
    const keyword = req.query.name;
    console.log('Received keyword:', keyword); // Add this line

    // Construct a MongoDB query to find products with a name containing the keyword
    const query = keyword ? { name: { $regex: new RegExp(keyword, 'i') } } : {};
    console.log('Constructed query:', query); // Add this line

    // Use the query to find products
    let product = await Product.find(query);

    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

  
  


export default { create, userByID, read, list, remove,removeAll, update,findbyName }

