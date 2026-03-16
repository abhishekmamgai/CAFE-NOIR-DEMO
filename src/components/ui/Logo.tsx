import { clsx } from "clsx";

type LogoSize = "sm" | "md" | "lg";
type LogoVariant = "dark" | "light" | "amber";

interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
}

const sizeConfig: Record<LogoSize, { icon: number; cafe: number; noir: number; gap: string }> = {
  sm: { icon: 24, cafe: 11, noir: 15, gap: "gap-2" },
  md: { icon: 36, cafe: 13, noir: 19, gap: "gap-3" },
  lg: { icon: 56, cafe: 16, noir: 26, gap: "gap-4" },
};

const baseColors = {
  cup: "#BA7517",
  steam: "#633806",
  cafe: "#2C1810",
  noir: "#633806",
  divider: "#BA7517",
};

function getVariantColors(variant: LogoVariant | undefined) {
  switch (variant) {
    case "light":
      return {
        cup: "#FFFFFF",
        steam: "#FFFFFF",
        cafe: "#FFFFFF",
        noir: "#FFFFFF",
        divider: "#FFFFFF",
      };
    case "amber":
      return {
        cup: baseColors.cup,
        steam: baseColors.cup,
        cafe: baseColors.cup,
        noir: baseColors.cup,
        divider: baseColors.cup,
      };
    case "dark":
    default:
      return baseColors;
  }
}

export function Logo({ size = "md", variant = "dark", className }: LogoProps) {
  const config = sizeConfig[size];
  const colors = getVariantColors(variant);

  return (
    <span
      className={clsx(
        "inline-flex items-center",
        config.gap,
        "select-none",
        "font-[family-name:var(--font-playfair)]",
        className
      )}
      aria-label="Cafe Noir"
    >
      <svg
        width={config.icon}
        height={config.icon}
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Saucer */}
        <ellipse cx="30" cy="50" rx="18" ry="3" fill={colors.cafe} fillOpacity={variant === "light" ? 0.4 : 0.18} />

        {/* Cup body */}
        <rect
          x="18"
          y="24"
          width="22"
          height="16"
          rx="3"
          fill={colors.cup}
        />

        {/* Cup inner top rim */}
        <rect
          x="20"
          y="24"
          width="18"
          height="3"
          rx="1.5"
          fill={variant === "light" ? "#F5F5F5" : "#FDF4E3"}
        />

        {/* Handle */}
        <path
          d="M40 27.5C43 27.5 46 29.5 46 33C46 36.5 43.2 38.5 40.8 38.5C39.2 38.5 38 37.7 38 36.3C38 35.1 38.9 34.3 40 34.3C41.1 34.3 42 35.1 42 36.1"
          fill="none"
          stroke={colors.cup}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Steam lines */}
        <path
          d="M24 16C24 14 23 13 23 11C23 9 24 8 25 7"
          fill="none"
          stroke={colors.steam}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M29 18C29 16 28 15 28 13C28 11 29 10 30 9"
          fill="none"
          stroke={colors.steam}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M34 17C34 15 33 14 33 12C33 10 34 9 35 8"
          fill="none"
          stroke={colors.steam}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <span className="flex items-center space-x-2">
        <span
          className="tracking-[0.28em] uppercase"
          style={{ fontSize: config.cafe, letterSpacing: "0.28em" }}
        >
          <span style={{ color: colors.cafe }}>CAFE</span>
        </span>

        <span
          className="h-px"
          style={{ width: size === "sm" ? 20 : size === "md" ? 26 : 34, backgroundColor: colors.divider }}
        />

        <span
          className="font-semibold tracking-wide"
          style={{ fontSize: config.noir, color: colors.noir }}
        >
          NOIR
        </span>
      </span>
    </span>
  );
}

