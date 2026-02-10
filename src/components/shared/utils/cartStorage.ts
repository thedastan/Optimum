export interface ICartItem {
  id: number;
  product_name: string;
  price: number;
  discount?: number;
  slug: string;
  article: string;
  images: { image: string }[];
  quantity: number;
}

const CART_KEY = "cart";

/* получить корзину */
export const getCart = (): ICartItem[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

/* сохранить */
export const saveCart = (cart: ICartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

/* добавить товар */
export const addToCart = (product: ICartItem) => {
  const cart = getCart();
  const exist = cart.find((el) => el.id === product.id);

  if (exist) {
    exist.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
};

/* удалить */
export const removeFromCart = (id: number) => {
  saveCart(getCart().filter((el) => el.id !== id));
};

/* изменить количество */
export const updateQuantity = (id: number, quantity: number) => {
  const cart = getCart().map((el) => (el.id === id ? { ...el, quantity } : el));

  saveCart(cart);
};
