import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Baby, IdCard, ArrowRight } from "lucide-react";

interface BabyInfoFormProps {
  babyName: string;
  babyId: string;
  onNameChange: (name: string) => void;
  onIdChange: (id: string) => void;
  onNext: () => void;
}

export function BabyInfoForm({
  babyName,
  babyId,
  onNameChange,
  onIdChange,
  onNext,
}: BabyInfoFormProps) {
  const isValid = babyName.trim().length > 0 && babyId.trim().length > 0;

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4 shadow-glow">
          <Baby className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
          Patient Information
        </h2>
        <p className="text-muted-foreground">
          Enter the newborn's details to begin screening
        </p>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-md border border-border space-y-5">
        <div className="space-y-2">
          <Label htmlFor="babyName" className="flex items-center gap-2 text-foreground">
            <Baby className="w-4 h-4 text-primary" />
            Baby Name
          </Label>
          <Input
            id="babyName"
            placeholder="Enter baby's name"
            value={babyName}
            onChange={(e) => onNameChange(e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="babyId" className="flex items-center gap-2 text-foreground">
            <IdCard className="w-4 h-4 text-primary" />
            Patient ID
          </Label>
          <Input
            id="babyId"
            placeholder="Enter patient ID"
            value={babyId}
            onChange={(e) => onIdChange(e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <Button
          onClick={onNext}
          disabled={!isValid}
          className="w-full h-12 text-base font-medium gradient-primary hover:opacity-90 transition-opacity"
        >
          Begin Screening
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
