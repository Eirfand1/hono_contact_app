import { string, z, ZodType } from "zod";

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    contact_id: string().uuid(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(10),
  })

  static readonly GET: ZodType = z.object({
    contact_id: string().uuid(),
    id: string().uuid(),
  })

  static readonly UPDATE: ZodType = z.object({
    id: z.string().uuid(),
    contact_id: string().uuid(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(10),
  })

  static readonly REMOVE: ZodType = z.object({
    contact_id: string().uuid(),
    id: string().uuid(),
  })

  static readonly LIST: ZodType = z.object({
    contact_id: string().uuid(),
  })
}
