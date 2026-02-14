import { PRIVATE_API } from "@/api/interceptors";
import { IOrder } from "../models/order.model";

class OrderService {
  async getOrders(): Promise<IOrder[]> {
    const { data } = await PRIVATE_API.get("/orders/");
    return data;
  }
}

export default new OrderService();
