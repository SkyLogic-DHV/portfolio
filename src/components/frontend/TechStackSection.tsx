"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export interface TechStackItem {
  id: string;
  name: string;
  image: string | null;
  displayOrder: number;
  isActive: boolean;
}

export function TechStackSection({ items }: { items: TechStackItem[] }) {
  const initialItems = items.filter((item) => item.isActive !== false);
  const [stackItems, setStackItems] = useState<TechStackItem[]>(initialItems);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setStackItems(initialItems);
  }, [items]);

  const handleReset = () => {
    setStackItems(initialItems);
    setDraggedIndex(null);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const nextItems = [...stackItems];
    const draggedItem = nextItems[draggedIndex];
    nextItems.splice(draggedIndex, 1);
    nextItems.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setStackItems(nextItems);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <section id="stack" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Our Engineering Stack
        </h2>
        <p className="mt-4 text-base text-gray-500">
          Logos and tools we use to build fast, reliable products from scratch.
        </p>
      </div>

      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-3xl p-3 sm:p-4 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.55)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none opacity-70" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
              {stackItems.length} Items
            </span>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-[10px] shadow-sm border border-gray-200 flex items-center space-x-2 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-indigo-500" />
            <span>Reset</span>
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-1.5 justify-items-start">
          {stackItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(index);
              }}
              onDragEnd={handleDragEnd}
              className={`group relative w-20 sm:w-24 rounded-md border bg-white/85 backdrop-blur-sm shadow-sm overflow-visible transition-all cursor-grab active:cursor-grabbing select-none ${
                draggedIndex === index ? "opacity-60 scale-[0.98] border-indigo-500" : "border-gray-200"
              }`}
            >
              <div className="relative aspect-square w-full rounded-md border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-[1.02]" />
                ) : (
                  <span className="text-[8px] text-gray-400">Logo</span>
                )}
              </div>

              <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-110%] transition-all duration-200 z-20">
                <div className="whitespace-nowrap rounded-md bg-gray-950 px-2 py-1 text-[8px] font-semibold text-white shadow-lg shadow-black/20">
                  {item.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
