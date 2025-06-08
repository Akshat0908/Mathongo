"use client"

import { ArrowUpDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setSorting } from "@/lib/features/chaptersSlice"
import { useMemo } from "react"

export function ChapterList() {
  const { subjects, activeSubject, filters, sortBy, sortOrder } = useAppSelector((state) => state.chapters)
  const dispatch = useAppDispatch()

  const currentSubject = subjects.find(s => s.id === activeSubject)
  
  const filteredAndSortedChapters = useMemo(() => {
    if (!currentSubject) return []
    
    let filtered = currentSubject.chapters.filter(chapter => {
      // Class filter
      if (filters.classes.length > 0 && !filters.classes.includes(chapter.class)) {
        return false
      }
      
      // Unit filter
      if (filters.units.length > 0 && !filters.units.includes(chapter.unit)) {
        return false
      }
      
      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(chapter.status)) {
        return false
      }
      
      // Weak chapters filter
      if (filters.weakChapters && !chapter.isWeak) {
        return false
      }
      
      return true
    })
    
    // Sort chapters
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'progress':
          const aProgress = a.progress.completed / a.progress.total
          const bProgress = b.progress.completed / b.progress.total
          comparison = aProgress - bProgress
          break
        case 'questions':
          comparison = a.stats2025.count - b.stats2025.count
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })
    
    return filtered
  }, [currentSubject, filters, sortBy, sortOrder])

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    dispatch(setSorting({ sortBy, sortOrder: newSortOrder }))
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'none') => {
    switch (trend) {
      case 'up':
        return <span className="text-green-600 dark:text-green-400"> ↑</span>
      case 'down':
        return <span className="text-red-600 dark:text-red-400"> ↓</span>
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 dark:text-green-400'
      case 'In Progress':
        return 'text-blue-600 dark:text-blue-400'
      case 'Not Started':
        return 'text-gray-500 dark:text-gray-400'
      default:
        return 'text-gray-500 dark:text-gray-400'
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full min-h-12 items-center px-4 py-0 bg-card border-b">
        <div className="flex flex-col items-start justify-center gap-1 pl-0 pr-2 py-2 flex-1 grow">
          <p className="self-stretch mt-[-1.00px] font-14px-regular text-foreground">
            Showing {filteredAndSortedChapters.length} chapters
            {filters.classes.length > 0 || filters.units.length > 0 || filters.status.length > 0 || filters.weakChapters
              ? ' (filtered)'
              : ` (${currentSubject?.chapters.length || 0} total)`}
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={handleSort}
          className="flex items-center gap-1 text-primary hover:text-primary/80"
        >
          <ArrowUpDownIcon className="w-5 h-5" />
          <span className="font-14px-medium">Sort</span>
        </Button>
      </div>

      <div className="flex flex-col w-full items-start gap-4 p-4 bg-muted/30 min-h-[calc(100vh-300px)]">
        {filteredAndSortedChapters.length === 0 ? (
          <div className="flex items-center justify-center w-full py-12">
            <p className="text-muted-foreground text-center">
              No chapters found matching the current filters.
            </p>
          </div>
        ) : (
          filteredAndSortedChapters.map((chapter) => (
            <Card
              key={chapter.id}
              className="flex items-center gap-4 p-4 w-full bg-card rounded-xl border border-solid border-border hover:shadow-md transition-shadow"
            >
              <div className="text-2xl">{chapter.icon}</div>
              <CardContent className="flex flex-col items-start gap-2 p-0 flex-1 grow">
                <div className="flex items-center gap-6 w-full">
                  <div className="flex-1">
                    <h3 className="font-label-base-16 text-foreground mb-1">
                      {chapter.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{chapter.class}</span>
                      <span>•</span>
                      <span>{chapter.unit}</span>
                      <span>•</span>
                      <span className={getStatusColor(chapter.status)}>{chapter.status}</span>
                      {chapter.isWeak && (
                        <>
                          <span>•</span>
                          <span className="text-orange-600 dark:text-orange-400">Weak</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="inline-flex flex-col items-end gap-2 self-stretch">
                    <div className="w-fit mt-[-1.00px] font-body-xs-12 text-right whitespace-nowrap">
                      <span className="text-muted-foreground">2025: </span>
                      <span className="text-foreground font-medium">
                        {chapter.stats2025.count}Qs
                      </span>
                      {getTrendIcon(chapter.stats2025.trend)}
                      <span className="text-muted-foreground"> | 2024: </span>
                      <span className="text-muted-foreground">
                        {chapter.stats2024.count}Qs
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {chapter.progress.completed}/{chapter.progress.total} Qs
                      <span className="ml-2 text-xs">
                        ({Math.round((chapter.progress.completed / chapter.progress.total) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}