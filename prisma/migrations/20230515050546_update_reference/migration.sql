-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "usersId" INTEGER;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
