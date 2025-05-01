import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function DocCard({ doc }) {
  return (
    <Card
      elevation="sm"
      padding="md"
      hoverable
      className="w-full h-full flex flex-col justify-between"
    >
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <img src={doc.icon} alt={doc.title} className="w-6 h-6" />
          <CardTitle className="text-base md:text-lg">{doc.title}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">{doc.description}</p>
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
