"use client";

import { useState, useMemo, useCallback } from "react";
import {
  buildDependencyGraph,
  buildDependencyTrees,
  filterGraph,
  TOKEN_CATEGORIES,
  type TokenCategory,
  type TreeNode,
} from "./dependency-graph";

function contrastText(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 >= 140 ? "#000" : "#FFF";
}

// Collect all node IDs in a tree recursively
function collectIds(node: TreeNode): string[] {
  return [node.id, ...node.children.flatMap(collectIds)];
}

function TreeNodeRow({
  node,
  depth,
  expanded,
  onToggle,
  searchQuery,
}: {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  searchQuery: string;
}) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isMatch =
    searchQuery &&
    (node.label.toLowerCase().includes(searchQuery) ||
      (node.value && node.value.toLowerCase().includes(searchQuery)));

  return (
    <>
      <div
        className={`flex items-center gap-2 py-1.5 px-3 rounded-md transition-colors ${
          isMatch ? "bg-yellow-50 ring-1 ring-yellow-300" : "hover:bg-gray-50"
        }`}
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
      >
        {/* Expand/collapse toggle */}
        {hasChildren ? (
          <button
            onClick={() => onToggle(node.id)}
            className="w-5 h-5 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer flex-shrink-0"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
            >
              <path d="M4 2 L9 6 L4 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </span>
        )}

        {/* Color swatch */}
        {node.color ? (
          <div
            className="w-5 h-5 rounded border border-gray-200 flex-shrink-0"
            style={{ backgroundColor: node.color }}
            title={node.color}
          />
        ) : (
          <div className="w-5 h-5 rounded border border-dashed border-gray-300 flex-shrink-0 flex items-center justify-center">
            <span className="text-[8px] text-gray-400">--</span>
          </div>
        )}

        {/* Label */}
        <span className="font-medium text-sm text-gray-800 truncate">
          {node.label}
        </span>

        {/* Layer badge */}
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0"
          style={{
            backgroundColor:
              node.layerLabel === "Primitive"
                ? "#0A3055"
                : node.layerLabel === "Scale Base"
                ? "#476480"
                : node.layerLabel === "Scale Step"
                ? "#6B8299"
                : node.layerLabel === "Semantic"
                ? "#8598AA"
                : "#C2CBD5",
            color:
              node.layerLabel === "Component" ? "#333" : "#FFF",
          }}
        >
          {node.layerLabel}
        </span>

        {/* Value */}
        {node.value && (
          <span className="text-xs font-mono text-gray-400 ml-auto flex-shrink-0">
            {node.value}
          </span>
        )}

        {/* Child count */}
        {hasChildren && (
          <span className="text-[10px] text-gray-400 flex-shrink-0">
            ({node.children.length})
          </span>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {node.children.map((child) => (
            <TreeNodeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default function TreeView() {
  const fullGraph = useMemo(() => buildDependencyGraph(), []);
  const [category, setCategory] = useState<TokenCategory>("color");
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const graph = useMemo(() => filterGraph(fullGraph, category), [fullGraph, category]);
  const trees = useMemo(() => buildDependencyTrees(graph), [graph]);

  // Group trees by category for cleaner display
  const groupedTrees = useMemo(() => {
    const groups = new Map<string, TreeNode[]>();
    for (const tree of trees) {
      // Group by the first part of the category or the layerLabel
      const groupKey = tree.layerLabel === "Primitive" ? "Primitives" : tree.layerLabel;
      if (!groups.has(groupKey)) groups.set(groupKey, []);
      groups.get(groupKey)!.push(tree);
    }
    return groups;
  }, [trees]);

  const toggleNode = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const allIds = new Set<string>();
    for (const tree of trees) {
      for (const id of collectIds(tree)) allIds.add(id);
    }
    setExpanded(allIds);
  }, [trees]);

  const collapseAll = useCallback(() => {
    setExpanded(new Set());
  }, []);

  // Expand only the first level
  const expandFirstLevel = useCallback(() => {
    const firstLevelIds = new Set(trees.map((t) => t.id));
    setExpanded(firstLevelIds);
  }, [trees]);

  // Search-driven auto-expand: when searching, expand paths to matching nodes
  useMemo(() => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    const toExpand = new Set<string>();

    function findAndExpand(node: TreeNode, ancestors: string[]): boolean {
      const match =
        node.label.toLowerCase().includes(q) ||
        (node.value && node.value.toLowerCase().includes(q));
      let childMatch = false;
      for (const child of node.children) {
        if (findAndExpand(child, [...ancestors, node.id])) {
          childMatch = true;
        }
      }
      if (match || childMatch) {
        for (const a of ancestors) toExpand.add(a);
        toExpand.add(node.id);
        return true;
      }
      return false;
    }

    for (const tree of trees) {
      findAndExpand(tree, []);
    }
    if (toExpand.size > 0) {
      setExpanded(toExpand);
    }
  }, [searchQuery, trees]);

  const totalNodes = useMemo(() => {
    let count = 0;
    function countNodes(node: TreeNode) {
      count++;
      node.children.forEach(countNodes);
    }
    trees.forEach(countNodes);
    return count;
  }, [trees]);

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex gap-1.5">
          {TOKEN_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setCategory(cat.id); setExpanded(new Set()); }}
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
        <div className="flex gap-1.5 ml-auto">
          <button
            onClick={expandFirstLevel}
            className="px-2.5 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer"
          >
            Level 1
          </button>
          <button
            onClick={expandAll}
            className="px-2.5 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-400 mb-2">
        {trees.length} root tokens, {totalNodes} total nodes in tree
      </div>

      {/* Tree */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-auto">
        <div className="py-2">
          {[...groupedTrees.entries()].map(([groupName, groupTrees]) => (
            <div key={groupName}>
              <div className="px-4 pt-4 pb-1">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {groupName} ({groupTrees.length})
                </h3>
              </div>
              {groupTrees.map((tree) => (
                <TreeNodeRow
                  key={tree.id}
                  node={tree}
                  depth={0}
                  expanded={expanded}
                  onToggle={toggleNode}
                  searchQuery={searchQuery.toLowerCase()}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
