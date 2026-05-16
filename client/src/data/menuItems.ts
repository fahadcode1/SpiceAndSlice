import pizza from "./images/margheritapizza.jpg"
import pannerButterMasala from "./images/paneerbuttermasala.jpg"
import chickenBiryani from "./images/chickenbiryani.jpg"
import vegburger from "./images/vegburger.jpg"
import chickenburger from "./images/chickenburger.jpg"
import masaladosa from "./images/masaladosa.jpg"
import iIdlisambar from "./images/iIdlisambar.jpg"
import butterchicken from "./images/butterchicken.jpg"
import vegfriedrice from "./images/vegfriedrice.jpg"
import chickenfriedrice from "./images/chickenfriedrice.jpg"
import hakkanoodles from "./images/hakkanoodles.jpg"
import chickennoodles from "./images/chickennoodles.jpg"
import tandoorichicken from "./images/tandoorichicken.jpg"
import palakpaneer from "./images/palakpaneer.jpg"
import cholebhature from "./images/cholebhature.jpg"

export interface FoodItem {
  id: number;
  title: string;
  description: string;
  featured: boolean;
  photo: string;
  type: any;
  price: number;
  offers: object;
  addToCart: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}
const myfoodmenu : FoodItem[] = [
  {
    id: 1,
    title: "Margherita Pizza",
    description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
    featured: true,
    photo: pizza,
    type: "veg",
    price: 249,
    offers: {},
    addToCart: false
  },
  {
    id: 2,
    title: "Paneer Butter Masala",
    description: "Rich and creamy paneer curry cooked in tomato gravy.",
    featured: true,
    photo: pannerButterMasala,
    type: "veg",
    price: 199,
    offers: {},
    addToCart: false
  },
  {
    id: 3,
    title: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with spicy chicken.",
    featured: true,
    photo: chickenBiryani,
    type: "nonveg",
    price: 599,
    offers: {},
    addToCart: false
  },
  {
    id: 4,
    title: "Veg Burger",
    description: "Crispy vegetable patty with lettuce and sauces.",
    featured: false,
    photo: vegburger,
    type: "veg",
    price: 149,
    offers: {},
    addToCart: false
  },
  {
    id: 5,
    title: "Chicken Burger",
    description: "Juicy chicken patty with cheese and mayo.",
    featured: false,
    photo: chickenburger,
    type: "nonveg",
    price: 179,
    offers: {},
    addToCart: false
  },
  {
    id: 6,
    title: "Masala Dosa",
    description: "Crispy dosa filled with spiced potato filling.",
    featured: true,
    photo: masaladosa,
    type: "veg",
    price: 120,
    offers: {},
    addToCart: false
  },
  {
    id: 7,
    title: "Idli Sambar",
    description: "Soft idlis served with sambar and chutney.",
    featured: false,
    photo: iIdlisambar,
    type: "veg",
    price: 90,
    offers: {},
    addToCart: false
  },
  {
    id: 8,
    title: "Butter Chicken",
    description: "Tender chicken cooked in buttery tomato gravy.",
    featured: true,
    photo: butterchicken,
    type: "nonveg",
    price: 320,
    offers: {},
    addToCart: false
  },
  {
    id: 9,
    title: "Veg Fried Rice",
    description: "Stir-fried rice with fresh vegetables.",
    featured: false,
    photo: vegfriedrice,
    type: "veg",
    price: 140,
    offers: {},
    addToCart: false
  },
  {
    id: 10,
    title: "Chicken Fried Rice",
    description: "Rice stir-fried with chicken and sauces.",
    featured: false,
    photo: chickenfriedrice,
    type: "nonveg",
    price: 180,
    offers: {},
    addToCart: false
  },
  {
    id: 11,
    title: "Hakka Noodles",
    description: "Classic Chinese-style noodles with vegetables.",
    featured: false,
    photo: hakkanoodles,
    type: "veg",
    price: 130,
    offers: {},
    addToCart: false
  },
  {
    id: 12,
    title: "Chicken Noodles",
    description: "Noodles tossed with chicken and spices.",
    featured: false,
    photo: chickennoodles,
    type: "nonveg",
    price: 170,
    offers: {},
    addToCart: false
  },
  {
    id: 13,
    title: "Tandoori Chicken",
    description: "Chicken marinated in spices and grilled.",
    featured: true,
    photo: tandoorichicken,
    type: "nonveg",
    price: 350,
    offers: {},
    addToCart: false
  },
  {
    id: 14,
    title: "Palak Paneer",
    description: "Paneer cubes in spinach gravy.",
    featured: false,
    photo: palakpaneer,
    type: "veg",
    price: 180,
    offers: {},
    addToCart: false
  },
  {
    id: 15,
    title: "Chole Bhature",
    description: "Spicy chickpeas served with fried bread.",
    featured: true,
    photo: cholebhature,
    type: "veg",
    price: 150,
    offers: {},
    addToCart: false
  },
  {
    id: 16,
    title: "Pav Bhaji",
    description: "Mashed vegetable curry with buttered pav.",
    featured: false,
    photo: {},
    type: "veg",
    price: 130,
    offers: {},
    addToCart: false
  },
  {
    id: 17,
    title: "Fish Curry",
    description: "Spicy fish curry cooked in traditional style.",
    featured: false,
    photo: {},
    type: "nonveg",
    price: 280,
    offers: {},
    addToCart: false
  },
  {
    id: 18,
    title: "Egg Curry",
    description: "Boiled eggs cooked in masala gravy.",
    featured: false,
    photo: {},
    type: "egg",
    price: 160,
    offers: {},
    addToCart: false
  },
  {
    id: 19,
    title: "French Fries",
    description: "Crispy deep-fried potato fries.",
    featured: false,
    photo: {},
    type: "veg",
    price: 100,
    offers: {},
    addToCart: false
  },
  {
    id: 20,
    title: "Cheese Sandwich",
    description: "Grilled sandwich with melted cheese.",
    featured: false,
    photo: {},
    type: "veg",
    price: 120,
    offers: {},
    addToCart: false
  },
  {
    id: 21,
    title: "Chicken Sandwich",
    description: "Grilled sandwich with chicken filling.",
    featured: false,
    photo: {},
    type: "nonveg",
    price: 150,
    offers: {},
    addToCart: false
  },
  {
    id: 22,
    title: "Mutton Curry",
    description: "Slow-cooked mutton in spicy gravy.",
    featured: true,
    photo: {},
    type: "nonveg",
    price: 400,
    offers: {},
    addToCart: false
  },
  {
    id: 23,
    title: "Veg Manchurian",
    description: "Fried vegetable balls in tangy sauce.",
    featured: false,
    photo: {},
    type: "veg",
    price: 160,
    offers: {},
    addToCart: false
  },
  {
    id: 24,
    title: "Chicken Manchurian",
    description: "Chicken balls tossed in spicy sauce.",
    featured: false,
    photo: {},
    type: "nonveg",
    price: 200,
    offers: {},
    addToCart: false
  },
  {
    id: 25,
    title: "Spring Rolls",
    description: "Crispy rolls stuffed with vegetables.",
    featured: false,
    photo: {},
    type: "veg",
    price: 140,
    offers: {},
    addToCart: false
  },
  {
    id: 26,
    title: "Chocolate Shake",
    description: "Cold shake with rich chocolate flavor.",
    featured: true,
    photo: {},
    type: "beverage",
    price: 120,
    offers: {},
    addToCart: false
  },
  {
    id: 27,
    title: "Cold Coffee",
    description: "Chilled coffee with milk and ice cream.",
    featured: false,
    photo: {},
    type: "beverage",
    price: 130,
    offers: {},
    addToCart: false
  },
  {
    id: 28,
    title: "Ice Cream Sundae",
    description: "Ice cream topped with chocolate syrup.",
    featured: true,
    photo: {},
    type: "dessert",
    price: 110,
    offers: {},
    addToCart: false
  },
  {
    id: 29,
    title: "Gulab Jamun",
    description: "Soft milk balls soaked in sugar syrup.",
    featured: false,
    photo: {},
    type: "dessert",
    price: 90,
    offers: {},
    addToCart: false
  },
  {
    id: 30,
    title: "Rasmalai",
    description: "Soft paneer dumplings in sweet milk.",
    featured: false,
    photo: {},
    type: "dessert",
    price: 100,
    offers: {},
    addToCart: false
  }
];

export default myfoodmenu;