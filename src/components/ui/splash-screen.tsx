"use client"

import React, { useState, useEffect } from "react"
import TetrisLoading from "./tetris-loader"
import { motion, AnimatePresence } from "framer-motion"

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Show splash for 2.5 seconds to let the tetris animation finish
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black"
          >
            <TetrisLoading />
          </motion.div>
        )}
      </AnimatePresence>
      {/* 
        We always render the children, so the page fetches its data and renders in the background 
        while the splash screen is showing. Once splash screen fades, content is ready!
      */}
      {children}
    </>
  )
}
