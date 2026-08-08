"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, RefreshCw, GripVertical } from "lucide-react";

export interface StickyNote {
  id: string;
  name: string;
  message: string;
  color: string;
  isPinned: boolean;
  isHidden: boolean;
  createdAt: string;
}

const COLOR_CLASSES: Record<
  string,
  { bg: string; border: string; text: string; pinHead: string }
> = {
  yellow: {
    bg: "bg-[#FEF9C3]",
    border: "border-amber-300",
    text: "text-amber-950",
    pinHead: "bg-red-500 shadow-red-500/50",
  },
  blue: {
    bg: "bg-[#E0F2FE]",
    border: "border-sky-300",
    text: "text-sky-950",
    pinHead: "bg-rose-500 shadow-rose-500/50",
  },
  green: {
    bg: "bg-[#DCFCE7]",
    border: "border-emerald-300",
    text: "text-emerald-950",
    pinHead: "bg-red-500 shadow-red-500/50",
  },
  pink: {
    bg: "bg-[#FCE7F3]",
    border: "border-rose-300",
    text: "text-rose-950",
    pinHead: "bg-amber-500 shadow-amber-500/50",
  },
  cream: {
    bg: "bg-[#FEF3C7]",
    border: "border-yellow-300",
    text: "text-yellow-950",
    pinHead: "bg-red-500 shadow-red-500/50",
  },
};

function PushPinIcon({ colorClass = "bg-red-500" }: { colorClass?: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center filter drop-shadow-sm">
      <div className={`w-3.5 h-3.5 rounded-full ${colorClass} border-2 border-white shadow flex items-center justify-center relative z-10`}>
        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
      </div>
      <div className="-mt-1 w-0.5 h-2.5 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 rounded-b shadow" />
    </div>
  );
}

