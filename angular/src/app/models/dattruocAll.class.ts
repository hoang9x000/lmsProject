import { Dattruoc } from './dattruoc.class';

export class DattruocAll {
    Mathe: string;
    Hoten: string;
    public Dattruoc : Dattruoc[];
        constructor(
        Mathe: string,
        Hoten: string, ) {
        this.Mathe = Mathe;
        this.Hoten = Hoten;
    }
}
