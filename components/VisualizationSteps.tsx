'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"
import FrequencyAnalysisChart from '@/components/FrequencyAnalysisChart'
import HuffmanTreeVisualizer from '@/components/HuffmanTreeVisualizer'
import EncodedTextDisplay from '@/components/EncodedTextDisplay'
import CompressionAnalysis from '@/components/CompressionAnalysis'

type HuffmanNode = {
  char: string
  frequency: number
  code: string
  children: HuffmanNode[] | null
}

type CompressionData = {
  originalSize: number
  compressedSize: number
  compressionRatio: string
}

type VisualizationStepsProps = {
  step: number
  frequencyData: { char: string; count: number }[]
  huffmanTree: HuffmanNode | null
  encodedText: string
  inputText: string
  compressionData: CompressionData | null
  onNextStep: () => void
}

export default function VisualizationSteps({
  step,
  frequencyData,
  huffmanTree,
  encodedText,
  inputText,
  compressionData,
  onNextStep
}: VisualizationStepsProps) {
  const [showExplanations, setShowExplanations] = useState({
    frequencyAnalysis: false,
    huffmanTree: false,
    encoding: false
  })

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
                      <Button onClick={onNextStep}>Next Step</Button>
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
                  {huffmanTree && <HuffmanTreeVisualizer data={huffmanTree} />}
                  {renderExplanation('huffmanTree')}
                  {step === 2 && (
                    <div className="mt-4 flex justify-center">
                      <Button onClick={onNextStep}>Next Step</Button>
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
                  <EncodedTextDisplay
                    inputText={inputText}
                    encodedText={encodedText}
                    huffmanTree={huffmanTree}
                  />
                  {renderExplanation('encoding')}
                  <CompressionAnalysis compressionData={compressionData} />
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
  )
}