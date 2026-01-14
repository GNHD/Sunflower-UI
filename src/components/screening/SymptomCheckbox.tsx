import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
          ? "bg-primary/10 border-primary"
          : "bg-card border-border hover:border-primary/50 hover:bg-secondary/50"
      )}
      onClick={() => onCheckedChange(!checked)}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <Label className="text-sm font-medium cursor-pointer text-foreground leading-tight">
          {symptom.symptom}
        </Label>
      </div>
    </div>
  );
}
