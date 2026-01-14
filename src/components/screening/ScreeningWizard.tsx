import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, ClipboardList, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { BabyInfoForm } from "./BabyInfoForm";
import { BodyPartCard } from "./BodyPartCard";
import { ResultSummary } from "./ResultSummary";
import { symptomsData, type Symptom } from "@/data/symptoms";

type Step = "info" | "screening" | "results";

export function ScreeningWizard() {
  const [step, setStep] = useState<Step>("info");
  const [babyName, setBabyName] = useState("");
  const [babyId, setBabyId] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [noneSelectedParts, setNoneSelectedParts] = useState<Set<string>>(new Set());
  const { theme, setTheme } = useTheme();

  const handleSymptomToggle = (bodyPartName: string, symptom: Symptom, checked: boolean) => {
    // If selecting a symptom, uncheck "none of the above" for this body part
    if (checked) {
      setNoneSelectedParts((prev) => {
        const next = new Set(prev);
        next.delete(bodyPartName);
        return next;
      });
      setSelectedSymptoms((prev) => [...prev, symptom]);
    } else {
      setSelectedSymptoms((prev) =>
        prev.filter((s) => s.symptom !== symptom.symptom)
      );
    }
  };

  const handleNoneToggle = (bodyPartName: string, checked: boolean) => {
    if (checked) {
      // Clear all symptoms for this body part when "none" is selected
      const bodyPart = symptomsData.find((bp) => bp.bodyPart === bodyPartName);
      if (bodyPart) {
        setSelectedSymptoms((prev) =>
          prev.filter((s) => !bodyPart.symptoms.some((bs) => bs.symptom === s.symptom))
        );
      }
      setNoneSelectedParts((prev) => new Set(prev).add(bodyPartName));
    } else {
      setNoneSelectedParts((prev) => {
        const next = new Set(prev);
        next.delete(bodyPartName);
        return next;
      });
    }
  };

  const handleReset = () => {
    setStep("info");
    setBabyName("");
    setBabyId("");
    setSelectedSymptoms([]);
    setNoneSelectedParts(new Set());
  };

  const priorityCount = selectedSymptoms.filter((s) => s.priority).length;
  const totalBodyParts = symptomsData.length;
  const checkedBodyParts = symptomsData.filter((bp) =>
    selectedSymptoms.some((s) =>
      bp.symptoms.some((bs) => bs.symptom === s.symptom)
    )
  ).length;

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
                <ClipboardList className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-foreground">
                  Newborn Screening
                </h1>
                <p className="text-xs text-muted-foreground">
                  Clinical Assessment Tool
                </p>
              </div>
            </div>

            {step === "screening" && (
              <div className="hidden sm:flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">
                  {selectedSymptoms.length} symptoms selected
                </span>
                {priorityCount > 0 && (
                  <span className="px-2 py-1 rounded-full bg-priority/15 text-priority font-medium">
                    {priorityCount} priority
                  </span>
                )}
              </div>
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="shrink-0"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {step !== "info" && (
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {step === "screening"
                  ? `Screening Progress`
                  : "Review Results"}
              </span>
              <Progress
                value={
                  step === "results"
                    ? 100
                    : (checkedBodyParts / totalBodyParts) * 100
                }
                className="h-2"
              />
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {step === "results"
                  ? "Complete"
                  : `${checkedBodyParts}/${totalBodyParts}`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {step === "info" && (
          <BabyInfoForm
            babyName={babyName}
            babyId={babyId}
            onNameChange={setBabyName}
            onIdChange={setBabyId}
            onNext={() => setStep("screening")}
          />
        )}

        {step === "screening" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                Physical Examination
              </h2>
              <p className="text-muted-foreground">
                Check each body part and select any observed symptoms
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {symptomsData.map((bodyPart, index) => (
                <BodyPartCard
                  key={bodyPart.bodyPart}
                  bodyPart={bodyPart}
                  selectedSymptoms={selectedSymptoms}
                  onSymptomToggle={(symptom, checked) => handleSymptomToggle(bodyPart.bodyPart, symptom, checked)}
                  noneSelected={noneSelectedParts.has(bodyPart.bodyPart)}
                  onNoneToggle={(checked) => handleNoneToggle(bodyPart.bodyPart, checked)}
                  index={index}
                />
              ))}
            </div>

            <div className="flex gap-3 sticky bottom-4">
              <Button
                variant="outline"
                onClick={() => setStep("info")}
                className="h-12 px-6 bg-card"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={() => setStep("results")}
                className="flex-1 h-12 gradient-primary hover:opacity-90 transition-opacity"
              >
                Complete Screening
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === "results" && (
          <ResultSummary
            babyName={babyName}
            babyId={babyId}
            selectedSymptoms={selectedSymptoms}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-auto">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            For clinical use only. Always consult with qualified medical
            professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}
