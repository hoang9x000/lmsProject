export class Phieumuon {
    Mathe: string;
    Masach: string;
    Ngaymuon: string;
    Ngayhethan: Date;
    Giahan: boolean;
    Datra: boolean;
    Tensach: string;
    constructor(
        Mathe: string,
        Masach: string,
        Ngaymuon: string,
        Ngayhethan: Date,
        Giahan: boolean,
        Datra: boolean,
        Tensach: string,
    ) {
        this.Mathe = Mathe;
        this.Masach = Masach;
        this.Ngaymuon = Ngaymuon;
        this.Ngayhethan = Ngayhethan;
        this.Giahan = Giahan;
        this.Datra = Datra;
        this.Tensach = Tensach
    }
}