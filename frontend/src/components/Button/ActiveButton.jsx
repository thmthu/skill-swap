import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ActiveButton = ({ children, className, onClick }) => {
  return (
    <Button
      className={cn("bg-primary text-text-light", className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
export default ActiveButton;
