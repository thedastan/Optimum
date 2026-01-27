import HomeComponents from "@/components/pages/home/HomeComponents";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Optimum",
  description: "Optimum",
  url: "https://next-structure-seven.vercel.app/",
  image: "/image.png",
});

const Home = () => <HomeComponents />;

export default Home;