export function LeaveYourMarkSection({ initialNotes }: { initialNotes: StickyNote[] }) {
  const [notes, setNotes] = useState<StickyNote[]>(initialNotes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleReset = () => {
    // Reset order based on initial notes, but keep all notes (including newly added ones)
    const initialIds = new Set(initialNotes.map(n => n.id));

    // Separate initial notes and new notes
    const initialOrdered: StickyNote[] = initialNotes
      .map(n => notes.find(current => current.id === n.id))
      .filter((note): note is StickyNote => note !== undefined);

    const newNotes = notes.filter(n => !initialIds.has(n.id));

    // Combine: initial notes in original order, then new notes
    setNotes([...initialOrdered, ...newNotes]);
    setCurrentPage(1);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const newNotes = [...notes];
    const draggedItem = newNotes[draggedIndex];
    newNotes.splice(draggedIndex, 1);
    newNotes.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setNotes(newNotes);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 84) {
      setMessage(val);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatusMsg({ type: "error", text: "Please enter both name and message." });
      return;
    }

    setSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/leave-your-mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          color: selectedColor,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to pin note");
      }

      setNotes([data, ...notes]);
      setMessage("");
      setName("");
      setCurrentPage(1);
      setStatusMsg({ type: "success", text: "Your note has been pinned to the board! 📍" });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="leave-your-mark" className="py-20 relative overflow-hidden bg-[#0B1220]">
      {/* Hero Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero_bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220] via-[#0B1220]/80 to-[#0B1220] pointer-events-none" />

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Leave Your Mark
          </h2>
          <p className="mt-4 text-base text-gray-400">
            Say hi, drop feedback, or leave a doodle in words. Drag cards to seamlessly swap positions in the grid!
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive Sticky Note Creator */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
            <span>Write a Sticky Note</span>
            <span className="text-xs font-mono font-normal text-gray-400">Max 84 Chars</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className={`relative rounded-2xl p-6 shadow-xl border ${COLOR_CLASSES[selectedColor]?.bg || "bg-yellow-100"
                } ${COLOR_CLASSES[selectedColor]?.border || "border-amber-300"} transition-all duration-300`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <PushPinIcon colorClass={COLOR_CLASSES[selectedColor]?.pinHead} />
              </div>

              <textarea
                value={message}
                onChange={handleMessageChange}
                placeholder="say hi, drop feedback, or leave a doodle in words..."
                rows={4}
                className={`w-full bg-transparent resize-none outline-none font-medium text-lg leading-snug placeholder:text-slate-500/70 ${COLOR_CLASSES[selectedColor]?.text || "text-amber-950"
                  }`}
                style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive, sans-serif" }}
              />

              <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-600 font-semibold">
                  {message.length}/84
                </span>

                <div className="flex items-center space-x-1">
                  <span className="text-slate-500 font-medium">-</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="your name"
                    className={`bg-transparent outline-none font-semibold text-xs border-b border-black/20 focus:border-black/60 w-28 text-right ${COLOR_CLASSES[selectedColor]?.text || "text-amber-950"
                      }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 font-mono mr-1">Color:</span>
                {Object.keys(COLOR_CLASSES).map((colorKey) => (
                  <button
                    key={colorKey}
                    type="button"
                    onClick={() => setSelectedColor(colorKey)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${selectedColor === colorKey ? "scale-125 border-gray-800 shadow-lg" : "border-transparent opacity-80 hover:opacity-100"
                      }`}
                    style={{
                      backgroundColor:
                        colorKey === "yellow" ? "#FEF9C3"
                          : colorKey === "blue" ? "#E0F2FE"
                            : colorKey === "green" ? "#DCFCE7"
                              : colorKey === "pink" ? "#FCE7F3"
                                : "#FEF3C7",
                    }}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#3B82F6] text-white font-semibold text-xs shadow-lg flex items-center space-x-2 transition-all disabled:opacity-50"
              >
                <span>pin it</span>
                <span className="text-rose-400 font-bold">📌</span>
              </button>
            </div>

            {statusMsg && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${statusMsg.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                  : "bg-rose-50 border border-rose-200 text-rose-700"
                  }`}
              >
                {statusMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span>{statusMsg.text}</span>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: White Grid Notebook Board */}
        <div
          className="lg:col-span-7 bg-[#F8FAFC] border-4 border-gray-200 rounded-3xl p-6 sm:p-8 min-h-[500px] shadow-2xl relative overflow-hidden bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px]"
        >
          {/* Header Row on Board */}
          <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-gray-300/80">
            <div className="flex items-center space-x-2">
              <PushPinIcon colorClass="bg-red-500" />
              <h3 className="text-lg font-bold text-gray-800">
                Community Paper Board
              </h3>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                ↕️ Drag to Swap Order
              </span>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center space-x-1 border border-gray-200 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400 font-mono text-sm">
              <p>Be the first to pin a note on our paper board!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
                {notes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((note, idx) => {
                  const colorConfig = COLOR_CLASSES[note.color] || COLOR_CLASSES["yellow"];
                  const actualIndex = (currentPage - 1) * itemsPerPage + idx;

                  return (
                    <motion.div
                      key={note.id}
                      layout
                      draggable
                      onDragStart={() => handleDragStart(actualIndex)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        handleDragOver(actualIndex);
                      }}
                      onDragEnd={handleDragEnd}
                      className={`relative rounded-2xl p-5 border cursor-grab active:cursor-grabbing transition-colors duration-200 select-none shadow-md ${colorConfig.bg} ${colorConfig.border} ${colorConfig.text} ${draggedIndex === actualIndex ? "opacity-60 scale-95 border-[#2563EB]" : ""
                        }`}
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                        <PushPinIcon colorClass={colorConfig.pinHead} />
                      </div>

                      {note.isPinned && (
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-amber-500/20 text-[9px] font-mono font-bold text-amber-900 uppercase">
                          Pinned
                        </span>
                      )}

                      <p
                        className="text-base font-semibold leading-snug mt-2 pointer-events-none"
                        style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive, sans-serif" }}
                      >
                        {note.message}
                      </p>

                      <div className="mt-4 pt-2 border-t border-black/10 flex items-center justify-between text-xs font-mono opacity-80 pointer-events-none">
                        <span className="font-semibold">- {note.name}</span>
                        <span className="text-[10px]" suppressHydrationWarning>
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pagination */}
              {notes.length > itemsPerPage && (
                <div className="flex items-center justify-center space-x-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  <span className="text-xs font-mono text-gray-600">
                    Page {currentPage} of {Math.ceil(notes.length / itemsPerPage)}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(notes.length / itemsPerPage), prev + 1))}
                    disabled={currentPage === Math.ceil(notes.length / itemsPerPage)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}