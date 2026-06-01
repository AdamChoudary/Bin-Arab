import type { Metadata } from "next";

/**
 * Central SEO configuration for the whole site.
 *
 * The production domain can be overridden at deploy time with the
 * NEXT_PUBLIC_SITE_URL environment variable (no trailing slash needed).
 */
export const SITE = {
  name: "Bin Arab Real Estate & Builders",
  shortName: "Bin Arab",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.binarabrealestate.com").replace(/\/+$/, ""),
  description:
    "Bin Arab Real Estate & Builders is a premium property consultancy in Bahria Enclave, Islamabad. Buy, sell, rent, invest, build, and renovate luxury residential and commercial properties with complete transparency.",
  locale: "en_US",
  logo: "/images/logo.png",
  ogImage: "/images/logo.png",
  phoneDisplay: "+92 333 5965199",
  phoneIntl: "+923335965199",
  email: "info@binarabrealestate.com",
  foundingYear: "2016",
  openingHours: "Mo-Sa 10:00-19:00",
  address: {
    street: "Shop #4, Embassy Gardens, Sector C1, Bahria Enclave",
    locality: "Bahria Enclave, Islamabad",
    region: "Islamabad Capital Territory",
    postalCode: "44000",
    country: "PK",
  },
} as const;

/** Absolute URL helper. Accepts a path like "/blogs" or an already-absolute URL. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // encodeURI keeps slashes intact while escaping spaces and other unsafe
  // characters (some asset filenames contain spaces), and won't double-encode.
  return `${SITE.url}${encodeURI(normalized)}`;
}

type BuildMetaArgs = {
  title?: string;
  /** When true, the title bypasses the root layout's "%s | Site" template. */
  titleAbsolute?: boolean;
  description?: string;
  /** Path relative to the site root, e.g. "/blogs". Used for canonical + OG url. */
  path?: string;
  /** Absolute or root-relative image path. Falls back to the site OG image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
};

/**
 * Builds a consistent Metadata object for a page. Inherits the site-wide
 * OpenGraph/Twitter defaults declared in the root layout and only overrides
 * what each page needs.
 */
export function buildMetadata({
  title,
  titleAbsolute = false,
  description = SITE.description,
  path = "/",
  image,
  type = "website",
  publishedTime,
  authors,
  noIndex = false,
}: BuildMetaArgs): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image || SITE.ogImage);

  return {
    title: titleAbsolute && title ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: title || SITE.name,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: SITE.locale,
      type,
      images: [{ url: ogImage }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title || SITE.name,
      description,
      images: [ogImage],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
