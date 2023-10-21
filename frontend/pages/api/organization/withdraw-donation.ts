import prisma from "../../../prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { campaignId } = req.body;

  if (req.method === "POST") {
    try {
      const campaign = await prisma.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          isActive: false,
        },
      });

      res.status(200).json(campaign);
    } catch (e) {
      res.status(500).json({ msg: e });
    }
  } else {
    res.status(400).json({ msg: "Not Found" });
  }
}
