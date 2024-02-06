import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 레시피 목록 조회
export async function GET(req: Request) {
  // const data = await req.json()

  const data = await prisma.recipe.findMany({
    orderBy: { id: "desc" },
  });

  console.log("server data:", data);

  // res.status(200).json(fetchData);
  return Response.json(data);
}

// 레시피 등록
export async function POST(req: Request) {
  // 레시피 등록
  try {
    // const data = req.body;

    const data = await req.json();
    console.log("res", data);

    const result = await prisma.recipe.create({
      data: { ...data },
    });

    // return res.status(200).json(result);
    return Response.json({ result });
  } catch (error) {
    console.error("Error creating recipe:", error);
    // return data.status(500).json({ error: "Internal Server Error" });
  }
}
