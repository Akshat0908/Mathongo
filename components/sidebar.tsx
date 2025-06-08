"use client"

import { ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setActiveSubject } from "@/lib/features/chaptersSlice"
import { ThemeToggle } from "./theme-toggle"

export function Sidebar() {
  const { subjects, activeSubject } = useAppSelector((state) => state.chapters)
  const dispatch = useAppDispatch()

  return (
    <aside className="flex flex-col w-[272px] h-full items-start bg-card border-r">
      <header className="flex flex-col w-full items-start p-6 bg-card">
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-4">
              <div className="relative w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white text-xs font-bold">
                JM
              </div>
              <h2 className="font-['Inter',Helvetica] font-bold text-foreground text-xl leading-6">
                JEE Main
              </h2>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex items-center w-full">
            <p className="w-full font-body-xs-12 text-muted-foreground text-[length:var(--body-xs-12-font-size)] tracking-[var(--body-xs-12-letter-spacing)] leading-[var(--body-xs-12-line-height)]">
              2025 - 2009 | 173 Papers | 15825 Qs
            </p>
          </div>
        </div>
      </header>

      <nav className="flex flex-col w-full gap-1 pb-4 px-2">
        {subjects.map((subject) => (
          <Button
            key={subject.id}
            variant="ghost"
            onClick={() => dispatch(setActiveSubject(subject.id))}
            className={`flex h-12 items-center justify-between px-4 py-3 rounded-xl w-full transition-colors ${
              subject.id === activeSubject
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-lg">{subject.icon}</span>
              <span className="font-label-sm-14 font-[number:var(--label-sm-14-font-weight)] text-[length:var(--label-sm-14-font-size)] tracking-[var(--label-sm-14-letter-spacing)] leading-[var(--label-sm-14-line-height)]">
                {subject.name}
              </span>
            </div>
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        ))}
      </nav>
    </aside>
  )
}