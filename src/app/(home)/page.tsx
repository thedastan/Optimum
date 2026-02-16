import HomeComponents from "@/components/pages/home/HomeComponents";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Optimum",
  description:
    "Кузовные запчасти для ведущих автомобильных марок: Toyota, Hyundai, Geely, Chery, KIA, Chevrolet и других. Надежное качество и широкий выбор для вашего авто!",
  url: "https://optimum-kg.vercel.app/",
  image: "/image.png",
});

const Home = () => <HomeComponents />;

export default Home;
