import { Skeleton } from "@/components/ui/skeleton";

export function UserCardSkeleton() {
  return (
    <div className="flex flex-col w-full max-w-[300px] overflow-hidden rounded-xl border border-zinc-950/10 bg-bg-light dark:bg-bg-dark p-4">
      {/* Image Skeleton */}
      <Skeleton className="h-48 w-full rounded-lg" />

      {/* Name */}
      <Skeleton className="mt-4 h-6 w-3/4 mx-auto rounded-md" />

      {/* Tags */}
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}
