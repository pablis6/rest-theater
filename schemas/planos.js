import z from "zod";

const planoSchema = z.object({
  //   fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  id_representacion: z.string(),
  butacas: z.array(
    z.object({
      fila: z.number(),
      num_butaca: z.number(),
      estado: z.enum(["Libre", "Ocupado", "Reservado", "Seleccionado", "Roto"]),
      asignadoA: z.string().optional(),
    })
  ),
});

export function validatePlano(plano) {
  return planoSchema.safeParse(plano);
}

export function validatePartialPlano(plano) {
  return planoSchema.partial().safeParse(plano);
}
