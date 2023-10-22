-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
