/**
 * Renders one or more JSON-LD structured data blocks into the document.
 * Safe to use inside Server Components; emits a standard
 * <script type="application/ld+json"> tag with no visual output.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
