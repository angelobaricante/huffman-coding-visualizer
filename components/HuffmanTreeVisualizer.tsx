import React, { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Move } from "lucide-react"
import * as d3 from "d3"

type HuffmanNode = {
  char: string
  frequency: number
  code: string
  children: HuffmanNode[] | null
}

interface HuffmanTreeVisualizerProps {
  data: HuffmanNode
}

const HuffmanTreeVisualizer: React.FC<HuffmanTreeVisualizerProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [currentTransform, setCurrentTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity)
  const [gRef, setGRef] = useState<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null)

  useEffect(() => {
    if (!data || !svgRef.current) return

    const width = 2400
    const height = 1200
    const margin = { top: 40, right: 400, bottom: 40, left: 400 }

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const g = svg.append("g")
    setGRef(g)

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
        setCurrentTransform(event.transform)
      })

    svg.call(zoom)

    const tree = d3.tree<HuffmanNode>()
      .size([height - margin.top - margin.bottom, width - margin.left - margin.right])
      .separation((a, b) => {
        const baseSeparation = a.parent === b.parent ? 4 : 5
        const leafSeparation = (!a.children && !b.children) ? 2 : 1
        return baseSeparation * leafSeparation
      })

    const root = d3.hierarchy(data)
    tree(root)

    g.selectAll(".link")
      .data(root.links())
      .enter().append("path")
      .attr("class", "link")
      .attr("d", d3.linkHorizontal<d3.HierarchyLink<HuffmanNode>, d3.HierarchyPointNode<HuffmanNode>>()
        .x(d => d.y!)
        .y(d => d.x!))
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--primary))")

    const node = g.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.y},${d.x})`)

    node.append("circle")
      .attr("r", 30)
      .attr("fill", "hsl(var(--primary))")

    node.append("text")
      .attr("dy", ".35em")
      .attr("x", d => d.children ? -40 : 40)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => {
        const char = d.data.char
        return char.length > 6 ? char.slice(0, 6) + "..." : char
      })
      .attr("fill", "hsl(var(--primary))")
      .attr("font-size", "16px")

    svg.attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
  }, [data])

  const handleZoom = (direction: 'in' | 'out') => {
    if (!svgRef.current || !gRef) return

    const svg = d3.select(svgRef.current)
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        gRef.attr("transform", event.transform)
        setCurrentTransform(event.transform)
      })
    
    if (direction === 'in') {
      svg.transition()
        .duration(300)
        .call(zoom.scaleBy, 1.3)
    } else {
      svg.transition()
        .duration(300)
        .call(zoom.scaleBy, 1 / 1.3)
    }
  }

  const handleReset = () => {
    if (!svgRef.current || !gRef) return

    const svg = d3.select(svgRef.current)
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        gRef.attr("transform", event.transform)
        setCurrentTransform(event.transform)
      })

    svg.transition()
      .duration(300)
      .call(zoom.transform, d3.zoomIdentity)
  }

  return (
    <div className="relative w-full h-[900px] overflow-hidden border rounded-lg">
      <svg ref={svgRef} width="100%" height="100%"></svg>
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button onClick={() => handleZoom('in')} size="sm" variant="outline" aria-label="Zoom in">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button onClick={() => handleZoom('out')} size="sm" variant="outline" aria-label="Zoom out">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button onClick={handleReset} size="sm" variant="outline" aria-label="Reset zoom">
          <Move className="w-4 h-4" />
        </Button>
      </div>
      <div className="absolute bottom-4 right-4 bg-background/80 p-2 rounded">
        <p className="text-sm">
          Zoom: {currentTransform.k.toFixed(2)}x
        </p>
      </div>
    </div>
  )
}

export default HuffmanTreeVisualizer