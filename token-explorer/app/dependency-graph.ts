// Token dependency graph — models all relationships between token layers

import {
  primitiveColors,
  colorScales,
  semanticColors,
  spacingTokens,
  radiusTokens,
  typographySizes,
  typographyWeights,
  typographyFamilies,
  breakpoints,
  elevationLevels,
  zIndexTokens,
  componentSizes,
} from "./tokens";

export interface GraphNode {
  id: string;
  label: string;
  layer: number; // 0=primitive, 1=base color, 2=scale step, 3=semantic, 4=component
  layerLabel: string;
  color?: string; // hex swatch
  category: string; // grouping key
  cssVar?: string;
  value?: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
}

export interface DependencyGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// Helpers to create stable IDs
const primId = (name: string) => `prim:${name}`;
const scaleBaseId = (scale: string) => `scale-base:${scale}`;
const scaleStepId = (scale: string, step: string) =>
  `scale:${scale}.${step.replace(" (base)", "")}`;
const semId = (category: string, role: string) => `sem:${category}/${role}`;
const compId = (group: string, name: string) => `comp:${group}/${name}`;

// Build the full dependency graph from token data
export function buildDependencyGraph(): DependencyGraph {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // ── Layer 0: Primitives ──────────────────────────────────────
  for (const c of primitiveColors) {
    nodes.push({
      id: primId(c.name),
      label: c.name,
      layer: 0,
      layerLabel: "Primitive",
      color: c.value,
      category: "color",
      cssVar: c.cssVar,
      value: c.value,
    });
  }

  // Spacing primitives
  for (const s of spacingTokens) {
    nodes.push({
      id: `prim:spacing-${s.name}`,
      label: `spacing ${s.name}`,
      layer: 0,
      layerLabel: "Primitive",
      category: "spacing",
      cssVar: s.cssVar,
      value: s.value,
    });
  }

  // Radius primitives
  for (const r of radiusTokens) {
    nodes.push({
      id: `prim:radius-${r.name}`,
      label: `radius ${r.name}`,
      layer: 0,
      layerLabel: "Primitive",
      category: "radius",
      cssVar: r.cssVar,
      value: r.value,
    });
  }

  // Typography primitives
  for (const t of typographyFamilies) {
    nodes.push({
      id: `prim:font-${t.name}`,
      label: `font ${t.name}`,
      layer: 0,
      layerLabel: "Primitive",
      category: "typography",
      value: t.value.split(",")[0].replace(/'/g, ""),
    });
  }
  for (const t of typographySizes) {
    nodes.push({
      id: `prim:font-size-${t.name}`,
      label: `size ${t.name}`,
      layer: 0,
      layerLabel: "Primitive",
      category: "typography",
      cssVar: t.cssVar,
      value: t.value,
    });
  }
  for (const w of typographyWeights) {
    nodes.push({
      id: `prim:font-weight-${w.name}`,
      label: `weight ${w.name}`,
      layer: 0,
      layerLabel: "Primitive",
      category: "typography",
      cssVar: w.cssVar,
      value: String(w.value),
    });
  }

  // Breakpoints
  for (const bp of breakpoints) {
    nodes.push({
      id: `prim:bp-${bp.name}`,
      label: `bp ${bp.name}`,
      layer: 0,
      layerLabel: "Primitive",
      category: "breakpoint",
      cssVar: bp.cssVar,
      value: bp.value,
    });
  }

  // Elevation
  for (const e of elevationLevels) {
    nodes.push({
      id: `prim:elevation-${e.level}`,
      label: `elevation ${e.level}`,
      layer: 0,
      layerLabel: "Primitive",
      category: "elevation",
      value: e.shadow.slice(0, 30) + "...",
    });
  }

  // Z-index
  for (const z of zIndexTokens) {
    nodes.push({
      id: `prim:z-${z.name}`,
      label: `z-index ${z.name}`,
      layer: 0,
      layerLabel: "Primitive",
      category: "z-index",
      value: String(z.value),
    });
  }

  // ── Layer 1: Color Scale Bases + Steps ───────────────────────
  // Map scale base names to the primitive they derive from (per tokens/src/themes/light/global/color.json)
  // Bases with hardcoded hex values have no primitive parent — they ARE primitives themselves.
  const scaleBasePrimitive: Record<string, string | null> = {
    primary: null,                           // hardcoded #0A3055
    secondary: scaleStepId("gray", "700"),   // {color.gray.700}
    brand: null,                             // hardcoded #9D0054
    success: "prim:green",                   // {color.green}
    info: "prim:teal",                       // {color.teal}
    warning: "prim:yellow",                  // {color.yellow}
    danger: "prim:red",                      // {color.red}
    gray: null,                              // hardcoded #707070
    light: null,                             // hardcoded #E1DDDB
    dark: null,                              // hardcoded #273F2F
  };

  for (const scale of colorScales) {
    // Scale base node
    const baseNodeId = scaleBaseId(scale.name);
    nodes.push({
      id: baseNodeId,
      label: `${scale.name} base`,
      layer: 1,
      layerLabel: "Scale Base",
      color: scale.baseHex,
      category: `scale-${scale.name}`,
      value: scale.baseHex,
    });

    // Edge: primitive/scale step → scale base (only when the base actually references another token)
    const primRef = scaleBasePrimitive[scale.name];
    if (primRef !== null && primRef !== undefined) {
      edges.push({ from: primRef, to: baseNodeId, label: "derives" });
    }

    // Scale step nodes
    for (const step of scale.steps) {
      const stepClean = step.name.replace(" (base)", "");
      const stepNodeId = scaleStepId(scale.name, step.name);
      nodes.push({
        id: stepNodeId,
        label: `${scale.name} ${stepClean}`,
        layer: 2,
        layerLabel: "Scale Step",
        color: step.value,
        category: `scale-${scale.name}`,
        cssVar: step.cssVar,
        value: step.value,
      });

      // Edge: scale base → each step (generated via mix)
      const mixTarget = parseInt(stepClean) <= 400 ? "white" : "black";
      edges.push({
        from: baseNodeId,
        to: stepNodeId,
        label: `mix(${mixTarget})`,
      });
    }
  }

  // ── Layer 3: Semantic Tokens ─────────────────────────────────
  for (const group of semanticColors) {
    for (const token of group.tokens) {
      const semNodeId = semId(group.category, token.role);
      nodes.push({
        id: semNodeId,
        label: token.role,
        layer: 3,
        layerLabel: "Semantic",
        color: token.resolvedColor,
        category: `semantic-${group.category}`,
        value: token.resolvedColor,
      });

      // Parse referencePath to find the scale step it points to
      // e.g. "color.primary.500" → scale:primary.500
      //      "color.white" → prim:white
      const ref = token.referencePath;
      const refTarget = resolveReferencePath(ref);
      if (refTarget) {
        edges.push({ from: refTarget, to: semNodeId, label: "alias" });
      }
    }
  }

  // ── Layer 4: Component token examples ────────────────────────
  const componentTokenExamples = [
    { name: "btn-bg-primary", refs: "sem:State Colors/active", group: "Button", color: "#FFFFFF" },
    { name: "btn-bg-primary-base", refs: "scale-base:primary", group: "Button", color: "#0A3055" },
    { name: "btn-bg-primary-hover", refs: "scale:primary.700", group: "Button", color: "#082644" },
    { name: "btn-border-primary", refs: "scale-base:primary", group: "Button", color: "#0A3055" },
    { name: "btn-bg-success", refs: "scale-base:success", group: "Button", color: "#178253" },
    { name: "btn-bg-danger", refs: "scale-base:danger", group: "Button", color: "#C32D3A" },
    { name: "alert-bg-success", refs: "sem:Theme Background/theme-bg-success", group: "Alert", color: "#F1F8F5" },
    { name: "alert-border-success", refs: "sem:Theme Border/theme-border-success", group: "Alert", color: "#C5E0D4" },
    { name: "alert-bg-danger", refs: "sem:Theme Background/theme-bg-danger", group: "Alert", color: "#FBF2F3" },
    { name: "alert-border-danger", refs: "sem:Theme Border/theme-border-danger", group: "Alert", color: "#F0CBCE" },
    { name: "alert-bg-warning", refs: "sem:Theme Background/theme-bg-warning", group: "Alert", color: "#FFFDF0" },
    { name: "alert-bg-info", refs: "sem:Theme Background/theme-bg-info", group: "Alert", color: "#F0F6FA" },
    { name: "card-bg", refs: "sem:Background/bg-base", group: "Card", color: "#FFFFFF" },
    { name: "card-border", refs: "sem:Theme Border/border", group: "Card", color: "#CCCCCC" },
    { name: "input-focus-border", refs: "sem:State Colors/input-focus", group: "Form", color: "#0A3055" },
    { name: "input-disabled-bg", refs: "sem:State Colors/disabled", group: "Form", color: "#707070" },
    { name: "nav-bg-primary", refs: "scale-base:primary", group: "Nav", color: "#0A3055" },
    { name: "nav-link-active", refs: "sem:Background/bg-active", group: "Nav", color: "#0A3055" },
    { name: "modal-bg", refs: "sem:Background/bg-base", group: "Modal", color: "#FFFFFF" },
    { name: "toast-bg-success", refs: "sem:Theme Background/theme-bg-success", group: "Toast", color: "#F1F8F5" },
    { name: "toast-bg-danger", refs: "sem:Theme Background/theme-bg-danger", group: "Toast", color: "#FBF2F3" },
  ];

  for (const ct of componentTokenExamples) {
    const nodeId = compId(ct.group, ct.name);
    nodes.push({
      id: nodeId,
      label: ct.name,
      layer: 4,
      layerLabel: "Component",
      color: ct.color,
      category: `component-${ct.group}`,
      value: ct.color,
    });
    // edge from referenced token
    const refNode = nodes.find((n) => n.id === ct.refs);
    if (refNode) {
      edges.push({ from: ct.refs, to: nodeId, label: "uses" });
    }
  }

  return { nodes, edges };
}

function resolveReferencePath(ref: string): string | null {
  // "color.white" → prim:white
  // "color.primary.500" → scale:primary.500
  // "color.gray.200" → scale:gray.200
  const parts = ref.replace("color.", "").split(".");

  if (parts.length === 1) {
    // primitive color
    return primId(parts[0]);
  }
  if (parts.length === 2) {
    const [scaleName, step] = parts;
    return scaleStepId(scaleName, step);
  }
  return null;
}

// ── Tree structure for the hierarchy view ──────────────────────

export interface TreeNode {
  id: string;
  label: string;
  color?: string;
  value?: string;
  layerLabel: string;
  children: TreeNode[];
}

// Build trees rooted at each layer-0 node, following edges forward
export function buildDependencyTrees(graph: DependencyGraph): TreeNode[] {
  // Build adjacency: from → [to]
  const adj = new Map<string, string[]>();
  for (const e of graph.edges) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from)!.push(e.to);
  }

  const nodeMap = new Map<string, GraphNode>();
  for (const n of graph.nodes) nodeMap.set(n.id, n);

  const visited = new Set<string>();

  function buildTree(nodeId: string): TreeNode | null {
    const node = nodeMap.get(nodeId);
    if (!node) return null;
    if (visited.has(nodeId)) {
      return { id: node.id, label: node.label + " (circular)", color: node.color, value: node.value, layerLabel: node.layerLabel, children: [] };
    }
    visited.add(nodeId);
    const childIds = adj.get(nodeId) || [];
    const children = childIds
      .map((cid) => buildTree(cid))
      .filter((c): c is TreeNode => c !== null);
    visited.delete(nodeId);
    return {
      id: node.id,
      label: node.label,
      color: node.color,
      value: node.value,
      layerLabel: node.layerLabel,
      children,
    };
  }

  // Find root nodes: nodes with no incoming edges
  const hasIncoming = new Set(graph.edges.map((e) => e.to));
  const roots = graph.nodes.filter((n) => !hasIncoming.has(n.id));

  return roots
    .map((r) => buildTree(r.id))
    .filter((t): t is TreeNode => t !== null);
}

