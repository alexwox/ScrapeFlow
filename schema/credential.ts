import { z } from "zod";

export const createCredentialsSchema = z.object({
  name: z.string().max(30),
});
