import { Address } from "@prisma/client"

export type CreateAddressRequest = {
  contact_id: string
  street?: string
  city?: string
  province?: string
  country: string
  postal_code: string
}

export type AddressResponse = {
  id: string
  street?: string | null
  city?: string | null
  province?: string | null
  country: string
  postal_code: string
}

export function toAddressResponse(address: Address): AddressResponse {
  return {
    id: address.id,
    street: address.street,
    city: address.city,
    province: address.province,
    country: address.country,
    postal_code: address.postal_code
  }
}

export type GetAddressRequest = {
  contact_id: string
  id: string
}

export type ListAddressRequest = {
  contact_id: string
}

export type UpdateAddressRequest = {
  id: string
  contact_id: string
  street?: string
  city?: string
  province?: string
  country: string
  postal_code: string
}

export type RemoveAddressRequest = {
  contact_id: string
  id: string
}




