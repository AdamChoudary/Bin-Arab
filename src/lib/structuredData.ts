import { SITE, absoluteUrl } from "./seo";
import type { Blog, Property, Service } from "@/types";

/**
 * JSON-LD structured data builders.
 *
 * These power rich results in Google/Bing and feed Answer Engines (AEO) such
 * as Google AI Overviews, ChatGPT, and Perplexity with machine-readable facts
 * about the business and its content.
 */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.locality,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

/** Site-wide business identity. RealEstateAgent is a LocalBusiness subtype. */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.ogImage),
    description: SITE.description,
    foundingDate: SITE.foundingYear,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    priceRange: "$$$",
    address: postalAddress,
    areaServed: [
      { "@type": "Place", name: "Bahria Enclave, Islamabad" },
      { "@type": "Place", name: "Bahria Town, Islamabad" },
      { "@type": "Place", name: "Islamabad" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  };
}

/** Site entity used by search engines to anchor sitelinks and the brand. */
export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleLd(blog: Blog) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: absoluteUrl(blog.image),
    datePublished: blog.publishedAt || undefined,
    dateModified: blog.publishedAt || undefined,
    author: { "@type": "Organization", name: blog.author || SITE.name },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blogs/${blog.slug}`) },
    ...(blog.tags && blog.tags.length ? { keywords: blog.tags.join(", ") } : {}),
  };
}

export function propertyLd(property: Property) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    image: absoluteUrl(property.detailImage),
    category: property.category,
    url: absoluteUrl(`/properties/${property.slug}`),
    brand: { "@id": `${SITE.url}/#organization` },
    additionalProperty: property.features.map((f) => ({
      "@type": "PropertyValue",
      name: "Feature",
      value: f,
    })),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE.url}/#organization` },
      areaServed: property.location,
    },
  };
}

export function serviceLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    image: absoluteUrl(service.detailImage),
    serviceType: service.category,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Place", name: "Bahria Town, Islamabad" },
  };
}

export function itemListLd(name: string, items: { title: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.title,
      url: absoluteUrl(it.path),
    })),
  };
}
