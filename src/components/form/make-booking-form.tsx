import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { EquipmentResponse } from "@/types";

export default function MakeBookingForm({
  equipments,
  quantity,
}: {
  equipments: EquipmentResponse;
  quantity: number;
}) {
  const form = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      equipmentId: equipments.id,
      quantity: quantity,
    },

    onSubmit: ({ value }) => {
      console.log(value);
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
        <Button type="submit">Submit</Button>
      </FieldGroup>
    </form>
  );
}
