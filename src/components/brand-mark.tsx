"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBrandAssets } from "@/lib/projects";

type BrandMarkProps = {
  className?: string;
};

export const BrandMark = ({ className = "" }: BrandMarkProps) => {
  const logos = getBrandAssets();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const defaultLogo = isHomePage ? logos.navDefault : logos.navInnerDefault;
  const hoverLogo = isHomePage ? logos.navDefault : logos.navHover;

  return (
    <Link className={`brand-mark ${className}`.trim()} href="/" aria-label="Thuang Architect home">
      <span className="brand-logo-shell" aria-hidden="true">
        <img src={defaultLogo} alt="" className="brand-logo brand-logo-default" />
        <img src={hoverLogo} alt="" className="brand-logo brand-logo-hover" />
      </span>
    </Link>
  );
};
