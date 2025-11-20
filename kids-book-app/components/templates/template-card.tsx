// Presentation card for a single book template.
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { BookTemplate } from "@/types/book";

type TemplateCardProps = {
  template: BookTemplate;
};

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="flex flex-col border-dashed">
      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
        <CardDescription>{template.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>{template.summary}</p>
          <p className="font-semibold text-foreground">{template.ageRange} yrs · {template.pageCount} pages</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {template.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant="outline">
          Preview script
        </Button>
        <Button variant="ghost" className="gap-1 text-sm text-muted-foreground">
          Use template
          <ArrowRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}
