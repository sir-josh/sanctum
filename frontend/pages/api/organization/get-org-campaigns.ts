import prisma from "../../../prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { orgId } = req.query;
  if (req.method === "GET") {
    try {
      const campaigns = await prisma.campaign.findMany({
        where: {
          orgId,
        },
        include: {
          organizer: true,
        },
      });

      res.status(200).json(campaigns);
    } catch (e) {
      res.status(500).json({ msg: e });
    }
  } else {
    res.status(400).json({ msg: "Not Found" });
  }
}
