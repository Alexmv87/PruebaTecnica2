export interface Movie {
    _id?: string;
    Titulo: string;
    Sinopsis: string;
    Actores: string;
    Image: string;
    Categorias: string[];
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number
}