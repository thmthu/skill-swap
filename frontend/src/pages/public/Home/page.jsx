import HeroSection from "./sections/hero";
import HowItWorks from "./sections/how-it-works";
import WhyChoose from "./sections/why-choose";
import FAQ from "./sections/faq";

import UserCard from "./sections/UserCard";

export default function HomePage() {
  const mockUsers = [
    {
      id: 1,
      image: "/NAB.png",
      name: "Jenny Tran",
      tags: ["Product", "Management", "Digital"],
      description:
        "Jenny is a Senior Product Manager at NAB, passionate about internal mobility and digital innovation. She enjoys mentoring emerging leaders in the tech space.",
    },
    {
      id: 2,
      image: "/NAB.png",
      name: "David Nguyen",
      tags: ["Engineering", "Cloud", "DevOps"],
      description:
        "David leads cloud infrastructure projects at NAB. He mentors engineers on scalable architecture and efficient DevOps practices.",
    },
    {
      id: 3,
      image: "/NAB.png",
      name: "Sarah Lee",
      tags: ["UX/UI", "Accessibility", "Research"],
      description:
        "Sarah specializes in user experience and inclusive design. She's passionate about helping teams build accessible and user-centered products.",
    },
    {
      id: 4,
      image: "/NAB.png",
      name: "Michael Pham",
      tags: ["Data", "Analytics", "Strategy"],
      description:
        "Michael mentors on data analytics, storytelling with data, and strategic decision-making using insights derived from large datasets.",
    },
    {
      id: 5,
      image: "/NAB.png",
      name: "Anna Vu",
      tags: ["Leadership", "Growth", "Learning & Development"],
      description:
        "Anna is an L&D specialist passionate about helping individuals grow their leadership capabilities through structured mentorship programs.",
    },
  ];

  return (
    <>
      {/* <HeroSection />
      <WhyChoose />
      <HowItWorks />
      <FAQ /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {mockUsers.map((user) => (
          <UserCard
            key={user.id}
            image={user.image}
            name={user.name}
            tags={user.tags}
            description={user.description}
          />
        ))}
      </div>
    </>
  );
}
