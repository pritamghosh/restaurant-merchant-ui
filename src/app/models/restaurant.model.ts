export class Restaurant {
  name: string;
  menuGruop: MenuGroup[];
}

export class MenuGroup {
  category: string;
  menuList: Menu[];
}

export class Menu {
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
}
