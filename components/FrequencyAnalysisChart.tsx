import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

interface FrequencyData {
  char: string
  count: number
}

interface FrequencyAnalysisChartProps {
  frequencyData: FrequencyData[]
  onNextStep: () => void
  showExplanation: boolean
  onToggleExplanation: () => void
}

export default function FrequencyAnalysisChart({
  frequencyData,
  onNextStep,
  showExplanation,
  onToggleExplanation,
}: FrequencyAnalysisChartProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Step 1: Frequency Analysis</h3>
        <Button onClick={onToggleExplanation} variant="outline" size="sm">
          <Info className="w-4 h-4 mr-2" />
          {showExplanation ? "Hide" : "Show"} Explanation
        </Button>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={frequencyData}>
            <XAxis dataKey="char" />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border border-border p-2 rounded shadow">
                      <p className="text-foreground">
                        {`${payload[0].payload.char}: ${payload[0].value}`}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">In-depth Explanation: Frequency Analysis</h4>
          <p>
            Frequency analysis is the first step in Huffman coding. Here&apos;s what&apos;s happening:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-2">
            <li>We iterate through each character in the input text.</li>
            <li>For each character, we count how many times it appears.</li>
            <li>We store these counts in a data structure (usually a hash table or dictionary).</li>
            <li>The resulting frequency data is used to build the Huffman tree in the next step.</li>
          </ol>
          <p className="mt-2">
            Characters that appear more frequently will be assigned shorter codes, which is the key to
            Huffman coding&apos;s compression efficiency. This step helps us identify which characters should
            get shorter codes.
          </p>
        </div>
      )}
      <div className="mt-4 flex justify-center">
        <Button onClick={onNextStep}>Next Step</Button>
      </div>
    </div>
  )
}