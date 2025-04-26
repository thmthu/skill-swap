import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/magicui/retro-grid";
export default function HomePage() {
    return (
      
             <div className=" flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background">
             <div className="max-w-4xl space-y-8 z-10">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Build a website that{" "}
                    <span className="whitespace-pre-wrap bg-clip-text  text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                        grows
                    </span> 
                </h1>

                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Empower marketers to release on-brand pages fast while using your tech stack.
                    The headless page builder for Next.js, Nuxt, and SvelteKit sites.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="font-semibold">
                        Get started
                    </Button>
                    <Button variant="outline" size="lg" className="font-semibold">
                        Try editor
                    </Button>
                </div>
            </div>

      <RetroGrid className="h-full w-full"/>
    </div>
            
        
    );
}