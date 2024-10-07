export interface Model<T> {
  data: T
}
export interface Data {
  userInfo: UserInfo
  message: string
  apprenants: Apprenant[]
  videos: ContentItem[]
  documents: ContentItem[]
  token: string
  status_code: number
}

export interface ContentItem {
  name: string;
  url: string;
  type: string;
}

export interface Apprenant {
  id: number
  nom: string
  prenom: string

}

export interface Answer {
  text: string;
  points: number;
  color: string;
}

export interface Question {
  text: string;
  answers: Answer[];
}
export interface Scores {
  red: number;
  green: number;
  blue: number;
  yellow: number;
}
export interface UserInfo {
  id: number
  name: string
  prenom: string
  email: string
  password: string
  role: string
  phoneNumber: number
  address: string
}

export interface UserAuth {
  token: string
  user: UserInfo
  status: boolean
}

export interface Parcour {
  id: number;
  nom_parcour: string;
  objectif: string;
  type: string;
  prix: number;
  duree: number;
  competences: Competences[];
  videos: Document[];
  documents: Document[];
  status_type:number
  status_audiance:string
}
export interface Competences{
  id:number
  nom:string
}


export interface Skill {
  id: number;
  name: string;
}

export interface InfoData {
  nom: string;
  objectif: string;
  type: string;
  audience: string;
  duree: string;
  competences: string[];
}

export interface ContentData {
  video: File[] | null;
  document: File[] | null;
}

export interface SummaryData {
  confirmation: boolean;
}

// Définir l'interface complète du formulaire
export interface FormDataT {
  info: InfoData;
  content: ContentData;
  summary: SummaryData;
}

export interface Document {
  name: string;
  url: string;
  type: string;
}

export interface VideoFile extends File {
  id: number; // Ajoute des propriétés supplémentaires si nécessaire
  name: string; // Nom de la vidéo
  url: string; // URL ou chemin vers la vidéo
}

export interface MyDocument {
  id: number;
  name: string;
  url: string;
}

