import { insertProductSchema } from "@/database/schema";
import { storage } from "@/database/storage";
import { NextRequest, NextResponse as res } from "next/server"; 


export async function GET() {
    try {
        const products = await storage.getProducts();
    
        return res.json(products, { status: 200 });
    } catch (error) {
        return res.json({ message: "Failed to fetch products", error }, { status: 500 });
    }
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsedProductData = insertProductSchema.parse(body);

        console.log(parsedProductData)

        const newProduct = await storage.addProduct(parsedProductData);

        return res.json(newProduct, { status: 201 })
    } catch (error) {
        return res.json({ message: "Failed to add new product", error }, { status: 500 });
    }
};