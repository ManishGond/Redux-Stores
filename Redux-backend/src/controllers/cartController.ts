import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: {userId},
      include: {product: true}
    })

    res.json(cartItems)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" })
  }
}

export const addToCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id
  const {productId, quantity} = req.body

  try {
    const exisitingItem = await prisma.cartItem.findFirst({
      where: {userId, productId}
    })

    if(exisitingItem){
      const updateItem = await prisma.cartItem.update({
        where: {id: exisitingItem.id},
        data: {
          quantity: exisitingItem.quantity + quantity
        }
      })

      return res.json(updateItem)
    }

    const newItem = await prisma.cartItem.create({
      data: { userId, productId, quantity },
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
}

export const removeFromCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const itemId = parseInt(req.params.id);

  try {
    const item = await prisma.cartItem.findUnique({ where: { id: itemId } });

    if (!item || item.userId !== userId) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await prisma.cartItem.delete({ where: { id: itemId } });

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};