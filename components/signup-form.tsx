"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Form, useZodForm } from "@/components/ui/form";
import { FormInput, FormPassword } from "@/components/ui/form-field";
import { useSignup } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { signupSchema, type SignupFormData } from "@/schemas";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const signupMutation = useSignup();

  const form = useZodForm(signupSchema, {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form form={form} onSubmit={onSubmit}>
            <FieldGroup>
              <FormInput
                name="name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                disabled={signupMutation.isPending}
              />
              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="m@example.com"
                disabled={signupMutation.isPending}
              />
              <Field>
                <div className="grid grid-cols-2 gap-4">
                  <FormPassword
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    showStrengthIndicator
                    disabled={signupMutation.isPending}
                  />
                  <FormPassword
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm password"
                    disabled={signupMutation.isPending}
                  />
                </div>
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={signupMutation.isPending || !form.formState.isValid}
                >
                  {signupMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {signupMutation.isPending
                    ? "Creating account..."
                    : "Create Account"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account? <a href="/login">Sign in</a>
                </p>
              </Field>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
