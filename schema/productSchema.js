const {string, number, array, object} = require("yup");

const userSchema = object().shape({
    product_name: string()
        .min(5, "product name must be at least 3 characters")
        .max(60, "Username must be at most 60 characters")
        .required("Product name must be required"),
    category: string()
        .min(4, "category must be at least 4 character")
        .max(60, "category must be at most 60 characters")
        .required("category field must be required"),
    description: string()
        .min(10, "description must be at least 10 characters")
        .max(100, "description must be at most 100 characters")
        .required("description field must be required"),

    price: number().required("price field must be required"),
});

module.exports = userSchema;
