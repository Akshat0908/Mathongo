"use client"

import { useAppSelector } from "@/lib/hooks"
import { Filters } from "./filters"
import { ChapterList } from "./chapter-list"

export function MainContent() {
  const { subjects, activeSubject } = useAppSelector((state) => state.chapters)
  const currentSubject = subjects.find(s => s.id === activeSubject)

  return (
    <section className="flex flex-col w-full items-start bg-background">
      <header className="flex flex-col w-full items-start pt-6 pb-4 px-0 bg-card border-b">
        <div className="flex items-start w-full bg-card">
          <div className="flex flex-col items-center gap-4 flex-1 grow">
            <div className="inline-flex items-center justify-center gap-4">
              <span className="text-2xl">{currentSubject?.icon}</span>
              <h1 className="w-fit mt-[-1.00px] font-['Inter',Helvetica] font-bold text-foreground text-xl text-center tracking-[0] leading-6 whitespace-nowrap">
                {currentSubject?.name}
              </h1>
            </div>
            <p className="w-fit font-['Inter',Helvetica] font-normal text-muted-foreground text-sm text-right tracking-[0] leading-[18.2px] whitespace-nowrap">
              Chapter-wise Collection of {currentSubject?.name}
            </p>
          </div>
          <div className="w-14 h-14" />
        </div>
      </header>

      <Filters />
      <ChapterList />
    </section>
  )
}