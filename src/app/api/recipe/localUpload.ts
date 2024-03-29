import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { writeFile } from "fs/promises";
import { join } from "path";
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
  // const data = await req.json()
  const { searchParams } = new URL(req.url);
  // const id = params.id
  console.log("서버=====================");
  console.log("서버 searchParams", searchParams);

  // const searchParams = req.nextUrl.searchParams;
  // const query = searchParams.get("id");

  const body = req;
  console.log("서버 searchParams", searchParams);
  // console.log("서버 req", req.url);

  const session = await getServerSession(authOptions);
  const user = searchParams.get("user");

  const id = searchParams.get("id");
  const search = searchParams.get("searchKeyword");
  const page = searchParams.get("page") ?? "1";
  const skipPage = parseInt(page) - 1;
  const count = await prisma.recipe.count();
  console.log("서버 search", search);
  console.log("서버 page", page);

  // id 가 있는 경우 상세페이지
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
    // 전체 목록 가져오기

    const userCheck = searchParams.get("userCheck") ?? null;
    const session = await getServerSession(authOptions);
    console.log("server user:", user);
    console.log("server session:", session);

    const count = await prisma.recipe.count({
      where: {
        userId: userCheck ? session?.user.id : {},
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
    console.log("server res:", recipeData);

    // res.status(200).json(fetchData);
    // return Response.json({ })
    return Response.json({
      page: parseInt(page),
      data: recipeData,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
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
  const file: File | null = formData.get("file") as unknown as File;
  const title: any = formData.get("title");
  const ingredients: any = formData.get("contents");
  const contents: any = formData.get("contents");
  console.log("=======등록 서버 files =======", file);
  console.log("=======등록 서버 files =======", title);
  console.log("=======등록 서버 files =======", contents);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("./", "public/images", file.name);
  await writeFile(path, buffer);
  console.log(`path : ${path}`);

  // 레시피 등록
  try {
    const res = await prisma.recipe.create({
      data: {
        title,
        ingredients,
        contents,
        // image: file?.name,
        userId: session?.user.id,
      },
    });
    return NextResponse.json({ success: true, data: res });

    // const files = formData.getAll('image')[0]
    // console.log("=======등록 서버 files=======", files);
    // const imageFile: File | null = formData.get("imageFile") as unknown as File;

    // const bytes = await imageFile.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    // const path = join("/", "tmp", imageFile.name);
    // await writeFile(path, buffer);
    // console.log(`${path}`);

    // return NextResponse.json({ success: true });

    // const file = formData.getAll("files")[0];
    // const filePath = `./public/file/${file.name}`;
    // await pump(file.stream(), fs.createWriteStream(filePath));
    // return NextResponse.json({ status: "success", data: file.size });

    // const { data: recipe } = await req.json();
    // const data = await req.json();
    // // console.log("=======서버 data=======", recipe);
    // console.log("=======서버 formData=======", formData);
    // console.log("=======서버 file=======", file);

    // const result = await prisma.recipe.create({
    //   data: { ...data, userId: session?.user.id },
    // });

    // return res.status(200).json(result);
    // return Response.json(result);
    return Response.json("ok");
  } catch (error) {
    console.error("Error creating recipe:", error);
    return Response.json(error);
  }
}

// 레시피 수정
export async function PUT(req: Request) {
  try {
    const data = await req.json();

    // const { searchParams } = new URL(req.url);
    // const id = searchParams.get("id");
    const id = data.id;

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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log("=========== 삭제 req ================", req);

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
