import HowItWorks from "../../../components/sections/how-it-works";
import FAQ from "../../../components/sections/FAQ";
import HeroSection from "../../../components/sections/Hero";
import WhyChoose from "../../../components/sections/why-choose";
import UserCard from "../../../components/logged-sections/UserCard";
export default function HomePage() {
  return (
    <>
      {/* <HeroSection />
      <WhyChoose />
      <HowItWorks />
      <FAQ /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserCard
          name="Alex Nguyen"
          skill="Data Science"
          department="Analytics"
        />
        <UserCard
          name="Jenny Tran"
          skill="Product Management"
          department="Digital"
        />
        <UserCard
          name="Liam Vo"
          skill="UI/UX Design"
          department="Design Studio"
        />
      </div>
    </>
  );
}
