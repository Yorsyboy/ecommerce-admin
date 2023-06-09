import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        const categoryDocs = await Category.find().populate('parent');
        res.status(200).json(categoryDocs);
    }

    if (method === 'POST') {
        const { name, parentCategory, properties } = req.body;
        const categoryDoc = await Category.create({
            name,
            parent: parentCategory || undefined,
            properties
        });
        res.status(201).json(categoryDoc);
    }

    if (method === 'PUT') {
        const { _id, name, parentCategory, properties } = req.body;
        const categoryDoc = await Category.updateOne({ _id }, {
            name,
            parent: parentCategory || undefined,
            properties
        });
        res.status(200).json(categoryDoc);
    }

    if (method === "DELETE") {
        const { _id } = req.query;
        await Category.deleteOne({ _id });
        res.status(200).json({ message: "Category deleted successfully" });
    }
}