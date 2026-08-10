"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface WorkflowBuilderCardProps {
  imageUrl: string;
  status?: string;
  lastUpdated?: string;
  title: string;
  description: string;
  tags?: string[];
  users?: { src: string; fallback: string }[];
  actions?: { Icon: LucideIcon; bgColor: string }[];
  onClick?: () => void;
}

export function WorkflowBuilderCard({
  imageUrl,
  status,
  lastUpdated,
  title,
  description,
  tags = [],
  users = [],
  actions = [],
  onClick,
}: WorkflowBuilderCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover="hover"
      className="group relative w-full h-full min-h-[380px] overflow-hidden rounded-2xl bg-[#0B1220] border border-[#1E3A8A]/30 shadow-xl cursor-pointer"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-20 transition-opacity duration-500"
        />
        {/* Gradient Overlay - Darker at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/80 to-transparent opacity-90" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        
        {/* Top Badges (Status & Date) */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-0 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          {status && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#38BDF8]/20 text-[#38BDF8] backdrop-blur-md border border-[#38BDF8]/30">
              {status}
            </span>
          )}
          {lastUpdated && (
            <span className="text-xs text-blue-200/80 font-mono">
              {lastUpdated}
            </span>
          )}
        </div>

        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-1 rounded border border-[#38BDF8]/20">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-0">
            {title}
          </h3>
        </div>

        {/* Description & Footer (Hidden initially, slides up on hover) */}
        <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <div className="overflow-hidden">
            <div className="pt-3">
              <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed mb-5">
                {description}
              </p>

              {/* Users & Actions Footer */}
              {(users.length > 0 || actions.length > 0) && (
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <div className="flex -space-x-2">
                    {users.map((user, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B1220] overflow-hidden bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                        {user.src ? <img src={user.src} alt="user" className="w-full h-full object-cover" /> : user.fallback}
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    {actions.map((action, i) => {
                      const ActionIcon = action.Icon;
                      return (
                        <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${action.bgColor} shadow-lg`}>
                          <ActionIcon size={14} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
