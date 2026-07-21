export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  };
}

export function serviceSchema({ name, description, serviceType }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "serviceType": serviceType || name,
    "provider": { "@id": "https://cdinet.com.ar/#organization" },
    "areaServed": ["Argentina", "Uruguay"],
    "description": description,
    "audience": { "@type": "BusinessAudience", "audienceType": "Responsables de depósito, logística y operaciones" },
  };
}

export function articleSchema({ headline, about, client, datePublished }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "about": { "@type": "Thing", "name": about },
    "mentions": { "@type": "Organization", "name": client },
    "author": { "@id": "https://cdinet.com.ar/#organization" },
    "datePublished": datePublished,
  };
}
