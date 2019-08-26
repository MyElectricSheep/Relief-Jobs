// Conversion tables for ReliefWeb codes

const jobTypes = [
  {
    id: 266,
    name: "Volunteer Opportunity",
    reliefJobsName: "volunteer",
    className: "t_contrats-volontariat-service-civique",
    classNameAlternate: "t_contrats-benevolat"
  },
  {
    id: 265,
    name: "Internship",
    reliefJobsName: "internship",
    className: "t_contrats-stage-alternance",
    classNameAlternate: ""
  },
  {
    id: 264,
    name: "Consultancy",
    reliefJobsName: "consultancy",
    className: "",
    classNameAlternate: ""
  },
  {
    id: 263,
    name: "Job",
    reliefJobsName: "job",
    className: "t_contrats-cdd",
    classNameAlternate: "t_contrats-cdi"
  }
];

const careerTypes = [
  {
    id: 9999,
    name: "Other",
    reliefJobsName: "other",
    coordinationSudName: "Autre",
    coordinationSudAlternate: ""
  },
  {
    id: 36601,
    name: "Logistics/Procurement",
    reliefJobsName: "logistics_procurement",
    coordinationSudName: "Services et Logistique",
    coordinationSudAlternate: ""
  },
  {
    id: 20971,
    name: "Information Management",
    reliefJobsName: "information_management",
    coordinationSudName: "",
    coordinationSudAlternate: ""
  },
  {
    id: 20966,
    name: "Donor Relations/Grants Management",
    reliefJobsName: "donor_relations_grants_management",
    coordinationSudName: "Dons/collecte",
    coordinationSudAlternate: ""
  },
  {
    id: 6868,
    name: "Monitoring and Evaluation",
    reliefJobsName: "monitoring_evaluation",
    coordinationSudName: "",
    coordinationSudAlternate: ""
  },
  {
    id: 6867,
    name: "Program/Project Management",
    reliefJobsName: "program_project_management",
    coordinationSudName: "Gestion de projets/programmes",
    coordinationSudAlternate: ""
  },
  {
    id: 6866,
    name: "Information and Communications Technology",
    reliefJobsName: "information_communications_technology",
    coordinationSudName: "",
    coordinationSudAlternate: ""
  },
  {
    id: 6865,
    name: "Advocacy/Communications",
    reliefJobsName: "advocacy_communications",
    coordinationSudName: "Plaidoyer et Recherches",
    coordinationSudAlternate: "Communication"
  },
  {
    id: 6864,
    name: "Administration/Finance",
    reliefJobsName: "administration_finance",
    coordinationSudName: "Direction et administration",
    coordinationSudAlternate: "RH et Finances"
  },
  {
    id: 6863,
    name: "Human Resources",
    reliefJobsName: "human_resources",
    coordinationSudName: "RH et Finances",
    coordinationSudAlternate: "Direction et administration"
  },
  {
    id: 9991,
    name: "Training",
    reliefJobsName: "",
    coordinationSudName: "Formation",
    coordinationSudAlternate: ""
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
    coordinationSudName: "Autre"
  },
  {
    id: 12033,
    name: "Mine Action",
    reliefJobsName: "mine_action",
    coordinationSudName: ""
  },
  {
    id: 4604,
    name: "Water Sanitation Hygiene",
    reliefJobsName: "water_sanitation_hygiene",
    coordinationSudName: "Eau et assainissement"
  },
  {
    id: 4603,
    name: "Shelter and Non-Food Items",
    reliefJobsName: "shelter_NFI",
    coordinationSudName: ""
  },
  {
    id: 4602,
    name: "Safety and Security",
    reliefJobsName: "safety_security",
    coordinationSudName: ""
  },
  {
    id: 4601,
    name: "Recovery and Reconstruction",
    reliefJobsName: "recovery_reconstruction",
    coordinationSudName: ""
  },
  {
    id: 4600,
    name: "Protection and Human Rights",
    reliefJobsName: "protection_human_rights",
    coordinationSudName: "Droits humains"
  },
  {
    id: 4599,
    name: "Peacekeeping and Peacebuilding",
    reliefJobsName: "peacekeeping_peacebuilding",
    coordinationSudName: ""
  },
  {
    id: 4598,
    name: "Logistics and Telecommunications",
    reliefJobsName: "logistics_telecom",
    coordinationSudName: ""
  },
  {
    id: 4597,
    name: "Humanitarian Financing",
    reliefJobsName: "humanitarian_financing",
    coordinationSudName: ""
  },
  {
    id: 4596,
    name: "HIV/Aids",
    reliefJobsName: "HIV_aids",
    coordinationSudName: "Santé"
  },
  {
    id: 4595,
    name: "Health",
    reliefJobsName: "health",
    coordinationSudName: "Santé"
  },
  {
    id: 4594,
    name: "Gender",
    reliefJobsName: "gender",
    coordinationSudName: "Genre"
  },
  {
    id: 4593,
    name: "Food and Nutrition",
    reliefJobsName: "food_nutrition",
    coordinationSudName: "Alimentation / Nutrition"
  },
  {
    id: 4592,
    name: "Education",
    reliefJobsName: "education",
    coordinationSudName: "Education / Formation"
  },
  {
    id: 4591,
    name: "Disaster Management",
    reliefJobsName: "disaster_management",
    coordinationSudName: "Gestion crise / post-crise"
  },
  {
    id: 4590,
    name: "Coordination",
    reliefJobsName: "coordination",
    coordinationSudName: ""
  },
  {
    id: 4589,
    name: "Contributions",
    reliefJobsName: "contributions",
    coordinationSudName: ""
  },
  {
    id: 4588,
    name: "Climate Change and Environment",
    reliefJobsName: "climate_change_environment",
    coordinationSudName: "Environnement / Climat"
  },
  {
    id: 4587,
    name: "Agriculture",
    reliefJobsName: "agriculture",
    coordinationSudName: "Agriculture"
  },
  {
    id: 9991,
    name: "Migration",
    reliefJobsName: "migration",
    coordinationSudName: "Migration"
  },
  {
    id: 9992,
    name: "Economic Development",
    reliefJobsName: "economic_dev",
    coordinationSudName: "Développement économique et local"
  }
];

module.exports = {
  jobTypes,
  careerTypes,
  experienceTypes,
  organizationTypes,
  themeTypes
};
