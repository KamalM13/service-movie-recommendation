import { useState } from "react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Search } from 'lucide-react'

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Search Films</h2>
      <form onSubmit={handleSearch} className="flex gap-4">
        <Input
          type="search"
          placeholder="Search for films..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow bg-neutral-800 text-white border-neutral-700 focus:border-neutral-500"
        />
        <Button type="submit" className="bg-green-500 text-white hover:bg-green-600">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </form>
    </section>
  )
}

