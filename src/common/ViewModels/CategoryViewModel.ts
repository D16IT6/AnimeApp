class CategoryViewModel {
    id: number;
    name: string;
    selected: boolean;
    sortOrder:number;
    constructor(id: number, name: string, selected: boolean = false,sortOrder:number = 0) {
        this.id = id;
        this.name = name;
        this.selected = selected;
        this.sortOrder = sortOrder;
    }
}

export{CategoryViewModel}