import { Property, Reservation, User } from "@prisma/client";

export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "property"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  property: Property;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
};
