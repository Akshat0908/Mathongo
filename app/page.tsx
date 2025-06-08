"use client"

import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  return (
    <div className="bg-background flex flex-row justify-center w-full min-h-screen">
      <div className="bg-background w-full max-w-[1360px] flex">
        <Sidebar />
        <div className="flex-1">
          <ScrollArea className="h-screen">
            <MainContent />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}