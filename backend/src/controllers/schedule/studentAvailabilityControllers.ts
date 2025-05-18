import { Request, Response } from "express";

export async function getMyAvailability(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: "Studnet availability",
  });
}

export async function addMyMultipleAvailability(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: "Studnet post multiple availability",
  });
}

export async function updateMyMultipleAvailability(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: "Studnet update multiple availability",
  });
}

export async function deleteMyMultipleAvailability(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: "Studnet delete multiple availability",
  });
}

export async function getMysingleAvailability(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: "Studnet single availability",
  });
}

export async function addMySingleAvailability(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: "Studnet add single availability",
  });
}

export async function updateMysingleAvailability(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: "Studnet update single availability",
  });
}

export async function deleteMysingleAvailability(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: "Studnet delete single availability",
  });
}
