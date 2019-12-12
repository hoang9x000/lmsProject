import { Phieumuon } from './phieumuon.class';

export class PhieumuonAll {
    Hoten : string;
    Mathe : string;
    public Phieumuon : Phieumuon[];
    constructor(
        Mathe: string,
        Hoten: string, ) {
        this.Mathe = Mathe;
        this.Hoten = Hoten;
    }
}