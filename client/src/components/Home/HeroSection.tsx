import { Button } from "../../components/ui/button";

export function HeroSection() {
  return (
    <section className="relative">

      <div
        className="relative min-h-[100vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://a.ltrbxd.com/resized/sm/upload/l3/72/mx/b8/vqToPEywI1QzUNd5bJceldmrWUf-1200-1200-675-675-crop-000000.jpg?v=cdd95a78e1?height=1080&width=1920')",
        }}
      >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 opacity-70" />
      </div>
        <div className="absolute container flex min-h-[90vh] flex-col items-center justify-end pb-12 text-center text-white">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              Track films you've watched.
            </h1>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              Save those you want to see.
            </h2>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              Tell your friends what's good.
            </h2>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Get started — it's free!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
