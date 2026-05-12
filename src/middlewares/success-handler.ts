import { Request, Response } from 'express';

// Define a success middleware function
function sendSuccessResponse<T extends object>(req: Request, res: Response, data: T) {
    const response = {
        status: 200,
        data: data,
        error: null,
    };

    return res.status(200).json(response);
}

function sendBufferAsFile(req: Request, res: Response, buffer: Buffer, fileName: string) {
  // Set headers to indicate a file download
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

  // Send the buffer as the response
  return res.status(200).send(buffer);
}

export { sendSuccessResponse, sendBufferAsFile };
