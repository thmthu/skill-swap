import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CourseCard({ title, description, image, url, tags }) {
  return (
    <Card
      className="w-full max-w-[300px] flex flex-col h-[320px] md:h-[380px] justify-between overflow-hidden border border-gray-200 
                 transition-transform duration-300 hover:scale-105 hover:border-gray-300"
      elevation="none"
      padding="md"
      hoverable={false}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-24 md:h-32 object-cover rounded-t-xl"
        />
      ) : (
        <div className="w-full h-24 md:h-32 bg-gray-200 rounded-t-xl flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      <div className="flex flex-col flex-1 justify-between px-3 md:px-4 pt-3 md:pt-4 pb-2">
        <CardTitle className="text-sm md:text-base font-heading line-clamp-2">{title}</CardTitle>
        <p className="text-xs md:text-sm font-body text-gray-600 mt-1 md:mt-2 line-clamp-2">{description}</p>
        {tags?.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mt-2">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="custom" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <CardFooter className="mt-auto px-0 pt-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center !text-gray-600 font-semibold py-1.5 md:py-2 border border-gray-300 rounded-lg hover:!bg-primary hover:!text-white transition-colors text-xs md:text-sm"
          >
            Learn More
          </a>
        </CardFooter>
      </div>
    </Card>
  );
}
