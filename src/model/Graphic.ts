class Graphic {
    mainstringrows: string[];
    centered: boolean;
    marqueespeed: number;

    constructor(mainstringrows: string[], centered: boolean, marqueespeed = 0) {
        this.mainstringrows = mainstringrows;
        this.centered = centered;
        this.marqueespeed = marqueespeed;
    }
}

export default Graphic;
