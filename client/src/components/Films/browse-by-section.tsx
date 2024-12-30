import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"

const browseOptions = [
  { name: "Genre", href: "/films/genre" },
  { name: "Year", href: "/films/year" },
  { name: "Rating", href: "/films/rating" },
  { name: "Director", href: "/films/director" },
]

export function BrowseBySection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Browse By</h2>
      <div className="flex flex-wrap gap-4">
        {browseOptions.map((option) => (
          <Button key={option.name} variant="default" asChild>
            <Link to={option.href}>{option.name}</Link>
          </Button>
        ))}
      </div>
    </section>
  )
}

