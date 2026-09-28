import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { buildVCard } from "@/lib/contact";

export async function GET() {
  let photo: string | undefined;
  try {
    const bytes = await readFile(join(process.cwd(), "public/profile/terence-l-bolden.jpg"));
    if (bytes.byteLength <= 70_000) photo = bytes.toString("base64");
  } catch {
    photo = undefined;
  }

  return new NextResponse(buildVCard(photo), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="Terence-L-Bolden.vcf"',
      "Cache-Control": "no-store",
    },
  });
}
