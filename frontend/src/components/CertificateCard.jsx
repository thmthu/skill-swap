import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CertificateCard({ cert }) {
  return (
    <Card
      elevation="sm"
      padding="md"
      hoverable
      className="w-full h-full flex flex-col justify-between"
    >
    <CardContent className="space-y-3">
    <div className="flex items-center gap-3">
        {cert.icon && (
        <img src={cert.icon} alt={cert.title} className="w-6 h-6 object-contain" />
        )}
        <CardTitle className="text-base md:text-lg">{cert.title}</CardTitle>
    </div>
    <CardDescription className="text-sm text-muted-foreground">
        Offered by {cert.platform}
    </CardDescription>
    <p className="text-sm text-gray-600">{cert.description}</p>
    <div className="flex gap-2 flex-wrap">
        {cert.tags.map((tag, idx) => (
        <Badge key={idx} variant="outline">
            {tag}
        </Badge>
        ))}
    </div>
    </CardContent>
      <CardFooter>
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm font-medium hover:underline"
        >
          🔗 View Certificate
        </a>
      </CardFooter>
    </Card>
  );
}
