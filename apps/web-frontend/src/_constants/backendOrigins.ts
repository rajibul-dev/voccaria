export const expressBackendOrigin =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_ORIGIN;
export const apiVersionPath =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_API_VERSION || "/api/v1";
export const expressBackendBaseRESTOrigin = `${expressBackendOrigin}${apiVersionPath}`;
