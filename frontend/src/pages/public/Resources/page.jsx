import CourseSection from "@/components/CourseSection";
import { RecommendedDocs } from "@/components/RecommendedDocs";
import { CertificateSection } from "@/components/CertificateSection";
import Header from "../../../components/Header/Header";

export default function ResourcePage() {
	return (
		<div className="w-full">
			<div className="w-full mx-auto">
				<Header
					title={"Learning Resources"}
					description={
						"Access a curated collection of courses, documents, and certifications to enhance your professional development. \n Discover valuable resources to help you grow and succeed in your career journe"
					}
					buttonText={"Explore"}
				/>
				<div className="w-full">
					<CourseSection />
					<RecommendedDocs />
					<CertificateSection />
				</div>
			</div>
		</div>
	);
}
