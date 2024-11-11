import React from 'react'

interface CompressionData {
  originalSize: number
  compressedSize: number
  compressionRatio: string
}

interface CompressionAnalysisProps {
  compressionData: CompressionData | null
}

const CompressionAnalysis: React.FC<CompressionAnalysisProps> = ({ compressionData }) => {
  if (!compressionData) {
    return null
  }

  return (
    <div className="mt-4">
      <h4 className="text-md font-semibold mb-2">Compression Analysis:</h4>
      <p>
        Original size: {compressionData.originalSize} bits
        <br />
        Compressed size: {compressionData.compressedSize} bits
        <br />
        Compression ratio: {compressionData.compressionRatio}%
      </p>
    </div>
  )
}

export default CompressionAnalysis