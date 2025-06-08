import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Chapter {
  id: number
  name: string
  icon: string
  class: string
  unit: string
  status: 'Not Started' | 'In Progress' | 'Completed'
  isWeak: boolean
  stats2025: {
    count: number
    trend: 'up' | 'down' | 'none'
  }
  stats2024: {
    count: number
  }
  progress: {
    completed: number
    total: number
  }
}

export interface Subject {
  id: string
  name: string
  icon: string
  chapters: Chapter[]
}

interface ChaptersState {
  subjects: Subject[]
  activeSubject: string
  filters: {
    classes: string[]
    units: string[]
    status: string[]
    weakChapters: boolean
  }
  sortBy: 'name' | 'progress' | 'questions'
  sortOrder: 'asc' | 'desc'
}

// Mock data based on the requirements
const mockData: Subject[] = [
  {
    id: 'physics',
    name: 'Physics PYQs',
    icon: '⚛️',
    chapters: [
      {
        id: 1,
        name: 'Gravitation',
        icon: '🌍',
        class: 'Class 11',
        unit: 'Unit 1',
        status: 'In Progress',
        isWeak: false,
        stats2025: { count: 8, trend: 'up' },
        stats2024: { count: 6 },
        progress: { completed: 113, total: 205 }
      },
      {
        id: 2,
        name: 'Math in Physics',
        icon: '📐',
        class: 'Class 11',
        unit: 'Unit 1',
        status: 'Not Started',
        isWeak: true,
        stats2025: { count: 2, trend: 'down' },
        stats2024: { count: 6 },
        progress: { completed: 0, total: 150 }
      },
      {
        id: 3,
        name: 'Units and Dimensions',
        icon: '📏',
        class: 'Class 11',
        unit: 'Unit 1',
        status: 'Completed',
        isWeak: false,
        stats2025: { count: 6, trend: 'none' },
        stats2024: { count: 6 },
        progress: { completed: 180, total: 180 }
      },
      {
        id: 4,
        name: 'Motion in One Dimension',
        icon: '➡️',
        class: 'Class 11',
        unit: 'Unit 2',
        status: 'In Progress',
        isWeak: true,
        stats2025: { count: 8, trend: 'up' },
        stats2024: { count: 6 },
        progress: { completed: 95, total: 220 }
      },
      {
        id: 5,
        name: 'Motion in Two Dimensions',
        icon: '↗️',
        class: 'Class 11',
        unit: 'Unit 2',
        status: 'Not Started',
        isWeak: false,
        stats2025: { count: 8, trend: 'up' },
        stats2024: { count: 6 },
        progress: { completed: 0, total: 195 }
      },
      {
        id: 6,
        name: 'Laws of Motion',
        icon: '⚖️',
        class: 'Class 11',
        unit: 'Unit 2',
        status: 'In Progress',
        isWeak: false,
        stats2025: { count: 8, trend: 'up' },
        stats2024: { count: 6 },
        progress: { completed: 140, total: 240 }
      },
      {
        id: 7,
        name: 'Centre of Mass Equilibrium and Momentum',
        icon: '⚖️',
        class: 'Class 12',
        unit: 'Unit 3',
        status: 'Completed',
        isWeak: false,
        stats2025: { count: 8, trend: 'up' },
        stats2024: { count: 6 },
        progress: { completed: 160, total: 160 }
      },
      {
        id: 8,
        name: 'Work Power Energy',
        icon: '⚡',
        class: 'Class 12',
        unit: 'Unit 3',
        status: 'In Progress',
        isWeak: true,
        stats2025: { count: 8, trend: 'up' },
        stats2024: { count: 6 },
        progress: { completed: 85, total: 175 }
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry PYQs',
    icon: '🧪',
    chapters: [
      {
        id: 9,
        name: 'Atomic Structure',
        icon: '⚛️',
        class: 'Class 11',
        unit: 'Unit 1',
        status: 'In Progress',
        isWeak: false,
        stats2025: { count: 10, trend: 'up' },
        stats2024: { count: 8 },
        progress: { completed: 120, total: 200 }
      },
      {
        id: 10,
        name: 'Chemical Bonding',
        icon: '🔗',
        class: 'Class 11',
        unit: 'Unit 2',
        status: 'Not Started',
        isWeak: true,
        stats2025: { count: 5, trend: 'down' },
        stats2024: { count: 7 },
        progress: { completed: 0, total: 180 }
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics PYQs',
    icon: '📊',
    chapters: [
      {
        id: 11,
        name: 'Algebra',
        icon: '🔢',
        class: 'Class 11',
        unit: 'Unit 1',
        status: 'Completed',
        isWeak: false,
        stats2025: { count: 12, trend: 'up' },
        stats2024: { count: 10 },
        progress: { completed: 150, total: 150 }
      },
      {
        id: 12,
        name: 'Calculus',
        icon: '∫',
        class: 'Class 12',
        unit: 'Unit 2',
        status: 'In Progress',
        isWeak: true,
        stats2025: { count: 8, trend: 'none' },
        stats2024: { count: 8 },
        progress: { completed: 90, total: 200 }
      }
    ]
  }
]

const initialState: ChaptersState = {
  subjects: mockData,
  activeSubject: 'physics',
  filters: {
    classes: [],
    units: [],
    status: [],
    weakChapters: false
  },
  sortBy: 'name',
  sortOrder: 'asc'
}

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setActiveSubject: (state, action: PayloadAction<string>) => {
      state.activeSubject = action.payload
    },
    setClassFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.classes = action.payload
    },
    setUnitFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.units = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.status = action.payload
    },
    setWeakChaptersFilter: (state, action: PayloadAction<boolean>) => {
      state.filters.weakChapters = action.payload
    },
    setSorting: (state, action: PayloadAction<{ sortBy: 'name' | 'progress' | 'questions', sortOrder: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.sortBy
      state.sortOrder = action.payload.sortOrder
    },
    clearFilters: (state) => {
      state.filters = {
        classes: [],
        units: [],
        status: [],
        weakChapters: false
      }
    }
  }
})

export const {
  setActiveSubject,
  setClassFilter,
  setUnitFilter,
  setStatusFilter,
  setWeakChaptersFilter,
  setSorting,
  clearFilters
} = chaptersSlice.actions

export default chaptersSlice.reducer