import prisma from "../../../prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { address } = req.query;

  if (req.method === "GET") {
    try {
      const org = await prisma.organization.findFirst({
        where: {
          owner: address,
        },
        include: {
          campaign_list: true,
        },
      });

      res.status(200).json(org);
    } catch (e) {
      res.status(500).json({ msg: e });
    }
  } else {
    res.status(400).json({ msg: "Not Found" });
  }
}
