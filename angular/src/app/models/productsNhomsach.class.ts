export class Nhomsach {
    public Magiasach: string;
    public Manhomsach: string;
    public Soluong: number;
    public Soluongcon: number;
    public Tensach: string;
    public Giatien: string;
    public Anhbia: string;
    public Tacgia:string;
    constructor(
        Manhomsach: string,
        Soluong: number,
        Soluongcon: number,
        Tensach: string,
        Giatien: string,
        Anhbia: string,
        Tacgia:string,
        Magiasach : string
        ) {
        this.Manhomsach = Manhomsach;
        this.Soluong = Soluong;
        this.Soluongcon = Soluongcon;
        this.Tensach = Tensach;
        this.Giatien = Giatien;
        this.Anhbia = Anhbia;
        this.Tacgia = Tacgia;
        this.Magiasach = Manhomsach
    }
}