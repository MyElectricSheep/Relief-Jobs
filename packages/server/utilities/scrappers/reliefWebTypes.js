// Conversion tables for ReliefWeb codes

const jobTypes = [
  {
    id: 266,
    name: "Volunteer Opportunity",
    reliefJobsName: "volunteer",
    className: "t_contrats-volontariat-service-civique",
    classNameAlternate: "t_contrats-benevolat",
    classNameEn: "t_contrats-volonteering",
    classNameEnAlternate: ""
  },
  {
    id: 265,
    name: "Internship",
    reliefJobsName: "internship",
    className: "t_contrats-stage-alternance",
    classNameAlternate: "",
    classNameEn: "t_contrats-internship-study-contract",
    classNameEnAlternate: ""
  },
  {
    id: 264,
    name: "Consultancy",
    reliefJobsName: "consultancy",
    className: "",
    classNameAlternate: "",
    classNameEn: "",
    classNameEnAlternate: ""
  },
  {
    id: 263,
    name: "Job",
    reliefJobsName: "job",
    className: "t_contrats-cdd",
    classNameAlternate: "t_contrats-cdi",
    classNameEn: "t_contrats-fixed-term-contract",
    classNameEnAlternate: "t_contrats-permanent-contract"
  }
];

const careerTypes = [
  {
    id: 9999,
    name: "Other",
    reliefJobsName: "other",
    coordinationSudName: "Autre",
    coordinationSudAlternate: "Technicien spécialisé",
    coordinationSudEnName: "Other",
    coordinationSudEnAlternateName: "Specialized technician"
  },
  {
    id: 36601,
    name: "Logistics/Procurement",
    reliefJobsName: "logistics_procurement",
    coordinationSudName: "Services et Logistique",
    coordinationSudAlternate: "",
    coordinationSudEnName: "Logistic & Office support",
    coordinationSudEnAlternateName: ""
  },
  {
    id: 20971,
    name: "Information Management",
    reliefJobsName: "information_management",
    coordinationSudName: "Gestion de l'information",
    coordinationSudAlternate: "",
    coordinationSudEnName: "",
    coordinationSudEnAlternateName: ""
  },
  {
    id: 20966,
    name: "Donor Relations/Grants Management",
    reliefJobsName: "donor_relations_grants_management",
    coordinationSudName: "Dons/collecte",
    coordinationSudAlternate: "",
    coordinationSudEnName: "Fundraising",
    coordinationSudEnAlternateName: ""
  },
  {
    id: 6868,
    name: "Monitoring and Evaluation",
    reliefJobsName: "monitoring_evaluation",
    coordinationSudName: "Suivi et Evaluation",
    coordinationSudAlternate: "",
    coordinationSudEnName: "",
    coordinationSudEnAlternateName: ""
  },
  {
    id: 6867,
    name: "Program/Project Management",
    reliefJobsName: "program_project_management",
    coordinationSudName: "Gestion de projets/programmes",
    coordinationSudAlternate: "",
    coordinationSudEnName: "Program/Project management",
    coordinationSudEnAlternateName: ""
  },
  {
    id: 6866,
    name: "Information and Communications Technology",
    reliefJobsName: "information_communications_technology",
    coordinationSudName: "Technologie de l'information et de la communication",
    coordinationSudAlternate: "",
    coordinationSudEnName: "",
    coordinationSudEnAlternateName: ""
  },
  {
    id: 6865,
    name: "Advocacy/Communications",
    reliefJobsName: "advocacy_communications",
    coordinationSudName: "Plaidoyer et Recherches",
    coordinationSudAlternate: "Communication",
    coordinationSudEnName: "Advocacy & Research",
    coordinationSudEnAlternateName: ""
  },
  {
    id: 6864,
    name: "Administration/Finance",
    reliefJobsName: "administration_finance",
    coordinationSudName: "Direction et administration",
    coordinationSudAlternate: "RH et Finances",
    coordinationSudEnName: "Human resources & Financial services",
    coordinationSudEnAlternateName: "Management & Administration"
  },
  {
    id: 6863,
    name: "Human Resources",
    reliefJobsName: "human_resources",
    coordinationSudName: "RH et Finances",
    coordinationSudAlternate: "Direction et administration",
    coordinationSudEnName: "",
    coordinationSudEnAlternateName: ""
  },
  {
    id: 9991,
    name: "Training",
    reliefJobsName: "",
    coordinationSudName: "Formation",
    coordinationSudAlternate: "",
    coordinationSudEnName: "Training",
    coordinationSudEnAlternateName: ""
  }
];

const experienceTypes = [
  { id: 261, name: "10+ years", reliefJobsName: "10+" },
  { id: 260, name: "5-9 years", reliefJobsName: "5-9" },
  { id: 259, name: "3-4 years", reliefJobsName: "3-4" },
  { id: 258, name: "0-2 years", reliefJobsName: "0-2" }
];

