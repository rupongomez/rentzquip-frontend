import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { EquipmentResponse } from "@/types";
import { useCreateRentalBooking } from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

export default function MakeBookingForm({
  equipments,
  quantity,
  onClose,
}: {
  equipments: EquipmentResponse;
  quantity: number;
  onClose: () => void;
}) {
  const { mutate: createRental, isPending } = useCreateRentalBooking();
  const form = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      equipmentId: equipments.id,
      quantity: quantity,
    },

    onSubmit: ({ value }) => {
      createRental(value, {
        onSuccess: (res) => {
          if (res.success) {
            toast.add({
              title: "Booking Created",
              description: "Your booking has been created successfully",
              type: "success",
            });
            onClose();
          }
        },
        onError: (err) => {
          const apiError = err as Error & {
            response?: {
              data?: {
                message?: string;
              };
            };
          };
          onClose();
          toast.add({
            title: "Booking Error",
            description:
              apiError.response?.data?.message ||
              "An error occurred while creating the booking",
            type: "error",
          });
        },
      });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e);
      }}
    >
      <FieldGroup>
        <form.Field name="startDate">
          {(field) => {
            const selected = field.state.value
              ? new Date(field.state.value)
              : undefined;
            const isValidDate =
              selected instanceof Date && !Number.isNaN(selected.getTime());
            const isInvalid = field.state.meta.isTouched && !isValidDate;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Booking Start Date</FieldLabel>
                <Popover>
                  <PopoverTrigger render={<Button variant="outline" />}>
                    {isValidDate && selected
                      ? format(selected, "PPP")
                      : "Select a date"}
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={selected}
                      disabled={{ before: new Date() }}
                      onSelect={(date) => {
                        if (date) {
                          field.handleChange(date.toISOString());
                          field.handleBlur();
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="endDate">
          {(field) => {
            const selected = field.state.value
              ? new Date(field.state.value)
              : undefined;
            const isValidDate =
              selected instanceof Date && !Number.isNaN(selected.getTime());
            const isInvalid = field.state.meta.isTouched && !isValidDate;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Booking End Date</FieldLabel>
                <Popover>
                  <PopoverTrigger render={<Button variant="outline" />}>
                    {isValidDate && selected
                      ? format(selected, "PPP")
                      : "Select a date"}
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={selected}
                      disabled={{ before: new Date() }}
                      onSelect={(date) => {
                        if (date) {
                          field.handleChange(date.toISOString());
                          field.handleBlur();
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
            );
          }}
        </form.Field>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-2">
              <Spinner className="animate-spin" />
              Booking...{" "}
            </div>
          ) : (
            "Book Now"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
