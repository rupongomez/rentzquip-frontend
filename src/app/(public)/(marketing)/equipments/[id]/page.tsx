import Image from "next/image";

import { getAllEquipments, getEquipmentById } from "@/api";
import BookNow from "@/components/modules/equipments/book-now";

export async function generateStaticParams() {
  const limit = 100;
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
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="grid min-w-0 gap-6 md:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-2.5 shadow-sm sm:p-4 lg:p-5">
          <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-white sm:h-96 md:h-112 lg:h-136">
            {equipments.imageUrl?.[0]?.url ? (
              <Image
                src={equipments.imageUrl[0].url}
                width={700}
                height={700}
                alt={equipments.name}
                unoptimized
                className="size-full object-contain p-4 sm:p-8 lg:p-10"
              />
            ) : (
              <Image
                src="/equipment-placeholder.png"
                width={700}
                height={700}
                alt={equipments.name || "Equipment placeholder"}
                unoptimized
                className="size-full object-contain p-6 sm:p-8 lg:p-10"
              />
            )}
            <span className="absolute left-4 top-4 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {equipments.status}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Equipment details
          </p>
          <h1 className="mt-3 wrap-break-word text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            {equipments.name}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {equipments.description ||
              "Reliable equipment ready for your next rental."}
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Brand
              </p>
              <p className="mt-1 truncate font-semibold text-slate-950">
                {equipments.brand}
              </p>
            </div>
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Model
              </p>
              <p className="mt-1 truncate font-semibold text-slate-950">
                {equipments.model}
              </p>
            </div>
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Available
              </p>
              <p className="mt-1 font-semibold text-slate-950">
                {equipments.quantity} units
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-5 rounded-2xl bg-slate-950 p-5 text-white sm:flex-row sm:items-end sm:justify-between sm:p-6">
            <div>
              <p className="text-sm text-slate-400">Rental price</p>
              <p className="mt-1 text-3xl font-bold text-emerald-300">
                ${equipments.rentalPrice}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  / day
                </span>
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-slate-400">Security deposit</p>
              <p className="mt-1 text-lg font-semibold text-white">
                ${equipments.securityDeposit}
              </p>
            </div>
          </div>

          <div className="mt-6 min-w-0 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 sm:p-5">
            <p className="text-sm font-medium text-emerald-900">
              Ready to rent this equipment?
            </p>
            <p className="mt-1 text-sm text-emerald-800/80">
              Choose your rental dates and submit a booking request.
            </p>
            <div className="mt-4">
              <BookNow equipments={equipments} max={equipments.quantity} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
