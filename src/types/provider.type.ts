/*
{
    "success": true,
    "statusCode": 200,
    "message": "Provider applied successfully",
    "data": {
        "provider": {
            "id": "9a0e918a-1505-4023-8516-0a7c2abca0f3",
            "name": "Anthony",
            "email": "rupongomez@gmail.com",
            "phoneNumber": "+8801712345678",
            "address": "123 Main Street, Dhaka, Bangladesh",
            "description": "Experienced service provider specializing in home maintenance and repair services.",
            "imageUrl": "https://example.com/images/provider-profile.jpg",
            "imagePublicId": null,
            "status": "PENDING",
            "userId": "5bf6752f-6c02-4450-b87e-a54b9d707ab0",
            "createdAt": "2026-10-01T14:17:51.100Z",
            "updatedAt": "2026-10-01T14:17:51.100Z",
            "deletedAt": null
        }
    }
}
*/

export type ProviderResponse = {
  provider: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    description: string;
    imageUrl: string;
    imagePublicId: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
    userId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
};

export type ProviderPayload = {
  address: string;
  description: string;
  imageUrl: File;
  phoneNumber: string;
};
