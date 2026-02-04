import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { sendContactEmail as sendContactEmail } from "../helpers/sendContactEmail.js";

const router = Router();

router.post(
  "/",
  async function (request: Request, response: Response): Promise<any> {
    const data = request.body;

    if (!data.name || !data.email || !data.message) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Bad request" });
    }

    console.log(data);

    try {
      const info = await sendContactEmail(data);

      console.log("MAIL SENT:", info.data.id);
      return response
        .status(StatusCodes.OK)
        .json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to send message" });
    }
  },
);

export default router;
