import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";


const buyerupdate = z.object({
  fullName: z.string().min(2).optional(),
  email: z.string().email().optional(),
  budgetMin: z.number().int().optional(),
  budgetMax: z.number().int().optional(),
  phone: z.string().min(10).max(15).optional(),
  city: z.string().optional(),
  propertyType: z.string().optional(),
  bhk: z.string().optional(),
  timeline: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
  updatedAt: z.string(),
  userId: z.string(),
});


function getDiff(oldData: any, newData: any) {
  const diff: Record<string, { old: any; new: any }> = {};
  for (const key of Object.keys(newData)) {
    if (key === "updatedAt" || key === "userId") continue;
    if (newData[key] !== undefined && oldData[key] !== newData[key]) {
      diff[key] = { old: oldData[key], new: newData[key] };
    }
  }
  return diff;
}


export async function PUT(request: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const id = params.id
    if (!id) {
      return NextResponse.json({ message: "Buyer ID missing" }, { status: 400 });
    }

    const value = await request.json();
    const validData = buyerupdate.safeParse(value);
    if (!validData.success) {
      return NextResponse.json({ message: "Invalid update fields" }, { status: 400 });
    }


    if (value.budgetMin && value.budgetMax && value.budgetMin > value.budgetMax) {
      return NextResponse.json(
        { message: "The minimum budget is greater than maximum budget" },
        { status: 400 }
      );
    }


    if ((value.propertyType === "Apartment" || value.propertyType === "Villa") && !value.bhk) {
      return NextResponse.json({ message: "The bhk field is required" }, { status: 400 });
    }

   
    const buyer = await prisma.buyer.findUnique({ where: { id } });
    if (!buyer) {
      return NextResponse.json({ message: "Buyer not found" }, { status: 404 });
    }


    if (
      buyer.updatedAt.getTime() !== new Date(value.updatedAt).getTime()
    ) {
      return NextResponse.json(
        { message: "Record changed, please refresh" },
        { status: 409 }
      );
    }


    const diff = getDiff(buyer, value);

  
    const updatedBuyer = await prisma.buyer.update({
      where: { id },
      data: {
        fullName: value.fullName || undefined,
        email: value.email || undefined,
        budgetMin: value.budgetMin || undefined,
        budgetMax: value.budgetMax || undefined,
        phone: value.phone || undefined,
        city: value.city || undefined,
        propertyType: value.propertyType || undefined,
        bhk: value.bhk || undefined,
        timeline: value.timeline || undefined,
        source: value.source || undefined,
        notes: value.notes || undefined,
      },
    });

    
    if (Object.keys(diff).length > 0) {
      await prisma.buyerhistory.create({
        data: {
          buyerId: buyer.id,
          changedBy: value.userId,
          changedAt: new Date(),
          diff: JSON.stringify(diff),
        },
      });
    }

    return NextResponse.json({ message: "Updated successfully", buyer: updatedBuyer }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}


export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
  const id = params.id

  if (!id) {
    return NextResponse.json({ message: "Buyer ID missing" }, { status: 400 });
  }

  const buyer = await prisma.buyer.findUnique({
    where: { id },
  });

  const buyerhistory = await prisma.buyerhistory.findMany({
    where: { buyerId: id },
    orderBy: { changedAt: "desc" },
    take: 5,
  });

  return NextResponse.json({
    buyer,
    buyerhistory,
  });
}
