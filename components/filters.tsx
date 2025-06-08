"use client"

import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import {
  setClassFilter,
  setUnitFilter,
  setStatusFilter,
  setWeakChaptersFilter,
} from "@/lib/features/chaptersSlice"

export function Filters() {
  const { subjects, activeSubject, filters } = useAppSelector((state) => state.chapters)
  const dispatch = useAppDispatch()

  const currentSubject = subjects.find(s => s.id === activeSubject)
  
  // Get unique classes and units for the current subject
  const uniqueClasses = [...new Set(currentSubject?.chapters.map(c => c.class) || [])]
  const uniqueUnits = [...new Set(currentSubject?.chapters.map(c => c.unit) || [])]
  const statusOptions = ['Not Started', 'In Progress', 'Completed']

  const handleClassChange = (className: string, checked: boolean) => {
    const newClasses = checked
      ? [...filters.classes, className]
      : filters.classes.filter(c => c !== className)
    dispatch(setClassFilter(newClasses))
  }

  const handleUnitChange = (unitName: string, checked: boolean) => {
    const newUnits = checked
      ? [...filters.units, unitName]
      : filters.units.filter(u => u !== unitName)
    dispatch(setUnitFilter(newUnits))
  }

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked
      ? [...filters.status, status]
      : filters.status.filter(s => s !== status)
    dispatch(setStatusFilter(newStatus))
  }

  return (
    <div className="flex w-full items-center gap-2 px-4 py-3 bg-card border-b">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-0.5 p-1.5 bg-card rounded-xl border border-solid border-border"
          >
            <span className="font-label-sm-14 text-foreground">
              Class {filters.classes.length > 0 && `(${filters.classes.length})`}
            </span>
            <ChevronDownIcon className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {uniqueClasses.map((className) => (
            <DropdownMenuCheckboxItem
              key={className}
              checked={filters.classes.includes(className)}
              onCheckedChange={(checked) => handleClassChange(className, checked)}
            >
              {className}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-0.5 p-1.5 bg-card rounded-xl border border-solid border-border"
          >
            <span className="font-label-sm-14 text-foreground">
              Units {filters.units.length > 0 && `(${filters.units.length})`}
            </span>
            <ChevronDownIcon className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {uniqueUnits.map((unitName) => (
            <DropdownMenuCheckboxItem
              key={unitName}
              checked={filters.units.includes(unitName)}
              onCheckedChange={(checked) => handleUnitChange(unitName, checked)}
            >
              {unitName}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-6 bg-border rounded-xl" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge
            variant="outline"
            className="flex items-center justify-center gap-0.5 p-1.5 bg-card rounded-xl border border-solid border-border cursor-pointer hover:bg-accent"
          >
            <span className="font-label-sm-14 text-foreground">
              Status {filters.status.length > 0 && `(${filters.status.length})`}
            </span>
            <ChevronDownIcon className="w-4 h-4" />
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {statusOptions.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={filters.status.includes(status)}
              onCheckedChange={(checked) => handleStatusChange(status, checked)}
            >
              {status}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2 ml-2">
        <Switch
          checked={filters.weakChapters}
          onCheckedChange={(checked) => dispatch(setWeakChaptersFilter(checked))}
        />
        <span className="font-label-sm-14 text-foreground text-sm">Weak Chapters</span>
      </div>
    </div>
  )
}