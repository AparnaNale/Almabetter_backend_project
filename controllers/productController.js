

// GET ALL PRODUCTS 
export const getAllProducts = async (req, res) => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    const filteredProducts = data.products.map(product => ({
      title: product.title,
      id: product.id,
      price: product.price,
      rating: product.rating,
      category: product.category,
      image: product.thumbnail
    }));

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PRODUCTS BY CATEGORY 
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();

    const filteredProducts = data.products.map(product => ({
      title: product.title,
      price: product.price,
      rating: product.rating,
      category: product.category,
      image: product.thumbnail
    }));

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
