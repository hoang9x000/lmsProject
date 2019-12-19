export class Products{
    public Manhomsach : string ;
    public Soluong : number;
    public Soluongcon : number;
    public Tensach : string;
    public Giatien : string;
    public AnhPath : string;
    constructor (
        Manhomsach : string,
        Soluong : number,
        Soluongcon : number,
        Tensach : string,
        Giatien : string,
        AnhPath : string)
        {
        this.Manhomsach = Manhomsach;
        this.Soluong = Soluong;
        this.Soluongcon =Soluongcon;
        this.Tensach = Tensach;
        this.Giatien = Giatien;
        this.AnhPath = AnhPath;
    }
}