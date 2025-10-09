import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SVG = React.ComponentProps<"svg">;

function Spinner({ className, ...props }: SVG) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

const SpinnerCustom = ({ className }: SVG) => {
  return <Spinner className={className} />;
};

export default SpinnerCustom;
