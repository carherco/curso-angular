import { Address } from "app/address";

export class Hero {

  constructor(
    public id: number,
    public name: string,
    public power?: string,
    public alterEgo?: string,
    public isSecret?: boolean,
    public emotion?: 'happy'|'sad'|'confused'|'',
    public phone?: string,
    public email?: string,
    public addresses?: Address[]
  ) { }
}
