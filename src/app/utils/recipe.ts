import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

const prisma = new PrismaClient();

// 레시피 목록 조회
export async function handler(req: Request) {
  if (req.method === "GET") {
    const data = await prisma.recipe.findMany({
      orderBy: { id: "desc" },
    });

    return Response.json(data);
  } else if (req.method === "POST") {
    // 레시피 등록
    try {
      const data = req.body;
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
}
