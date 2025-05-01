import CertificateCard from "@/components/CertificateCard";
import GradientHeading from "@/components/Text/GradientHeading";

const certificates = [
  {
    title: "Google UX Design Certificate",
    platform: "Coursera",
    tags: ["Free", "Beginner"],
    description: "Learn the foundations of UX/UI design and research.",
    url: "https://www.coursera.org/professional-certificates/google-ux-design",
    icon: "https://www.gstatic.com/images/icons/material/system/1x/design_services_black_24dp.png",
  },
  {
    title: "Meta Front-End Developer",
    platform: "Coursera",
    tags: ["React", "Professional"],
    description: "Build front-end apps with HTML, CSS, JS, and React.",
    url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
  },
  {
    title: "IBM Full Stack Developer",
    platform: "Coursera",
    tags: ["Fullstack", "Intermediate"],
    description: "Master web dev, React, and cloud-native tools.",
    url: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
];

export function CertificateSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-4xl font-heading text-center mb-8 text-primary">
        <GradientHeading>Professional Certificates</GradientHeading>
      </h2>
        
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <CertificateCard key={index} cert={cert} />
        ))}
      </div>
    </section>
  );
}
