import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseBusiness, RotateCcw } from "lucide-react";

const JobListErrorCard = ({
  errorMessage,
  onRetry,
}: {
  errorMessage?: string;
  onRetry: () => void;
}) => {
  return (
    <Card className="border-destructive/30 bg-destructive/5 p-8 text-center">
      <CardHeader className="items-center pb-2">
        <BriefcaseBusiness className="mb-2 size-8 text-destructive" />
        <CardTitle className="text-lg font-semibold">Failed to load jobs</CardTitle>
        <CardDescription className="max-w-md text-sm text-muted-foreground">
          {errorMessage ?? "Unable to connect to the jobs service."}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-3">
        <Button type="button" variant="outline" onClick={onRetry}>
          <RotateCcw className="size-4" />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobListErrorCard;
