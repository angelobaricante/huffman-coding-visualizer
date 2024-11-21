'use client'

import { ErrorBoundary } from 'react-error-boundary'
import TextInputControl from '@/components/TextInputControl'
import VisualizationSteps from '@/components/VisualizationSteps'
import { ErrorFallback } from '@/components/ErrorFallback'
import { useHuffmanCoding } from './hooks/useHuffmanCoding'

export default function HuffmanCodingVisualizer() {
  const {
    inputText,
    step,
    frequencyData,
    huffmanTree,
    encodedText,
    isLoading,
    compressionData,
    handleInputChange,
    handleNextStep,
    handleReset,
  } = useHuffmanCoding("HELLO WORLD");

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-9rem)] w-full max-w-4xl mx-auto px-4 py-8">
        <div className="w-full max-w-3xl flex flex-col items-center justify-center space-y-6">
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
      </main>
    </ErrorBoundary>
  )
}