import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "osw478n5",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
});
