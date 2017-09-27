interface ICategory {
    id: number;
    name: string;
    facilities: Array<IFacility>;
    subcategories: Array<ICategory>;
}

interface IFacility {
    model: string;
    description: string;
}