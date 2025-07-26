import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

// --- Products ---
export const bulkAddProducts = async (req: Request, res: Response) => {
  const {products} = req.body
  try {
    const created = await prisma.products.createMany({ data: products });
    res.json({ message: "✅ Products added", count: created.count });
  } catch (err) {
    res.status(500).json({ error: "❌ Bulk add failed", details: err });
  }
}

export const deleteManyProducts = async (req: Request, res: Response) => {
  const { ids } = req.body;
  try {
    await prisma.cartItem.deleteMany({ where: { productId: { in: ids } } });
    const deleted = await prisma.products.deleteMany({ where: { id: { in: ids } } });
    res.json({ message: "🗑️ Products deleted", count: deleted.count });
  } catch (err) {
    res.status(500).json({ error: "❌ Bulk delete failed", details: err });
  }
};

// ---- Users ----
export const listAllUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const deleteUsers = async (req: Request, res: Response) => {
  const { ids } = req.body;
  try {
    const deleted = await prisma.user.deleteMany({ where: { id: { in: ids } } });
    res.json({ message: "🗑️ Users deleted", count: deleted.count });
  } catch (err) {
    res.status(500).json({ error: "❌ User deletion failed", details: err });
  }
};