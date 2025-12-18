export interface Symptom {
  symptom: string;
  hpo: string;
  priority: boolean;
}

export interface BodyPartSymptoms {
  bodyPart: string;
  symptoms: Symptom[];
}

export const symptomsData: BodyPartSymptoms[] = [
  {
    bodyPart: "General Observation",
    symptoms: [
      { symptom: "Looks ill", hpo: "Ill appearance", priority: false },
      { symptom: "Lethargic", hpo: "Lethargy", priority: false },
      { symptom: "Abnormal cry", hpo: "Abnormal cry", priority: false },
      { symptom: "Not feeding", hpo: "Feeding Difficulties", priority: false },
      { symptom: "Color of skin - Yellow", hpo: "Jaundice", priority: false },
      { symptom: "Color of skin - Blue", hpo: "Cyanosis", priority: false },
      { symptom: "Color of skin - Pale", hpo: "Pallor", priority: false },
      { symptom: "Excessive weight loss", hpo: "Failure to thrive", priority: false },
    ],
  },
  {
    bodyPart: "Head and Spine",
    symptoms: [
      { symptom: "Abnormal Head circumference - Too large (> 38 cm)", hpo: "Macrocephaly", priority: false },
      { symptom: "Abnormal Head circumference - Too small (< 32 cm)", hpo: "Microcephaly", priority: false },
      { symptom: "Absence of skull cap", hpo: "Acrania", priority: false },
      { symptom: "Swelling/protrusion of brain", hpo: "Encephalocele", priority: false },
      { symptom: "Abnormal swelling of the spine", hpo: "Spina bifida", priority: false },
      { symptom: "Enlarged/bulging fontanelle", hpo: "Hydrocephalus", priority: true },
    ],
  },
  {
    bodyPart: "Facial Expression",
    symptoms: [
      { symptom: "Dysmorphic features", hpo: "Facial dysmorphism", priority: false },
    ],
  },
  {
    bodyPart: "Eyes",
    symptoms: [
      { symptom: "Eye lid - swelling", hpo: "Eyelid edema", priority: false },
      { symptom: "Eye lid - droopy", hpo: "Ptosis", priority: false },
      { symptom: "Eye lid - gap", hpo: "Eyelid coloboma", priority: false },
      { symptom: "Eyeball - absent eye", hpo: "Anophthalmia", priority: false },
      { symptom: "Eyeball - small eye", hpo: "Microphthalmia", priority: false },
      { symptom: "White reflex", hpo: "Leukocoria", priority: false },
      { symptom: "Abnormal shape of pupil", hpo: "Corectopia", priority: false },
      { symptom: "Opacity of lens", hpo: "Cataract", priority: true },
      { symptom: "Clouding (cornea)", hpo: "Corneal opacity", priority: true },
      { symptom: "Congenital glaucoma", hpo: "Congenital glaucoma", priority: true },
    ],
  },
  {
    bodyPart: "Ears",
    symptoms: [
      { symptom: "Absent/abnormal shape/low set", hpo: "Low-set ears, Abnormal external ear morphology", priority: false },
      { symptom: "Absent ear canal", hpo: "Aural atresia", priority: false },
      { symptom: "Unresponsive to noise", hpo: "Hearing impairment", priority: false },
    ],
  },
  {
    bodyPart: "Mouth",
    symptoms: [
      { symptom: "Cleft (split) palate", hpo: "Cleft palate", priority: false },
      { symptom: "Cleft (split) lip", hpo: "Cleft lip", priority: false },
      { symptom: "Cleft (split) lip and palate", hpo: "Cleft lip and palate", priority: false },
    ],
  },
  {
    bodyPart: "Abdomen",
    symptoms: [
      { symptom: "Scaphoid (sunken and concave) with respiratory distress", hpo: "Scaphoid abdomen", priority: false },
      { symptom: "Distended abdomen", hpo: "Abdominal distension", priority: false },
      { symptom: "Wall defect - gap with herniation of the gut", hpo: "Omphalocele", priority: true },
      { symptom: "Intestinal obstruction", hpo: "Intestinal obstruction", priority: true },
      { symptom: "Gastroschisis", hpo: "Gastroschisis", priority: true },
      { symptom: "Hernia", hpo: "Diaphragmatic hernia", priority: true },
    ],
  },
  {
    bodyPart: "Anus",
    symptoms: [
      { symptom: "Absent/imperforate/abnormally positioned", hpo: "Imperforate anus", priority: true },
    ],
  },
  {
    bodyPart: "Genitalia",
    symptoms: [
      { symptom: "Ambiguous genitalia", hpo: "Ambiguous genitalia", priority: true },
      { symptom: "Abnormal urethral opening", hpo: "Hypospadias", priority: false },
      { symptom: "Vaginal opening absent", hpo: "Vaginal atresia", priority: false },
      { symptom: "Testicular torsion", hpo: "Testicular torsion", priority: false },
    ],
  },
  {
    bodyPart: "Urinary Tract",
    symptoms: [
      { symptom: "Bladder wall not intact", hpo: "Bladder exstrophy", priority: true },
      { symptom: "No urine passed within 24 hours", hpo: "Oliguria", priority: false },
      { symptom: "Posterior urethral valve - disrupted flow", hpo: "Posterior urethral valves", priority: true },
      { symptom: "Wrinkled abdominal wall", hpo: "Prune belly syndrome", priority: false },
    ],
  },
  {
    bodyPart: "Limbs",
    symptoms: [
      { symptom: "Absence of a whole or part of upper limb", hpo: "Amelia (upper limb)", priority: false },
      { symptom: "Absence of a whole or part of lower limb", hpo: "Amelia (lower limb)", priority: false },
      { symptom: "Fused digits", hpo: "Syndactyly", priority: false },
      { symptom: "Absence of digits or split hand/foot", hpo: "Ectrodactyly", priority: false },
      { symptom: "Extra digits", hpo: "Polydactyly", priority: false },
      { symptom: "Club foot", hpo: "Talipes equinovarus", priority: false },
    ],
  },
  {
    bodyPart: "Chromosomal Features",
    symptoms: [
      { symptom: "Upward slanting eyes", hpo: "Upslanting palpebral fissures", priority: false },
      { symptom: "Epicanthal folds", hpo: "Epicanthus", priority: false },
      { symptom: "Flat nasal bridge", hpo: "Flat nasal bridge", priority: false },
      { symptom: "Small ears", hpo: "Small ears", priority: false },
      { symptom: "Small mouth", hpo: "Microstomia", priority: false },
      { symptom: "Excess neck skin", hpo: "Redundant neck skin", priority: false },
      { symptom: "Single palmar crease", hpo: "Single transverse palmar crease", priority: false },
      { symptom: "Wide toe gap", hpo: "Sandal gap", priority: false },
    ],
  },
];

export const bodyPartIcons: Record<string, string> = {
  "General Observation": "activity",
  "Head and Spine": "brain",
  "Facial Expression": "smile",
  "Eyes": "eye",
  "Ears": "ear",
  "Mouth": "mic",
  "Abdomen": "circle",
  "Anus": "minus-circle",
  "Genitalia": "user",
  "Urinary Tract": "droplets",
  "Limbs": "hand",
  "Chromosomal Features": "dna",
};
