import prisma from "../../../prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { orgId, address } = req.body;
  console.log(orgId, address);

  if (req.method === "POST") {
    try {
      const org = await prisma.organization.update({
        where: {
          id: orgId,
          owner: address,
        },
        data: {
          isApproved: true,
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
