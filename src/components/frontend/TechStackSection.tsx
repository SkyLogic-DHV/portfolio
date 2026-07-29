"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Sparkles, GripVertical } from "lucide-react";

export interface TechStackItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  level: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
}

export function TechStackSection({ items }: { items: TechStackItem[] }) {
  const [stackItems, setStackItems] = useState<TechStackItem[]>(items);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleReset = () => {
    setStackItems([...items]);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const newItems = [...stackItems];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setStackItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <section id="stack" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Our Engineering Stack & Toolkit
        </h2>
        <p className="mt-4 text-base text-gray-500">
          Battle-tested frameworks, cloud infrastructure, and modern developer tools. Drag cards to reorder the stack matrix.
        </p>
      </div>

      {/* Single Large Container Box */}
      <div className="relative bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl min-h-[480px] flex flex-col justify-between overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-gray-900">Engineering Stack Matrix</h3>
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              {stackItems.length} Tech Items
            </span>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs shadow-sm border border-gray-200 flex items-center space-x-2 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-500" />
            <span>Reset Order</span>
          </button>
        </div>

        {/* Grid of Cards */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {stackItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(idx);
              }}
              onDragEnd={handleDragEnd}
              className={`group relative bg-white border rounded-2xl p-4 hover:bg-gray-50 shadow-sm cursor-grab active:cursor-grabbing transition-colors duration-200 flex flex-col justify-between select-none ${
                draggedIndex === idx ? "border-indigo-500 bg-gray-50 opacity-60 scale-95" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between pointer-events-none mt-2">
                <span
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: item.color || "#6366F1" }}
                />
                <div className="flex items-center space-x-1">
                  <span className="text-[9px] font-mono text-gray-500 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                  <GripVertical className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
                </div>
              </div>

              <div className="mt-4 pointer-events-none">
                <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {item.name}
                </p>
                <p className="text-[10px] font-mono text-indigo-600 mt-0.5">
                  {item.level}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}