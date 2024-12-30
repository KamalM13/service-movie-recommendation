import { Film, Heart, Users } from 'lucide-react'

export function FeaturesSection() {
  return (
    <section className="py-16 bg-neutral-900 px-4">
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-12">Nova lets you...</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center space-y-4">
            <Film className="h-12 w-12" />
            <h3 className="text-xl font-semibold">Track Your Films</h3>
            <p className="text-muted-foreground">
              Keep a digital diary of your film watching history and rate the movies you've seen.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <Heart className="h-12 w-12" />
            <h3 className="text-xl font-semibold">Create Watchlists</h3>
            <p className="text-muted-foreground">
              Save films to watch later and create lists of your favorite movies.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <Users className="h-12 w-12" />
            <h3 className="text-xl font-semibold">Join the Community</h3>
            <p className="text-muted-foreground">
              Connect with other film lovers and share your thoughts through reviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

