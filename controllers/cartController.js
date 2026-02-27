import Cart from "../models/Cart.js";

// add products to card
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "userId and productId required" });
    }

    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await response.json();

    if (!product.id) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user's cart
    let cart = await Cart.findOne({ userId });

    // If cart does not exist, create new
    if (!cart) {
      cart = new Cart({
        userId,
        items: []
      });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      item => item.productId === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1
      });
    }

    //Save cart
    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// increase qty
export const increaseQty = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += 1;
    item.totalPrice = item.price * item.quantity;

    await cart.save();

    res.json({ message: "Quantity increased", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// decrease qty
export const decreaseQty = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter(i => i.productId !== productId);
    } else {
      item.totalPrice = item.price * item.quantity;
    }

    await cart.save();

    res.json({ message: "Quantity decreased", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get cart products
export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    //if cart not found
    if (!cart) {
      return res.json({
        items: [],
        totalAmount: 0
      });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    res.json({
      items: cart.items,
      totalAmount
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    //Check if product exists
    const itemExists = cart.items.find(
      item => item.productId === productId
    );

    if (!itemExists) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    //Remove product
    cart.items = cart.items.filter(
      item => item.productId !== productId
    );

    //Save cart
    await cart.save();

    const cartTotal = cart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    res.status(200).json({
      message: "Product removed from cart",
      items: cart.items,
      cartTotal
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// clear cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      message: "Cart cleared successfully",
      items: [],
      cartTotal: 0
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


