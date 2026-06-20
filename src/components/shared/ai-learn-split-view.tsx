"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, Check, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import type { CurriculumChecklistItem } from "@/curriculum/types";
import type { AiLearnDetail } from "@/curriculum/ai-content/types";
import { AiLearnAnswer } from "@/components/shared/ai-learn-answer";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface AiLearnSection {
  label: string;
  kind: "topic" | "practice";
  items: CurriculumChecklistItem[];
}

interface FlatItem extends CurriculumChecklistItem {
  kind: "topic" | "practice";
  sectionLabel: string;
  globalIndex: number;
}

interface AiLearnSplitViewProps {
  sections: AiLearnSection[];
  locked: boolean;
  isDone: (id: string) => boolean;
  onToggle: (id: string) => void;
  getDetail: (id: string, title: string, kind: "topic" | "practice") => AiLearnDetail;
  getNote?: (id: string) => string;
  setNote?: (id: string, note: string) => void;
}

const navBtn =
  "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-xs font-medium transition-colors ring-1 sm:text-sm";

const markBtn =
  "min-w-[7.75rem] px-3.5 sm:min-w-[8.5rem] sm:px-4";

export function AiLearnSplitView({
  sections,
  locked,
  isDone,
  onToggle,
  getDetail,
  getNote,
  setNote,
}: AiLearnSplitViewProps) {
  const flatItems = useMemo(() => {
    const result: FlatItem[] = [];
    let index = 0;
    for (const section of sections) {
      for (const item of section.items) {
        result.push({
          ...item,
          kind: section.kind,
          sectionLabel: section.label,
          globalIndex: index,
        });
        index += 1;
      }
    }
    return result;
  }, [sections]);

  const [selectedId, setSelectedId] = useState(flatItems[0]?.id ?? "");

  useEffect(() => {
    if (!flatItems.some((t) => t.id === selectedId)) {
      setSelectedId(flatItems[0]?.id ?? "");
    }
  }, [flatItems, selectedId]);

  const selectedIndex = flatItems.findIndex((t) => t.id === selectedId);
  const selected = flatItems[selectedIndex] ?? flatItems[0];
  const detail = selected ? getDetail(selected.id, selected.title, selected.kind) : null;
  const completedCount = flatItems.filter((t) => isDone(t.id)).length;
  const isFirst = selectedIndex <= 0;
  const isLast = selectedIndex >= flatItems.length - 1;

  const goPrevious = () => {
    if (!isFirst) setSelectedId(flatItems[selectedIndex - 1].id);
  };

  const goNext = () => {
    if (!isLast) setSelectedId(flatItems[selectedIndex + 1].id);
  };

  const handleMarkComplete = () => {
    onToggle(selected.id);
    if (!isLast && !isDone(selected.id)) {
      setSelectedId(flatItems[selectedIndex + 1].id);
    }
  };

  if (!selected || !detail || flatItems.length === 0) return null;

  const completeLabel = selected.kind === "practice" ? "Done" : "Learned";
  const completeLabelLong = selected.kind === "practice" ? "Mark done" : "Mark learned";

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30">
      <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-3 py-1.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <BookOpen className="h-3.5 w-3.5 shrink-0 text-purple-400" />
          <span className="truncate text-xs font-semibold text-zinc-100 sm:text-sm">
            {selected.sectionLabel} · {selectedIndex + 1}/{flatItems.length}
          </span>
        </div>
        <span className="shrink-0 text-[11px] tabular-nums text-zinc-500">
          {completedCount}/{flatItems.length}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px]">
        {/* Left: grid rows fill every pixel — no wasted space */}
        <div className="grid min-h-0 grid-rows-[auto_minmax(0,1.15fr)_minmax(0,1fr)_auto] gap-2 overflow-x-hidden border-b border-zinc-800 p-3 sm:p-4 lg:border-b-0 lg:border-r">
          <h2 className="truncate text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl">
            {selected.title}
          </h2>

          <div className="min-h-0 overflow-hidden">
            <AiLearnAnswer title={selected.title} detail={detail} className="h-full" hideTitle />
          </div>

          {setNote && getNote && (
            <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-900/40">
              <p className="shrink-0 border-b border-zinc-800/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Notes
              </p>
              <Textarea
                value={getNote(selected.id)}
                onChange={(e) => setNote(selected.id, e.target.value)}
                placeholder="Write your learnings here — saved automatically..."
                className="!min-h-0 min-h-0 flex-1 resize-none rounded-none border-0 bg-transparent px-3 py-2 text-sm focus-visible:ring-0"
                disabled={locked}
              />
            </div>
          )}

          <div className="flex shrink-0 justify-center gap-2 pt-0.5">
            <button
              type="button"
              disabled={isFirst}
              onClick={goPrevious}
              className={cn(
                navBtn,
                isFirst
                  ? "cursor-not-allowed bg-zinc-900/50 text-zinc-600 ring-zinc-800"
                  : "bg-zinc-800/80 text-zinc-200 ring-zinc-700 hover:bg-zinc-800"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              type="button"
              disabled={locked}
              onClick={handleMarkComplete}
              className={cn(
                navBtn,
                markBtn,
                isDone(selected.id)
                  ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
                  : "bg-indigo-500/10 text-indigo-300 ring-indigo-500/30 hover:bg-indigo-500/15",
                locked && "cursor-not-allowed opacity-50"
              )}
            >
              {isDone(selected.id) ? (
                <>
                  <Check className="h-3.5 w-3.5 shrink-0" />
                  Completed
                </>
              ) : (
                <>
                  <Circle className="h-3.5 w-3.5 shrink-0" />
                  {completeLabelLong}
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isLast}
              onClick={goNext}
              className={cn(
                navBtn,
                isLast
                  ? "cursor-not-allowed bg-zinc-900/50 text-zinc-600 ring-zinc-800"
                  : "bg-zinc-800/80 text-zinc-200 ring-zinc-700 hover:bg-zinc-800"
              )}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right: only scrollable area */}
        <div className="flex min-h-0 flex-col overflow-hidden">
          <div className="shrink-0 border-b border-zinc-800 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Questions
            </p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {sections.map((section) => (
              <div key={section.label}>
                <div className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-950/95 px-3 py-1.5 backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-400/90">
                    {section.label}
                  </p>
                </div>
                {section.items.map((item) => {
                  const flat = flatItems.find((f) => f.id === item.id)!;
                  const active = item.id === selectedId;
                  const done = isDone(item.id);
                  const displayNum = flat.globalIndex + 1;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={cn(
                        "flex w-full items-start gap-2 border-b border-zinc-800/60 px-3 py-2.5 text-left transition-colors",
                        active
                          ? "bg-indigo-500/10 ring-1 ring-inset ring-indigo-500/30"
                          : "hover:bg-zinc-800/40"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-semibold tabular-nums",
                          active
                            ? "bg-indigo-500/20 text-indigo-300"
                            : done
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-zinc-800 text-zinc-500"
                        )}
                      >
                        {done ? <Check className="h-3 w-3" /> : displayNum}
                      </span>
                      <span
                        className={cn(
                          "text-xs leading-snug sm:text-sm",
                          active ? "font-medium text-zinc-50" : done ? "text-zinc-400" : "text-zinc-300"
                        )}
                      >
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
