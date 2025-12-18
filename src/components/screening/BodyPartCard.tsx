import { useState } from "react";
import { ChevronDown, ChevronUp, Activity, Brain, Smile, Eye, Ear, Mic, Circle, MinusCircle, User, Droplets, Hand, Dna, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SymptomCheckbox } from "./SymptomCheckbox";
import type { BodyPartSymptoms, Symptom } from "@/data/symptoms";

const iconMap: Record<string, React.ElementType> = {
  "General Observation": Activity,
  "Head and Spine": Brain,
  "Facial Expression": Smile,
  "Eyes": Eye,
  "Ears": Ear,
  "Mouth": Mic,
  "Abdomen": Circle,
  "Anus": MinusCircle,
  "Genitalia": User,
  "Urinary Tract": Droplets,
  "Limbs": Hand,
  "Chromosomal Features": Dna,
};

interface BodyPartCardProps {
  bodyPart: BodyPartSymptoms;
  selectedSymptoms: Symptom[];
  onSymptomToggle: (symptom: Symptom, checked: boolean) => void;
  index: number;
}

export function BodyPartCard({
  bodyPart,
  selectedSymptoms,
  onSymptomToggle,
  index,
}: BodyPartCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[bodyPart.bodyPart] || Activity;
  
  const selectedCount = selectedSymptoms.filter((s) =>
    bodyPart.symptoms.some((bs) => bs.symptom === s.symptom)
  ).length;

  const hasPrioritySelected = selectedSymptoms.some(
    (s) => bodyPart.symptoms.some((bs) => bs.symptom === s.symptom && bs.priority)
  );

  return (
    <div
      className="animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className={cn(
          "bg-card rounded-xl border shadow-sm overflow-hidden transition-all duration-300",
          isExpanded ? "shadow-md" : "",
          hasPrioritySelected ? "border-priority" : selectedCount > 0 ? "border-primary" : "border-border"
        )}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
        >
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
              hasPrioritySelected
                ? "bg-priority/15 text-priority"
                : selectedCount > 0
                ? "bg-primary/15 text-primary"
                : "bg-secondary text-muted-foreground"
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          
          <div className="flex-1 text-left">
            <h3 className="font-display font-semibold text-foreground">
              {bodyPart.bodyPart}
            </h3>
            <p className="text-sm text-muted-foreground">
              {bodyPart.symptoms.length} symptoms to check
            </p>
          </div>

          {selectedCount > 0 && (
            <div
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium",
                hasPrioritySelected
                  ? "bg-priority/15 text-priority"
                  : "bg-primary/15 text-primary"
              )}
            >
              <Check className="w-3.5 h-3.5" />
              {selectedCount}
            </div>
          )}

          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {isExpanded && (
          <div className="px-4 pb-4 space-y-2 animate-fade-in">
            <div className="h-px bg-border mb-3" />
            {bodyPart.symptoms.map((symptom) => (
              <SymptomCheckbox
                key={symptom.symptom}
                symptom={symptom}
                checked={selectedSymptoms.some((s) => s.symptom === symptom.symptom)}
                onCheckedChange={(checked) => onSymptomToggle(symptom, checked)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
