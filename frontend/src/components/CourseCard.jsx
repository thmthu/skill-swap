import { Card, CardContent, CardTitle, CardFooter } from "../components/ui/card";

export function CourseCard({ title, description, image, url }) {
  return (
    <Card
      className="w-full max-w-[300px] flex flex-col h-[300px] md:h-[380px] justify-between overflow-hidden border border-gray-200 
                 transition-transform duration-300 hover:scale-105 hover:border-gray-300"
      elevation="none"
      padding="md"
      hoverable={false}
    >
      {/* Card Image */}
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-24 md:h-36 object-cover rounded-t-xl"
        />
      ) : (
        <div className="w-full h-24 md:h-36 bg-gray-200 rounded-t-xl flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Card Content */}
      <div className="flex flex-col flex-1 justify-between px-3 md:px-4 pt-3 md:pt-4 pb-2">
        <CardTitle className="text-subtitle1 md:text-h3 font-heading line-clamp-2">{title}</CardTitle>
        <p className="text-body2 font-body text-gray-600 mt-1 md:mt-2 line-clamp-3">{description}</p>

        {/* Footer */}
        <CardFooter className="mt-auto px-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center !text-gray-600 font-semibold py-1.5 md:py-2 border border-gray-300 rounded-lg hover:!bg-primary hover:!text-white transition-colors text-btn2 md:text-btn1"
          >
            Learn More
          </a>
        </CardFooter>
      </div>
    </Card>
  );
}


