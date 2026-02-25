import Link from "next/link";
import { getBrandAssets } from "@/lib/projects";

type BrandMarkProps = {
  tone?: "dark" | "light";
  className?: string;
};

export const BrandMark = ({ tone = "dark", className = "" }: BrandMarkProps) => {
  const logos = getBrandAssets();
  const mark = tone === "light" ? logos.markAccent : logos.markDark;
  const toneClass = tone === "light" ? "brand-tone-light" : "brand-tone-dark";

  return (
    <Link className={`brand-mark ${toneClass} ${className}`.trim()} href="/" aria-label="Thuang Architect home">
      <img src={mark} alt="" aria-hidden="true" className="brand-icon" />
      <span className="brand-text" aria-hidden="true">
        <span className="brand-text-main">Thuang</span>
        <span className="brand-text-sub">Architect</span>
      </span>
    </Link>
  );
};
