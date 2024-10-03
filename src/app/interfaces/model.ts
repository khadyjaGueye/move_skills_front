export interface Model<T> {
  data: T
}

export interface Data {
  message: string
  apprenants: Apprenant[]
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
export interface User {
  id: number
  name: string
  prenom: string
  email: string
  password: string
  role: string
  phone:number
  address:string
}

export interface UserAuth {
  token: string
  user: User
  status: boolean
}

export interface Parcour {
  id: number;
  nomFormation: string;
  objectif: string;
  audience: string;
  type: string;
  prix: number;
  duree: number;
  competence: string;
  video: string;
  document: string;
  article: string;
  lienExterne: string;
  challenge: string;
  citation: string;
  contenuExistant: string;
}


export interface Skill {
  id: number;
  name: string;
}

