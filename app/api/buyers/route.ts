import prisma from "@/lib/prisma";
import { Citys, PropertyTypes, StatusType, Timelines } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const buyerpost = z.object({
    fullName: z.string().min(2),
    email: z.email().optional(),
    budgetMin: z.number().int().optional(),
    budgetMax: z.number().int().optional(),
    phone: z.string().min(10).max(15),
    purpose : z.string().optional(),
    city: z.string(),
    propertyType: z.string(),
    bhk: z.string().optional(),
    timeline: z.string().optional(),
    source: z.string().optional(),
    notes: z.string().optional(),
    status : z.string().optional()
})

export async function POST(request: NextRequest) {
    try {
        const info = await request.json()
        const validinfo = buyerpost.safeParse(info);
        if (!validinfo.success) {
            return NextResponse.json({
                message: "Input data is not valid"
            },{status:400})
        }
        if (info.budgetMin && info.budgetMax && info.budgetMin > info.budgetMax) {
            return NextResponse.json({
                message: "The minimum budget is greater than maximum budget"
            },{status:400})
        }
        if (info.propertyType === "Apartment" || info.propertyType === "Villa") {
            if (!info.bhk) {
                return NextResponse.json({
                    message: "the bhk field is required"
                },{status:400})
            }
        }
        const buyer = await prisma.buyer.create({data: info})

        const buyerHistory = await prisma.buyerhistory.create({
            data: {
                buyerId: buyer.id,
                changedBy: info.ownerId,
                changedAt: new Date(),
                diff: JSON.stringify({ created: true })
            }
        })
        return NextResponse.json({
            message: "buyer created successfully"
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message : "Server error"
        },{status:500})
    }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const city = searchParams.get("city");
    const propertyType = searchParams.get("propertyType");
    const status = searchParams.get("status");
    const timeline = searchParams.get("timeline");

    const where: any = {};

    if (city) where.city = city as Citys;
    if (propertyType) where.propertyType = propertyType as PropertyTypes;
    if (status) where.status = status as StatusType;
    if (timeline) where.timeline = timeline as Timelines;

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const buyers = await prisma.buyer.findMany({
      where,
      orderBy: { updatedAt: "desc" }
    });
    return NextResponse.json(buyers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        message: "Server error" 
    },{status: 500});
  }
}
