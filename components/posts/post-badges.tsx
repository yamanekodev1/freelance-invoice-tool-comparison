import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CategoryBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function CategoryBadge({ children, className }: CategoryBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-border bg-muted font-normal text-muted-foreground",
        className,
      )}
    >
      {children}
    </Badge>
  );
}

export function PrBadge({ className }: { className?: string }) {
  return (
    <Badge
      className={cn(
        "border-amber-200 bg-amber-100 font-medium text-amber-800 hover:bg-amber-100",
        className,
      )}
    >
      PR
    </Badge>
  );
}
