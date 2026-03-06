"use client";

import * as React from "react";
import {
  useForm,
  FormProvider,
  UseFormReturn,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void | Promise<void>;
  children: React.ReactNode;
}

export function Form({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-0", className)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}

// Hook for creating a form with Zod schema
// Use this hook with your Zod schema for type-safe forms
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useZodForm<TSchema extends z.ZodType<any, any, any>>(
  schema: TSchema,
  defaultValues?: Partial<z.infer<TSchema>>
) {
  type FormData = z.infer<TSchema>;
  return useForm<FormData>({
    // @ts-expect-error - Zod resolver type compatibility
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<FormData>,
    mode: "onChange", // Validate on change for better UX
  });
}
