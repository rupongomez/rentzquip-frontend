import React from "react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function MakeBookingForm() {
  const form = useForm({
    defaultValues: {
      startDate: "",
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
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const selected = field.state.value
              ? new Date(`${field.state.value}T00:00:00`)
              : undefined;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Booking Start Date</FieldLabel>
                <Popover>
                  <PopoverTrigger render={<Button variant="outline" />}>
                    {selected ? `${format(selected, "PPP")}` : "Select a date"}
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={selected}
                      disabled={{ before: new Date() }}
                      onSelect={(date) => {
                        if (date) {
                          field.handleChange(format(date, "yyyy-MM-dd"));
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
      </FieldGroup>
    </form>
  );
}
