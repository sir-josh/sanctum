import prisma from "../../../prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(req.body);
  const { campaignId, amount, donor } = req.body;
  console.log(req.body);

  if (req.method === "POST") {
    try {
      const donation = await prisma.donation.create({
        data: {
          campaignId,
          amount,
          donor,
        },
      });
      res.status(200).json(donation);
    } catch (e) {
      res.status(500).json({ msg: e });
    }
  } else {
    res.status(400).json({ msg: "Not Found" });
  }
}
