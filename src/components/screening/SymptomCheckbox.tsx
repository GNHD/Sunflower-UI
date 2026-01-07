import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Symptom } from "@/data/symptoms";

interface SymptomCheckboxProps {
  symptom: Symptom;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function SymptomCheckbox({
  symptom,
  checked,
  onCheckedChange,
}: SymptomCheckboxProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer",
        checked
          ? symptom.priority
            ? "bg-priority/10 border-priority"
            : "bg-primary/10 border-primary"
          : "bg-card border-border hover:border-primary/50 hover:bg-secondary/50"
      )}
      onClick={() => onCheckedChange(!checked)}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          "mt-0.5",
          symptom.priority && checked && "border-priority data-[state=checked]:bg-priority"
        )}
      />
      <div className="flex-1 min-w-0">
        <Label className="flex items-center gap-2 cursor-pointer text-foreground font-medium leading-tight">
          {symptom.symptom}
          {symptom.priority && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-priority/15 text-priority">
              <AlertTriangle className="w-3 h-3" />
              Priority
            </span>
          )}
        </Label>
      </div>
    </div>
  );
}
