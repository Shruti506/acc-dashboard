import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  actions?: ReactNode;
}

export const PageHeader = ({
  title,
  description,
  icon,
  onFocus,
  actions,
}: PageHeaderProps) => {
  return (
    <header
      tabIndex={0}
      onFocus={onFocus}
      className={cn(
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg border-0"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              {icon}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
};
