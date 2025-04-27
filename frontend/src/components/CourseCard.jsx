import { Card, CardContent, CardTitle, CardFooter } from "../components/ui/card";


// export function CourseCard({ title, description, image, url }) {
//   return (
//     <Card
//       className="w-full max-w-xs flex-shrink-0 h-[360px] flex flex-col justify-between hover:ring-2 hover:ring-primary transition"
//       elevation="md"
//       padding="md"
//       hoverable
//     >
//       {image ? (
//         <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-xl" loading="lazy" />
//       ) : (
//         <div className="w-full h-40 bg-gray-200 rounded-t-xl flex items-center justify-center text-gray-400">
//           No Image
//         </div>
//       )}
//       <CardContent className="flex flex-col flex-1 justify-start mt-4 space-y-3">
//         <CardTitle className="text-h3 font-heading">{title}</CardTitle>
//         <p className="text-body2 font-body text-gray-600">{description}</p>
//       </CardContent>
//       <CardFooter>
//         <a
//           href={url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="w-full"
//         >
//           <button
//             className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-medium transition-colors duration-200"
//           >
//             Learn More
//           </button>
//         </a>
//       </CardFooter>
//     </Card>
//   );
// }

export function CourseCard({ title, description, image, url }) {
  return (
    <Card
      className="w-full max-w-[300px] flex flex-col h-[380px] justify-between overflow-hidden border border-gray-200 
                 transition-transform duration-300 hover:scale-105 hover:border-primary"
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
          className="w-full h-36 object-cover rounded-t-xl"
        />
      ) : (
        <div className="w-full h-36 bg-gray-200 rounded-t-xl flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Card Content */}
      <div className="flex flex-col flex-1 justify-between px-4 pt-4 pb-2">
        <CardTitle className="text-h3 font-heading">{title}</CardTitle>
        <p className="text-body2 font-body text-gray-600 mt-2">{description}</p>

        {/* Footer */}
        <CardFooter className="mt-auto px-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center text-primary font-semibold py-2 border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            Learn More
          </a>
        </CardFooter>
      </div>
    </Card>
  );
}