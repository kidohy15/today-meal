import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fetchData = "test 중입니다.";

  console.log("fetchData" ,fetchData);
  res.status(200).json(fetchData);
}