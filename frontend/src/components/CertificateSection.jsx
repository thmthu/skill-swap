import CertificateCard from "@/components/CertificateCard";
import { useState } from "react";
import { CategoryFilter } from "@/components/filter";
import GradientHeading from "@/components/Text/GradientHeading";
import { Loader2 } from "lucide-react";

const certTags = ["All", "Beginner", "Intermediate", "Professional", "Free", "React"];
const certificates = [
  {
    title: "Google UX Design Certificate",
    platform: "Coursera",
    tags: ["Beginner", "Free", "Design", "Certificate", "Official"],
    description: "Learn the foundations of UX/UI design and research.",
    url: "https://www.coursera.org/professional-certificates/google-ux-design",
    icon: "https://www.gstatic.com/images/icons/material/system/1x/design_services_black_24dp.png"
  },
  {
    title: "Meta Front-End Developer",
    platform: "Coursera",
    tags: ["Intermediate", "React", "Frontend", "Certificate", "Official"],
    description: "Build front-end apps with HTML, CSS, JS, and React.",
    url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
  },
  {
    title: "IBM Full Stack Developer",
    platform: "Coursera",
    tags: ["Intermediate", "Fullstack", "Paid", "Certificate"],
    description: "Master web dev, React, Node.js, and cloud-native tools.",
    url: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
  }
];


export function CertificateSection() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredCerts, setFilteredCerts] = useState(certificates);
  const [loading, setLoading] = useState(false);

  const handleFilter = (tag) => {
    setSelectedTag(tag);
    setLoading(true);
    setTimeout(() => {
      setFilteredCerts(
        tag === "All"
          ? certificates
          : certificates.filter((cert) => cert.tags?.includes(tag))
      );
      setLoading(false);
    }, 400);
  };

  return (
    <section className="max-w-[1280px] mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-4xl font-heading text-center mb-6 text-primary">
        <GradientHeading>Certificate Programs</GradientHeading>
      </h2>

      <CategoryFilter
        categories={certTags}
        selected={selectedTag}
        onSelect={handleFilter}
      />

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, index) => (
            <CertificateCard key={index} cert={cert} />
          ))}
        </div>
      )}
    </section>
  );
}
