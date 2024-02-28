export interface ImageFile {
    id?: string;
    image?: string;
    lastModified: string;
    name?: string;
    size?: string;
    type?: string;
    webkitRelativePath?: string;
}

export interface PreviewImage {
    image?: string;
    id?: number;
    size:number;
    name?:string;
}
