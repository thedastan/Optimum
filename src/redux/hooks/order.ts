import { useQuery } from "@tanstack/react-query";
import OrderService from "../services/order.service";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => OrderService.getOrders(),
  });
};
