"use client"

import React, { useState, useEffect } from "react"

const MASK = [
  // S          K          Y          L          O          G          I  C
  [0,1,1, 0, 1,0,1, 0, 1,0,1, 0, 1,0,0, 0, 1,1,1, 0, 1,1,1, 0, 1, 0, 0,1,1],
  [1,0,0, 0, 1,1,0, 0, 1,0,1, 0, 1,0,0, 0, 1,0,1, 0, 1,0,0, 0, 1, 0, 1,0,0],
  [0,1,0, 0, 1,0,0, 0, 0,1,0, 0, 1,0,0, 0, 1,0,1, 0, 1,0,1, 0, 1, 0, 1,0,0],
  [0,0,1, 0, 1,1,0, 0, 0,1,0, 0, 1,0,0, 0, 1,0,1, 0, 1,0,1, 0, 1, 0, 1,0,0],
  [1,1,0, 0, 1,0,1, 0, 0,1,0, 0, 1,1,1, 0, 1,1,1, 0, 1,1,1, 0, 1, 0, 0,1,1],
]

// Pure black and white colors as requested by the user's initial code
const TETRIS_COLORS = [
  "bg-black dark:bg-white",
]

const GRID_WIDTH = MASK[0].length
const GRID_HEIGHT = 10
const START_ROW = GRID_HEIGHT - MASK.length

interface BlockProps {
  finalRow: number;
  col: number;
  delay: number;
  color: string;
}

export default function TetrisLoading() {
  const [blocks, setBlocks] = useState<BlockProps[]>([])
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Generate the blocks based on the mask
    const newBlocks: BlockProps[] = []
    
    // To make it look like Tetris, we drop blocks starting from the bottom rows
    // so they stack up naturally. We also add random delays.
    let delayCounter = 0;
    
    // Sort target positions by row (bottom to top)
    const targets: {r: number, c: number}[] = []
    for(let r = MASK.length - 1; r >= 0; r--) {
        for(let c = 0; c < GRID_WIDTH; c++) {
            if (MASK[r][c] === 1) {
                targets.push({r, c})
            }
        }
    }
    
    // Group them slightly for a natural effect
    targets.forEach((t) => {
        const randomColor = TETRIS_COLORS[Math.floor(Math.random() * TETRIS_COLORS.length)]
        newBlocks.push({
            finalRow: START_ROW + t.r,
            col: t.c,
            delay: delayCounter * 0.02 + Math.random() * 0.05,
            color: randomColor
        })
        delayCounter++;
    })
    
    setBlocks(newBlocks)

    // Set complete state after the last block finishes falling
    const totalTime = (targets.length * 0.02 + 0.4 + 0.5) * 1000
    const timer = setTimeout(() => {
      setIsComplete(true)
    }, totalTime)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div 
        className="relative bg-white dark:bg-black border-2 border-gray-800 dark:border-gray-200 p-2 overflow-hidden transition-colors"
        style={{ 
          width: `${GRID_WIDTH * 12 + 16}px`, 
          height: `${GRID_HEIGHT * 12 + 16}px` 
        }}
      >
        {blocks.map((block, i) => (
          <div
            key={i}
            className={`absolute w-[10px] h-[10px] border border-gray-300 dark:border-gray-600 rounded-none ${block.color} ${isComplete ? 'animate-pulse' : ''}`}
            style={{
              left: `${8 + block.col * 12}px`,
              top: `${8 + block.finalRow * 12}px`,
              // We use CSS keyframes for a simple drop animation
              animationName: 'tetris-drop',
              animationDuration: '0.4s',
              animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              animationDelay: `${block.delay}s`,
              animationFillMode: 'both',
            }}
          />
        ))}
        {/* Draw a subtle background grid to look like the original tetris board */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40" 
             style={{
               backgroundSize: '12px 12px',
               backgroundImage: 'linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)',
               backgroundPosition: '8px 8px'
             }} 
        />
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes tetris-drop {
            0% { transform: translateY(-${GRID_HEIGHT * 12 + 50}px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}} />
      </div>
      
      <div className="text-center">
        <p className="text-black dark:text-white font-medium transition-colors">
            {isComplete ? 'Loading complete...' : 'Loading...'}
        </p>
      </div>
    </div>
  )
}
