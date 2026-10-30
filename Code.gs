const SPREADSHEET_ID = '1ZFIbTYDn7snTXsW6-5GyAQwfCvd4J7BEgAADDcV58gU';
const SHEET_NAME = '2026_公司旅遊';
const HEADER_ROW = ['姓名', 'Email', '所屬單位', '手機', '職稱'];

function ensureSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    const firstSheet = spreadsheet.getSheets()[0];
    if (firstSheet && firstSheet.getLastRow() === 0 && spreadsheet.getSheets().length === 1) {
      firstSheet.setName(SHEET_NAME);
      sheet = firstSheet;
    } else {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
  }

  sheet.getRange(1, 1, 1, HEADER_ROW.length).setValues([HEADER_ROW]);
  sheet.getRange('D:D').setNumberFormat('@');
  return sheet;
}

function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing registration request body.');
  }

  const payload = JSON.parse(e.postData.contents);
  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim();
  const phone = String(payload.phone || '').trim();

  if (!name || !email || !phone) {
    throw new Error('Name, email, and phone are required.');
  }

  const sheet = ensureSheet();
  const row = [
    name,
    email,
    String(payload.department || '').trim(),
    phone,
    String(payload.title || '').trim()
  ];
  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  sheet.getRange(nextRow, 4).setNumberFormat('@');

  return ContentService.createTextOutput(JSON.stringify({ status: 'success', row: nextRow }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', sheetName: SHEET_NAME }))
    .setMimeType(ContentService.MimeType.JSON);
}
