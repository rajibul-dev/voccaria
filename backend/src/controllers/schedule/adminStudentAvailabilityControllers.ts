import { Request, Response } from "express";

// GET /schedule/admin/students-availability
export async function getAllStudentsAvailability(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: "Admin fetch all students' availability",
  });
}

// POST /schedule/admin/students-availability/block
export async function blockHoursForStudentAvailability(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: "Admin block students' availability",
  });
}

// POST /schedule/admin/students-availability/block
export async function getBlockedHoursForStudentAvailability(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: "Get blocked hours for students' availability",
  });
}

// GET /schedule/admin/students-availability/:id
export async function getStudentAvailabilityById(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: `Admin fetch student availability for ID: ${request.params.id}`,
  });
}

// PATCH /schedule/admin/students-availability/:id (overwrite by ID)
export async function overwriteStudentAvailabilityById(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: `Admin overwrite student availability for ID: ${request.params.id}`,
  });
}

// DELETE /schedule/admin/students-availability/:id
export async function deleteStudentAvailabilityById(
  request: Request,
  response: Response
): Promise<any> {
  response.status(200).json({
    message: `Admin delete student availability for ID: ${request.params.id}`,
  });
}
