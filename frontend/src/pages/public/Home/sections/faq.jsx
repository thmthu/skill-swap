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
    <section className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center space-y-12 text-foreground">
      {/* Heading */}
      <div className="space-y-4">
        <GradientHeading>Frequently Asked Questions</GradientHeading>
        <p className="text-body1 p-4 max-w-2xl mx-auto">
          Find quick answers about how SkillSwap supports your development
          journey at NAB.
        </p>
      </div>

      {/* Accordion */}
      <Accordion className="flex w-full flex-col items-center">
        {[
          {
            title: "How do I join SkillSwap?",
            content:
              "If you’re a NAB employee, you can access SkillSwap through the internal portal. Set up your profile and start connecting.",
          },
          {
            title: "Who can become a mentor?",
            content:
              "Any NAB employee with strong expertise and a willingness to support others can register as a mentor.",
          },
          {
            title: "Is SkillSwap free to use?",
            content:
              "Yes, SkillSwap is a free platform provided by NAB to support employee development.",
          },
          {
            title: "Can I switch departments after?",
            content:
              "Absolutely. SkillSwap helps you build skills for career mobility across departments.",
          },
        ].map(({ title, content }, index) => (
          <AccordionItem
            value={index.toString()}
            key={index}
            className="py-4 w-full max-w-2xl mx-auto flex flex-col items-center text-center"
          >
            <AccordionTrigger className="text-h3 justify-center">
              <div className="flex items-center justify-center">
                <ChevronRight className="h-4 w-4 text-primary transition-transform duration-200 group-data-expanded:rotate-90" />
                <span className="ml-2 font-semibold">{title}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="text-center">
              <p className="px-4 pt-2 pb-4 text-body2">{content}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
