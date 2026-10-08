import { getAllEquipments, getEquipmentById } from "@/api";
import BookingQuantityCount from "@/components/modules/equipments/booking-quantity-count";
import Image from "next/image";

export async function generateStaticParams() {
  const limit = 1;
  const first = await getAllEquipments({ page: 1, limit });
  const totalPages = first.meta.totalPages ?? 1;
  const all = [...first.data];
  for (let page = 2; page <= totalPages; page++) {
    const data = await getAllEquipments({ page, limit });
    all.push(...data.data);
  }

  return all.map((equipment) => ({ id: equipment.id }));
}

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getEquipmentById(id);
  const equipments = data?.data || [];
  return (
    <div className="w-8/12 mx-auto my-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div>
          {equipments.imageUrl ? (
            equipments.imageUrl
              ?.map((image) => (
                <Image
                  key={image.publicId}
                  src={image?.url || "/equipment-placeholder.png"}
                  width={500}
                  height={500}
                  alt={equipments?.name}
                  unoptimized
                  className="object-contain h-full w-full rounded-2xl"
                />
              ))
              .at(0)
          ) : (
            <Image
              src="/equipment-placeholder.png"
              width={500}
              height={500}
              alt={equipments?.name}
              unoptimized
              className="object-contain h-96 w-full"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 my-2">
          <h1 className="text-2xl font-bold my-5">{equipments.name}</h1>
          <p className="">
            {" "}
            <span className="font-semibold">Model: </span>
            <span className=" text-blue-400 font-semibold">
              {equipments.model}
            </span>{" "}
          </p>
          <p className="">
            {" "}
            <span className="font-semibold">Description: </span>
            <span className=" text-gray-600">
              {equipments.description}
            </span>{" "}
          </p>
          <p>
            <span className="font-semibold">Brand: </span>
            <span className=" text-gray-600">{equipments.brand}</span>{" "}
          </p>
          <p>
            <span className="font-semibold">Quantity Available: </span>
            <span className=" text-gray-600">{equipments.quantity}</span>{" "}
          </p>
          <p>
            <span className="font-semibold">Rental Price: </span>
            <span className=" text-gray-600">
              ${equipments.rentalPrice}
              <span className="text-xs text-muted-foreground">/day</span>
            </span>{" "}
          </p>
          <p>
            <span className="font-semibold">Security Deposit: </span>
            <span className=" text-gray-600">
              ${equipments.securityDeposit}
            </span>{" "}
          </p>
          <div>
            <BookingQuantityCount max={equipments.quantity} />
          </div>
        </div>
      </div>
    </div>
  );
}
