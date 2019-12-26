import { IModel } from './model';

export interface CategoryPlan extends IModel {
    name?: string;
    description?: string;
    type?: string;
    order?: string;
    productsplan?: any[];
}
