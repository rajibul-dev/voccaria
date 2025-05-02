import { Request, Response } from "express";

export async function getUser(
  request: Request,
  response: Response
): Promise<any> {}

export async function getAllUsers(
  request: Request,
  response: Response
): Promise<any> {}

export async function showMe(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    success: true,
    user: request.user,
  });
}

export async function updateUser(
  request: Request,
  response: Response
): Promise<any> {}

export async function updateAvatar(
  request: Request,
  response: Response
): Promise<any> {}

export async function removeAvatar(
  request: Request,
  response: Response
): Promise<any> {}
