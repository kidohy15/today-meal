import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 레시피 목록 조회
export async function GET(req: Request, context: any) {
  // const data = await req.json()
  const { searchParams } = new URL(req.url);
  // const id = params.id
  
  // const searchParams = req.nextUrl.searchParams;
  // const query = searchParams.get("id");
  
  // const { id } = req;
  const { params } = context; // '1'
  console.log("서버 req", req);
  console.log("서버 req", req.url);
  console.log("서버 req", req.url.search);
  // console.log("서버 searchParams", req.nextUrl.searchParams.get("id"));
  console.log("서버 searchParams", searchParams);
  const id = searchParams.get("id")
  console.log("서버 searchParams", id);
  // const id = req.nextUrl.searchParams.get("id");

  if (id) {
    const data = await prisma.recipe.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    console.log("server data:", data);

    // res.status(200).json(fetchData);
    return Response.json(data);

  } else {
    const data = await prisma.recipe.findMany({
      orderBy: { id: "desc" },
    });
    console.log("server data:", data);

    // res.status(200).json(fetchData);
    return Response.json(data);
  }

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
