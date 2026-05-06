import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

const contact = {
  name: process.env.CINDRAL_CONTACT_NAME || "Cindral",
  organization: process.env.CINDRAL_CONTACT_ORGANIZATION || "Cindral",
  phone: process.env.CINDRAL_CONTACT_PHONE || "",
  email: process.env.CINDRAL_CONTACT_EMAIL || "",
  url: process.env.CINDRAL_CONTACT_URL || "https://cindral.org",
};

const logoBase64 = readFileSync(
  join(process.cwd(), "public", "cindral-logo.png"),
).toString("base64");

export function GET() {
  const card = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardValue(contact.name)};;;;`,
    `FN:${escapeVCardValue(contact.name)}`,
    `ORG:${escapeVCardValue(contact.organization)}`,
    contact.phone ? `TEL;TYPE=CELL:${escapeVCardValue(contact.phone)}` : "",
    contact.email ? `EMAIL;TYPE=WORK:${escapeVCardValue(contact.email)}` : "",
    contact.url ? `URL:${escapeVCardValue(contact.url)}` : "",
    foldVCardLine(`PHOTO;ENCODING=b;TYPE=PNG:${logoBase64}`),
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");

  return new NextResponse(card, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "Content-Disposition": 'inline; filename="cindral.vcf"',
      "Content-Type": "text/vcard; charset=utf-8",
    },
  });
}

function foldVCardLine(line: string) {
  const maxLineLength = 75;
  const chunks = [];

  for (let index = 0; index < line.length; index += maxLineLength) {
    chunks.push(line.slice(index, index + maxLineLength));
  }

  return chunks
    .map((chunk, index) => (index === 0 ? chunk : ` ${chunk}`))
    .join("\r\n");
}

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}
