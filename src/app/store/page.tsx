import type { Metadata } from "next";
import products from "@/data/products.json";
import { PageShell, EmptyState } from "@/components/PageShell";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Store" };

/**
 * Vendor-agnostic by design.
 *
 * Each product carries its own `checkoutUrl`, which can point at anything —
 * the vendor's hosted storefront, a Shopify product page, a Stripe Checkout
 * link. Nothing here assumes a particular vendor, and nothing assumes the
 * old Capelli Sport store is permanent. When the new designer and vendor are
 * ready, fill in products.json and the page fills itself in.
 */
type Product = {
  name: string;
  price?: string;
  image?: string;
  checkoutUrl: string;
  note?: string;
};

export default function StorePage() {
  const items = products as Product[];

  return (
    <PageShell
      title="Store"
      intro="Team merch. A new product line is in the works with the club's designer."
    >
      {items.length === 0 ? (
        <EmptyState>
          The new store isn&rsquo;t open yet. The club is working with a
          designer and a new vendor on a full product line — this page will
          fill in once it&rsquo;s ready.
        </EmptyState>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <a
              key={item.name}
              href={item.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rise group flex cursor-pointer flex-col justify-between px-4 py-7 transition-colors duration-200 hover:bg-[rgba(181,161,107,0.12)]"
              style={{
                animationDelay: `${i * 45}ms`,
                borderRight: "1px solid var(--rule-faint)",
                borderBottom: "1px solid var(--rule-faint)",
                minHeight: "10rem",
              }}
            >
              <span>
                <span
                  className="display block transition-colors duration-200 group-hover:text-[var(--gs-gold)]"
                  style={{ fontSize: "var(--step-tile)" }}
                >
                  {item.name}
                </span>
                {item.note && (
                  <span
                    className="mt-1 block"
                    style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}
                  >
                    {item.note}
                  </span>
                )}
              </span>

              <span className="mt-4 flex items-center justify-between">
                {item.price && (
                  <span className="numeral" style={{ fontSize: "var(--step-body)" }}>
                    {item.price}
                  </span>
                )}
                <span
                  className="display flex items-center gap-1.5"
                  style={{ fontSize: "var(--step-small)", color: "var(--gs-gold)" }}
                >
                  Buy
                  <ArrowIcon />
                </span>
              </span>
            </a>
          ))}
        </section>
      )}
    </PageShell>
  );
}
