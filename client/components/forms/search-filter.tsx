"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"

interface SearchFilterProps {
  onSearch: (term: string) => void
  onFilter: (filters: any) => void
  onSort: (sortBy: string) => void
  onClearFilters: () => void
  searchTerm: string
  activeFilters: string[]
  sortBy: string
}

export function SearchFilter({
  onSearch,
  onFilter,
  onSort,
  onClearFilters,
  searchTerm,
  activeFilters,
  sortBy,
}: SearchFilterProps) {
  const [filters, setFilters] = useState({
    batches: [],
    branches: [],
    jobTitles: [],
    locations: [],
  })

  const removeFilter = (filter: string) => {
    // In a real app, you would update the filters state
    const newActiveFilters = activeFilters.filter((f) => f !== filter)
    // Call the parent component's filter function
  }

  const applyFilters = () => {
    onFilter(filters)
  }

  const clearFilters = () => {
    setFilters({
      batches: [],
      branches: [],
      jobTitles: [],
      locations: [],
    })
    onClearFilters()
  }

  return (
    <motion.div
      className="flex flex-col gap-4 md:flex-row md:items-center mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-navy/50" />
        <Input
          type="search"
          placeholder="Search by name, company, or position..."
          className="pl-10 bg-white/70 backdrop-blur-sm border-navy/10 focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2 border-navy/20 text-navy hover:bg-navy/5">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto bg-cream">
          <SheetHeader>
            <SheetTitle className="text-navy">Filter Alumni</SheetTitle>
            <SheetDescription>Narrow down your search with specific criteria</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <div className="space-y-6">
              <div>
                <Label className="text-base text-navy">Batch</Label>
                <div className="mt-3 space-y-3">
                  {["2000-2004", "2004-2008", "2008-2012", "2012-2016", "2016-2020"].map((batch) => (
                    <div key={batch} className="flex items-center space-x-2">
                      <Checkbox id={`batch-${batch}`} className="text-gold border-navy/30 focus:ring-gold" />
                      <Label htmlFor={`batch-${batch}`} className="font-normal text-navy/80">
                        {batch}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-navy/10" />

              <div>
                <Label className="text-base text-navy">Branch/Department</Label>
                <div className="mt-3 space-y-3">
                  {["Management", "Marketing", "Finance", "Engineering", "Arts", "Communications", "Agriculture"].map(
                    (branch) => (
                      <div key={branch} className="flex items-center space-x-2">
                        <Checkbox id={`branch-${branch}`} className="text-gold border-navy/30 focus:ring-gold" />
                        <Label htmlFor={`branch-${branch}`} className="font-normal text-navy/80">
                          {branch}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <Separator className="bg-navy/10" />

              <div>
                <Label className="text-base text-navy">Job Title</Label>
                <div className="mt-3 space-y-3">
                  {["Manager", "Director", "Founder", "Engineer", "Designer", "Accountant", "Consultant"].map(
                    (title) => (
                      <div key={title} className="flex items-center space-x-2">
                        <Checkbox id={`title-${title}`} className="text-gold border-navy/30 focus:ring-gold" />
                        <Label htmlFor={`title-${title}`} className="font-normal text-navy/80">
                          {title}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <Separator className="bg-navy/10" />

              <div>
                <Label className="text-base text-navy">Location</Label>
                <div className="mt-3 space-y-3">
                  {[
                    "New York, NY",
                    "Scranton, PA",
                    "Philadelphia, PA",
                    "Chicago, IL",
                    "San Francisco, CA",
                    "International",
                  ].map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox id={`location-${location}`} className="text-gold border-navy/30 focus:ring-gold" />
                      <Label htmlFor={`location-${location}`} className="font-normal text-navy/80">
                        {location}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={clearFilters} className="border-navy/20 text-navy hover:bg-navy/5">
                Clear Filters
              </Button>
              <Button className="bg-navy text-white hover:bg-navy/90" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Select onValueChange={onSort} defaultValue={sortBy}>
        <SelectTrigger className="w-[180px] bg-white/70 backdrop-blur-sm border-navy/10 focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          <SelectItem value="year-desc">Graduation Year (Newest)</SelectItem>
          <SelectItem value="year-asc">Graduation Year (Oldest)</SelectItem>
        </SelectContent>
      </Select>

      {/* Active filters */}
      <AnimatePresence>
        {(searchTerm || activeFilters.length > 0) && (
          <motion.div
            className="flex flex-wrap gap-2 mt-4 md:mt-0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1 bg-navy/10 text-navy hover:bg-navy/20">
                Search: {searchTerm}
                <button onClick={() => onSearch("")} className="ml-1 hover:bg-navy/10 rounded-full p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="flex items-center gap-1 bg-navy/10 text-navy hover:bg-navy/20"
              >
                {filter}
                <button onClick={() => removeFilter(filter)} className="ml-1 hover:bg-navy/10 rounded-full p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            {(searchTerm || activeFilters.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-navy/70 hover:text-navy hover:bg-navy/5 h-7 text-xs"
              >
                Clear all
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
