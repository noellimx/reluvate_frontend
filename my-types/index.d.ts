declare module "reluvate" {
  export type Token = string | null;

  export interface Pokemon {
    id: string
    pokename: string
    trainer: string | null
  }
}
