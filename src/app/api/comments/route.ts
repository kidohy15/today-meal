import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// comments 목록 조회
export async function GET(req: Request, context: any) {
  const { searchParams } = new URL(req.url);
  const { params } = context; // '1'
  console.log("서버 params", params);
  console.log("서버 context", context);
  console.log("서버 searchParams", searchParams);

  const recipeId = searchParams.get("recipeId");
  // const search = searchParams.get("");
  console.log("서버 recipeId", recipeId);

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      recipeId: recipeId ? parseInt(recipeId) : {},
    },
    include: {
      user: true,
    },
  });
  return Response.json(comments);
}

// comments 등록
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // 현재 로그인 상태인지 확인
  if (!session?.user) {
    return Response.json("======= 유저 없음!!!! =========");
  }

  // comments 등록
  try {
    const { recipeId, contents } = await req.json();
    console.log("======= 서버 data =======", recipeId);
    console.log("======= 서버 data =======", contents);

    const result = await prisma.comment.create({
      // tobe : 댓글 기능 확인 먼저하려고 임시임 추후 타입 지정해야함
      // @ts-ignore
      data: {
        recipeId,
        contents,
        userId: session?.user.id,
      },
    });
    return Response.json(result);

    // return res.status(200).json(result);
  } catch (error) {
    console.error("Error creating comments:", error);
    // return data.status(500).json({ error: "Internal Server Error" });
    return Response.json(error);
  }
}

// comment 삭제
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("commentId");
  console.log("=========== 삭제 searchParams ================", searchParams);
  try {
    // const data = await req.json();

    if (id) {
      const res = await prisma.comment.delete({
        where: { id: parseInt(id) },
      });
      return Response.json({
        status: 200,
        message: "comment deleted successfully",
      });
    }
    return Response.json({
      status: 500,
      message: "failed",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return Response.json({
      status: 500,
      message: "failed",
    });
  }
}
