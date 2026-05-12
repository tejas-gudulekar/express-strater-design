import fs from 'fs';
import path from 'path';
import multer, { diskStorage } from "multer";
import { Request } from "express";

// Function to generate a unique filename using the current timestamp and a random number
const multerUniqueFileName = (file: Express.Multer.File) => {
  const extension = path.extname(file.originalname); // Get the file extension
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`; // Generate unique filename
};

// Function to create an upload middleware
const createUploadMiddleware = (
  destination: string, // Destination directory for uploaded files
  fileFilter: (file: Express.Multer.File) => boolean, // Function to filter allowed files
  generateFilename?: (req: Request, file: Express.Multer.File) => Promise<string>, // Optional async function to generate custom filenames
) => {
  // Check if the destination directory exists, if not, create it
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true }); // Create the directory recursively
  }

  // Return multer middleware configured with custom storage and file filter
  return multer({
    storage: diskStorage({
      destination(req: Request, file: Express.Multer.File, cb) {
        cb(null, destination); // Set the destination directory for the uploaded file
      },
      filename: async (req: Request, file: Express.Multer.File, cb) => {
        try {
          let fileName: string;
          // If generateFilename function is provided, use it to generate the filename
          if (!generateFilename) {
            fileName = multerUniqueFileName(file); // Generate a unique filename if no custom function provided
            cb(null, fileName); // Pass the filename to the callback
          } else {
            fileName = await generateFilename(req, file); // Await the custom filename generation function
            cb(null, fileName); // Pass the generated filename to the callback
          }
        } catch (error) {
          cb(error as Error, ""); // Handle any errors during filename generation
        }
      },
    }),

    // File filter function to allow or disallow files based on custom logic
    fileFilter: (req: Request, file: Express.Multer.File, cb) => {
      if (fileFilter(file)) {
        cb(null, true); // If file is allowed, pass true to the callback
      } else {
        cb(null, false); // If file is not allowed, pass false to the callback
        cb(new Error("This file format is not allowed!")); // Pass an error message for disallowed file formats
      }
    },
  });
};

// File filter function to allow only image files
const imageFileFilter = (file: Express.Multer.File) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedMimeTypes.includes(file.mimetype);
};

// File filter function to allow only excel files
const excelFileFilter = (file: Express.Multer.File) => {
    const allowedMimeTypes = [
      'application/vnd.ms-excel', // MIME type for .xls files
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // MIME type for .xlsx files
    ];
    return allowedMimeTypes.includes(file.mimetype);
};

export const scriptTermExcelUpload = createUploadMiddleware(
    path.join(process.cwd(), 'uploads', 'scriptTermsExcel'), 
    excelFileFilter
);

export const scriptSubjectExcelUpload = createUploadMiddleware(
    path.join(process.cwd(), 'uploads', 'scriptSubjectExcel'), 
    excelFileFilter
);

export const scriptMarksExcelUplod = createUploadMiddleware(
  path.join(process.cwd(), 'uploads', 'scriptMarksExcel'), 
  excelFileFilter
)

export const admissionPhotosExcelUpload = createUploadMiddleware(
  path.join(process.cwd(), 'uploads', 'scriptMarksExcel'), 
  excelFileFilter
)

export const studentContinuationMiddleware = createUploadMiddleware(
  path.join(process.cwd(), 'uploads', 'studentsPhotoAndSignature'), 
  imageFileFilter,
)

export const redegreePhotoSignatureUpload = createUploadMiddleware(
  path.join(process.cwd(), 'uploads', 'studentsPhotoAndSignature'), 
  imageFileFilter,
)


export default createUploadMiddleware; // Export the function as default
