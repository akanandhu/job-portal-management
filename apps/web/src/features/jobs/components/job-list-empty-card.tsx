import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const JobListEmptyCard = ({
  hasActiveFilters,
  onClearFilters,
}: {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}) => {
  return (
    <Card className="border-dashed bg-muted/20 p-8 text-center">
      <CardHeader className="items-center justify-center pb-2">
        <CardTitle className="text-lg font-semibold">No jobs found</CardTitle>
        <CardDescription className="max-w-md text-sm text-muted-foreground">
          {hasActiveFilters
            ? "No job listings matched your active filter criteria. Try adjusting or clearing your filters."
            : "There are currently no job postings available in this view."}
        </CardDescription>
      </CardHeader>
      {hasActiveFilters && (
        <CardContent className="pt-3">
          <Button type="button" variant="outline" onClick={onClearFilters}>
            Clear filters
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default JobListEmptyCard;
