import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
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
