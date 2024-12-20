"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, RefreshCw, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HuffmanHeaderProps {
  inputText: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onNextStep: () => void
  onReset: () => void
  step: number
  isLoading: boolean
}

export default function HuffmanHeader({
  inputText,
  onInputChange,
  onNextStep,
  onReset,
  step,
  isLoading
}: HuffmanHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="w-full max-w-3xl mx-auto my-6 sm:my-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden bg-background border-none shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-4 pt-6 px-4 sm:pb-6 sm:pt-8 sm:px-8">
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Huffman Coding Interactive Visualizer
              </CardTitle>
              <CardDescription className="text-sm sm:text-base md:text-lg text-muted-foreground mt-2">
                Explore and understand the Huffman Coding algorithm step by step
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="px-4 pb-6 sm:px-8 sm:pb-8">
            <motion.div 
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="relative">
                <Input
                  placeholder="Enter text to encode"
                  value={inputText}
                  onChange={onInputChange}
                  className="w-full text-sm sm:text-base py-4 sm:py-5 bg-background border-border"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button 
                  onClick={onReset} 
                  variant="outline"
                  className="text-sm sm:text-base py-4 sm:py-5 px-4 sm:px-6 w-full sm:w-auto"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button 
                  onClick={onNextStep} 
                  disabled={isLoading || step >= 3}
                  className="text-sm sm:text-base py-4 sm:py-5 px-4 sm:px-6 w-full sm:w-auto"
                >
                  {isLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  {isLoading ? "Processing..." : step === 0 ? "Start Visualization" : "Next Step"}
                </Button>
              </div>
            </motion.div>
          </CardContent>
          <Separator />
          <CardFooter 
            className="p-4 sm:p-6 text-xs sm:text-sm text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors duration-200"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">How to use this visualizer?</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
          </CardFooter>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground bg-muted/50"
              >
                <h3 className="font-semibold mb-2">Follow these steps to visualize Huffman Coding:</h3>
                <ol className="list-decimal list-inside space-y-1.5 sm:space-y-2">
                  <li className="flex flex-col sm:flex-row sm:items-start">
                    <span className="font-medium sm:mr-2">Input:</span>
                    <span>Enter the text you want to encode in the input field above.</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-start">
                    <span className="font-medium sm:mr-2">Frequency Analysis:</span>
                    <span>Click &quot;Start Visualization&quot; to see the frequency of each character.</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-start">
                    <span className="font-medium sm:mr-2">Tree Construction:</span>
                    <span>Click &quot;Next Step&quot; to visualize the Huffman tree being built.</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-start">
                    <span className="font-medium sm:mr-2">Code Generation:</span>
                    <span>Click &quot;Next Step&quot; again to see the Huffman codes for each character.</span>
                  </li>
                </ol>
                <p className="mt-2 italic">Use the &quot;Reset&quot; button at any time to start over with new input.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  )
}

