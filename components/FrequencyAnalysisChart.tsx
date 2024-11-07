import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type FrequencyData = {
  char: string
  count: number
}

type FrequencyAnalysisChartProps = {
  frequencyData: FrequencyData[]
}

export default function FrequencyAnalysisChart({ frequencyData }: FrequencyAnalysisChartProps) {
  return (
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
  )
}