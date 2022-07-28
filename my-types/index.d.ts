declare module "reluvate" {
  export type Token = string | null;

  export interface Pokemon {
    id: number;
    pokename: string;
    trainer: string | null;
  }
}
