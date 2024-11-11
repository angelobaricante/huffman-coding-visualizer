'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">About Huffman Coding</h1>
      <p className="text-xl mb-6 text-center">Learn about the algorithm behind our visualizer</p>
      
      <div className="space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-center">What is Huffman Coding?</CardTitle>
            <CardDescription className="text-center">A brief introduction to Huffman coding</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Huffman coding is a data compression algorithm developed by David A. Huffman in 1952. It&apos;s a method of encoding characters based on their frequency of occurrence. Characters that appear more frequently are given shorter codes, while less frequent characters are assigned longer codes.</p>
            <p className="mt-4">Key points about Huffman coding:</p>
            <ul className="list-disc pl-6 mt-2 text-left">
              <li>It's a variable-length prefix coding technique</li>
              <li>It creates an optimal lossless compression</li>
              <li>It's widely used in file compression algorithms</li>
              <li>The algorithm builds a binary tree (Huffman tree) to derive the codes</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-center">Video Explanation</CardTitle>
            <CardDescription className="text-center">A visual guide to understanding Huffman coding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/dM6us854Jk0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-center">How to Use Our Huffman Coding Visualizer</CardTitle>
            <CardDescription className="text-center">Step-by-step guide to using our tool</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-6 space-y-4 text-left">
              <li>Enter your text in the input field on the home page and click "Start".</li>
              <li>
                <strong>Frequency Analysis</strong>
                <p className="mt-2">In this step, we count how often each character appears in the input text. You'll see a bar chart showing the frequency of each character. Characters that appear more frequently will be assigned shorter codes, which is the key to Huffman coding's compression efficiency.</p>
              </li>
              <li>
                <strong>Building the Huffman Tree</strong>
                <p className="mt-2">We create a binary tree based on the character frequencies. The process starts with each character as a leaf node. We repeatedly combine the two nodes with the lowest frequencies until we have a single root node. This tree structure determines the binary codes for each character. You can use the zoom and pan controls to explore the Huffman tree in detail.</p>
              </li>
              <li>
                <strong>Encoding</strong>
                <p className="mt-2">We traverse the Huffman tree to assign binary codes to each character. Left branches are labeled with '0' and right branches with '1'. The path from the root to a character's leaf node becomes its code. We then replace each character in the original text with its corresponding code. You can hover over encoded bits to see which character they represent.</p>
              </li>
              <li>
                <strong>Compression Analysis</strong>
                <p className="mt-2">We compare the size of the original text (assuming 8 bits per character) with the size of the encoded text. The difference shows how much space we've saved through Huffman coding. This compression is lossless, meaning we can fully recover the original text from the encoded version.</p>
              </li>
              <li>Click the "Reset" button to start over with new text.</li>
            </ol>
            <div className="flex justify-center mt-6">
              <Button onClick={() => window.location.href = '/'}>
                Try the Visualizer Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}