const organizationTypes = [
  {
    id: 276,
    name: "Red Cross/Red Crescent Movement",
    reliefJobsName: "red_cross"
  },
  { id: 275, name: "Other", reliefJobsName: "other" },
  { id: 274, name: "Non-governmental Organization", reliefJobsName: "NGO" },
  { id: 273, name: "Media", reliefJobsName: "media" },
  {
    id: 272,
    name: "International Organization",
    reliefJobsName: "international_organization"
  },
  { id: 271, name: "Government", reliefJobsName: "government" },
  {
    id: 270,
    name: "Academic and Research Institution",
    reliefJobsName: "academic_research"
  }
];

const themeTypes = [
  {
    id: 9999,
    name: "Other",
    reliefJobsName: "other",
    coordinationSudName: "Autre",
    coordinationSudEnName: "Other"
  },
  {
    id: 12033,
    name: "Mine Action",
    reliefJobsName: "mine_action",
    coordinationSudName: "",
    coordinationSudEnName: ""
  },
  {
    id: 4604,
    name: "Water Sanitation Hygiene",
    reliefJobsName: "water_sanitation_hygiene",
    coordinationSudName: "Eau et assainissement",
    coordinationSudEnName: "Water sanitation & Hygiene"
  },
  {
    id: 4603,
    name: "Shelter and Non-Food Items",
    reliefJobsName: "shelter_NFI",
    coordinationSudName: "",
    coordinationSudEnName: ""
  },
  {
    id: 4602,
    name: "Safety and Security",
    reliefJobsName: "safety_security",
    coordinationSudName: "",
    coordinationSudEnName: ""
  },
  {
    id: 4601,
    name: "Recovery and Reconstruction",
    reliefJobsName: "recovery_reconstruction",
    coordinationSudName: "",
    coordinationSudEnName: ""
  },
  {
    id: 4600,
    name: "Protection and Human Rights",
    reliefJobsName: "protection_human_rights",
    coordinationSudName: "Droits humains",
    coordinationSudEnName: "Human rights"
  },
  {
    id: 4599,
    name: "Peacekeeping and Peacebuilding",
    reliefJobsName: "peacekeeping_peacebuilding",
    coordinationSudName: "",
    coordinationSudEnName: ""
  },
  {
    id: 4598,
    name: "Logistics and Telecommunications",
    reliefJobsName: "logistics_telecom",
    coordinationSudName: "",
    coordinationSudEnName: ""
  },
  {
    id: 4597,
    name: "Humanitarian Financing",
    reliefJobsName: "humanitarian_financing",
    coordinationSudName: "",
    coordinationSudEnName: ""
  },
  {
    id: 4596,
    name: "HIV/Aids",
    reliefJobsName: "HIV_aids",
    coordinationSudName: "Santé",
    coordinationSudEnName: ""
  },
  {
    id: 4595,
    name: "Health",
    reliefJobsName: "health",
    coordinationSudName: "Santé",
    coordinationSudEnName: "Health"
  },
  {
    id: 4594,
    name: "Gender",
    reliefJobsName: "gender",
    coordinationSudName: "Genre",
    coordinationSudEnName: "Gender"
  },
  {
    id: 4593,
    name: "Food and Nutrition",
    reliefJobsName: "food_nutrition",
    coordinationSudName: "Alimentation / Nutrition",
    coordinationSudEnName: "Food & Nutrition"
  },
  {
    id: 4592,
    name: "Education",
    reliefJobsName: "education",
    coordinationSudName: "Education / Formation",
    coordinationSudEnName: "Education / Training"
  },
  {
    id: 4591,
    name: "Disaster Management",
    reliefJobsName: "disaster_management",
    coordinationSudName: "Gestion crise / post-crise",
    coordinationSudEnName: "Crisis & Post-crisis management"
  },
  {
    id: 4590,
    name: "Coordination",
    reliefJobsName: "coordination",
    coordinationSudName: "",
    coordinationSudEnName: ""
  },
  {
    id: 4589,
    name: "Contributions",
    reliefJobsName: "contributions",
    coordinationSudName: "",
    coordinationSudEnName: ""
  },
  {
    id: 4588,
    name: "Climate Change and Environment",
    reliefJobsName: "climate_change_environment",
    coordinationSudName: "Environnement / Climat",
    coordinationSudEnName: "Environment & Climate"
  },
  {
    id: 4587,
    name: "Agriculture",
    reliefJobsName: "agriculture",
    coordinationSudName: "Agriculture",
    coordinationSudEnName: "Agriculture"
  },
  {
    id: 9991,
    name: "Migration",
    reliefJobsName: "migration",
    coordinationSudName: "Migration",
    coordinationSudEnName: "Migration"
  },
  {
    id: 9992,
    name: "Economic Development",
    reliefJobsName: "economic_dev",
    coordinationSudName: "Développement économique et local",
    coordinationSudEnName: "Economic & local development"
  }
];

module.exports = {
  jobTypes,
  careerTypes,
  experienceTypes,
  organizationTypes,
  themeTypes
};
