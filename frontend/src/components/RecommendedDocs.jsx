import DocCard from "@/components/docsCard";
import GradientHeading from "@/components/Text/GradientHeading";
const docs = [
  {
    title: "React",
    description: "Build UI with components using the React library.",
    url: "https://react.dev/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  },
  {
    title: "TailwindCSS",
    description: "Utility-first CSS framework for rapid UI building.",
    url: "https://tailwindcss.com/docs",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg",
  },
  {
    title: "TypeScript",
    description: "A superset of JavaScript with type safety.",
    url: "https://www.typescriptlang.org/docs/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
  },
  {
    title: "Shadcn UI",
    description: "Styled UI components built with TailwindCSS and Radix.",
    url: "https://ui.shadcn.dev/",
    icon: "https://ui.shadcn.dev/favicon.ico",
  },
  {
    title: "Vite",
    description: "Next-generation frontend tooling with instant hot reload.",
    url: "https://vitejs.dev/guide/",
    icon: "https://vitejs.dev/logo.svg",
  },
  {
    title: "GitHub Docs",
    description: "Learn Git, version control, and workflows with GitHub.",
    url: "https://docs.github.com/",
    icon: "https://github.githubassets.com/favicons/favicon.svg",
  },
  {
    title: "MDN Web Docs",
    description: "The best reference for HTML, CSS, JavaScript, and APIs.",
    url: "https://developer.mozilla.org/",
    icon: "https://developer.mozilla.org/favicon.ico",
  },
  {
    title: "Next.js",
    description: "React framework for production apps with SSR support.",
    url: "https://nextjs.org/docs",
    icon: "https://nextjs.org/static/favicon/favicon.ico",
  },
  {
    title: "ESLint",
    description: "Find and fix problems in your JavaScript code.",
    url: "https://eslint.org/docs/latest/",
    icon: "https://eslint.org/icon-light.svg",
  },
];

export function RecommendedDocs() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-4xl font-heading text-center mb-8 text-primary">
        <GradientHeading>Recommended Docs</GradientHeading>
        </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc) => (
          <DocCard key={doc.title} doc={doc} />
        ))}
      </div>
    </section>
  );
}
