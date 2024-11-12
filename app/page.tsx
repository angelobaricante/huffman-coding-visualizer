'use client'

import { useState, useEffect } from "react"
import { ErrorBoundary } from 'react-error-boundary'
import TextInputControl from '@/components/TextInputControl'
import VisualizationSteps from '@/components/VisualizationSteps'
import { Button } from "@/components/ui/button"

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
  const [isLoading, setIsLoading] = useState(false)
  const [compressionData, setCompressionData] = useState<CompressionData | null>(null)

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
        if (!response.ok) throw new Error('Failed to encode text');
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
    setCompressionData(null)
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
          <VisualizationSteps
            step={step}
            frequencyData={frequencyData}
            huffmanTree={huffmanTree}
            encodedText={encodedText}
            inputText={inputText}
            compressionData={compressionData}
            onNextStep={handleNextStep}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}