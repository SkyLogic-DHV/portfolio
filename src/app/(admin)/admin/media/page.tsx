"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Upload, Trash2, Copy, Check, FileImage } from "lucide-react";

export default function AdminMediaPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadMedia = () => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", fileList[0]);
    formData.append("folder", "general");

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        loadMedia();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete file permanently?")) return;
    await fetch(`/api/media?id=${id}`, { method: "DELETE" });
    loadMedia();
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Media Library...</div>;

  return (
    <div className="max-w-6xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
            <FolderOpen className="w-6 h-6 text-purple-400" />
            <span>Media Library & Assets</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">UPLOAD & MANAGE IMAGES AND ASSETS</p>
        </div>

        <label className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center space-x-2 cursor-pointer transition-colors">
          <Upload className="w-4 h-4" />
          <span>{uploading ? "Uploading..." : "Upload File"}</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {files.map((file) => (
          <div key={file.id} className="group bg-slate-900/60 border border-slate-800 rounded-2xl p-3 flex flex-col justify-between hover:border-indigo-500/50 transition-colors">
            <div className="relative h-28 w-full bg-slate-950 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
              {file.mimeType.startsWith("image/") ? (
                <img src={file.url} alt={file.originalName} className="w-full h-full object-cover" />
              ) : (
                <FileImage className="w-8 h-8 text-slate-500" />
              )}
            </div>

            <div>
              <p className="text-xs font-semibold text-white truncate" title={file.originalName}>
                {file.originalName}
              </p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleCopyUrl(file.id, file.url)}
                className="text-[10px] font-mono text-indigo-400 hover:underline flex items-center space-x-1"
              >
                {copiedId === file.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === file.id ? "Copied" : "Copy URL"}</span>
              </button>
              <button onClick={() => handleDelete(file.id)} className="text-slate-500 hover:text-rose-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
