import { drizzle } from "drizzle-orm/neon-http";
import ImageKit from "imagekit";
import dummyBooks from "../../dummybooks.json";
import { books } from "./schema";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imagekitObjcet = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});
const UploadToImagekit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imagekitObjcet.upload({
      file: url,
      fileName,
      folder,
    });
    return response.filePath;
  } catch (error) {
    console.log(error);
  }
};

const seed = async () => {
  console.log("started seading data...");
  try {
    for (const book of dummyBooks) {
      console.log(
        "book data=============================================================\n",
        book
      );
      const coverUrl = (await UploadToImagekit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/cover"
      )) as string;

      console.log("Cover url data...");
      const videoUrl = (await UploadToImagekit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      )) as string;
      console.log("video url data...");
      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
      console.log("insert data...");
    }
    console.log("data seeding successfull!");
  } catch (error) {
    console.log("error in initial seeding\nError=", error);
  }
};

seed();
