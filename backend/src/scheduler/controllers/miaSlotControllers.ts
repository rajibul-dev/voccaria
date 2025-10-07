import { Request, Response } from "express";

export async function getAllMiaSlots(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: "Get all mia slots",
  });
}

export async function createMultipleMiaSlots(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: "Create Mia's slots",
  });
}

export async function updateMultipleMiaSlots(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: "Update Mia's slots",
  });
}

export async function deleteMultipleMiaSlots(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: "Delete Mia's slots",
  });
}

export async function getSingleMiaSlot(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: "Get Mia's slot",
  });
}

export async function createSingleMiaSlot(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: "Create Mia's slot",
  });
}

export async function updateSingleMiaSlot(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: "Update Mia's slot",
  });
}

export async function deleteSingleMiaSlot(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: "Delete Mia's slot",
  });
}
