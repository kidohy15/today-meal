import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 레시피 목록 조회
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const fetchData = "test 중입니다.";
  const fetchData2 = req;

  console.log("fetchData", fetchData);
  console.log("fetchData2", fetchData2);

  const recipeData = [
    {
      title: "title1",
      content: "content1",
      writer: "writer1",
      createdAt: "createdAt1",
    },
    {
      title: "title",
      content: "content",
      writer: "writer",
      createdAt: "createdAt",
    },
    {
      title: "title",
      content: "content",
      writer: "writer",
      createdAt: "createdAt",
    },
    {
      title: "title",
      content: "content",
      writer: "writer",
      createdAt: "createdAt",
    },
    {
      title: "title",
      content: "content",
      writer: "writer",
      createdAt: "createdAt",
    },
  ];
  // res.status(200).json(fetchData);

  return NextResponse.json(recipeData);
}

// 레시피 등록
export async function POST(req: NextApiRequest, res: NextApiResponse<any>) {
  // 레시피 등록
  try {
    // 레시피 등록
    const data = req.body;

    console.log("data", data);

    const result = await prisma.recipe.create({
      data: { ...data },
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
