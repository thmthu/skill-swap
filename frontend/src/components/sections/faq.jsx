import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";
import GradientHeading from "@/components/Text/GradientHeading";

export default function FAQ() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center space-y-12">
      {/* Heading */}
      <div className="space-y-4">
        <GradientHeading>Frequently Asked Question</GradientHeading>

        <p className="text-body1 p-4 text-text-light dark:text-text-dark max-w-2xl mx-auto">
          Find quick answers about how SkillSwap supports your development
          journey at NAB, helping you upskill, connect, and transition smoothly
          across teams.
        </p>
      </div>

      {/* Accordion FAQ */}
      <Accordion
        className="flex w-full flex-col"
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        variants={{
          expanded: {
            opacity: 1,
            scale: 1,
          },
          collapsed: {
            opacity: 0,
            scale: 0.7,
          },
        }}
      >
        {/* Question 1 */}
        <AccordionItem value="how-to-join" className="py-2">
          <AccordionTrigger className="w-full py-1 text-left text-h3 text-text-light dark:text-text-dark">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-primary transition-transform duration-200 group-data-expanded:rotate-90" />
              <span className="ml-2">How do I join SkillSwap?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="origin-left text-left">
            <p className="pl-8 pr-4 pt-2 pb-4 text-body2 text-text-light dark:text-text-dark">
              If you’re a NAB employee, you can access SkillSwap through the
              internal portal. Set up your profile, list your skills and
              learning goals, and start connecting with colleagues for mentoring
              and development.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Question 2 */}
        <AccordionItem value="who-can-mentor" className="py-2">
          <AccordionTrigger className="w-full py-1 text-left text-h3 text-text-light dark:text-text-dark">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-primary transition-transform duration-200 group-data-expanded:rotate-90" />
              <span className="ml-2">Who can become a mentor?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="origin-left text-left">
            <p className="pl-8 pr-4 pt-2 pb-4 text-body2 text-text-light dark:text-text-dark">
              Any NAB employee with strong expertise and a willingness to
              support others can register as a mentor.
              <br />
              Mentoring is a great way to contribute to our learning culture and
              grow leadership skills.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Question 3 */}
        <AccordionItem value="is-free" className="py-2">
          <AccordionTrigger className="w-full py-1 text-left text-h3 text-text-light dark:text-text-dark">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-primary transition-transform duration-200 group-data-expanded:rotate-90" />
              <span className="ml-2">Is SkillSwap free to use?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="origin-left text-left">
            <p className="pl-8 pr-4 pt-2 pb-4 text-body2 text-text-light dark:text-text-dark">
              Yes, SkillSwap is a free platform provided by NAB to support
              employee development. There are no costs involved for mentors or
              learners.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Question 4 */}
        <AccordionItem value="switch-departments" className="py-2">
          <AccordionTrigger className="w-full py-1 text-left text-h3 text-text-light dark:text-text-dark">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-primary transition-transform duration-200 group-data-expanded:rotate-90" />
              <span className="ml-2">Can I switch departments after?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="origin-left text-left">
            <p className="pl-8 pr-4 pt-2 pb-4 text-body2 text-text-light dark:text-text-dark">
              Absolutely. SkillSwap is designed to help you build the skills
              needed for career mobility within NAB. Once you meet the role
              requirements, you can explore opportunities across different teams
              and departments.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
