import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findById({ _id: req.query.id }));
        } else {
            res.status(200).json(await Product.find());
        }
    }

    if (method === 'POST') {
        const { title, description, price } = req.body;
        const productDoc = await Product.create({
            title, description, price
        });
        res.status(201).json({ productDoc });
    }

    if (method === 'PUT') {
        const { title, description, price, _id } = req.body;
        await Product.updateOne({ _id }, { title, description, price })
        res.status(200).json({ message: 'Product updated successfully' });
    }
}
