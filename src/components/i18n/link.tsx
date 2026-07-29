"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizePath } from "@/i18n/config";
import { useLocale } from "./locale-context";

type LinkProps = ComponentProps<typeof NextLink>;

/** Drop-in replacement for next/link that automatically prefixes internal hrefs with the active locale. */
export function Link({ href, ...props }: LinkProps) {
  const locale = useLocale();

  if (typeof href === "string" && href.startsWith("/")) {
    return <NextLink href={localizePath(locale, href)} {...props} />;
  }

  return <NextLink href={href} {...props} />;
}
