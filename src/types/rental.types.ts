export type RentalCreatePayload = {
  equipmentId: string;
  startDate: string;
  endDate: string;
  quantity: number;
};

/*
{
            "id": "48201e7b-ca93-4978-bcc3-330e2d1d089a",
            "customerId": "69087e27-cfb2-4dc1-be2c-e55c983f4c24",
            "providerId": "2d09e7fc-7d10-4aa5-b208-bea14c49a2f2",
            "equipmentId": "cc304042-81de-4ce0-9f90-c7e00b7e3630",
            "quantity": 1,
            "rentalStatus": "PENDING",
            "startDate": "2026-10-09T18:00:00.000Z",
            "endDate": "2026-10-17T18:00:00.000Z",
            "rentalDays": 8,
            "rentalAmount": "1600",
            "securityDeposit": "3500",
            "lateFee": "0",
            "damageCharge": "0"
        },
*/

export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED"
  | "LATE"
  | "PAID"
  | "ONGOING";

export type RentalResponse = {
  id: string;
  customerId: string;
  providerId: string;
  equipmentId: string;
  quantity: number;
  rentalStatus: RentalStatus;
  startDate: string;
  endDate: string;
  rentalDays: number;
  rentalAmount: string;
  securityDeposit: string;
  lateFee: string;
  damageCharge: string;
};
