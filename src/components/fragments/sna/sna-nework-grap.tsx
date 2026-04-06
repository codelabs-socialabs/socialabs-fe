import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import ForceGraph2D from 'react-force-graph-2d';

// Generate mock graph data
const generateMockGraphData = () => {
  const nodes: any[] = [];
  const links: any[] = [];

  // Clusters
  const clusters = [
    { id: 1, color: '#10b981', size: 30, name: 'Cluster A' }, // Emerald
    { id: 2, color: '#f43f5e', size: 20, name: 'Cluster B' }, // Rose
    { id: 3, color: '#3b82f6', size: 15, name: 'Cluster C' }, // Blue
    { id: 4, color: '#f59e0b', size: 10, name: 'Cluster D' }, // Amber
  ];

  let nodeId = 0;

  clusters.forEach((cluster) => {
    const clusterNodes = [];
    // Create nodes for this cluster
    for (let i = 0; i < cluster.size; i++) {
      const id = `node_${nodeId++}`;
      clusterNodes.push(id);
      // Size distribution: a few large nodes (influencers), many small ones
      const val = i === 0 ? 50 : i < 3 ? 25 : Math.random() * 8 + 4;

      nodes.push({
        id,
        val,
        color: cluster.color,
        cluster: cluster.name,
        name:
          i === 0
            ? `@influencer_${cluster.name.replace(' ', '')}`
            : `@user_${id}`,
      });
    }

    // Create strong internal links for the cluster
    for (let i = 0; i < clusterNodes.length; i++) {
      // Target the central node mostly
      const target =
        Math.random() > 0.3
          ? clusterNodes[0]
          : clusterNodes[Math.floor(Math.random() * clusterNodes.length)];
      if (clusterNodes[i] !== target) {
        links.push({
          source: clusterNodes[i],
          target: target,
          value: Math.random() * 2 + 0.5,
        });
      }
    }
  });

  // Create weak inter-cluster bridges
  links.push({ source: 'node_0', target: 'node_40', value: 1 }); // A to B
  links.push({ source: 'node_2', target: 'node_42', value: 0.5 }); // A to B
  links.push({ source: 'node_40', target: 'node_60', value: 1.5 }); // B to C
  links.push({ source: 'node_0', target: 'node_80', value: 0.8 }); // A to D

  return { nodes, links };
};

const SNANetworkGraph: React.FC = () => {
  const fgRef = useRef<any>(null);
  const [graphData] = useState(() => generateMockGraphData());
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverNode, setHoverNode] = useState<any>(null);

  const highlightNodes = useMemo(() => new Set<string>(), []);
  const highlightLinks = useMemo(() => new Set<any>(), []);

  const updateHighlight = useCallback(() => {
    setHoverNode(hoverNode); // force re-render
  }, [hoverNode]);

  const handleNodeHover = useCallback(
    (node: any) => {
      highlightNodes.clear();
      highlightLinks.clear();
      if (node) {
        highlightNodes.add(node.id);
        graphData.links.forEach((link) => {
          if (link.source.id === node.id || link.target.id === node.id) {
            highlightLinks.add(link);
            highlightNodes.add(link.source.id);
            highlightNodes.add(link.target.id);
          }
        });
      }
      setHoverNode(node || null);
      updateHighlight();
    },
    [graphData.links, highlightNodes, highlightLinks, updateHighlight],
  );

  // Custom node painting for glow effects and dimming
  const paintNode = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const isHighlighted = hoverNode ? highlightNodes.has(node.id) : true;
      const radius = Math.sqrt(node.val) * 1.5; // Scale radius based on value

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);

      // Core fill
      ctx.fillStyle = isHighlighted ? node.color : `${node.color}33`; // 33 is ~20% opacity hex
      ctx.fill();

      // Glow ring around highlighted node
      if (hoverNode === node) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 2, 0, 2 * Math.PI, false);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5 / globalScale;
        ctx.stroke();

        // Outer soft glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 8, 0, 2 * Math.PI, false);
        ctx.fillStyle = `${node.color}50`; // 31% opacity
        ctx.fill();
      } else if (isHighlighted && hoverNode) {
        // Highlighted neighbors
        ctx.lineWidth = 1 / globalScale;
        ctx.strokeStyle = '#ffffff80';
        ctx.stroke();
      }
    },
    [hoverNode, highlightNodes],
  );

  // Resize observer to make graph responsive within container
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || !entries.length) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Initial zoom to fit and gentle breathing animation
  useEffect(() => {
    if (fgRef.current && graphData.nodes.length > 0) {
      setTimeout(() => {
        fgRef.current.zoomToFit(400, 50);
      }, 500);

      // Gentle continuous breathing
      const breathingInterval = setInterval(() => {
        if (fgRef.current) {
          fgRef.current.d3ReheatSimulation();
        }
      }, 3000);

      return () => clearInterval(breathingInterval);
    }
  }, [graphData]);

  return (
    <div
      className="bg-[#0f172a] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative"
      style={{ height: '600px' }}
    >
      {/* Control Overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="text-xl font-bold text-white tracking-tight mb-1 drop-shadow-md">
          Interactive Network Topology
        </h3>
        <p className="text-sm font-medium text-slate-400 drop-shadow-md max-w-md">
          Node size = Influence (Degree). Color = Community Cluster. Scroll to
          zoom, drag to pan the canvas.
        </p>
      </div>

      <div className="absolute bottom-6 left-6 z-10 pointer-events-none flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <span className="text-xs font-bold text-slate-300">
            Cluster A (Public Policy)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
          <span className="text-xs font-bold text-slate-300">
            Cluster B (Protests)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <span className="text-xs font-bold text-slate-300">
            Cluster C (Economy)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
          <span className="text-xs font-bold text-slate-300">
            Cluster D (Satire)
          </span>
        </div>
      </div>

      {/* Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-move">
        <ForceGraph2D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeRelSize={4}
          nodeCanvasObject={paintNode}
          nodeLabel={(
            node,
          ) => `<div class="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-2 rounded-lg shadow-xl border border-slate-200/50 text-xs font-bold">
                        <span class="text-slate-500 font-medium block mb-1">${(node as any).cluster}</span>
                        ${(node as any).name}
                        </div>`}
          linkColor={(link) =>
            !hoverNode
              ? 'rgba(255,255,255,0.15)'
              : highlightLinks.has(link)
                ? 'rgba(255,255,255,0.6)'
                : 'rgba(255,255,255,0.02)'
          }
          linkWidth={(link) =>
            !hoverNode
              ? (link as any).value
              : highlightLinks.has(link)
                ? (link as any).value * 2.5
                : (link as any).value * 0.5
          }
          linkDirectionalParticles={(link) =>
            highlightLinks.has(link) ? 4 : 0
          } // Show moving particles on hovered links
          linkDirectionalParticleWidth={2}
          linkDirectionalParticleSpeed={0.015}
          d3AlphaDecay={0.03}
          d3VelocityDecay={0.4}
          warmupTicks={150}
          cooldownTicks={0}
          onNodeHover={handleNodeHover}
          onNodeClick={(node) => {
            // Center/zoom on node
            fgRef.current.centerAt(node.x, node.y, 1000);
            fgRef.current.zoom(4, 2000);
          }}
        />
      </div>
    </div>
  );
};

export default SNANetworkGraph;
