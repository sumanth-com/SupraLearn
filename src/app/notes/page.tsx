"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, FileText } from "lucide-react";
import { useProgressStore } from "@/store/use-progress-store";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import type { AppNote } from "@/types";

export default function NotesPage() {
  const notes = useProgressStore((s) => s.notes);
  const addNote = useProgressStore((s) => s.addNote);
  const updateNote = useProgressStore((s) => s.updateNote);
  const deleteNote = useProgressStore((s) => s.deleteNote);
  const [selectedId, setSelectedId] = useState<string | null>(notes[0]?.id ?? null);

  const selected = notes.find((n) => n.id === selectedId);

  const handleCreate = () => {
    const note: AppNote = {
      id: `note-${Date.now()}`,
      title: "Untitled Note",
      content: "# New Note\n\n- [ ] Add checklist items\n\nWrite in **Markdown**...",
      updatedAt: new Date().toISOString(),
    };
    addNote(note);
    setSelectedId(note.id);
  };

  return (
    <PageShell
      title="Notes"
      subtitle="Markdown editor with checklist support"
      scroll={false}
      headerRight={
        <Button variant="gradient" onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" /> New Note
        </Button>
      }
    >
      {notes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No notes yet"
          description="Create your first note."
          action={{ label: "Create Note", onClick: handleCreate }}
        />
      ) : (
        <div className="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
          <div className="min-h-0 overflow-y-auto overscroll-contain rounded-xl border border-zinc-800 bg-zinc-900/30 p-2">
            {notes.map((note) => (
              <motion.button
                key={note.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedId(note.id)}
                className={`mb-1 w-full rounded-lg border p-3 text-left last:mb-0 ${
                  selectedId === note.id
                    ? "border-indigo-500/30 bg-indigo-950/20"
                    : "border-transparent hover:border-zinc-800 hover:bg-zinc-800/40"
                }`}
              >
                <p className="truncate text-sm font-medium">{note.title}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </p>
              </motion.button>
            ))}
          </div>
          {selected && (
            <Card className="flex min-h-0 flex-col overflow-hidden border-zinc-800 bg-zinc-900/30">
              <CardHeader className="flex shrink-0 flex-row items-center justify-between border-b border-zinc-800 py-3">
                <Input
                  value={selected.title}
                  onChange={(e) => updateNote(selected.id, { title: e.target.value })}
                  className="border-none bg-transparent px-0 text-lg font-semibold focus-visible:ring-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    deleteNote(selected.id);
                    setSelectedId(notes[0]?.id ?? null);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-zinc-500" />
                </Button>
              </CardHeader>
              <CardContent className="grid min-h-0 flex-1 grid-rows-2 gap-3 overflow-hidden p-4">
                <Textarea
                  value={selected.content}
                  onChange={(e) => updateNote(selected.id, { content: e.target.value })}
                  className="min-h-0 flex-1 resize-none font-mono text-sm"
                />
                <div className="min-h-0 overflow-y-auto overscroll-contain rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <p className="mb-2 text-xs font-medium text-zinc-500">Preview</p>
                  <MarkdownPreview content={selected.content} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </PageShell>
  );
}

function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="space-y-1">
      {content.split("\n").map((line, i) => {
        if (line.startsWith("# "))
          return (
            <h1 key={i} className="mt-4 text-xl font-bold">
              {line.slice(2)}
            </h1>
          );
        if (line.startsWith("## "))
          return (
            <h2 key={i} className="mt-3 text-lg font-semibold">
              {line.slice(3)}
            </h2>
          );
        if (line.startsWith("- [x] "))
          return (
            <div key={i} className="flex gap-2 text-zinc-400 line-through">
              <span className="flex h-4 w-4 items-center justify-center rounded border border-emerald-500 bg-emerald-500/20 text-[10px]">
                ✓
              </span>
              {line.slice(6)}
            </div>
          );
        if (line.startsWith("- [ ] "))
          return (
            <div key={i} className="flex gap-2 text-zinc-300">
              <span className="h-4 w-4 rounded border border-zinc-600" />
              {line.slice(6)}
            </div>
          );
        if (line.startsWith("- "))
          return (
            <p key={i} className="pl-4 text-zinc-300">
              • {line.slice(2)}
            </p>
          );
        if (line.trim() === "") return <br key={i} />;
        return (
          <p key={i} className="text-zinc-300">
            {line}
          </p>
        );
      })}
    </div>
  );
}
