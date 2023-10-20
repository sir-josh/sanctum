import prisma from "../../../prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { name, description, address } = req.body;
  console.log(address);

  console.log(name);

  if (req.method === "POST") {
    try {
      const organization = await prisma.organization.create({
        data: {
          owner: address,
          name: name,
          description: description,
        },
      });
      res.status(200).json(organization);
    } catch (e) {
      res.status(500).json({ msg: e });
    }
  } else {
    res.status(400).json({ msg: "Not Found" });
  }
}
