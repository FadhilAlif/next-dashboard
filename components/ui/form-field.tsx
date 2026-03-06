"use client";

import * as React from "react";
import {
  useFormContext,
  Controller,
  FieldPath,
  FieldValues,
  FieldError,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

interface FormFieldContextValue {
  name: string;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  children: React.ReactNode;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, children }: FormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        name={name}
        render={({ field, fieldState }) =>
          children as React.ReactElement
        }
      />
    </FormFieldContext.Provider>
  );
}

interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string;
  label?: string;
  description?: string;
  containerClassName?: string;
}

export function FormInput({
  name,
  label,
  description,
  containerClassName,
  className,
  id,
  ...props
}: FormInputProps) {
  const { register, formState, getFieldState } = useFormContext();
  const fieldState = getFieldState(name);

  const inputId = id || name;
  const error = fieldState.error;

  return (
    <Field className={containerClassName}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <Input
        id={inputId}
        className={cn(
          error &&
            "border-destructive focus-visible:ring-destructive",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : description ? `${inputId}-description` : undefined
        }
        {...register(name)}
        {...props}
      />
      {error ? (
        <p
          id={`${inputId}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {error.message}
        </p>
      ) : description ? (
        <FieldDescription id={`${inputId}-description`}>
          {description}
        </FieldDescription>
      ) : null}
    </Field>
  );
}

interface FormPasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string;
  label?: string;
  description?: string;
  containerClassName?: string;
  showStrengthIndicator?: boolean;
}

export function FormPassword({
  name,
  label,
  description,
  containerClassName,
  className,
  id,
  showStrengthIndicator = false,
  ...props
}: FormPasswordProps) {
  const { register, getFieldState, watch } = useFormContext();
  const fieldState = getFieldState(name);
  const passwordValue = watch(name) as string;

  const inputId = id || name;
  const error = fieldState.error;

  // Password strength calculation
  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z\d]/.test(password)) strength += 1;
    return strength;
  };

  const getStrengthLabel = (strength: number): string => {
    if (strength <= 2) return "Weak";
    if (strength <= 4) return "Medium";
    return "Strong";
  };

  const getStrengthColor = (strength: number): string => {
    if (strength <= 2) return "bg-destructive";
    if (strength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const strength = showStrengthIndicator ? getPasswordStrength(passwordValue || "") : 0;

  return (
    <Field className={containerClassName}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <Input
        type="password"
        id={inputId}
        className={cn(
          error &&
            "border-destructive focus-visible:ring-destructive",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : description ? `${inputId}-description` : undefined
        }
        {...register(name)}
        {...props}
      />
      {showStrengthIndicator && passwordValue && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i <= strength ? getStrengthColor(strength) : "bg-muted"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Password strength: {getStrengthLabel(strength)}
          </p>
        </div>
      )}
      {error ? (
        <p
          id={`${inputId}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {error.message}
        </p>
      ) : description ? (
        <FieldDescription id={`${inputId}-description`}>
          {description}
        </FieldDescription>
      ) : null}
    </Field>
  );
}

// Hook to access field context
export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const formContext = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { getFieldState } = formContext;
  const fieldState = getFieldState(fieldContext.name);

  return {
    ...fieldState,
    name: fieldContext.name,
  };
}
