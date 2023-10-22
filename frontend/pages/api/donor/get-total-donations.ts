import prisma from "../../../prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { donor } = req.query;

  if (req.method === "GET") {
    try {
      const donations = await prisma.donation.findMany({
        where: {
          //@ts-ignore
          donor,
        },
        include: {
          campaign: true,
        },
      });

      res.status(200).json(donations);
    } catch (e) {
      res.status(500).json({ msg: e });
    }
  } else {
    res.status(400).json({ msg: "Not Found" });
  }
}
