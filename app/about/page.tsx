import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter">About Huffman Coding Visualizer</h1>
          <p className="text-lg text-muted-foreground">
            Learn about our project and its goals
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Making data compression accessible</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Huffman Coding Visualizer is an educational web application designed to help students,
              developers, and enthusiasts understand the principles of data compression through Huffman coding.
              Our mission is to make complex algorithms accessible and understandable through interactive
              visualizations.
            </p>
            <p>
              By providing a hands-on approach to learning Huffman coding, we aim to bridge the gap between
              theoretical knowledge and practical application in the field of data compression.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Huffman Coding?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Fundamental algorithm in data compression</li>
              <li>Widely used in file compression and data transmission</li>
              <li>Excellent example of greedy algorithms in computer science</li>
              <li>Practical applications in various fields of technology</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Huffman Coding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Huffman coding is a lossless data compression algorithm developed by David A. Huffman in 1952.
              It works by assigning variable-length codes to characters based on their frequency of occurrence
              in the data being compressed. More frequent characters are assigned shorter codes, resulting in
              overall data compression.
            </p>
            <p>
              The algorithm constructs a binary tree, known as a Huffman tree, which is used to determine
              the optimal prefix-free codes for each character. This tree-based approach ensures that no
              code is a prefix of another, allowing for unambiguous decoding.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applications of Huffman Coding</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Text compression in file systems and databases</li>
              <li>Image and video compression (as part of more complex algorithms)</li>
              <li>Data transmission in computer networks to reduce bandwidth usage</li>
              <li>Encoding schemes in various communication protocols</li>
              <li>Archiving tools like ZIP and GZIP</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benefits of Our Visualizer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our Huffman Coding Visualizer offers several advantages for learners:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Interactive step-by-step visualization of the Huffman tree construction</li>
              <li>Real-time encoding and decoding demonstrations</li>
              <li>Customizable input for experimenting with different data sets</li>
              <li>Clear visual representation of frequency analysis and code assignment</li>
              <li>Accessible explanations of each step in the algorithm</li>
            </ul>
            <p>
              By using our visualizer, students and professionals can gain a deeper understanding of how
              Huffman coding works, making it easier to grasp the concepts and apply them in real-world
              scenarios.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learn More About Huffman Coding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pt-[56.25%]">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/0kNXhFIEd_w"
                title="Huffman Coding Explanation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}