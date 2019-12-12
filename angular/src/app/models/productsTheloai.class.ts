import {Nhomsach} from './productsNhomsach.class'
export class Products {
    public Matheloai: string;
    public Tentheloai: string;
    // public Manhomsach: string;
    // public Soluong: number;
    // public Soluongcon: number;
    // public Tensach: string;
    // public Giatien: string;
    // public Anhbia: string;
    public Nhomsach : Nhomsach[]
    constructor(
        Matheloai: string,
        Tentheloai: string,
        // Manhomsach: string,
        // Soluong: number,
        // Soluongcon: number,
        // Tensach: string,
        // Giatien: string,
        // Anhbia: string
        ) {
        this.Matheloai = Matheloai;
        this.Tentheloai = Tentheloai;
        // this.Manhomsach = Manhomsach;
        // this.Soluong = Soluong;
        // this.Soluongcon = Soluongcon;
        // this.Tensach = Tensach;
        // this.Giatien = Giatien;
        // this.Anhbia = Anhbia;
    }
}