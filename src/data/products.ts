export type Product = {
  id: string;
  name: string;
  image: string; // path starting with "/" relative to public/
  price: number;
  description: string;
  tags: string[];
  showOnHomepage?: boolean;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Fried Chicken Loco Moco',
    image: '/Images/ProductImg_FriedChickenLocoMoco.webp',
    price: 19.95,
    description: 'Juicy fried chicken on rice with gravy — a must-try Hawaiian favorite',
    tags: ['Chicken', 'Loco Moco', 'Sauce'],
    showOnHomepage: true,
  },
  {
    id: '2',
    name: 'Fish & Chips',
    image: '/Images/ProductImg_FishAndChips.webp',
    price: 17.95,
    description: 'Crispy fish and golden fries, hot and fresh — a Honolulu classic...',
    tags: ['Fish', 'Fries'],
    showOnHomepage: true,
  },
  {
    id: '3',
    name: 'Loaded Fries',
    image: '/Images/ProductImg_LoadedFries.webp',
    price: 12.95,
    description: 'Golden fries with cheese, bacon, and our signature Hawaiian-flavored sauces',
    tags: ['Cheese', 'Bacon', 'Sauce'],
    showOnHomepage: true,
  },
  {
    id: '4',
    name: 'Chicken Sandwich',
    image: '/Images/ProductImg_ChickenSandwich.webp',
    price: 17.95,
    description: 'Freshly fried chicken, lettuce, and our Hawaiian-flavored sauce on a soft bun',
    tags: ['Chicken', 'Soft Bun', 'Sauce'],
    showOnHomepage: true,
  },
];
