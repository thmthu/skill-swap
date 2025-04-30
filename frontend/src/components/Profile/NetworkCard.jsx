import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";

export default function NetworkCard({ avatarUrl, name, description }) {
  return (
    <Card className="bg-white border border-primary text-gray-800 shadow-sm transition hover:shadow-md hover:border-primary-dark">
      <CardHeader className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div
            className="w-20 h-20 rounded-xl bg-gray-300"
            style={{
              backgroundImage: `url(${avatarUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <CardDescription className="text-gray-600">
              {description}
            </CardDescription>
          </div>
        </div>

        <CardAction className="flex gap-2">
          <div className="w-10 h-10">
            <div className="w-[31.5px] h-[31.5px] outline outline-[1.5px] outline-red-700 outline-offset-[-0.75px] mx-auto my-auto rounded" />
          </div>
          <div className="w-10 h-10">
            <div className="w-[31.5px] h-[31.5px] outline outline-[1.5px] outline-[#699A23] outline-offset-[-0.75px] mx-auto my-auto rounded" />
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
