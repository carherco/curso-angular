import { Address } from "./address";

export class User {
  constructor(
    public id: number,
    public name: string,
    public username: string,
    public email: string,
    public address: Address
  ){}
}
