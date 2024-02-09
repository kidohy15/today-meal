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

  const body = req;
  const { params } = context; // '1'
  console.log("서버 params", params);
  console.log("서버 context", context);
  console.log("서버 searchParams", searchParams);
  // console.log("서버 req", req.url);

  const id = searchParams.get("id");
  const search = searchParams.get("searchKeyword");
  console.log("서버 search", search);

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
      where: {
        title: search ? { contains: search } : {},
      },
    });
    // console.log("server data:", data);

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
    // console.log("res", data);

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

// 레시피 수정
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    // console.log("res", data);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const result = await prisma.recipe.update({
        where: { id: parseInt(id) },
        data: { ...data },
      });
      return Response.json({ result });
    }
  } catch (error) {
    console.error("Error updating recipe:", error);
  }
}

// 레시피 삭제
export async function DELETE(req: Request) {
  try {
    // const data = await req.json();
    console.log("=========== 삭제 로직 ================");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log("=========== 삭제 req ================", req);
    console.log("=========== 삭제 searchParams ================", searchParams);

    if (id) {
      const result = await prisma.recipe.delete({
        where: { id: parseInt(id) },
      });
      console.log("================delete result", result);
      return Response.json({
        status: 200,
        message: "recipe deleted successfully",
      });
    }
    return Response.json({
      status: 500,
      message: "failed",
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return Response.json({
      status: 500,
      message: "failed",
    });
  }
}
