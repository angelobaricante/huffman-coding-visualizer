'use client'

import React, { useEffect, useRef } from 'react'

interface BinaryBackgroundProps {
  color?: string
  fontSize?: number
  speed?: number
}

export default function BinaryBackground({
  color = '#F0F0F0', // Update 1: Changed default color to a lighter shade
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const columns = Math.floor(canvas.width / fontSize)
    const rows = Math.floor(canvas.height / fontSize)
    const grid: { char: string; opacity: number }[][] = Array(columns).fill(null).map(() => 
      Array(rows).fill(null).map(() => ({ char: Math.random() > 0.5 ? '1' : '0', opacity: 0 }))
    )

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
          ctx.fillStyle = `rgba(240, 240, 240, ${opacity})`; // Update 2: Changed fillStyle
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
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: -1,
        backgroundColor: 'white',
      }}
      aria-hidden="true"
    />
  )
}

