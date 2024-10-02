import { Checkbox } from "../ui/checkbox";
import { Badge } from "@/components/ui/badge"

export function TutorialStep({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative">
      <Badge
        id={title}
        className={`absolute top-[3px] mr-2 peer`}
      >
      {step}
      </Badge>
      <br /><br />
      <label
        htmlFor={title}
        className={`relative text-base text-foreground peer-checked:line-through font-medium`}
      >
        <span className="ml-8">{title}</span>
        <div
          className={`ml-8 text-sm peer-checked:line-through font-normal text-muted-foreground`}
        >
          {children}
        </div>
      </label>
    </li>
  );
}
