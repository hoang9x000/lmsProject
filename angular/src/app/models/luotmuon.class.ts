export class Luotmuon{
    public Mathe: string;
    public Masach: string;
    public Ngaytra: Date;
    public Ngaymuon: Date;
    public Ngayhethan: Date;
    public Tinhtrangsachluctra: boolean;
    public Tienphat: number;
    public Hoten: string;
    public Tensach: string;

    constructor(
        Mathe: string,
        Masach: string,
        Ngaytra: Date,
        Ngaymuon: Date,
        Ngayhethan: Date,
        Tinhtrangsachluctra: boolean,
        Tienphat: number,
        Hoten: string,
        Tensach: string,
    ) {
        this.Mathe = Mathe;
        this.Masach = Masach;
        this.Ngaytra = Ngaytra;
        this.Ngaymuon = Ngaymuon;
        this.Ngayhethan = Ngayhethan;
        this.Tinhtrangsachluctra = Tinhtrangsachluctra;
        this.Tienphat = Tienphat;
        this.Hoten = Hoten;
        this.Tensach = Tensach;
    }
}