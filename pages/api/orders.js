import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
    await mongooseConnect();
    // descending order sort by createdAt
    res.json(await Order.find().sort({ createdAt: -1 }));
}