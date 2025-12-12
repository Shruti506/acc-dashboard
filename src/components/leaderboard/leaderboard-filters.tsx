"use client"

import { Search, Download, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import type { CategoryFilter, PeriodFilter } from "@/lib/leaderboard-types"

interface LeaderboardFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  categoryFilter: CategoryFilter
  setCategoryFilter: (value: CategoryFilter) => void
  periodFilter: PeriodFilter
  setPeriodFilter: (value: PeriodFilter) => void
  onReset: () => void
  totalResults: number
}

export function LeaderboardFilters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  periodFilter,
  setPeriodFilter,
  onReset,
  totalResults,
}: LeaderboardFiltersProps) {
  const { onFocus: onSearchFocus } = useFocusNarrator("Search leaderboard by name")
  const { onFocus: onCategoryFocus } = useFocusNarrator("Filter by category")
  const { onFocus: onPeriodFocus } = useFocusNarrator("Filter by time period")
  const { onFocus: onResetFocus } = useFocusNarrator("Reset all filters")
  const { onFocus: onDownloadFocus } = useFocusNarrator("Download leaderboard data")

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm" aria-label="Leaderboard filters">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <Label htmlFor="search-input" className="mb-2 block text-sm font-medium">
            Search
          </Label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <Input
              id="search-input"
              type="search"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={onSearchFocus}
              className="pl-9 focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Search leaderboard entries by name"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <Label htmlFor="category-filter" className="mb-2 block text-sm font-medium">
            Category
          </Label>
          <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as CategoryFilter)}>
            <SelectTrigger
              id="category-filter"
              onFocus={onCategoryFocus}
              aria-label="Select category filter"
              className="focus-visible:ring-2 focus-visible:ring-ring"
            >
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Period Filter */}
        <div>
          <Label htmlFor="period-filter" className="mb-2 block text-sm font-medium">
            Time Period
          </Label>
          <Select value={periodFilter} onValueChange={(value) => setPeriodFilter(value as PeriodFilter)}>
            <SelectTrigger
              id="period-filter"
              onFocus={onPeriodFocus}
              aria-label="Select time period"
              className="focus-visible:ring-2 focus-visible:ring-ring"
            >
              <SelectValue placeholder="This month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div>
          <Label className="mb-2 block text-sm font-medium opacity-0 select-none">Actions</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={onReset}
              onFocus={onResetFocus}
              aria-label="Reset filters"
              className="flex-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-transparent"
            >
              <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
              Reset
            </Button>
            <Button
              variant="outline"
              size="icon"
              onFocus={onDownloadFocus}
              aria-label="Download leaderboard data"
              className="shrink-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
          Showing <span className="font-medium text-foreground">{totalResults}</span>{" "}
          {totalResults === 1 ? "entry" : "entries"}
        </p>
      </div>
    </section>
  )
}
