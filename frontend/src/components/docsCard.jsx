import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DocCard({ doc }) {
  return (
    <Card className="w-full h-full flex flex-col justify-between bg-white dark:bg-gray-800 text-black dark:text-white">
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <img src={doc.icon} alt={doc.title} className="w-6 h-6" />
          <CardTitle className="text-base md:text-lg">{doc.title}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">{doc.description}</p>
        {doc.tags?.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {doc.tags.map((tag, idx) => (
              <Badge key={idx} variant="custom">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm font-medium hover:underline"
        >
          📘 View Docs →
        </a>
      </CardFooter>
    </Card>
  );
}
