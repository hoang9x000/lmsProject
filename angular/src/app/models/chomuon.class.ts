export class Chomuon {
    public Mathe: string;
    public Masach: string;
    public Ngaymuon: Date;
    public Ngayhethan: Date;
    public Giahan: boolean;
    public Datra: boolean;
    public Hoten: string;
    public Tensach: string;
    
    constructor(
        Mathe: string,
        Masach: string,
        Ngaymuon: Date,
        Ngayhethan: Date,
        Giahan: boolean,
        Datra: boolean,
        Hoten: string,
        Tensach: string,
        ) {
            this.Mathe = Mathe;
            this.Masach = Masach;
            this.Ngaymuon = Ngaymuon;
            this.Ngayhethan = Ngayhethan;
            this.Giahan = Giahan;
            this.Datra = Datra;
            this.Hoten = Hoten;
            this.Tensach = Tensach;
    }
}