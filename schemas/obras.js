import z from "zod";

const obraSchema = z.object({
  name: z.string().min(1),
});

export function validateObra(obra) {
  return obraSchema.safeParse(obra);
}
