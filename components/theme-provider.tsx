"use client";
import { ThemeProvider } from "next-themes";

export function MyYhemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
