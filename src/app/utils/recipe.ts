import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

const prisma = new PrismaClient();

// 레시피 목록 조회
export async function handler(req:Request) {
  if (req.method === "GET") {
    // const data = await req.json()

    // const { id } = req.query;
    console.log("서버 req", req);
    console.log("서버 req", req);
    console.log("서버 req", req);

    const data = await prisma.recipe.findMany({
      orderBy: { id: "desc" },
    });

    console.log("server data:", data);

    // return res.status(200).json(data);
    return Response.json(data);
  } else if (req.method === "POST") {
    // 레시피 등록
    try {
      const data = req.body;
      // const data = await req.json();
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
}
