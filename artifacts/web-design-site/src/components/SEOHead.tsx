import { Helmet } from "react-helmet-async";

const SITE_NAME = "WebStudioLaunch";
const BASE_URL = "https://webstudiolaunch.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEOHead({
  title,
  description,
  canonical,
  noindex = false,
  ogImage = DEFAULT_OG_IMAGE,
  schema,
}: SEOHeadProps) {
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  const schemaJson = schema
    ? JSON.stringify(
        Array.isArray(schema)
          ? { "@context": "https://schema.org", "@graph": schema }
          : schema
      )
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@webstudiolaunch" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {schemaJson && (
        <script type="application/ld+json">{schemaJson}</script>
      )}
    </Helmet>
  );
}
