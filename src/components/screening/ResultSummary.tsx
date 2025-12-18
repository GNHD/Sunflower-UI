import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Download,
  RotateCcw,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Symptom } from "@/data/symptoms";

interface ResultSummaryProps {
  babyName: string;
  babyId: string;
  selectedSymptoms: Symptom[];
  onReset: () => void;
}

export function ResultSummary({
  babyName,
  babyId,
  selectedSymptoms,
  onReset,
}: ResultSummaryProps) {
  const [useHpo, setUseHpo] = useState(false);

  const hasPriority = selectedSymptoms.some((s) => s.priority);
  const urgent = hasPriority;
  const recommended = hasPriority || selectedSymptoms.length >= 3;

  const recommendation = urgent
    ? "Urgent referral required. Advised to proceed for immediate Newborn Screening."
    : recommended
    ? "Advised to proceed for Newborn Screening."
    : "Routine monitoring advised. No immediate screening required.";

  const handleDownloadPdf = () => {
    const now = new Date().toLocaleString();
    const symptomsText = selectedSymptoms
      .map((s) => (useHpo ? s.hpo : s.symptom))
      .join("\n  • ");

    const content = `
NEWBORN SCREENING SUMMARY
========================

Baby Name: ${babyName}
Patient ID: ${babyId}
Date & Time: ${now}

SYMPTOMS OBSERVED:
${selectedSymptoms.length > 0 ? `  • ${symptomsText}` : "  No symptoms selected."}

RECOMMENDATION:
${recommendation}

${urgent ? "⚠ URGENT REFERRAL REQUIRED" : ""}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${babyName.replace(/\s+/g, "_")}_newborn_screening.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div
          className={cn(
            "inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-glow",
            urgent
              ? "bg-priority"
              : recommended
              ? "bg-warning"
              : "bg-success"
          )}
        >
          {urgent ? (
            <AlertTriangle className="w-8 h-8 text-priority-foreground" />
          ) : recommended ? (
            <Stethoscope className="w-8 h-8 text-warning-foreground" />
          ) : (
            <CheckCircle2 className="w-8 h-8 text-success-foreground" />
          )}
        </div>
        <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
          Screening Complete
        </h2>
        <p className="text-muted-foreground">
          Review the results and download the report
        </p>
      </div>

      {/* Patient Info Card */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border mb-4">
        <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Patient Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Name:</span>
            <span className="ml-2 font-medium text-foreground">{babyName}</span>
          </div>
          <div>
            <span className="text-muted-foreground">ID:</span>
            <span className="ml-2 font-medium text-foreground">{babyId}</span>
          </div>
        </div>
      </div>

      {/* Symptoms Card */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border mb-4">
        <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Symptoms Observed ({selectedSymptoms.length})
        </h3>
        {selectedSymptoms.length > 0 ? (
          <div className="space-y-2">
            {selectedSymptoms.map((symptom) => (
              <div
                key={symptom.symptom}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border",
                  symptom.priority
                    ? "bg-priority/5 border-priority/30"
                    : "bg-secondary/50 border-border"
                )}
              >
                <span className="text-foreground">
                  {useHpo ? symptom.hpo : symptom.symptom}
                </span>
                {symptom.priority && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-priority/15 text-priority">
                    <AlertTriangle className="w-3 h-3" />
                    Priority
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No symptoms selected.</p>
        )}
      </div>

      {/* Recommendation Card */}
      <div
        className={cn(
          "rounded-xl p-6 shadow-md border mb-6",
          urgent
            ? "bg-priority/10 border-priority/30"
            : recommended
            ? "bg-warning/10 border-warning/30"
            : "bg-success/10 border-success/30"
        )}
      >
        <h3
          className={cn(
            "font-display font-semibold mb-2 flex items-center gap-2",
            urgent
              ? "text-priority"
              : recommended
              ? "text-warning"
              : "text-success"
          )}
        >
          {urgent ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <CheckCircle2 className="w-5 h-5" />
          )}
          Recommendation
        </h3>
        <p className="text-foreground font-medium">{recommendation}</p>
      </div>

      {/* Actions */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <div className="flex items-center justify-between mb-4">
          <Label htmlFor="hpo-toggle" className="text-foreground font-medium">
            Use Medical Terminology (HPO)
          </Label>
          <Switch id="hpo-toggle" checked={useHpo} onCheckedChange={setUseHpo} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleDownloadPdf}
            className="flex-1 h-12 gradient-primary hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            className="flex-1 h-12"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Screening
          </Button>
        </div>
      </div>
    </div>
  );
}
