"use client";

import { Plus } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { NotesWorkspace } from "@/components/notes/notes-workspace";
import { useProgressStore } from "@/store/use-progress-store";
import type { AppNote } from "@/types";

export default function NotesPage() {
  const addNote = useProgressStore((s) => s.addNote);

  const handleCreate = () => {
    const note: AppNote = {
      id: `note-${Date.now()}`,
      title: "Untitled Note",
      content: "",
      updatedAt: new Date().toISOString(),
    };
    addNote(note);
  };

  return (
    <PageShell
      title="Notes"
      subtitle="Saved automatically"
      scroll={false}
      headerRight={
        <Button variant="gradient" size="sm" onClick={handleCreate} className="h-9 gap-1.5 px-4">
          <Plus className="h-4 w-4" /> New Note
        </Button>
      }
    >
      <NotesWorkspace />
    </PageShell>
  );
}
