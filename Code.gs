const SHEET_NAME = '2026_公司旅遊';
const HEADER_ROW = ['姓名', 'Email', '所屬單位', '手機', '職稱'];

function ensureSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADER_ROW.length).setValues([HEADER_ROW]);
  }

  const lastColumn = sheet.getLastColumn();
  if (lastColumn < HEADER_ROW.length) {
    sheet.getRange(1, lastColumn + 1, 1, HEADER_ROW.length - lastColumn).setValues([Array(HEADER_ROW.length - lastColumn).fill('')]);
  }

  const phoneColumn = HEADER_ROW.indexOf('手機') + 1;
  if (phoneColumn > 0) {
    const phoneRange = sheet.getRange(2, phoneColumn, Math.max(1, sheet.getLastRow() - 1), 1);
    phoneRange.setNumberFormat('@');
  }

  return sheet;
}

function doPost(e) {
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
  const payload = JSON.parse(raw || '{}');
  const sheet = ensureSheet();

  const row = [
    payload.name || '',
    payload.email || '',
    payload.department || '',
    String(payload.phone || ''),
    payload.title || ''
  ];

  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

  const phoneColumn = HEADER_ROW.indexOf('手機') + 1;
  if (phoneColumn > 0) {
    sheet.getRange(nextRow, phoneColumn, 1, 1).setNumberFormat('@');
  }

  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'success',
      rows: sheet.getLastRow() - 1,
      sheetName: SHEET_NAME
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'ok',
      sheetName: SHEET_NAME,
      message: 'Google Apps Script is ready.'
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
