import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const fetchData = "test 중입니다.";
  const fetchData2 = req;

  return NextResponse.json(fetchData);
}
