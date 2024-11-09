import Analytics from "@/containers/home-page/Analytics";
import ControlOrders from "@/containers/home-page/Control-Orders";
import Footer from "@/containers/home-page/footer";
import HelpsRestaurants from "@/containers/home-page/Helps-Restaurants";
import Hero from "@/containers/home-page/Hero";
import Pricing from "@/containers/home-page/Pricing";
import SmarterOrdering from "@/containers/home-page/Smarter-Ordering";

export default function Home() {
  return (
    <main className="font-Rethink">
      <Hero />
      <HelpsRestaurants />
      <SmarterOrdering />
      <ControlOrders />
      <Analytics />
      <Pricing />
      <Footer />
    </main>
  );
}
