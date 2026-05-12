import xlsx from "xlsx";

export const convertExcelFileToJsonUsingXlsx = (path: string) => {
  // Read the file using pathname
  const file = xlsx.readFile(path);

  // Grab the sheet info from the file
  const sheetNames = file.SheetNames;
  const totalSheets = sheetNames.length;

  // Variable to store our data
  const parsedData = [];

  // Loop through sheets
  for (let i = 0; i < totalSheets; i += 1) {
    // Convert to json using xlsx
    const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]], { raw: false });

    // Skip header row which is the colum names
    // tempData.shift();

    // Filter out empty rows
    const filteredJson = tempData.filter((row) => Object.values(row as object).some((cellValue) => cellValue !== null && cellValue !== ""));

    // Add the sheet's json to our data array
    parsedData.push(...filteredJson);
  }

  return parsedData;
};

export const jsonToXlsx = (json: unknown[]): Buffer => {
  // Convert JSON to a worksheet
  const worksheet = xlsx.utils.json_to_sheet(json);

  // Create a new workbook and add the worksheet to it
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate the Excel file in memory and return it as a Buffer
  const excelBuffer = xlsx.write(workbook, { type: "buffer", bookType: "csv" });

  return excelBuffer;
};

export const toCamelCase = (input: string): string => {
  return input
    .split(/[^a-zA-Z0-9]+/) // Split by non-alphanumeric characters
    .map((word, index) => {
      if (index === 0) {
        // Lowercase the first word
        return word.toLowerCase();
      }
      // Capitalize the first letter of each subsequent word
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
};

//function for generate excel file buffer
export const generateExcelFileBuffer = (data: [], columnHeaders: string[]): Buffer => {
  // Create a new workbook and a worksheet
  const workbook = xlsx.utils.book_new();

  const worksheetData = [columnHeaders]; // create sepeate column headers

  // Add each student's details as a new row with respected headers
  data.forEach((row) => {
    const dataRow = columnHeaders.map((header) => row[header] || "");
    worksheetData.push(dataRow);
  });

  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
  xlsx.utils.book_append_sheet(workbook, worksheet, "Student Details");

  const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
  return buffer;
};

export function jsonParser(data: Array<any> | object | string): any {
  const json: string = JSON.stringify(data);
  return JSON.parse(json, (key: string, value: any) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }
    return value;
  });
}

// get current date format 13/07/2024
export const getCurrentDate = () => {
  let currentDate = new Date();

  // Extract day, month, and year
  let day: any = currentDate.getDate();
  let month: any = currentDate.getMonth() + 1; // Month starts from 0, so add 1
  let year = currentDate.getFullYear();

  // Format day and month to always have two digits
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  // Create formatted date string
  let formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

// get current time format 11:59:11 AM
export function getCurrentTime() {
  let today = new Date();
  let hour = today.getHours();
  let minute: any = today.getMinutes();
  let second: any = today.getSeconds();
  let ampm = hour >= 12 ? "PM" : "AM";

  // Convert hour from 24-hour to 12-hour format
  hour = hour % 12;
  hour = hour ? hour : 12; // Handle midnight (0 hours)

  // Add leading zeroes to minute and second if less than 10
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  // Construct the time string in desired format
  let timeString = hour + ":" + minute + ":" + second + " " + ampm;
  return timeString;
}

//function to convert number to words  ex: 57 (fifty seven)
export function numberToWords(num: number): string {
  if (num === 0) return "zero";

  const belowTwenty: string[] = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens: string[] = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const thousands: string[] = ["", "thousand", "million", "billion"];

  function helper(num: number): string {
    if (num === 0) return "";
    else if (num < 20) return belowTwenty[num] + " ";
    else if (num < 100) return tens[Math.floor(num / 10)] + " " + helper(num % 10);
    else if (num < 1000) return belowTwenty[Math.floor(num / 100)] + " hundred " + (num % 100 !== 0 ? "and " : "") + helper(num % 100);
    else {
      for (let i = 0; i < thousands.length; i++) {
        let unit = Math.pow(1000, i);
        if (num < unit * 1000) {
          return helper(Math.floor(num / unit)) + thousands[i] + " " + helper(num % unit);
        }
      }
    }
    return "";
  }

  return helper(num).trim();
}
