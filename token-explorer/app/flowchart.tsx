"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  buildDependencyGraph,
  filterGraph,
  TOKEN_CATEGORIES,
  type TokenCategory,
  type DependencyGraph,
  type GraphNode,
  type GraphEdge,
} from "./dependency-graph";

// ── Layout constants ───────────────────────────────────────────
const NODE_W = 160;
const NODE_H = 48;
const LAYER_GAP_X = 260;
const NODE_GAP_Y = 14;
const PADDING = 80;

interface LayoutNode extends GraphNode {
  x: number;
  y: number;
}

interface LayoutEdge extends GraphEdge {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

function layoutGraph(graph: DependencyGraph): {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  width: number;
  height: number;
} {
  // Group nodes by layer
  const layers: Map<number, GraphNode[]> = new Map();
  for (const n of graph.nodes) {
    if (!layers.has(n.layer)) layers.set(n.layer, []);
    layers.get(n.layer)!.push(n);
  }

  const sortedLayers = [...layers.entries()].sort((a, b) => a[0] - b[0]);

  const positioned = new Map<string, LayoutNode>();

  let maxHeight = 0;
  for (const [, layerNodes] of sortedLayers) {
    const h = layerNodes.length * (NODE_H + NODE_GAP_Y);
    if (h > maxHeight) maxHeight = h;
  }

  for (let li = 0; li < sortedLayers.length; li++) {
    const [, layerNodes] = sortedLayers[li];
    const x = PADDING + li * LAYER_GAP_X;
    const totalH = layerNodes.length * (NODE_H + NODE_GAP_Y) - NODE_GAP_Y;
    const startY = PADDING + (maxHeight - totalH) / 2;

    for (let ni = 0; ni < layerNodes.length; ni++) {
      const n = layerNodes[ni];
      const y = startY + ni * (NODE_H + NODE_GAP_Y);
      positioned.set(n.id, { ...n, x, y });
    }
  }

  const layoutEdges: LayoutEdge[] = [];
  for (const e of graph.edges) {
    const from = positioned.get(e.from);
    const to = positioned.get(e.to);
    if (from && to) {
      layoutEdges.push({
        ...e,
        fromX: from.x + NODE_W,
        fromY: from.y + NODE_H / 2,
        toX: to.x,
        toY: to.y + NODE_H / 2,
      });
    }
  }

  const width =
    PADDING * 2 + sortedLayers.length * LAYER_GAP_X + NODE_W;
  const height = maxHeight + PADDING * 2;

  return {
    nodes: [...positioned.values()],
    edges: layoutEdges,
    width,
    height,
  };
}

function contrastText(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 >= 140 ? "#000" : "#FFF";
}

export default function FlowchartView() {
  const fullGraph = useMemo(() => buildDependencyGraph(), []);
  const [category, setCategory] = useState<TokenCategory>("color");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const graph = useMemo(() => filterGraph(fullGraph, category), [fullGraph, category]);
  const layout = useMemo(() => layoutGraph(graph), [graph]);

  // Search filtering — highlight matching nodes
  const matchingIds = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return new Set(
      graph.nodes
        .filter(
          (n) =>
            n.label.toLowerCase().includes(q) ||
            (n.cssVar && n.cssVar.toLowerCase().includes(q)) ||
            (n.value && n.value.toLowerCase().includes(q))
        )
        .map((n) => n.id)
    );
  }, [graph.nodes, searchQuery]);

  // Connected edges and nodes — walk ALL ancestors and descendants, not just one layer
  const { connectedEdges, connectedNodes } = useMemo(() => {
    const target = selectedNode || hoveredNode;
    if (!target) return { connectedEdges: null, connectedNodes: null };

    const nodeSet = new Set<string>([target]);
    const edgeSet = new Set<string>();

    // Build adjacency for fast lookup
    const childrenOf = new Map<string, { to: string }[]>();
    const parentsOf = new Map<string, { from: string }[]>();
    for (const e of graph.edges) {
      if (!childrenOf.has(e.from)) childrenOf.set(e.from, []);
      childrenOf.get(e.from)!.push({ to: e.to });
      if (!parentsOf.has(e.to)) parentsOf.set(e.to, []);
      parentsOf.get(e.to)!.push({ from: e.from });
    }

    // Walk descendants (outgoing edges)
    const queue: string[] = [target];
    while (queue.length > 0) {
      const current = queue.pop()!;
      for (const child of childrenOf.get(current) || []) {
        edgeSet.add(`${current}->${child.to}`);
        if (!nodeSet.has(child.to)) {
          nodeSet.add(child.to);
          queue.push(child.to);
        }
      }
    }

    // Walk ancestors (incoming edges)
    const aQueue: string[] = [target];
    const visited = new Set<string>([target]);
    while (aQueue.length > 0) {
      const current = aQueue.pop()!;
      for (const parent of parentsOf.get(current) || []) {
        edgeSet.add(`${parent.from}->${current}`);
        if (!visited.has(parent.from)) {
          visited.add(parent.from);
          nodeSet.add(parent.from);
          aQueue.push(parent.from);
        }
      }
    }

    return { connectedEdges: edgeSet, connectedNodes: nodeSet };
  }, [graph.edges, hoveredNode, selectedNode]);

  // ── Pan & Zoom ──────────────────────────────────────────────
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const isPanning = useRef(false);
  const didPan = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const transformRef = useRef(transform);
  transformRef.current = transform;

  // Fit to view on mount or category change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const scaleX = cw / layout.width;
    const scaleY = ch / layout.height;
    const scale = Math.min(scaleX, scaleY, 1) * 0.9;
    const x = (cw - layout.width * scale) / 2;
    const y = (ch - layout.height * scale) / 2;
    setTransform({ x, y, scale });
  }, [layout.width, layout.height]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const t = transformRef.current;
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.max(0.05, Math.min(4, t.scale * factor));
    const newX = mx - (mx - t.x) * (newScale / t.scale);
    const newY = my - (my - t.y) * (newScale / t.scale);
    setTransform({ x: newX, y: newY, scale: newScale });
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isPanning.current = true;
    didPan.current = false;
    panStart.current = { x: e.clientX - transformRef.current.x, y: e.clientY - transformRef.current.y };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return;
    didPan.current = true;
    setTransform((t) => ({
      ...t,
      x: e.clientX - panStart.current.x,
      y: e.clientY - panStart.current.y,
    }));
  }, []);

  const onMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const onBackgroundClick = useCallback((e: React.MouseEvent) => {
    // Only deselect if user clicked without dragging, and clicked on background (not a node)
    if (didPan.current) return;
    if ((e.target as SVGElement).closest?.("g[data-node]")) return;
    setSelectedNode(null);
  }, []);

  // Layer labels + column positions for backgrounds
  const layerColumns = useMemo(() => {
    const cols: { label: string; x: number; layer: number }[] = [];
    const seen = new Map<number, string>();
    for (const n of layout.nodes) {
      if (!seen.has(n.layer)) {
        seen.set(n.layer, n.layerLabel);
        cols.push({ label: n.layerLabel, x: n.x, layer: n.layer });
      }
    }
    return cols;
  }, [layout.nodes]);

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex gap-1.5">
          {TOKEN_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setCategory(cat.id); setSelectedNode(null); }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition cursor-pointer ${
                category === cat.id
                  ? "bg-[#0A3055] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm w-48 focus:outline-none focus:ring-2 focus:ring-[#0A3055]/30"
        />
        <span className="text-xs text-gray-400 ml-auto">
          {graph.nodes.length} nodes, {graph.edges.length} edges — scroll to zoom, drag to pan
        </span>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="flex-1 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden relative"
        style={{ cursor: isPanning.current ? "grabbing" : "grab" }}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          className="select-none"
          onClick={onBackgroundClick}
        >
          <g transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
            {/* Layer background columns + separators */}
            {layerColumns.map((col, i) => {
              const bgColors = ["#0A3055", "#1D4E7E", "#476480", "#8598AA", "#C2CBD5"];
              const colX = col.x - PADDING / 2;
              const colW = LAYER_GAP_X;
              return (
                <g key={`bg-${col.label}`}>
                  <rect
                    x={colX}
                    y={0}
                    width={i === layerColumns.length - 1 ? NODE_W + PADDING : colW}
                    height={layout.height}
                    fill={bgColors[col.layer] || "#E2E8F0"}
                    opacity={0.15}
                  />
                  {i > 0 && (
                    <line
                      x1={colX}
                      y1={0}
                      x2={colX}
                      y2={layout.height}
                      stroke={bgColors[col.layer] || "#CBD5E1"}
                      strokeWidth={2}
                      opacity={0.4}
                    />
                  )}
                </g>
              );
            })}

            {/* Edges */}
            {layout.edges.map((e) => {
              const key = `${e.from}->${e.to}`;
              const isHighlighted = connectedEdges?.has(key);
              const isDimmed = connectedEdges && !isHighlighted;
              const midX = (e.fromX + e.toX) / 2;
              return (
                <g key={key}>
                  <path
                    d={`M ${e.fromX} ${e.fromY} C ${midX} ${e.fromY}, ${midX} ${e.toY}, ${e.toX} ${e.toY}`}
                    fill="none"
                    stroke={isHighlighted ? "#0A3055" : "#CBD5E1"}
                    strokeWidth={isHighlighted ? 2 : 1}
                    opacity={isDimmed ? 0.15 : isHighlighted ? 1 : 0.5}
                    style={{ transition: "opacity 0.15s, stroke 0.15s" }}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {layout.nodes.map((n) => {
              const isSearchMatch = matchingIds ? matchingIds.has(n.id) : true;
              const isConnected = connectedNodes ? connectedNodes.has(n.id) : true;
              const isDimmed = (matchingIds && !isSearchMatch) || (connectedNodes && !isConnected);
              const isActive = n.id === selectedNode || n.id === hoveredNode;

              return (
                <g
                  key={n.id}
                  data-node
                  transform={`translate(${n.x},${n.y})`}
                  opacity={isDimmed ? 0.2 : 1}
                  style={{ transition: "opacity 0.15s", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredNode(n.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNode(selectedNode === n.id ? null : n.id);
                  }}
                >
                  <rect
                    width={NODE_W}
                    height={NODE_H}
                    rx={8}
                    fill="white"
                    stroke={isActive ? "#0A3055" : "#E2E8F0"}
                    strokeWidth={isActive ? 2.5 : 1}
                  />
                  {/* Color swatch */}
                  {n.color && (
                    <rect
                      x={4}
                      y={4}
                      width={NODE_H - 8}
                      height={NODE_H - 8}
                      rx={6}
                      fill={n.color}
                      stroke="#E2E8F0"
                      strokeWidth={0.5}
                    />
                  )}
                  {/* Label */}
                  <text
                    x={n.color ? NODE_H + 4 : 10}
                    y={NODE_H / 2 - 4}
                    className="fill-gray-800"
                    style={{ fontSize: 11, fontWeight: 600 }}
                  >
                    {n.label.length > 14 ? n.label.slice(0, 13) + "..." : n.label}
                  </text>
                  {/* Value */}
                  {n.value && (
                    <text
                      x={n.color ? NODE_H + 4 : 10}
                      y={NODE_H / 2 + 10}
                      className="fill-gray-400"
                      style={{ fontSize: 9, fontFamily: "monospace" }}
                    >
                      {n.value.length > 16 ? n.value.slice(0, 15) + "..." : n.value}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Fixed layer labels bar — stays visible when panning */}
        <div className="absolute top-0 left-0 right-0 h-8 pointer-events-none z-20 flex">
          {layerColumns.map((col) => {
            const bgColors = ["#0A3055", "#1D4E7E", "#476480", "#8598AA", "#C2CBD5"];
            const screenX = transform.x + (col.x + NODE_W / 2) * transform.scale;
            return (
              <div
                key={`label-${col.label}`}
                className="absolute top-0 h-8 flex items-center justify-center"
                style={{
                  left: screenX,
                  transform: "translateX(-50%)",
                }}
              >
                <span
                  className="px-3 py-1 rounded-b-md text-[11px] font-bold tracking-wider uppercase whitespace-nowrap"
                  style={{
                    backgroundColor: bgColors[col.layer] || "#94A3B8",
                    color: "#FFFFFF",
                  }}
                >
                  {col.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected node detail panel */}
        {selectedNode && (() => {
          const node = graph.nodes.find((n) => n.id === selectedNode);
          if (!node) return null;
          const inEdges = graph.edges.filter((e) => e.to === selectedNode);
          const outEdges = graph.edges.filter((e) => e.from === selectedNode);
          return (
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs z-10">
              <div className="flex items-center gap-2 mb-2">
                {node.color && (
                  <div
                    className="w-8 h-8 rounded-md border border-gray-200"
                    style={{ backgroundColor: node.color }}
                  />
                )}
                <div>
                  <div className="font-semibold text-sm">{node.label}</div>
                  <div className="text-xs text-gray-400">{node.layerLabel}</div>
                </div>
              </div>
              {node.cssVar && (
                <div className="text-xs font-mono text-gray-500 mb-1">{node.cssVar}</div>
              )}
              {node.value && (
                <div className="text-xs font-mono text-gray-600 mb-2">{node.value}</div>
              )}
              {inEdges.length > 0 && (
                <div className="text-xs mb-1">
                  <span className="text-gray-400">Depends on: </span>
                  {inEdges.map((e) => {
                    const src = graph.nodes.find((n) => n.id === e.from);
                    return (
                      <button
                        key={e.from}
                        className="text-[#006DAA] hover:underline mr-1 cursor-pointer"
                        onClick={() => setSelectedNode(e.from)}
                      >
                        {src?.label || e.from}
                      </button>
                    );
                  })}
                </div>
              )}
              {outEdges.length > 0 && (
                <div className="text-xs">
                  <span className="text-gray-400">Used by: </span>
                  {outEdges.slice(0, 8).map((e) => {
                    const tgt = graph.nodes.find((n) => n.id === e.to);
                    return (
                      <button
                        key={e.to}
                        className="text-[#006DAA] hover:underline mr-1 cursor-pointer"
                        onClick={() => setSelectedNode(e.to)}
                      >
                        {tgt?.label || e.to}
                      </button>
                    );
                  })}
                  {outEdges.length > 8 && (
                    <span className="text-gray-400">+{outEdges.length - 8} more</span>
                  )}
                </div>
              )}
              <button
                className="mt-2 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={() => setSelectedNode(null)}
              >
                Close
              </button>
            </div>
          );
        })()}

        {/* Legend */}
        <div className="absolute top-3 right-3 bg-white/90 rounded-lg border border-gray-200 px-3 py-2 text-xs z-10">
          <div className="font-semibold text-gray-500 mb-1">Layers</div>
          {[
            { label: "Primitive", color: "#0A3055" },
            { label: "Base Color", color: "#1D4E7E" },
            { label: "Scale Step", color: "#476480" },
            { label: "Semantic", color: "#8598AA" },
            { label: "Component", color: "#C2CBD5" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 leading-5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
