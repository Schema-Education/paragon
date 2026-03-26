"use client";

import { useState, useRef, useEffect } from "react";
import {
  primitiveColors,
  colorScales,
  semanticColors,
  spacingTokens,
  radiusTokens,
  typographyFamilies,
  typographySizes,
  typographyWeights,
  breakpoints,
  elevationLevels,
  zIndexTokens,
  componentSizes,
  transitionTokens,
  lineHeightTokens,
  mobileFontSizes,
  additionalFontWeights,
  borderWidthTokens,
  additionalSpacingTokens,
  directionalShadows,
  miscTokens,
} from "./tokens";
import FlowchartView from "./flowchart";
import TreeView from "./tree-view";

type Section =
  | "overview"
  | "primitives"
  | "scales"
  | "semantic"
  | "spacing"
  | "radius"
  | "typography"
  | "transitions"
  | "elevation"
  | "breakpoints"
  | "sizes"
  | "misc"
  | "flowchart"
  | "tree";

function contrastText(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#000000" : "#FFFFFF";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="ml-2 px-1.5 py-0.5 text-[10px] rounded border border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer"
      title={`Copy: ${text}`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

type NavItem =
  | { type: "button"; id: Section; label: string; icon: string }
  | { type: "menu"; label: string; icon: string; items: { id: Section; label: string; icon: string }[] };

function NavDropdown({
  label,
  icon,
  items,
  active,
  onChange,
}: {
  label: string;
  icon: string;
  items: { id: Section; label: string; icon: string }[];
  active: Section;
  onChange: (s: Section) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = items.some((i) => i.id === active);
  const activeItem = items.find((i) => i.id === active);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
          isActive
            ? "bg-[#0A3055] text-white"
            : open
              ? "bg-gray-100 text-gray-800"
              : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <span>{icon}</span>
        {activeItem ? activeItem.label : label}
        <span className="text-[10px] ml-0.5 opacity-60">&#9662;</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-1 z-50">
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg py-1 min-w-[160px]">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => { onChange(item.id); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-sm transition-colors cursor-pointer flex items-center gap-2 ${
                  active === item.id
                    ? "bg-[#0A3055]/10 text-[#0A3055] font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionNav({
  active,
  onChange,
}: {
  active: Section;
  onChange: (s: Section) => void;
}) {
  const navItems: NavItem[] = [
    { type: "button", id: "overview", label: "Overview", icon: "◎" },
    {
      type: "menu",
      label: "Colors",
      icon: "◆",
      items: [
        { id: "primitives", label: "Primitives", icon: "◆" },
        { id: "scales", label: "Color Scales", icon: "▤" },
        { id: "semantic", label: "Semantic", icon: "◈" },
      ],
    },
    {
      type: "menu",
      label: "Layout",
      icon: "↔",
      items: [
        { id: "spacing", label: "Spacing", icon: "↔" },
        { id: "radius", label: "Radius", icon: "◜" },
        { id: "breakpoints", label: "Breakpoints", icon: "▯" },
        { id: "sizes", label: "Sizes", icon: "⊡" },
      ],
    },
    { type: "button", id: "typography", label: "Typography", icon: "Aa" },
    { type: "button", id: "transitions", label: "Transitions", icon: "⟳" },
    { type: "button", id: "elevation", label: "Elevation", icon: "▦" },
    { type: "button", id: "misc", label: "Misc", icon: "⚙" },
    {
      type: "menu",
      label: "Graphs",
      icon: "⬡",
      items: [
        { id: "flowchart", label: "Flowchart", icon: "⬡" },
        { id: "tree", label: "Tree", icon: "⊞" },
      ],
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-3">
      <div className="max-w-7xl mx-auto flex gap-1 flex-wrap">
        {navItems.map((item) =>
          item.type === "button" ? (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                active === item.id
                  ? "bg-[#0A3055] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="mr-1.5">{item.icon}</span>
              {item.label}
            </button>
          ) : (
            <NavDropdown
              key={item.label}
              label={item.label}
              icon={item.icon}
              items={item.items}
              active={active}
              onChange={onChange}
            />
          )
        )}
      </div>
    </nav>
  );
}

function HierarchyDiagram() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-200 p-8 mb-8">
      <h3 className="text-lg font-semibold mb-6 text-center">
        Token Architecture — Three-Level Hierarchy
      </h3>
      <div className="flex flex-col items-center gap-4">
        {/* Level 1 */}
        <div className="w-full max-w-2xl bg-[#0A3055] text-white rounded-lg p-5 text-center">
          <div className="text-xs uppercase tracking-wider opacity-70 mb-1">
            Level 1 — Foundation
          </div>
          <div className="text-lg font-bold">Primitives</div>
          <div className="text-sm opacity-80 mt-1">
            Raw palette values, spacing base, font stacks, breakpoints, z-index
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {primitiveColors.slice(0, 7).map((c) => (
              <div
                key={c.name}
                className="w-6 h-6 rounded-full border-2 border-white/30"
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="text-2xl text-gray-400">↓</div>

        {/* Level 2 */}
        <div className="w-full max-w-2xl bg-[#476480] text-white rounded-lg p-5 text-center">
          <div className="text-xs uppercase tracking-wider opacity-70 mb-1">
            Level 2 — Structure
          </div>
          <div className="text-lg font-bold">Semantic / Alias</div>
          <div className="text-sm opacity-80 mt-1">
            Color scales (100–900), semantic roles (bg, border, focus), spacing
            scale, radius aliases
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 mt-3">
            {colorScales[0].steps.map((s) => (
              <div
                key={s.name}
                className="w-5 h-5 rounded"
                style={{ backgroundColor: s.value }}
                title={`primary ${s.name}`}
              />
            ))}
          </div>
        </div>

        <div className="text-2xl text-gray-400">↓</div>

        {/* Level 3 */}
        <div className="w-full max-w-2xl bg-[#8598AA] text-white rounded-lg p-5 text-center">
          <div className="text-xs uppercase tracking-wider opacity-70 mb-1">
            Level 3 — Application
          </div>
          <div className="text-lg font-bold">Component Tokens</div>
          <div className="text-sm opacity-80 mt-1">
            Button, Form, Alert, Card, Modal, Nav, Toast — states, variants,
            sizes
          </div>
          <div className="text-xs opacity-60 mt-2">
            40+ component token files referencing semantic tokens
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewSection() {
  const stats = [
    { label: "Primitive Colors", value: primitiveColors.length },
    { label: "Color Scales", value: colorScales.length },
    { label: "Semantic Groups", value: semanticColors.length },
    { label: "Spacing Steps", value: spacingTokens.length + additionalSpacingTokens.length },
    { label: "Radius Variants", value: radiusTokens.length },
    { label: "Font Sizes", value: typographySizes.length + mobileFontSizes.length },
    { label: "Line Heights", value: lineHeightTokens.length },
    { label: "Transitions", value: transitionTokens.length },
    { label: "Breakpoints", value: breakpoints.length },
    { label: "Elevation Levels", value: elevationLevels.length },
    { label: "Directional Shadows", value: directionalShadows.length * 5 },
    { label: "Z-Index Levels", value: zIndexTokens.length },
  ];

  return (
    <div>
      <HierarchyDiagram />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-lg border border-gray-200 p-4 text-center"
          >
            <div className="text-3xl font-bold text-[#0A3055]">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Token Reference Pattern</h3>
        <div className="font-mono text-sm bg-gray-50 rounded-lg p-4 space-y-2">
          <div>
            <span className="text-gray-500">/* Primitive */</span>
          </div>
          <div>
            <span className="text-[#9D0054]">color.blue</span>{" "}
            <span className="text-gray-400">=</span>{" "}
            <span className="text-[#0A3055]">#23419F</span>
          </div>
          <div className="text-gray-400 pl-4">↓ referenced by</div>
          <div>
            <span className="text-[#9D0054]">color.primary.base</span>{" "}
            <span className="text-gray-400">=</span>{" "}
            <span className="text-[#0A3055]">#0A3055</span>
          </div>
          <div className="text-gray-400 pl-4">↓ generates scale via mix()</div>
          <div>
            <span className="text-[#9D0054]">color.primary.100</span>{" "}
            <span className="text-gray-400">=</span>{" "}
            <span className="text-[#0A3055]">
              mix(primary.base, white, 94%)
            </span>{" "}
            <span className="text-gray-400">→</span> #F0F3F5
          </div>
          <div className="text-gray-400 pl-4">↓ semantic alias</div>
          <div>
            <span className="text-[#9D0054]">color.theme.bg.primary</span>{" "}
            <span className="text-gray-400">=</span>{" "}
            <span className="text-[#006DAA]">
              {"{"}color.primary.100{"}"}
            </span>
          </div>
          <div className="text-gray-400 pl-4">↓ component token</div>
          <div>
            <span className="text-[#9D0054]">color.btn.bg.primary</span>{" "}
            <span className="text-gray-400">=</span>{" "}
            <span className="text-[#006DAA]">
              {"{"}color.primary.base{"}"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimitivesSection() {
  return (
    <div>
      <p className="text-gray-500 mb-6">
        Raw color values — the foundation of the entire palette. These are
        defined as hex values and never reference other tokens.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {primitiveColors.map((c) => (
          <div
            key={c.name}
            className="rounded-xl overflow-hidden border border-gray-200"
          >
            <div
              className="h-24 flex items-end p-3"
              style={{
                backgroundColor: c.value,
                color: contrastText(c.value),
              }}
            >
              <span className="text-sm font-mono font-bold">{c.value}</span>
            </div>
            <div className="p-3 bg-white">
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-gray-400 font-mono flex items-center">
                {c.cssVar}
                <CopyButton text={`var(${c.cssVar})`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorScalesSection() {
  const [selectedScale, setSelectedScale] = useState<string | null>(null);

  return (
    <div>
      <p className="text-gray-500 mb-6">
        Each scale is generated from a base color using mix() with white
        (lighter) or black (darker). The 500 step always equals the base.
        100–400 get progressively lighter; 600–900 get darker.
      </p>

      {/* Scale selector pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedScale(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
            !selectedScale
              ? "bg-[#0A3055] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All Scales
        </button>
        {colorScales.map((scale) => (
          <button
            key={scale.name}
            onClick={() =>
              setSelectedScale(
                selectedScale === scale.name ? null : scale.name
              )
            }
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition flex items-center gap-1.5 cursor-pointer ${
              selectedScale === scale.name
                ? "ring-2 ring-offset-1"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={
              selectedScale === scale.name
                ? {
                    backgroundColor: scale.baseHex,
                    color: contrastText(scale.baseHex),
                  }
                : undefined
            }
          >
            <span
              className="w-3 h-3 rounded-full border border-white/30"
              style={{ backgroundColor: scale.baseHex }}
            />
            {scale.name}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {colorScales
          .filter((s) => !selectedScale || s.name === selectedScale)
          .map((scale) => (
            <div key={scale.name}>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold capitalize">
                  {scale.name}
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  base: {scale.baseHex}
                </span>
                {scale.base !== `${scale.name}-base` && (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                    aliases → {scale.base}
                  </span>
                )}
              </div>

              {/* Continuous gradient bar */}
              <div className="flex rounded-lg overflow-hidden h-14 mb-2">
                {scale.steps.map((step) => (
                  <div
                    key={step.name}
                    className="flex-1 flex items-end justify-center pb-1 transition-all hover:flex-[2] group relative"
                    style={{
                      backgroundColor: step.value,
                      color: contrastText(step.value),
                    }}
                    title={`${step.name}: ${step.value}`}
                  >
                    <span className="text-[10px] font-mono opacity-80 group-hover:opacity-100 group-hover:text-xs transition-all">
                      {step.name.replace(" (base)", "")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Detail swatches */}
              <div className="grid grid-cols-9 gap-1.5">
                {scale.steps.map((step) => (
                  <div key={step.name} className="text-center">
                    <div
                      className="h-10 rounded-md border border-gray-200/50 mb-1"
                      style={{ backgroundColor: step.value }}
                    />
                    <div className="text-[10px] font-mono text-gray-500 leading-tight">
                      {step.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Cross-scale comparison at same level */}
      {!selectedScale && (
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">
            Cross-Scale Comparison at Each Level
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-2 pr-3 text-gray-500 font-medium">
                    Scale
                  </th>
                  {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((l) => (
                    <th
                      key={l}
                      className="py-2 px-1 text-gray-500 font-medium text-center"
                    >
                      {l}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {colorScales.map((scale) => (
                  <tr key={scale.name}>
                    <td className="py-1.5 pr-3 font-medium capitalize">
                      {scale.name}
                    </td>
                    {scale.steps.map((step) => (
                      <td key={step.name} className="py-1.5 px-1">
                        <div
                          className="h-8 rounded"
                          style={{ backgroundColor: step.value }}
                          title={`${scale.name} ${step.name}: ${step.value}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function SemanticSection() {
  return (
    <div>
      <p className="text-gray-500 mb-6">
        Semantic tokens assign meaning to primitive/scale values. They define
        what color to use for backgrounds, borders, focus rings, and states —
        making it possible to re-theme without touching component code.
      </p>
      <div className="space-y-8">
        {semanticColors.map((group) => (
          <div key={group.category}>
            <h3 className="text-lg font-semibold mb-3">{group.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.tokens.map((token) => (
                <div
                  key={token.role}
                  className="rounded-lg border border-gray-200 overflow-hidden flex"
                >
                  <div
                    className="w-16 shrink-0"
                    style={{ backgroundColor: token.resolvedColor }}
                  />
                  <div className="p-3 flex-1 min-w-0">
                    <div className="font-medium text-sm">{token.role}</div>
                    <div className="text-xs text-gray-400 font-mono truncate">
                      → {token.referencePath}
                    </div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">
                      {token.resolvedColor}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Visual: how semantic tokens map */}
        <div className="bg-gray-50 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Semantic Mapping Pattern
          </h3>
          <div className="space-y-3 text-sm">
            {[
              "primary",
              "brand",
              "success",
              "info",
              "warning",
              "danger",
            ].map((name) => {
              const scale = colorScales.find((s) => s.name === name)!;
              return (
                <div key={name} className="flex items-center gap-3">
                  <span className="w-20 font-medium capitalize text-right">
                    {name}
                  </span>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: scale.steps[0].value }}
                      title="100 → theme-bg"
                    />
                    <span className="text-[10px] text-gray-400">bg</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: scale.steps[1].value }}
                      title="200 → theme-border"
                    />
                    <span className="text-[10px] text-gray-400">border</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: scale.steps[4].value }}
                      title="500 → default/focus"
                    />
                    <span className="text-[10px] text-gray-400">
                      default
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono ml-2">
                    100→bg, 200→border, 500→default/focus
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpacingSection() {
  return (
    <div>
      <p className="text-gray-500 mb-6">
        Spacing is built from a base value of <strong>1rem</strong> (16px) with
        multipliers. The scale provides 12 steps from 0 to 5rem.
      </p>
      <div className="space-y-3">
        {spacingTokens.map((token) => (
          <div
            key={token.name}
            className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="w-20 text-right">
              <span className="font-semibold">{token.name}</span>
              <div className="text-xs text-gray-400">{token.multiplier}</div>
            </div>
            <div className="flex-1">
              <div
                className="h-6 rounded bg-gradient-to-r from-[#0A3055] to-[#476480] transition-all"
                style={{ width: token.value === "0" ? "2px" : token.value }}
              />
            </div>
            <div className="w-24 text-right">
              <span className="text-sm font-mono text-gray-600">
                {token.value}
              </span>
            </div>
            <CopyButton text={`var(${token.cssVar})`} />
          </div>
        ))}
      </div>

      {/* Additional spacing tokens */}
      <h3 className="text-lg font-semibold mt-10 mb-4">Additional Spacing Tokens</h3>
      <div className="space-y-3">
        {additionalSpacingTokens.map((token) => (
          <div
            key={token.name}
            className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="w-40">
              <span className="font-semibold text-sm">{token.name}</span>
            </div>
            <div className="flex-1">
              <div
                className="h-6 rounded bg-gradient-to-r from-[#9D0054] to-[#B6407F] transition-all"
                style={{ width: token.value === "0" ? "2px" : token.value }}
              />
            </div>
            <div className="w-24 text-right">
              <span className="text-sm font-mono text-gray-600">
                {token.value}
              </span>
            </div>
            <div className="text-xs text-gray-400 w-40">{token.description}</div>
            <CopyButton text={`var(${token.cssVar})`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RadiusSection() {
  return (
    <div>
      <p className="text-gray-500 mb-6">
        Border radius tokens control corner rounding across all components.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {radiusTokens.map((token) => (
          <div
            key={token.name}
            className="flex flex-col items-center bg-white rounded-lg border border-gray-200 p-6"
          >
            <div
              className="w-24 h-24 bg-[#0A3055] mb-4"
              style={{
                borderRadius:
                  token.name === "pill" ? "50rem" : token.value,
              }}
            />
            <div className="font-semibold">{token.name}</div>
            <div className="text-sm font-mono text-gray-500">{token.value}</div>
            <div className="text-xs text-gray-400 mt-1">
              {token.description}
            </div>
          </div>
        ))}
      </div>

      {/* Border width */}
      <h3 className="text-lg font-semibold mt-10 mb-4">Border Width</h3>
      <div className="flex items-end gap-8 bg-white rounded-lg border border-gray-200 p-6">
        {borderWidthTokens.map((b) => (
          <div key={b.name} className="text-center">
            <div
              className="w-24 h-16 rounded-md mb-2"
              style={{
                border: `${b.value} solid #0A3055`,
              }}
            />
            <div className="text-sm font-medium">{b.name}</div>
            <div className="text-xs font-mono text-gray-500">{b.value}</div>
            <div className="text-xs text-gray-400 mt-1 font-mono">
              {b.cssVar}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypographySection() {
  return (
    <div>
      <p className="text-gray-500 mb-6">
        The type system covers font families, a size scale from micro to display, and six
        weight levels.
      </p>

      {/* Font families */}
      <h3 className="text-lg font-semibold mb-3">Font Families</h3>
      <div className="space-y-4 mb-10">
        {typographyFamilies.map((f) => (
          <div
            key={f.name}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="text-sm font-medium text-gray-500 mb-1">
              {f.name}
            </div>
            <div className="text-2xl" style={{ fontFamily: f.value }}>
              The quick brown fox jumps over the lazy dog
            </div>
            <div className="text-xs font-mono text-gray-400 mt-2 truncate">
              {f.value}
            </div>
          </div>
        ))}
      </div>

      {/* Font sizes */}
      <h3 className="text-lg font-semibold mb-3">Size Scale</h3>
      <div className="space-y-2 mb-10">
        {typographySizes.map((s) => (
          <div
            key={s.name}
            className="flex items-baseline gap-4 bg-white rounded-lg border border-gray-200 px-4 py-3"
          >
            <span className="w-24 text-xs font-medium text-gray-500 shrink-0">
              {s.name}
            </span>
            <span
              className="flex-1 truncate"
              style={{ fontSize: s.value, lineHeight: 1.3 }}
            >
              Paragon
            </span>
            <span className="text-xs font-mono text-gray-400 shrink-0">
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* Font weights */}
      <h3 className="text-lg font-semibold mb-3">Weights</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {typographyWeights.map((w) => (
          <div
            key={w.name}
            className="bg-white rounded-lg border border-gray-200 p-4 text-center"
          >
            <div
              className="text-3xl mb-2"
              style={{ fontWeight: w.value as string }}
            >
              Ag
            </div>
            <div className="text-sm font-medium">{w.name}</div>
            <div className="text-xs font-mono text-gray-400">{w.value}</div>
          </div>
        ))}
      </div>

      {/* Additional font weights */}
      <h3 className="text-lg font-semibold mb-3">Additional Weights (Display, Lead, Table)</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
        {additionalFontWeights.map((w) => (
          <div
            key={w.name}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="text-sm font-medium">{w.name}</div>
            <div className="text-xs font-mono text-gray-400">{w.value}</div>
            <div className="text-xs text-gray-500 mt-1">{w.description}</div>
          </div>
        ))}
      </div>

      {/* Line heights */}
      <h3 className="text-lg font-semibold mb-3">Line Heights</h3>
      <div className="space-y-2 mb-10">
        {lineHeightTokens.map((lh) => (
          <div
            key={lh.name}
            className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 px-4 py-3"
          >
            <span className="w-32 text-sm font-medium text-gray-600 shrink-0">
              {lh.name}
            </span>
            <div className="flex-1">
              <div
                className="bg-gray-100 rounded px-3 py-1 text-sm"
                style={{ lineHeight: lh.value }}
              >
                The quick brown fox jumps over the lazy dog. This text demonstrates the line height value.
              </div>
            </div>
            <span className="text-xs font-mono text-gray-400 shrink-0">
              {lh.value}
            </span>
            <CopyButton text={`var(${lh.cssVar})`} />
          </div>
        ))}
      </div>

      {/* Mobile font sizes */}
      <h3 className="text-lg font-semibold mb-3">Mobile Font Sizes</h3>
      <div className="space-y-2">
        {mobileFontSizes.map((s) => (
          <div
            key={s.name}
            className="flex items-baseline gap-4 bg-white rounded-lg border border-gray-200 px-4 py-3"
          >
            <span className="w-36 text-xs font-medium text-gray-500 shrink-0">
              {s.name}
            </span>
            <span
              className="flex-1 truncate"
              style={{ fontSize: s.value, lineHeight: 1.3 }}
            >
              Paragon
            </span>
            <span className="text-xs font-mono text-gray-400 shrink-0">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ElevationSection() {
  return (
    <div>
      <p className="text-gray-500 mb-6">
        Elevation tokens define box shadows at 5 numbered levels plus named
        sizes (sm, base, lg). Z-index tokens control stacking order.
      </p>

      <h3 className="text-lg font-semibold mb-4">Box Shadows</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {elevationLevels.map((e) => (
          <div key={e.name} className="flex flex-col items-center">
            <div
              className="w-full h-28 bg-white rounded-lg flex items-center justify-center"
              style={{ boxShadow: e.shadow }}
            >
              <span className="text-sm font-medium text-gray-600">
                {e.name}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              {e.description}
            </div>
          </div>
        ))}
      </div>

      {/* Directional shadows */}
      <h3 className="text-lg font-semibold mb-4">Directional Shadows</h3>
      <div className="space-y-8 mb-12">
        {directionalShadows.map((group) => (
          <div key={group.direction}>
            <h4 className="text-md font-medium mb-2 text-gray-600">
              {group.direction}{" "}
              <span className="text-xs text-gray-400 font-normal">— {group.description}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {group.levels.map((l) => (
                <div key={l.level} className="flex flex-col items-center">
                  <div
                    className="w-full h-20 bg-white rounded-lg flex items-center justify-center"
                    style={{ boxShadow: l.shadow }}
                  >
                    <span className="text-sm font-medium text-gray-500">
                      {group.direction} {l.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-4">Z-Index Stack</h3>
      <div className="relative bg-gray-50 rounded-xl p-6">
        <div className="space-y-2">
          {zIndexTokens.map((z) => {
            const pct = (z.value / 2000) * 100;
            return (
              <div key={z.name} className="flex items-center gap-3">
                <span className="w-16 text-right text-sm font-mono text-gray-600">
                  {z.value}
                </span>
                <div className="flex-1 relative h-7">
                  <div
                    className="absolute top-0 left-0 h-full rounded-r flex items-center pl-2"
                    style={{
                      width: `${Math.max(pct, 3)}%`,
                      backgroundColor:
                        z.name === "sticky" || z.name === "fixed"
                          ? "#9D0054"
                          : "#0A3055",
                      opacity: 0.15 + (z.value / 2000) * 0.85,
                    }}
                  >
                    <span className="text-xs font-medium text-white whitespace-nowrap">
                      {z.name}
                      {z.name === "sticky" || z.name === "fixed"
                        ? ` (${z.description})`
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BreakpointsSection() {
  return (
    <div>
      <p className="text-gray-500 mb-6">
        Six responsive breakpoints from phones to extra-large desktops.
      </p>

      <div className="space-y-4">
        {breakpoints.map((bp) => {
          const px = parseInt(bp.value);
          const maxBar = 1400;
          const widthPct = px === 0 ? 2 : (px / maxBar) * 100;
          return (
            <div
              key={bp.name}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-semibold text-lg">{bp.name}</span>
                  <span className="text-sm text-gray-400 ml-2">
                    {bp.description}
                  </span>
                </div>
                <span className="font-mono text-sm text-gray-600">
                  {bp.value}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-[#006DAA] to-[#0A3055] transition-all"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Overlapping ranges */}
      <h3 className="text-lg font-semibold mt-10 mb-4">
        Breakpoint Ranges (Visual)
      </h3>
      <div className="relative bg-gray-50 rounded-xl p-6 overflow-hidden">
        <div className="flex justify-between text-xs text-gray-400 font-mono mb-2">
          <span>0px</span>
          <span>576px</span>
          <span>768px</span>
          <span>992px</span>
          <span>1200px</span>
          <span>1400px</span>
        </div>
        {breakpoints.map((bp, i) => {
          const px = parseInt(bp.value);
          const left = (px / 1400) * 100;
          const colors = [
            "#F0F3F5",
            "#C2CBD5",
            "#8598AA",
            "#476480",
            "#0A3055",
            "#07223C",
          ];
          return (
            <div
              key={bp.name}
              className="h-8 mb-1 rounded-r flex items-center px-2"
              style={{
                marginLeft: `${left}%`,
                backgroundColor: colors[i],
                color: contrastText(colors[i]),
              }}
            >
              <span className="text-xs font-medium">
                {bp.name} ({bp.value}+)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SizesSection() {
  return (
    <div>
      <p className="text-gray-500 mb-6">
        Component-specific size tokens for avatars, icons, and containers.
      </p>

      <h3 className="text-lg font-semibold mb-4">Avatar Sizes</h3>
      <div className="flex items-end gap-4 flex-wrap bg-white rounded-lg border border-gray-200 p-6 mb-8">
        {componentSizes.avatars.map((a) => (
          <div key={a.name} className="flex flex-col items-center">
            <div
              className="rounded-full bg-[#0A3055] flex items-center justify-center text-white text-xs font-mono"
              style={{ width: a.value, height: a.value }}
            >
              {a.name}
            </div>
            <div className="text-xs text-gray-500 mt-2 font-mono">
              {a.value}
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-4">Icon Sizes</h3>
      <div className="flex items-end gap-6 bg-white rounded-lg border border-gray-200 p-6 mb-8">
        {componentSizes.icons.map((ic) => (
          <div key={ic.name} className="flex flex-col items-center">
            <div
              className="bg-[#476480] rounded flex items-center justify-center"
              style={{ width: ic.value, height: ic.value }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="white"
                style={{ width: "70%", height: "70%" }}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="text-sm font-medium mt-2">{ic.name}</div>
            <div className="text-xs text-gray-500 font-mono">{ic.value}</div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-4">Container Max Widths</h3>
      <div className="space-y-3">
        {componentSizes.containers.map((c) => {
          const px = parseInt(c.value);
          const pct = (px / 1440) * 100;
          return (
            <div
              key={c.name}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{c.name}</span>
                <span className="font-mono text-sm text-gray-500">
                  {c.value}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded h-4">
                <div
                  className="h-4 rounded bg-[#9D0054] opacity-70"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TransitionDemo({ token }: { token: typeof transitionTokens[number] }) {
  const [active, setActive] = useState(false);

  // Wrap in a stable hover target so collapsing content doesn't cause stutter
  if (token.property === "opacity") {
    return (
      <div
        className="h-8 rounded cursor-pointer"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        title="Hover to see fade"
      >
        <div
          className="h-full w-full bg-[#0A3055] rounded pointer-events-none"
          style={{
            opacity: active ? 0.1 : 1,
            transition: `opacity ${token.duration} ${token.timingFunction}`,
          }}
        />
      </div>
    );
  }
  if (token.property === "height") {
    return (
      <div
        className="h-12 rounded cursor-pointer"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        title="Hover to see collapse"
      >
        <div
          className="w-full bg-[#0A3055] rounded overflow-hidden pointer-events-none"
          style={{
            height: active ? 4 : 48,
            transition: `height ${token.duration} ${token.timingFunction}`,
          }}
        />
      </div>
    );
  }
  if (token.property === "width") {
    return (
      <div
        className="h-8 rounded cursor-pointer"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        title="Hover to see width collapse"
      >
        <div
          className="h-full bg-[#0A3055] rounded pointer-events-none"
          style={{
            width: active ? 4 : "100%",
            transition: `width ${token.duration} ${token.timingFunction}`,
          }}
        />
      </div>
    );
  }
  // "all" or anything else — width expand demo
  return (
    <div
      className="h-8 rounded cursor-pointer"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      title="Hover to see transition"
    >
      <div
        className="h-full bg-[#0A3055] rounded pointer-events-none"
        style={{
          width: active ? "100%" : 64,
          transition: `${token.property} ${token.duration} ${token.timingFunction}`,
        }}
      />
    </div>
  );
}

function TransitionsSection() {
  return (
    <div>
      <p className="text-gray-500 mb-6">
        Transition tokens define animation timing for property changes across the
        system. Hover each demo to see the transition in action.
      </p>
      <div className="space-y-4">
        {transitionTokens.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-lg border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-semibold text-lg">{t.name}</span>
                <span className="text-sm text-gray-400 ml-2">
                  {t.description}
                </span>
              </div>
              <CopyButton text={`var(${t.cssVar})`} />
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Property:</span>{" "}
                <span className="font-mono">{t.property}</span>
              </div>
              <div>
                <span className="text-gray-500">Duration:</span>{" "}
                <span className="font-mono">{t.duration}</span>
              </div>
              <div>
                <span className="text-gray-500">Timing:</span>{" "}
                <span className="font-mono">{t.timingFunction}</span>
              </div>
            </div>
            <div className="mt-3">
              <TransitionDemo token={t} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiscSection() {
  return (
    <div>
      <p className="text-gray-500 mb-6">
        Global configuration tokens used for color generation, contrast detection,
        and print settings.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {miscTokens.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-lg border border-gray-200 p-5"
          >
            <div className="font-semibold">{t.name}</div>
            <div className="text-2xl font-mono text-[#0A3055] mt-1">
              {t.value}
            </div>
            <div className="text-xs text-gray-500 mt-2">{t.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const sectionTitles: Record<Section, string> = {
  overview: "Paragon Design Token System",
  primitives: "Primitive Colors",
  scales: "Color Scales (100–900)",
  semantic: "Semantic Color Aliases",
  spacing: "Spacing Scale",
  radius: "Border Radius",
  typography: "Typography",
  transitions: "Transitions",
  elevation: "Elevation & Z-Index",
  breakpoints: "Breakpoints",
  sizes: "Component Sizes",
  misc: "Global Configuration",
  flowchart: "Token Dependency Flowchart",
  tree: "Token Dependency Tree",
};

export default function Home() {
  const [section, setSection] = useState<Section>("overview");

  const renderSection = () => {
    switch (section) {
      case "overview":
        return <OverviewSection />;
      case "primitives":
        return <PrimitivesSection />;
      case "scales":
        return <ColorScalesSection />;
      case "semantic":
        return <SemanticSection />;
      case "spacing":
        return <SpacingSection />;
      case "radius":
        return <RadiusSection />;
      case "typography":
        return <TypographySection />;
      case "transitions":
        return <TransitionsSection />;
      case "elevation":
        return <ElevationSection />;
      case "breakpoints":
        return <BreakpointsSection />;
      case "sizes":
        return <SizesSection />;
      case "misc":
        return <MiscSection />;
      case "flowchart":
        return <FlowchartView />;
      case "tree":
        return <TreeView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SectionNav active={section} onChange={setSection} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">{sectionTitles[section]}</h1>
        <div className="h-1 w-16 bg-[#0A3055] rounded mb-8" />
        {renderSection()}
      </main>
      <footer className="text-center text-xs text-gray-400 py-8">
        Paragon Design Token Explorer — data extracted from tokens/src/ and
        styles/css/
      </footer>
    </div>
  );
}
