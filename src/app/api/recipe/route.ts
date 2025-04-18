import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
import authOptions from "../auth/[...nextauth]/options";

const prisma = new PrismaClient();

// export const config = {
//   api: {
//     //next에서는 기본으로 bodyParser가 작동되므로 false로 해준다.
//     // bodyParser: false,
//   },
// };

// 레시피 목록 조회
export async function GET(req: Request, res: Request) {
  const { searchParams } = new URL(req.url);

  const session = await getServerSession(authOptions);
  const id = searchParams.get("id");
  const search = searchParams.get("searchKeyword");
  const page = searchParams.get("page") ?? "1";
  const skipPage = parseInt(page) - 1;
  const userCheck = searchParams.get("userCheck") ?? null;

  console.log("server data page:", page);

  // id 가 있는 경우 상세페이지
  if (id) {
    const data = await prisma.recipe.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    console.log("server data:", data);
    return Response.json(data);
  } else {
    // 목록 가져오기

    // 내가 등록한 레시피만 가져오기
    if (session && userCheck) {
      console.log("server 내가 등록한 목록 가져오기");
      const count = await prisma.recipe.count({
        where: {
          userId: userCheck ? session?.user?.id : {},
        },
      });

      const recipeData = await prisma.recipe.findMany({
        orderBy: { id: "desc" },
        where: {
          title: search ? { contains: search } : {},
          userId: userCheck ? session?.user.id : {},
        },
        take: 10,
        skip: skipPage * 10,
        include: {
          user: true,
        },
      });
      console.log("server recipeData:", recipeData);

      return Response.json({
        data: recipeData,
        page: parseInt(page),
        totalCount: count,
        totalPage: Math.ceil(count / 10),
      });
    }

    console.log("server 전체 목록 가져오기");

    const count = await prisma.recipe.count({
      where: {
        title: search ? { contains: search } : {},
        userId: userCheck ? session?.user.id : {},
      },
    });
    console.log("count", count);

    const recipeData = await prisma.recipe.findMany({
      orderBy: { id: "desc" },
      where: {
        title: search ? { contains: search } : {},
        userId: userCheck ? session?.user.id : {},
      },
      take: 20,
      skip: skipPage * 20,
      include: {
        user: true,
      },
    });

    return Response.json({
      data: recipeData,
      page: parseInt(page),
      totalCount: count,
      totalPage: Math.ceil(count / 20),
    });
  }
}

// 레시피 등록
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // 현재 로그인 상태인지 확인
  if (!session?.user) {
    return Response.json("======= 유저 없음!!!! =========");
  }

  const formData = await req.formData();

  const title = formData.get("title") as string;
  const writer = formData.get("writer") as string;
  const contents = formData.get("contents") as string;

  // 이미지만 배열 데이터로 가공
  let imagefiles: string[] = [];
  for (const key of formData.keys()) {
    if (key.includes("file")) {
      const value = formData.get(key) as string;
      imagefiles.push(value);
    }
    console.log("imagefiles length", imagefiles.length);
  }

  // 이미지만 배열 데이터로 가공
  let ingredients: string[] = [];
  for (const key of formData.keys()) {
    if (key.includes("ingredient")) {
      const value = formData.get(key) as string;
      ingredients.push(value);
    }
    console.log("ingredients length", ingredients.length);
  }

  // 레시피 등록
  try {
    const res = await prisma.recipe.create({
      data: {
        writer,
        title,
        ingredients: ingredients ? ingredients : [],
        contents,
        image: imagefiles ? imagefiles : [],
        userId: session?.user.id,
      },
    });
    return NextResponse.json({ success: true, data: res });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return Response.json(error);
  }
}

// 레시피 수정
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  // 현재 로그인 상태인지 확인
  if (!session?.user) {
    return Response.json("======= 유저 없음!!!! =========");
  }

  // const data = await req.json();
  const formData = await req.formData();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const writer = formData.get("writer") as string;
  const contents = formData.get("contents") as string;

  // 이미지만 배열 데이터로 가공
  let imagefiles: string[] = [];
  for (const key of formData.keys()) {
    if (key.includes("file")) {
      const value = formData.get(key) as string;
      imagefiles.push(value);
    }
    console.log("imagefiles length", imagefiles.length);
  }

  // 이미지만 배열 데이터로 가공
  let ingredients: string[] = [];
  for (const key of formData.keys()) {
    if (key.includes("ingredient")) {
      const value = formData.get(key) as string;
      ingredients.push(value);
    }
    console.log("ingredients length", ingredients.length);
  }

  // 레시피 수정
  try {
    const res = await prisma.recipe.update({
      where: { id: parseInt(id) },
      data: {
        writer,
        title,
        ingredients: ingredients ? ingredients : [],
        contents,
        image: imagefiles ? imagefiles : [],
        userId: session?.user.id,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json({ success: true, data: res });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return Response.json(error);
  }
}

// 레시피 삭제
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const result = await prisma.recipe.delete({
        where: { id: parseInt(id) },
      });
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
