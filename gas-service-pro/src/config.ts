/**
 * ╔══════════════════════════════════════════════════════╗
 *  GASXPERT — SITE CONFIGURATION
 *  All editable values are here. Change once, updates everywhere.
 * ╚══════════════════════════════════════════════════════╝
 */

export const SITE_CONFIG = {

  // ── Brand ───────────────────────────────────────────
  brandName:   "Gasxpert",
  tagline:     "Gas Stove Repair at Your Doorstep",

  // ── Phone / WhatsApp ─────────────────────────────────
  // Format for display: "+91 XXXXX XXXXX"
  // Format for phoneRaw: "91XXXXXXXXXX" (country code + number, no spaces)
  phone:       "+91 93907 13293",
  phoneRaw:    "919390713293",
  whatsapp:    "919390713293",

  // ── Email ────────────────────────────────────────────
  email:       "support@gasxpert.in", // ← CHANGE TO CLIENT EMAIL

  // ── Location ─────────────────────────────────────────
  city:        "Bengaluru",           // ← CHANGE TO CLIENT CITY
  serviceArea: "Bengaluru",           // ← CHANGE TO CLIENT SERVICE AREA
  address:     "Koramangala, Bengaluru — 560034", // ← CHANGE TO CLIENT ADDRESS
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.88653909217!2d77.49085444999999!3d12.953959999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000",
  // ↑ CHANGE: Go to Google Maps → search your location → Share → Embed a map → copy src URL

  // ── Working Hours ────────────────────────────────────
  workingHours: "8:00 AM – 9:00 PM",
  workingDays:  "Everyday, including Sundays",

  // ── Google Sheets Integration ─────────────────────────
  // SETUP INSTRUCTIONS:
  // 1. Create a new Google Sheet and name the first tab "Bookings"
  // 2. Go to Extensions → Apps Script
  // 3. Paste the code from GOOGLE_SHEETS_SETUP.js (in project root)
  // 4. Click Deploy → New deployment → Web app
  //    Execute as: Me | Who has access: Anyone
  // 5. Copy the Web App URL and paste it below
  googleSheetsUrl: "https://script.google.com/macros/s/AKfycbwkzZTALcJEklHDRNu7wnwroCSFIsQ5m7s4x8SiQhJJKBsoDe0Beox-ptOyH1m2pkRRvA/exec",

};