// ── Category grouping for filtered views ───────────────────────

export type TokenCategory =
  | "all"
  | "color"
  | "spacing"
  | "typography"
  | "radius"
  | "breakpoint"
  | "elevation"
  | "z-index";

export const TOKEN_CATEGORIES: { id: TokenCategory; label: string }[] = [
  { id: "all", label: "All Tokens" },
  { id: "color", label: "Colors" },
  { id: "spacing", label: "Spacing" },
  { id: "typography", label: "Typography" },
  { id: "radius", label: "Radius" },
  { id: "breakpoint", label: "Breakpoints" },
  { id: "elevation", label: "Elevation" },
  { id: "z-index", label: "Z-Index" },
];

export function filterGraph(
  graph: DependencyGraph,
  category: TokenCategory
): DependencyGraph {
  if (category === "all") return graph;

  // For "color", include all color-related categories
  const matchCategories = (cat: string) => {
    if (category === "color") {
      return (
        cat === "color" ||
        cat.startsWith("scale-") ||
        cat.startsWith("semantic-") ||
        cat.startsWith("component-")
      );
    }
    return cat === category;
  };

  const filteredNodes = graph.nodes.filter((n) => matchCategories(n.category));
  const nodeIds = new Set(filteredNodes.map((n) => n.id));
  const filteredEdges = graph.edges.filter(
    (e) => nodeIds.has(e.from) && nodeIds.has(e.to)
  );

  return { nodes: filteredNodes, edges: filteredEdges };
}
