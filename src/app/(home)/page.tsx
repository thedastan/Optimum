import HomeComponents from "@/components/pages/home/HomeComponents";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
	title: "Asim_project",
	description: "Asim_project",
	url: "https://next-structure-seven.vercel.app/",
	image: "/asim.png",
});

const Home = () => <HomeComponents />;

export default Home;
