import { Request, Response } from "express";

export function register(request: Request, response: Response) {}

export function verifyEmail(request: Request, response: Response) {}

export function requestNewVerificationEmail(
  request: Request,
  response: Response
) {}

export function forgotPassword(request: Request, response: Response) {}

export function login(request: Request, response: Response) {}

export function resetPassword(request: Request, response: Response) {}

export function changePassword(request: Request, response: Response) {}

export function logout(request: Request, response: Response) {}
