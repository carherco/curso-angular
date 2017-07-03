export class Hero {
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string,
    public isSecret?: boolean,
    public phone?: string,
    public email?: string
  ) {  }
}
