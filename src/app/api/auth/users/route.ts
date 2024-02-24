import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 유저 목록 조회
export async function GET(req: Request, context: any) {
  const { searchParams } = new URL(req.url);

  const body = req;
  const { params } = context; // '1'
  const id = searchParams.get("id");
  const search = searchParams.get("searchKeyword");

  if (id) {
    const data = await prisma.recipe.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    return Response.json(data);
  } else {
    const data = await prisma.recipe.findMany({
      orderBy: { id: "desc" },
      where: {
        title: search ? { contains: search } : {},
      },
    });

    return Response.json(data);
  }
}

// 회원가입
export async function POST(req: Request) {
  // 회원가입 유저 등록
  try {
    const data = await req.json();
    const result = await prisma.recipe.create({
      data: { ...data },
    });

    return Response.json({ result });
  } catch (error) {
    console.error("Error creating recipe:", error);
  }
}

// 회원 정보 수정
export async function PUT(req: Request) {
  try {
    const data = await req.json();
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

// 회원탈퇴
export async function DELETE(req: Request) {
  // 회원정보 삭제
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
