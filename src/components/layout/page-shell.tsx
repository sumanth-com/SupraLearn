"use client";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  /** When false, page fills viewport and only inner panels scroll */
  scroll?: boolean;
}

export function PageShell({
  title,
  subtitle,
  children,
  headerRight,
  scroll = true,
}: PageShellProps) {
  if (!scroll) {
    return (
      <div className="-mx-4 -my-8 flex h-dvh max-h-dvh flex-col overflow-hidden sm:-mx-6 lg:-mx-8 lg:-my-10">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-zinc-800/80 px-4 py-3 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">{title}</h1>
            {subtitle && <p className="mt-0.5 text-sm text-zinc-400">{subtitle}</p>}
          </div>
          {headerRight && <div className="shrink-0">{headerRight}</div>}
        </header>
        <div className="min-h-0 flex-1 overflow-hidden px-4 py-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 text-zinc-400">{subtitle}</p>}
        </div>
        {headerRight && <div className="shrink-0">{headerRight}</div>}
      </div>
      {children}
    </div>
  );
}
