import { google } from "googleapis";
import { NextResponse } from "next/server";

type LeadPayload = {
  name?: unknown;
  organizationName?: unknown;
  phone?: unknown;
  email?: unknown;
  preferredMode?: unknown;
  additionalNotes?: unknown;
};

const allowedModes = new Set(["Mail", "Phone", "Whatsapp"]);

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const lead = normalizeLead(payload);

  if (!lead.ok) {
    return NextResponse.json({ message: lead.message }, { status: 400 });
  }

  try {
    await appendLeadToSheet(lead.value);
    return NextResponse.json({ message: "Lead saved." });
  } catch (error) {
    console.error("Google Sheets submission failed", error);
    return NextResponse.json(
      { message: "We could not save your details right now." },
      { status: 500 },
    );
  }
}

function normalizeLead(payload: LeadPayload):
  | { ok: true; value: Record<string, string> }
  | { ok: false; message: string } {
  const name = stringValue(payload.name);
  const organizationName = stringValue(payload.organizationName);
  const phone = stringValue(payload.phone);
  const email = stringValue(payload.email);
  const preferredMode = stringValue(payload.preferredMode);
  const additionalNotes = stringValue(payload.additionalNotes);

  if (!name || !organizationName || !phone || !email || !preferredMode) {
    return { ok: false, message: "Please complete all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (!isValidPhone(phone)) {
    return {
      ok: false,
      message:
        "Please enter a valid phone number using digits, spaces, +, -, or brackets only.",
    };
  }

  if (!allowedModes.has(preferredMode)) {
    return {
      ok: false,
      message: "Please choose Mail, Phone, or Whatsapp as the preferred mode.",
    };
  }

  return {
    ok: true,
    value: {
      name,
      organizationName,
      phone,
      email,
      preferredMode,
      additionalNotes,
    },
  };
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidPhone(phone: string) {
  const allowedCharacters = /^[0-9+()\-\s]+$/;
  const digitCount = phone.replace(/\D/g, "").length;

  return allowedCharacters.test(phone) && digitCount >= 7 && digitCount <= 15;
}

async function appendLeadToSheet(lead: Record<string, string>) {
  const spreadsheetId = requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const clientEmail = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = requireEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Leads";

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const submittedAt = formatSubmittedDate(new Date());
  const safeSheetName = quoteSheetName(sheetName);

  await ensureSheetExists(sheets, spreadsheetId, sheetName);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${safeSheetName}!A:G`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          submittedAt,
          lead.name,
          lead.organizationName,
          lead.phone,
          lead.email,
          lead.preferredMode,
          lead.additionalNotes,
        ],
      ],
    },
  });
}

async function ensureSheetExists(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  sheetName: string,
) {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets(properties(title))",
  });

  const exists = spreadsheet.data.sheets?.some(
    (sheet) => sheet.properties?.title === sheetName,
  );

  if (exists) return;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title: sheetName,
            },
          },
        },
      ],
    },
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${quoteSheetName(sheetName)}!A1:G1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          "Submitted At",
          "Name",
          "Organization Name",
          "Phone",
          "Email",
          "Preferred Mode",
          "Additional Notes",
        ],
      ],
    },
  });
}

function quoteSheetName(sheetName: string) {
  return `'${sheetName.replace(/'/g, "''")}'`;
}

function formatSubmittedDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}
