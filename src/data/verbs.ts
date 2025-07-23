export interface DutchVerb {
  infinitive: string;
  perfectum: string;
  imperfectum: string[];
}

export const dutchVerbs: DutchVerb[] = [
  {
    infinitive: "bellen",
    perfectum: "heb gebeld",
    imperfectum: ["belde", "belden"]
  },
  {
    infinitive: "zetten",
    perfectum: "heb gezet",
    imperfectum: ["zette", "zetten"]
  },
  {
    infinitive: "zeggen",
    perfectum: "heb gezegd",
    imperfectum: ["zei", "zeiden"]
  },
  {
    infinitive: "werken",
    perfectum: "heb gewerkt",
    imperfectum: ["werkte", "werkten"]
  },
  {
    infinitive: "zijn",
    perfectum: "ben geweest",
    imperfectum: ["was", "waren"]
  },
  {
    infinitive: "willen",
    perfectum: "heb gewild",
    imperfectum: ["wilde", "wilden"]
  },
  {
    infinitive: "lezen",
    perfectum: "heb gelezen",
    imperfectum: ["las", "lazen"]
  },
  {
    infinitive: "doen",
    perfectum: "heb gedaan",
    imperfectum: ["deed", "deden"]
  },
  {
    infinitive: "hebben",
    perfectum: "heb gehad",
    imperfectum: ["had", "hadden"]
  }
];