import BrandSlider from "@/components/Home/BrandCategory";
import ShopCategorySection from "@/components/Home/CategorySlider";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import HomeSlider from "@/components/Home/HomeSlider";
import NewArrivals from "@/components/Home/LastSection";

const Home = () => {
  return (
    <div>
      {/* Hero Banner */}
      <HomeSlider />

      {/* Categories */}
      <section className="w-full mx-auto px-4">
        <ShopCategorySection />
      </section>

      {/* Brand */}
      <section className="w-full mx-auto px-4">
        <BrandSlider />
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50">
        <div className="w-full mx-auto px-4">
          <FeaturedProducts />
        </div>
      </section>


      <section className="bg-gray-50">
        <div className="w-full mx-auto px-4">
          <NewArrivals />
        </div>
      </section>

    </div>
  );
};

export default Home;
