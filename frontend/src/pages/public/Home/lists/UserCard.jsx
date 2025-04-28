import { Tilt } from "@/components/ui/tilt";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from "@/components/ui/morphing-dialog";

export default function UserCard({
  image,
  name,
  tags = [],
  description = "",
  department,
}) {
  return (
    <Tilt rotationFactor={8} isReverse>
      <MorphingDialog
        transition={{
          type: "spring",
          bounce: 0.05,
          duration: 0.25,
        }}
      >
        <MorphingDialogTrigger
          style={{ borderRadius: "12px" }}
          className="group relative flex w-full max-w-[300px] flex-col overflow-hidden border border-zinc-950/10 bg-bg-light dark:bg-bg-dark !p-0"
        >
          {/* Image */}
          <MorphingDialogImage
            src={image}
            alt={name}
            className="h-48 w-full object-cover"
          />

          {/* Name + Department + Tags */}
          <div className="flex grow flex-col items-center justify-center px-3 py-4 space-y-2">
            <div className="text-center space-y-1">
              <MorphingDialogTitle className="text-h2 font-semibold font-heading text-text-light dark:text-text-dark">
                {name}
              </MorphingDialogTitle>

              {/* Department displayed immediately */}
              <p className="text-sm text-muted-foreground">{department}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-0.5 rounded-full bg-secondary-light-pink text-primary text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </MorphingDialogTrigger>

        {/* Dialog Content */}
        <MorphingDialogContainer>
          <MorphingDialogContent
            style={{ borderRadius: "24px" }}
            className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-bg-light dark:border-zinc-50/10 dark:bg-bg-dark sm:w-[500px]"
          >
            <MorphingDialogImage
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />

            <div className="p-6">
              <div className="space-y-1">
                <MorphingDialogTitle className="text-2xl font-bold font-heading text-text-light dark:text-text-dark">
                  {name}
                </MorphingDialogTitle>
                <p className="text-md font-medium text-zinc-500 dark:text-zinc-400">
                  {department}
                </p>
              </div>

              <MorphingDialogSubtitle className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 rounded-full bg-secondary-light-pink text-primary text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </MorphingDialogSubtitle>

              <MorphingDialogDescription
                disableLayoutAnimation
                variants={{
                  initial: { opacity: 0, scale: 0.8, y: 100 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.8, y: 100 },
                }}
              >
                <p className="pt-2 text-body1 md:text-body1 text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {description}
                </p>
              </MorphingDialogDescription>
            </div>

            <MorphingDialogClose className="absolute top-4 right-4 text-zinc-400 hover:text-text-light" />
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    </Tilt>
  );
}
