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
import { jsPDF } from "jspdf";
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
  const prioritySymptoms = selectedSymptoms.filter((s) => s.priority);
  const regularSymptoms = selectedSymptoms.filter((s) => !s.priority);
  const urgent = hasPriority;
  const recommended = hasPriority || selectedSymptoms.length >= 3;

  const recommendation = urgent
    ? "Urgent referral required. Advised to proceed for immediate Newborn Screening."
    : recommended
    ? "Advised to proceed for Newborn Screening."
    : "Routine monitoring advised. No immediate screening required.";

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const now = new Date().toLocaleString();
    
    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("NEWBORN SCREENING SUMMARY", 105, 20, { align: "center" });
    
    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 28, 190, 28);
    
    // Patient Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Information", 20, 40);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Baby Name: ${babyName}`, 20, 50);
    doc.text(`Patient ID: ${babyId}`, 20, 58);
    doc.text(`Date & Time: ${now}`, 20, 66);
    
    let yPos = 80;
    
    // Priority Symptoms (if any)
    if (prioritySymptoms.length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(220, 38, 38); // Red color
      doc.text("⚠ PRIORITY SYMPTOMS", 20, yPos);
      yPos += 10;
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      prioritySymptoms.forEach((symptom) => {
        const text = useHpo ? symptom.hpo : symptom.symptom;
        doc.text(`• ${text}`, 25, yPos);
        yPos += 8;
      });
      yPos += 5;
    }
    
    // Regular Symptoms
    doc.setTextColor(0, 0, 0); // Reset to black
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Symptoms Observed", 20, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    if (regularSymptoms.length > 0) {
      regularSymptoms.forEach((symptom) => {
        const text = useHpo ? symptom.hpo : symptom.symptom;
        doc.text(`• ${text}`, 25, yPos);
        yPos += 8;
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
      });
    } else if (selectedSymptoms.length === 0) {
      doc.text("No symptoms selected.", 25, yPos);
      yPos += 8;
    }
    
    yPos += 10;
    
    // Recommendation
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    if (urgent) {
      doc.setTextColor(220, 38, 38);
    } else if (recommended) {
      doc.setTextColor(245, 158, 11);
    } else {
      doc.setTextColor(34, 197, 94);
    }
    doc.text("Recommendation", 20, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    
    // Word wrap recommendation text
    const splitRecommendation = doc.splitTextToSize(recommendation, 170);
    doc.text(splitRecommendation, 20, yPos);
    yPos += splitRecommendation.length * 7 + 10;
    
    if (urgent) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(220, 38, 38);
      doc.text("⚠ URGENT REFERRAL REQUIRED", 20, yPos);
    }
    
    // Footer
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(128, 128, 128);
    doc.text("For clinical use only. Always consult with qualified medical professionals.", 105, 285, { align: "center" });
    
    doc.save(`${babyName.replace(/\s+/g, "_")}_newborn_screening.pdf`);
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
