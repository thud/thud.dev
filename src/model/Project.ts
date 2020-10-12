export class Project {
    title: string;
    fontfam: string;
    fontw: string;
    fontsz: number;
    bgimgop: number;
    bgimgurl: string;
    linkurl: string;

    constructor(title, fontfam, fontw, fontsz, bgimgop, bgimgurl, linkurl) {
        this.title = title;
        this.fontfam = fontfam;
        this.fontw = fontw;
        this.fontsz = fontsz;
        this.bgimgop = bgimgop;
        this.bgimgurl = bgimgurl;
        this.linkurl = linkurl;
    }
}

export default Project;
