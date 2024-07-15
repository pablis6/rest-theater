import z from "zod";

const grupoSchema = z.object({
  name: z.string().min(1),
});

export function validateGrupo(grupo) {
  return grupoSchema.safeParse(grupo);
}
