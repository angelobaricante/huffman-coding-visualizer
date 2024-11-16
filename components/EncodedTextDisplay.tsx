'use client'

import React, { useState, useMemo } from 'react'
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
  const [hoveredBits, setHoveredBits] = useState("")

  const charToCodeMap = useMemo(() => {
    if (!huffmanTree) return {}
    const map: Record<string, string> = {}
    const traverse = (node: HuffmanNode, code: string) => {
      if (!node.children) {
        map[node.char] = code
      } else {
        traverse(node.children[0], code + '0')
        traverse(node.children[1], code + '1')
      }
    }
    traverse(huffmanTree, '')
    return map
  }, [huffmanTree])

  const codeToCharMap = useMemo(() => {
    return Object.fromEntries(Object.entries(charToCodeMap).map(([char, code]) => [code, char]))
  }, [charToCodeMap])

  const encodedChars = useMemo(() => {
    if (!encodedText) return []
    const chars = []
    let currentCode = ''
    for (const bit of encodedText) {
      currentCode += bit
      if (codeToCharMap[currentCode]) {
        chars.push(currentCode)
        currentCode = ''
      }
    }
    return chars
  }, [encodedText, codeToCharMap])

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex-1">
        <h4 className="text-md font-semibold mb-2">Original Text:</h4>
        <p className="text-xl font-mono break-all">{inputText}</p>
      </div>
      <ArrowRight className="hidden md:block w-8 h-8" />
      <div className="flex-1">
        <h4 className="text-md font-semibold mb-2">Encoded Text:</h4>
        {encodedText ? (
          <p className="text-xl font-mono break-all">
            {encodedChars.map((code, index) => (
              <span
                key={index}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onMouseEnter={() => setHoveredBits(code)}
                onMouseLeave={() => setHoveredBits("")}
              >
                {code}
              </span>
            ))}
          </p>
        ) : (
          <p className="text-xl font-mono">Encoding not available yet</p>
        )}
        {hoveredBits && (
          <p className="mt-2">
            Hovered character: {codeToCharMap[hoveredBits]} (Code: {hoveredBits})
          </p>
        )}
      </div>
    </div>
  )
}

export default EncodedTextDisplay