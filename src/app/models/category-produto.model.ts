import { IModel } from './model';

export interface CategoryProduto extends IModel {
    name?: string;
    description?: string;
    type?: string;
    order?: string;
    image?: string;
    imagePrincipal?: string;
    fileImage?: string;
    products?: any[];
}
