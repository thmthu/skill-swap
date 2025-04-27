import { Card, CardContent, CardTitle } from "../components/ui/card";

// export function CourseCard({ title, description, image }) {
//   return (
//     <Card
//       className="w-full max-w-xs flex-shrink-0 h-[360px] flex flex-col justify-between overflow-hidden"
//       elevation="md"
//       padding="md"
//       hoverable
//     >
//       {image ? (
//         <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-xl" />
//       ) : (
//         <div className="w-full h-40 bg-gray-200 rounded-t-xl flex items-center justify-center text-gray-400">
//           No Image
//         </div>
//       )}
//       <CardContent className="flex flex-col flex-1 justify-start mt-4 space-y-3">
//         <CardTitle className="text-h3 font-heading">{title}</CardTitle>
//         <p className="text-body2 font-body text-gray-600">{description}</p>
//       </CardContent>
//     </Card>
//   );
// }


export function CourseCard({ title, description, image, url }) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <Card
          className="w-full max-w-xs flex-shrink-0 h-[360px] flex flex-col justify-between hover:ring-2 hover:ring-primary transition"
          elevation="md"
          padding="md"
          hoverable
        >
          {image ? (
            <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-xl" />
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded-t-xl flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <CardContent className="flex flex-col flex-1 justify-start mt-4 space-y-3">
            <CardTitle className="text-h3 font-heading">{title}</CardTitle>
            <p className="text-body2 font-body text-gray-600">{description}</p>
          </CardContent>
        </Card>
      </a>
    );
  }