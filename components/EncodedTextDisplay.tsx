import React, { useState } from 'react'
import { ArrowRight } from "lucide-react"

type HuffmanNode = {
  char: string
  frequency: number
  code: string
  children: HuffmanNode[] | null
}

interface EncodedTextDisplayProps {
  inputText: string
  encodedText: string | undefined
  huffmanTree: HuffmanNode | null
}

const EncodedTextDisplay: React.FC<EncodedTextDisplayProps> = ({ inputText, encodedText, huffmanTree }) => {
  const [hoveredChar, setHoveredChar] = useState("")

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <h4 className="text-md font-semibold mb-2">Original Text:</h4>
        <p className="text-xl font-mono">{inputText}</p>
      </div>
      <ArrowRight className="w-8 h-8" />
      <div className="flex-1">
        <h4 className="text-md font-semibold mb-2">Encoded Text:</h4>
        {encodedText ? (
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
        ) : (
          <p className="text-xl font-mono">Encoding not available yet</p>
        )}
        {hoveredChar && encodedText && (
          <p className="mt-2">
            Hovered character: {hoveredChar} (Code:{" "}
            {huffmanTree ? encodedText[inputText.indexOf(hoveredChar)] : ""})
          </p>
        )}
      </div>
    </div>
  )
}

export default EncodedTextDisplay