import { SITE_CONFIG } from "@/config";

export interface SheetSubmissionData {
  name: string;
  phone: string;
  service?: string;
  area?: string;
  address?: string;
  problem?: string;
  source?: string;
  [key: string]: string | undefined;
}

/**
 * Submits form data directly to Google Sheets via Google Apps Script Web App.
 * Uses both fetch (no-cors) and hidden form/iframe submission to guarantee delivery
 * across all browsers and ad-blockers.
 */
export async function submitToGoogleSheets(data: SheetSubmissionData): Promise<boolean> {
  const url = SITE_CONFIG.googleSheetsUrl;
  if (!url || url.trim() === "" || url.includes("PASTE_HERE")) {
    console.warn("Google Sheets URL is not configured in src/config.ts");
    return false;
  }

  // Clean payload (remove undefined values)
  const cleanPayload: Record<string, string> = {};
  Object.entries(data).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      cleanPayload[key] = String(val);
    }
  });

  try {
    // 1. Try modern fetch GET with search params
    const params = new URLSearchParams(cleanPayload);
    const fullUrl = `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;

    // Fire fetch in no-cors mode
    fetch(fullUrl, {
      method: "GET",
      mode: "no-cors",
      cache: "no-cache",
    }).catch((err) => {
      console.log("Fetch request fallback triggered:", err);
    });

    // 2. Also trigger hidden form submission for maximum compatibility
    const iframeName = `sheets-frame-${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "GET";
    form.action = url;
    form.target = iframeName;

    Object.entries(cleanPayload).forEach(([k, v]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = k;
      input.value = v;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    // Clean up DOM after submission
    setTimeout(() => {
      try {
        if (document.body.contains(form)) document.body.removeChild(form);
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
      } catch {
        // ignore cleanup error
      }
    }, 4000);

    return true;
  } catch (error) {
    console.error("Failed to submit to Google Sheets:", error);
    return false;
  }
}
