/**
 * GASXPERT / YES GAS AGENCY — Google Apps Script Lead Capturing
 * Supports both GET and POST requests with race-condition locking.
 * 
 * Columns:
 * 1. Timestamp
 * 2. Name
 * 3. Phone
 * 4. Service
 * 5. Area / Address
 * 6. Preferred Time
 * 7. Problem Description
 * 8. Source
 * 9. Booking
 */

function doGet(e) {
  return handleLeadSubmission(e);
}

function doPost(e) {
  return handleLeadSubmission(e);
}

function handleLeadSubmission(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // 10 seconds lock to prevent race conditions

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName("Booking") || doc.getActiveSheet();

    // Check if headers exist, if not create them automatically
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Phone",
        "Service",
        "Area / Address",
        "Preferred Time",
        "Problem Description",
        "Source",
        "Booking"
      ]);
      // Format header row bold with brand orange color
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#FF7A00");
      headerRange.setFontColor("#ffffff");
    }

    var params = {};

    // Check if data is received as JSON, URL-encoded string, or query parameters
    if (e && e.postData && e.postData.contents) {
      try {
        params = JSON.parse(e.postData.contents);
      } catch (err) {
        var raw = e.postData.contents.split("&");
        for (var i = 0; i < raw.length; i++) {
          var pair = raw[i].split("=");
          params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
        }
      }
    } else if (e && e.parameter) {
      params = e.parameter;
    }

    // Extract values with flexible fallbacks
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    var name = params.name || params.fullName || "";
    var phone = params.phone || params.mobile || "";
    var source = params.source || "Website";

    var service = params.service || (source === "Auto Popup" ? "Deep Burner Cleaning" : "Gas Stove Repair");
    var address = params.area || params.address || "";
    var time = params.time || params.preferredTime || params.preferred_time || "Immediate / Not Specified";
    var problem = params.problem || params.description || "";
    var booking = params.booking || "";

    // Only append if name or phone is provided
    if (name || phone) {
      sheet.appendRow([
        timestamp,
        name,
        phone,
        service,
        address,
        time,
        problem,
        source,
        booking
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Lead recorded successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
