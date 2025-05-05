import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) {
  return (
    <Card className="border-none shadow-lg bg-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-h1-0 md:text-display font-bold font-heading text-center">
          {title}
          <span className="text-h2-0 block text-white mt-2">
            NAB Skillswap!
          </span>
        </CardTitle>
        <CardDescription className="text-body1 text-white/80 text-center mb-2">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}

        {footerText && (
          <div className="mt-6 text-center text-sm text-white/80">
            {footerText}{" "}
            <Link
              to={footerLink}
              className="text-primary-medium hover:text-primary-light font-medium"
            >
              {footerLinkText}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
