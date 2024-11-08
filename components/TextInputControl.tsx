import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface TextInputControlProps {
  inputText: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onNextStep: () => void
  onReset: () => void
  step: number
}

export default function TextInputControl({
  inputText,
  onInputChange,
  onNextStep,
  onReset,
  step
}: TextInputControlProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Huffman Coding Visualizer</CardTitle>
        <CardDescription>Explore the process of Huffman Coding step by step</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Input
            placeholder="Enter text to encode"
            value={inputText}
            onChange={onInputChange}
            className="w-full max-w-md"
          />
          <div className="flex space-x-2">
            <Button onClick={onNextStep} disabled={step >= 3}>
              {step === 0 ? "Start Visualization" : "Next Step"}
            </Button>
            <Button onClick={onReset} variant="outline">
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}