import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const data = await request.json()
    const user = await prisma.user.create({
        data : data
    })
    return NextResponse.json({
        message : "Signup successfully"
    },{status: 200})
}

export async function PUT(request:NextRequest){
    const data = await request.json()
    const user = await prisma.user.findUnique({
        where : {
            email : data.email
        }
    })
    if(!user){
        return NextResponse.json({
            message : "user does not exist"
        })
    }
    await prisma.user.update({
        where : {
            id : user.id
        },
        data : {
            password : data.password || undefined,
            name : data.name || undefined
        }
    })
}