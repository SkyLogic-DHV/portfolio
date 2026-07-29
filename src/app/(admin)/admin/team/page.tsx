"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Trash2, Edit, Save, X } from "lucide-react";

export default function AdminTeamPage() {
  const [data, setData] = useState<any>({ sectionInfo: { title: "", description: "" }, members: [] });
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    bio: "",
    avatar: "",
    linkedin: "",
    github: "",
    instagram: "",
    email: "",
    displayOrder: 0,
    isActive: true,
  });

  const loadTeam = () => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleUpdateSectionInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "SECTION_INFO",
        title: data.sectionInfo.title,
        description: data.sectionInfo.description,
      }),
    });
    loadTeam();
  };

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMember),
    });
    setIsCreating(false);
    setNewMember({
      name: "",
      role: "",
      bio: "",
      avatar: "",
      linkedin: "",
      github: "",
      instagram: "",
      email: "",
      displayOrder: 0,
      isActive: true,
    });
    loadTeam();
  };

  const handleUpdateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/team/${editingMember.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingMember),
    });
    setEditingMember(null);
    loadTeam();
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    loadTeam();
  };

  if (loading) return <div className="text-slate-400 font-mono text-xs">Loading Team Members...</div>;

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
          <Users className="w-6 h-6 text-indigo-400" />
          <span>Team Management</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          EDIT TEAM MEMBERS & SECTION INFORMATION
        </p>
      </div>

      {/* Section Header Editor */}
      <form onSubmit={handleUpdateSectionInfo} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white">Section Header</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={data.sectionInfo?.title || ""}
            onChange={(e) => setData({ ...data, sectionInfo: { ...data.sectionInfo, title: e.target.value } })}
            placeholder="Section Title"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            value={data.sectionInfo?.description || ""}
            onChange={(e) => setData({ ...data, sectionInfo: { ...data.sectionInfo, description: e.target.value } })}
            placeholder="Section Description"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-white">
          Update Header Info
        </button>
      </form>

      {/* Team Members List */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Team Members ({data.members.length})</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Create Modal */}
      {isCreating && (
        <form onSubmit={handleCreateMember} className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">Add New Team Member</h3>
            <button type="button" onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              required
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Role"
              required
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Avatar Image URL"
              value={newMember.avatar}
              onChange={(e) => setNewMember({ ...newMember, avatar: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
          <textarea
            placeholder="Short Bio"
            value={newMember.bio}
            onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          />
          <button type="submit" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white">
            Create Member
          </button>
        </form>
      )}

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.members.map((member: any) => (
          <div key={member.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <img src={member.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
              <div>
                <h4 className="font-bold text-sm text-white">{member.name}</h4>
                <p className="text-xs text-indigo-400 font-mono">{member.role}</p>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{member.bio}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setEditingMember(member)} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg">
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDeleteMember(member.id)} className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800 rounded-lg">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
