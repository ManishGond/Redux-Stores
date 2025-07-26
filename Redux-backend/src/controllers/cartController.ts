import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ GET all cart items with product
export const getCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const cart = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    res.json(cart);
  } catch {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// ✅ Add or increment cart item
export const addToCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { productId } = req.body;

  try {
    const existingItem = await prisma.cartItem.findFirst({
      where: { userId, productId },
    });

    let cartItem;

    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
        include: { product: true },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: { userId, productId, quantity: 1 },
        include: { product: true },
      });
    }

    res.status(200).json(cartItem);
  } catch {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// ✅ Remove single product from cart
export const removeFromCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { productId } = req.body;

  try {
    await prisma.cartItem.deleteMany({ where: { userId, productId } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

// ✅ Clear entire cart
export const clearCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    await prisma.cartItem.deleteMany({ where: { userId } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};

// ✅ Increment quantity with full product
export const incrementCartItem = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { productId } = req.body;

  const cartItem = await prisma.cartItem.findFirst({ where: { userId, productId } });
  if (!cartItem) return res.status(404).json({ error: "Cart item not found" });

  const updated = await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: { quantity: cartItem.quantity + 1 },
    include: { product: true },
  });

  res.json(updated);
};

// ✅ Decrement quantity or remove, return full product or quantity 0
export const decrementCartItem = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { productId } = req.body;

  const cartItem = await prisma.cartItem.findFirst({ where: { userId, productId } });
  if (!cartItem) return res.status(404).json({ error: "Cart item not found" });

  if (cartItem.quantity <= 1) {
    await prisma.cartItem.delete({ where: { id: cartItem.id } });
    return res.json({ productId, quantity: 0 });
  }

  const updated = await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: { quantity: cartItem.quantity - 1 },
    include: { product: true },
  });

  res.json(updated);
};
