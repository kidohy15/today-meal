import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// comments 목록 조회
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";
  const skipPage = parseInt(page) - 1;

  const recipeId = searchParams.get("recipeId");
  const user = searchParams.get("user");

  const session = await getServerSession(authOptions);

  const count = await prisma.comment.count({
    where: {
      recipeId: recipeId ? parseInt(recipeId) : {},
      userId: user ? session?.user.id : {},
    },
  });

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      recipeId: recipeId ? parseInt(recipeId) : {},
      userId: user ? session?.user.id : {},
    },
    take: 10,
    skip: skipPage * 10,
    include: {
      user: true,
      recipe: true,
    },
  });
  return Response.json({
    data: comments,
    page: parseInt(page),
    totalCount: count,
    totalPage: Math.ceil(count / 10),
  });
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

  } catch (error) {
    console.error("Error creating comments:", error);
    return Response.json(error);
  }
}

// comment 삭제
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("commentId");
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
