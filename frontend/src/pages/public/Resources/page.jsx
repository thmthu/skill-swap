import CourseSection from "@/components/CourseSection";
import { RecommendedDocs } from "@/components/RecommendedDocs";
import { CertificateSection } from "@/components/CertificateSection";

export default function ResourcePage() {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16">
      <CourseSection />
      <RecommendedDocs />
      <CertificateSection />
    </div>
  );
}

