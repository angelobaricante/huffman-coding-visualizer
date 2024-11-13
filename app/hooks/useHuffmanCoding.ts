import { useState, useEffect } from 'react';
import { getFrequencyData } from '../utils/huffmanUtils';

export type HuffmanNode = {
  char: string;
  frequency: number;
  code: string;
  children: HuffmanNode[] | null;
}

export type CompressionData = {
  originalSize: number;
  compressedSize: number;
  compressionRatio: string;
}

export function useHuffmanCoding(initialText: string) {
  const [inputText, setInputText] = useState(initialText);
  const [step, setStep] = useState(0);
  const [frequencyData, setFrequencyData] = useState<{ char: string; count: number }[]>([]);
  const [huffmanTree, setHuffmanTree] = useState<HuffmanNode | null>(null);
  const [encodedText, setEncodedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [compressionData, setCompressionData] = useState<CompressionData | null>(null);

  useEffect(() => {
    handleReset();
  }, [inputText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value.toUpperCase());
  };

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
  };

  const handleReset = () => {
    setStep(0);
    setFrequencyData([]);
    setHuffmanTree(null);
    setEncodedText("");
    setCompressionData(null);
  };

  return {
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
  };
}