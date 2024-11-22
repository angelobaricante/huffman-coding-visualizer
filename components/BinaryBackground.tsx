'use client'

import React, { useEffect, useRef } from 'react'

interface BinaryBackgroundProps {
  color?: string
  fontSize?: number
  speed?: number
}

export default function BinaryBackground({
  color = '#F0F0F0',
  fontSize = 14,
  speed = 2000
}: BinaryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let columns: number
    let rows: number
    let grid: { char: string; opacity: number }[][]

    const initializeGrid = () => {
      grid = Array(columns).fill(null).map(() => 
        Array(rows).fill(null).map(() => ({ char: Math.random() > 0.5 ? '1' : '0', opacity: 0 }))
      )
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.ceil(canvas.width / fontSize)
      rows = Math.ceil(canvas.height / fontSize)
      initializeGrid()
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const updateGrid = () => {
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() < 0.01) {
            grid[i][j] = { char: Math.random() > 0.5 ? '1' : '0', opacity: 1 }
          } else if (grid[i][j].opacity > 0) {
            grid[i][j].opacity -= 0.02
          }
        }
      }
    }

    const draw = () => {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          const { char, opacity } = grid[i][j]
          ctx.fillStyle = `rgba(240, 240, 240, ${opacity})`
          ctx.fillText(char, i * fontSize, (j + 1) * fontSize)
        }
      }

      updateGrid()
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, fontSize, speed])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen"
      style={{
        zIndex: -1,
        backgroundColor: 'white',
      }}
      aria-hidden="true"
    />
  )
}

