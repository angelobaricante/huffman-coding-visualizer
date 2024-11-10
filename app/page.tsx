"use client"

import { useState, useEffect, useRef } from "react"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Info, ZoomIn, ZoomOut, Move } from "lucide-react"
import * as d3 from "d3"
import { ErrorBoundary } from 'react-error-boundary'
import TextInputControl from '@/components/TextInputControl'
import FrequencyAnalysisChart from '@/components/FrequencyAnalysisChart'

type HuffmanNode = {
  char: string
  frequency: number
  code: string
  children: HuffmanNode[] | null
}

const getFrequencyData = async (text: string) => {
  const response = await fetch('/api/calculate-frequency', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to calculate frequency');
  }
  return response.json();
}

const TreeVisualization: React.FC<{ data: HuffmanNode }> = ({ data }) => {
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

function ErrorFallback({error, resetErrorBoundary}: {error: Error; resetErrorBoundary: () => void}) {
  return (
    <div role="alert" className="p-4 bg-red-100 border border-red-400 rounded">
      <h2 className="text-lg font-semibold text-red-800">Something went wrong:</h2>
      <pre className="mt-2 text-sm text-red-600 whitespace-pre-wrap">{error.message}</pre>
      <Button onClick={resetErrorBoundary} className="mt-4">Try again</Button>
    </div>
  )
}

export default function HuffmanCodingVisualizer() {
  const [inputText, setInputText] = useState("HELLO WORLD")
  const [step, setStep] = useState(0)
  const [frequencyData, setFrequencyData] = useState<{ char: string; count: number }[]>([])
  const [huffmanTree, setHuffmanTree] = useState<HuffmanNode | null>(null)
  const [encodedText, setEncodedText] = useState("")
  const [hoveredChar, setHoveredChar] = useState("")
  const [showExplanations, setShowExplanations] = useState({
    frequencyAnalysis: false,
    huffmanTree: false,
    encoding: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [compressionData, setCompressionData] = useState<{
    originalSize: number;
    compressedSize: number;
    compressionRatio: string;
  } | null>(null);


  useEffect(() => {
    handleReset()
  }, [inputText])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value.toUpperCase())
  }

  const handleNextStep = async () => {
    if (step === 0) {
      setIsLoading(true);
      try {
        const data = await getFrequencyData(inputText);
        setFrequencyData(data);
        setStep(1);
      } catch (error) {
        console.error('Error calculating frequency:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (step === 1) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/build-tree', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ frequencyData: Object.fromEntries(frequencyData.map(item => [item.char, item.count])) }),
        });
        if (!response.ok) {
          throw new Error('Failed to build Huffman tree');
        }
        const { tree } = await response.json();
        setHuffmanTree(tree);
        setStep(2);
      } catch (error) {
        console.error('Error building Huffman tree:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (step === 2) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/encode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputText, tree: huffmanTree }),
        });
        if (!response.ok) {
          throw new Error('Failed to encode text');
        }
        const { encodedText, originalSize, compressedSize, compressionRatio } = await response.json();
        setEncodedText(encodedText);
        setCompressionData({ originalSize, compressedSize, compressionRatio });
        setStep(3);
      } catch (error) {
        console.error('Error encoding text:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleReset = () => {
    setStep(0)
    setFrequencyData([])
    setHuffmanTree(null)
    setEncodedText("")
    setShowExplanations({
      frequencyAnalysis: false,
      huffmanTree: false,
      encoding: false
    })
  }

  const toggleExplanation = (step: 'frequencyAnalysis' | 'huffmanTree' | 'encoding') => {
    setShowExplanations(prev => ({
      ...prev,
      [step]: !prev[step]
    }))
  }

  const renderExplanation = (step: 'frequencyAnalysis' | 'huffmanTree' | 'encoding') => {
    if (!showExplanations[step]) return null

    switch (step) {
      case 'frequencyAnalysis':
        return (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">In-depth Explanation: Frequency Analysis</h4>
            <p>
              Frequency analysis is the first step in Huffman coding. Here&apos;s what&apos;s happening:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>We iterate through each character in the input text.</li>
              <li>For each character, we count how many times it appears.</li>
              <li>We store these counts in a data structure (usually a hash table or dictionary).</li>
              <li>The resulting frequency data is used to build the Huffman tree in the next step.</li>
            </ol>
            <p className="mt-2">
              Characters that appear more frequently will be assigned shorter codes, which is the key to
              Huffman coding&apos;s compression efficiency. This step helps us identify which characters should
              get shorter codes.
            </p>
          </div>
        )
      case 'huffmanTree':
        return (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">In-depth Explanation: Building the Huffman Tree</h4>
            <p>
              The Huffman tree is a binary tree that determines the codes for each character. Here&apos;s how it&apos;s built:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>Start with a list of nodes, one for each character, weighted by their frequency.</li>
              <li>Repeatedly take the two nodes with the lowest frequencies and combine them into a new node.</li>
              <li>The new node&apos;s frequency is the sum of its two child nodes.</li>
              <li>Add this new node back to the list.</li>
              <li>Repeat steps 2-4 until only one node remains (the root of the Huffman tree).</li>
            </ol>
            <p className="mt-2">
              This process ensures that characters with higher frequencies are closer to the root of the tree,
              resulting in shorter codes for these characters.
            </p>
          </div>
        )
      case 'encoding':
        return (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">In-depth Explanation: Encoding</h4>
            <p>
              The encoding process uses the Huffman tree to assign unique binary codes to each character. Here&apos;s how it works:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>Start at the root of the Huffman tree.</li>
              <li>For each character, trace the path from the root to the character&apos;s leaf node.</li>
              <li>Assign &apos;0&apos; for each left branch and &apos;1&apos; for each right branch along this path.</li>
              <li>The sequence of 0s and 1s forms the code for that character.</li>
              <li>Replace each character in the original text with its corresponding code.</li>
            </ol>
            <p className="mt-2">
              This encoding ensures that no code is a prefix of another, allowing for unambiguous decoding.
              The resulting encoded text is a compressed version of the original, often significantly shorter in bit length.
            </p>
          </div>
        )
    }
  }
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
        <TextInputControl
          inputText={inputText}
          onInputChange={handleInputChange}
          onNextStep={handleNextStep}
          onReset={handleReset}
          step={step}
          isLoading={isLoading}
        />

        {step > 0 && (
          <Card className="w-full max-w-5xl mt-8">
            <CardContent className="p-6">
              <Tabs defaultValue="visualization" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                  <TabsTrigger value="explanation">Explanation</TabsTrigger>
                </TabsList>
                <TabsContent value="visualization">
                  <div className="space-y-8 px-4">
                    {step >= 1 && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">Step 1: Frequency Analysis</h3>
                          <Button onClick={() => toggleExplanation('frequencyAnalysis')} variant="outline" size="sm">
                            <Info className="w-4 h-4 mr-2" />
                            {showExplanations.frequencyAnalysis ? "Hide" : "Show"} Explanation
                          </Button>
                        </div>
                        <FrequencyAnalysisChart frequencyData={frequencyData} />
                        {renderExplanation('frequencyAnalysis')}
                        {step === 1 && (
                          <div className="mt-4 flex justify-center">
                            <Button onClick={handleNextStep}>Next Step</Button>
                          </div>
                        )}
                      </div>
                    )}

                    {step >= 2 && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">Step 2: Huffman Tree</h3>
                          <Button onClick={() => toggleExplanation('huffmanTree')} variant="outline" size="sm">
                            <Info className="w-4 h-4 mr-2" />
                            {showExplanations.huffmanTree ? "Hide" : "Show"} Explanation
                          </Button>
                        </div>
                        {huffmanTree && <TreeVisualization data={huffmanTree} />}
                        {renderExplanation('huffmanTree')}
                        {step === 2 && (
                          <div className="mt-4 flex justify-center">
                            <Button onClick={handleNextStep}>Next Step</Button>
                          </div>
                        )}
                      </div>
                    )}

                    {step >= 3 && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">Step 3: Encoding</h3>
                          <Button onClick={() => toggleExplanation('encoding')} variant="outline" size="sm">
                            <Info className="w-4 h-4 mr-2" />
                            {showExplanations.encoding ? "Hide" : "Show"} Explanation
                          </Button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <h4 className="text-md font-semibold  mb-2">Original Text:</h4>
                            <p className="text-xl font-mono">{inputText}</p>
                          </div>
                          <ArrowRight className="w-8 h-8" />
                          <div className="flex-1">
                            <h4 className="text-md font-semibold mb-2">Encoded Text:</h4>
                            <p className="text-xl font-mono break-all">
                              {encodedText.split("").map((bit, index) => (
                                <span
                                  key={index}
                                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                  onMouseEnter={() => setHoveredChar(inputText[index])}
                                  onMouseLeave={() => setHoveredChar("")}
                                >
                                  {bit}
                                </span>
                              ))}
                            </p>
                            {hoveredChar && (
                              <p className="mt-2">
                                Hovered character: {hoveredChar} (Code:{" "}
                                  {huffmanTree ? encodedText.split("")[inputText.indexOf(hoveredChar)] : ""})
                              </p>
                            )}
                          </div>
                        </div>
                        {renderExplanation('encoding')}
                        <div className="mt-4">
                          <h4 className="text-md font-semibold mb-2">Compression Analysis:</h4>
                          {compressionData && (
                          <p>
                          Original size: {compressionData.originalSize} bits
                            <br />
                            Compressed size: {compressionData.compressedSize} bits
                            <br />
                            Compression ratio: {compressionData.compressionRatio}%
                          </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="explanation">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Step 1: Frequency Analysis</h3>
                      <p>
                        In this step, we count how often each character appears in the input text. Characters
                        that appear more frequently will be assigned shorter codes, which is the key to
                        Huffman coding&apos;s compression efficiency.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Step 2: Building the Huffman Tree</h3>
                      <p>
                        We create a binary tree based on the character frequencies. The process starts with
                        each character as a leaf node. We repeatedly combine the two nodes with the lowest
                        frequencies until we have a single root node. This tree structure determines the
                        binary codes for each character.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Step 3: Encoding</h3>
                      <p>
                        We traverse the Huffman tree to assign binary codes to each character. Left branches
                        are labeled with &apos;0&apos; and right branches with &apos;1&apos;. The path from the root to a
                        character&apos;s leaf node becomes its code. We then replace each character in the
                        original text with its corresponding code.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Compression Analysis</h3>
                      <p>
                        We compare the size of the original text (assuming 8 bits per character) with the
                        size of the encoded text. The difference shows how much space we&apos;ve saved through
                        Huffman coding. This compression is lossless, meaning we can fully recover the
                        original text from the encoded version.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </ErrorBoundary>
  )
}