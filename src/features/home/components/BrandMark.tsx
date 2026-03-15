import type { SiteConfig } from "@/lib/api";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  siteConfig: Pick<SiteConfig, "brandPrefix" | "brandAccent">;
  className?: string;
};

const BrandMark = ({ siteConfig, className }: BrandMarkProps) => (
  <span className={cn("text-xl font-bold text-foreground", className)}>
    {siteConfig.brandPrefix}
    <span className="text-gradient">{siteConfig.brandAccent}</span>
  </span>
);

export default BrandMark;
