import Link from "next/link";
import { NAV_LINKS } from "@/lib/content";

type SiteNavProps = {
  tone?: "dark" | "light";
};

export const SiteNav = ({ tone = "dark" }: SiteNavProps) => {
  const toneClass = tone === "light" ? "site-nav-light" : "site-nav-dark";

  return (
    <nav aria-label="Main navigation" className={`site-nav ${toneClass}`}>
      <ul>
        {NAV_LINKS.map((item) => {
          const isExternal = "external" in item && item.external;
          return (
            <li key={item.label}>
              {isExternal ? (
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
