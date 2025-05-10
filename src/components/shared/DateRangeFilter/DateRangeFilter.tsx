"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Locale } from "date-fns"

interface DateRangeFilterProps {
  fromDate?: Date
  untilDate?: Date
  fromPlaceholder?: string
  untilPlaceholder?: string
  locale?: Locale
  onFromDateChange?: (date?: Date) => void
  onUntilDateChange?: (date?: Date) => void
  className?: string
}

export function DateRangeFilter({
  fromDate,
  untilDate,
  fromPlaceholder = "Từ ngày",
  untilPlaceholder = "Đến ngày",
  locale = vi,
  onFromDateChange,
  onUntilDateChange,
  className,
}: DateRangeFilterProps) {
  const [fromDateInternal, setFromDateInternal] = useState<Date | undefined>(fromDate)
  const [untilDateInternal, setUntilDateInternal] = useState<Date | undefined>(untilDate)

  // Sync internal state with props
  useEffect(() => {
    setFromDateInternal(fromDate)
  }, [fromDate])

  useEffect(() => {
    setUntilDateInternal(untilDate)
  }, [untilDate])

  const handleFromDateChange = (date?: Date) => {
    setFromDateInternal(date)
    if (onFromDateChange) {
      onFromDateChange(date)
    }
  }

  const handleUntilDateChange = (date?: Date) => {
    setUntilDateInternal(date)
    if (onUntilDateChange) {
      onUntilDateChange(date)
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !fromDateInternal && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {fromDateInternal ? format(fromDateInternal, "PPP", { locale }) : fromPlaceholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={fromDateInternal}
            onSelect={handleFromDateChange}
            initialFocus
            locale={locale}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !untilDateInternal && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {untilDateInternal ? format(untilDateInternal, "PPP", { locale }) : untilPlaceholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={untilDateInternal}
            onSelect={handleUntilDateChange}
            initialFocus
            locale={locale}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
