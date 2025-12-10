"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const { onFocus: onPrevFocus } = useFocusNarrator(
    currentPage === 1
      ? "Previous page button, disabled, you are on the first page"
      : `Go to previous page, page ${currentPage - 1}`,
  )
  const { onFocus: onNextFocus } = useFocusNarrator(
    currentPage === totalPages
      ? "Next page button, disabled, you are on the last page"
      : `Go to next page, page ${currentPage + 1}`,
  )

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "ellipsis", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages)
      }
    }

    return pages
  }

  return (
    <nav aria-label="Pagination navigation" className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Results summary */}
      <p className="text-sm text-muted-foreground" role="status" aria-live="polite" aria-atomic="true">
        Showing <span className="font-medium text-foreground">{startItem}</span> to{" "}
        <span className="font-medium text-foreground">{endItem}</span> of{" "}
        <span className="font-medium text-foreground">{totalItems}</span> results
      </p>

      {/* Page controls */}
      <div className="flex items-center gap-1" role="group" aria-label="Page navigation buttons">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          onFocus={onPrevFocus}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          aria-disabled={currentPage === 1}
          className="h-9 w-9 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Button>

        {getPageNumbers().map((page, index) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground select-none" aria-hidden="true">
              …
            </span>
          ) : (
            <PageButton
              key={page}
              page={page}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          ),
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          onFocus={onNextFocus}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          aria-disabled={currentPage === totalPages}
          className="h-9 w-9 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </nav>
  )
}

function PageButton({
  page,
  currentPage,
  totalPages,
  onPageChange,
}: {
  page: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const isCurrent = page === currentPage
  const { onFocus } = useFocusNarrator(
    isCurrent ? `Page ${page} of ${totalPages}, current page` : `Go to page ${page} of ${totalPages}`,
  )

  return (
    <Button
      variant={isCurrent ? "default" : "outline"}
      size="icon"
      onClick={() => onPageChange(page)}
      onFocus={onFocus}
      aria-label={isCurrent ? `Page ${page}, current page` : `Go to page ${page}`}
      aria-current={isCurrent ? "page" : undefined}
      className="h-9 w-9 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {page}
    </Button>
  )
}
