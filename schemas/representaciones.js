import z from "zod";

const representacionSchema = z.object({
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sesion: z.enum(["Mañana", "Tarde"]),
  id_obra: z.string(),
  id_grupo: z.string(),
});

export function validateRepresentacion(representacion) {
  return representacionSchema.safeParse(representacion);
}
