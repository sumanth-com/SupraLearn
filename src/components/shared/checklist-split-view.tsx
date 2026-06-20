"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, Check, ChevronLeft, ChevronRight, Circle, ListChecks } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { learnCardBodyClass, learnPanelGridClass } from "@/components/shared/learn-answer-cards";

export interface ChecklistSplitItem {
  id: string;
  title: string;
  subtitle?: string;
}

interface ContentPanel {
  label: string;
  accent: "indigo" | "amber" | "emerald";
  body: React.ReactNode;
}

interface ChecklistSplitViewProps {
  sectionLabel: string;
  listTitle?: string;
  items: ChecklistSplitItem[];
  locked?: boolean;
  isDone: (id: string) => boolean;
  onToggle: (id: string) => void;
  getPanels?: (item: ChecklistSplitItem, index: number) => ContentPanel[];
  renderContent?: (item: ChecklistSplitItem, index: number) => React.ReactNode;
  getNote?: (id: string) => string;
  setNote?: (id: string, note: string) => void;
  completeLabel?: string;
  completeLabelLong?: string;
  topSlot?: React.ReactNode;
  listMono?: boolean;
}

const navBtn =
  "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-xs font-medium transition-colors ring-1 sm:text-sm";

const markBtn =
  "min-w-[7.75rem] px-3.5 sm:min-w-[8.5rem] sm:px-4";

const accentStyles = {
  indigo: {
    bar: "bg-indigo-500/[0.07] border-zinc-800/60",
    label: "text-indigo-400",
    icon: "text-indigo-400",
  },
  amber: {
    bar: "bg-amber-500/[0.07] border-zinc-800/60",
    label: "text-amber-400/95",
    icon: "text-amber-400/95",
  },
  emerald: {
    bar: "bg-emerald-500/[0.07] border-zinc-800/60",
    label: "text-emerald-400/95",
    icon: "text-emerald-400/95",
  },
};

function ContentCard({ panel }: { panel: ContentPanel }) {
  const styles = accentStyles[panel.accent];
  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-900/50">
      <div className={`flex shrink-0 items-center gap-2 border-b px-3 py-1.5 ${styles.bar}`}>
        <BookOpen className={`h-3.5 w-3.5 shrink-0 ${styles.icon}`} />
        <p className={`text-[10px] font-semibold uppercase tracking-wider ${styles.label}`}>
          {panel.label}
        </p>
      </div>
      <div className={cn(learnCardBodyClass, "text-[13px] leading-[1.6] text-zinc-300 sm:text-sm [&_*]:break-words")}>
        {panel.body}
      </div>
    </div>
  );
}

export function ChecklistSplitView({
  sectionLabel,
  listTitle = "Items",
  items,
  locked = false,
  isDone,
  onToggle,
  getPanels,
  renderContent,
  getNote,
  setNote,
  completeLabel = "Done",
  completeLabelLong = "Mark done",
  topSlot,
  listMono = false,
}: ChecklistSplitViewProps) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.some((t) => t.id === selectedId)) {
      setSelectedId(items[0]?.id ?? "");
    }
  }, [items, selectedId]);

  const selectedIndex = items.findIndex((t) => t.id === selectedId);
  const selected = items[selectedIndex] ?? items[0];
  const completedCount = items.filter((t) => isDone(t.id)).length;
  const isFirst = selectedIndex <= 0;
  const isLast = selectedIndex >= items.length - 1;

  const panels = useMemo(
    () => (selected && getPanels ? getPanels(selected, selectedIndex) : []),
    [selected, selectedIndex, getPanels]
  );

  const contentNode = useMemo(
    () => (selected && renderContent ? renderContent(selected, selectedIndex) : null),
    [selected, selectedIndex, renderContent]
  );

  if (!selected || items.length === 0) return null;
  if (!renderContent && !getPanels) return null;

  const goPrevious = () => {
    if (!isFirst) setSelectedId(items[selectedIndex - 1].id);
  };

  const goNext = () => {
    if (!isLast) setSelectedId(items[selectedIndex + 1].id);
  };

  const handleMarkComplete = () => {
    onToggle(selected.id);
    if (!isLast && !isDone(selected.id)) {
      setSelectedId(items[selectedIndex + 1].id);
    }
  };

  const colCount = renderContent ? 1 : Math.min(Math.max(panels.length, 1), 2);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30">
      <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-3 py-1.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <ListChecks className="h-3.5 w-3.5 shrink-0 text-purple-400" />
          <span className="truncate text-xs font-semibold text-zinc-100 sm:text-sm">
            {sectionLabel} · {selectedIndex + 1}/{items.length}
          </span>
        </div>
        <span className="shrink-0 text-[11px] tabular-nums text-zinc-500">
          {completedCount}/{items.length}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px]">
        <div className="flex min-h-0 flex-col gap-2 overflow-x-hidden border-b border-zinc-800 p-3 sm:p-4 lg:border-b-0 lg:border-r">
          {topSlot}

          <div className="shrink-0">
            <h2 className="truncate text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl">
              {selected.title}
            </h2>
            {selected.subtitle && (
              <p className="mt-0.5 truncate text-sm text-zinc-400">{selected.subtitle}</p>
            )}
          </div>

          <div
            className={cn(
              "min-h-0 flex-[3] overflow-x-hidden",
              contentNode
                ? "flex flex-col"
                : cn(
                    "grid gap-2.5",
                    colCount === 2 ? learnPanelGridClass(true) : "grid-cols-1"
                  )
            )}
          >
            {contentNode ??
              panels.map((panel) => <ContentCard key={panel.label} panel={panel} />)}
          </div>

          {setNote && getNote && (
            <div className="flex min-h-0 flex-[2] flex-col overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-900/40">
              <p className="shrink-0 border-b border-zinc-800/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Notes
              </p>
              <Textarea
                value={getNote(selected.id)}
                onChange={(e) => setNote(selected.id, e.target.value)}
                placeholder="Write your notes here — saved automatically..."
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

        <div className="flex min-h-0 flex-col overflow-hidden">
          <div className="shrink-0 border-b border-zinc-800 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              {listTitle}
            </p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {items.map((item, index) => {
              const active = item.id === selectedId;
              const done = isDone(item.id);

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
                    {done ? <Check className="h-3 w-3" /> : index + 1}
                  </span>
                  <span
                    className={cn(
                      "text-xs leading-snug sm:text-sm",
                      listMono && "font-mono",
                      active ? "font-medium text-zinc-50" : done ? "text-zinc-400" : "text-zinc-300"
                    )}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
