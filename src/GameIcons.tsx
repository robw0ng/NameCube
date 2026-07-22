/**
 * Small original pixel icons for the Gaming face.
 * Hand-drawn rather than official logos, so there's no trademarked art on the site.
 * 16x16 viewBox, crisp at 16px, shapeRendering keeps the pixels hard-edged.
 */

type IconProps = { className?: string };

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  shapeRendering: 'crispEdges' as const,
  'aria-hidden': true,
  focusable: 'false' as const,
};

/** Grass block. */
export function MinecraftIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2" y="3" width="12" height="4" fill="#5aa845" />
      <rect x="2" y="7" width="12" height="6" fill="#8a6041" />
      <rect x="3" y="4" width="2" height="2" fill="#75c45c" />
      <rect x="9" y="4" width="3" height="2" fill="#75c45c" />
      <rect x="4" y="8" width="2" height="2" fill="#6f4c34" />
      <rect x="10" y="10" width="2" height="2" fill="#6f4c34" />
    </svg>
  );
}

/** Pickaxe. */
export function TerrariaIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="3" height="2" fill="#9fb4c7" />
      <rect x="6" y="4" width="4" height="2" fill="#c3d4e2" />
      <rect x="10" y="3" width="3" height="2" fill="#9fb4c7" />
      <rect x="7" y="6" width="2" height="2" fill="#8a6041" />
      <rect x="6" y="8" width="2" height="2" fill="#8a6041" />
      <rect x="5" y="10" width="2" height="3" fill="#8a6041" />
    </svg>
  );
}

/** Sun. */
export function SunshineIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="6" y="6" width="4" height="4" fill="#f2c744" />
      <rect x="5" y="7" width="1" height="2" fill="#f2c744" />
      <rect x="10" y="7" width="1" height="2" fill="#f2c744" />
      <rect x="7" y="5" width="2" height="1" fill="#f2c744" />
      <rect x="7" y="10" width="2" height="1" fill="#f2c744" />
      <rect x="7" y="1" width="2" height="2" fill="#e8a92f" />
      <rect x="7" y="13" width="2" height="2" fill="#e8a92f" />
      <rect x="1" y="7" width="2" height="2" fill="#e8a92f" />
      <rect x="13" y="7" width="2" height="2" fill="#e8a92f" />
      <rect x="3" y="3" width="2" height="2" fill="#e8a92f" />
      <rect x="11" y="11" width="2" height="2" fill="#e8a92f" />
      <rect x="11" y="3" width="2" height="2" fill="#e8a92f" />
      <rect x="3" y="11" width="2" height="2" fill="#e8a92f" />
    </svg>
  );
}

/** Capture sphere. */
export function PalworldIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="2" width="6" height="1" fill="#6fc3d6" />
      <rect x="3" y="3" width="10" height="3" fill="#6fc3d6" />
      <rect x="2" y="6" width="12" height="1" fill="#6fc3d6" />
      <rect x="2" y="7" width="12" height="2" fill="#3b3f4a" />
      <rect x="2" y="9" width="12" height="1" fill="#d9dce3" />
      <rect x="3" y="10" width="10" height="3" fill="#d9dce3" />
      <rect x="5" y="13" width="6" height="1" fill="#d9dce3" />
      <rect x="6" y="6" width="4" height="4" fill="#8e9099" />
      <rect x="7" y="7" width="2" height="2" fill="#f2f3f5" />
    </svg>
  );
}

/** Skateboard. */
export function SkateIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="10" height="2" fill="#b98cd9" />
      <rect x="2" y="6" width="1" height="1" fill="#b98cd9" />
      <rect x="13" y="6" width="1" height="1" fill="#b98cd9" />
      <rect x="4" y="7" width="1" height="2" fill="#7a7f8a" />
      <rect x="11" y="7" width="1" height="2" fill="#7a7f8a" />
      <rect x="3" y="9" width="3" height="2" fill="#e0c46a" />
      <rect x="10" y="9" width="3" height="2" fill="#e0c46a" />
    </svg>
  );
}
