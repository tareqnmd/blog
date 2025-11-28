import BlogsSection from './BlogsSection';
import CategoriesSection from './CategoriesSection';
import FeaturedSection from './FeaturedSection';
import HeroSection from './HeroSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <BlogsSection />
    </div>
  );
};

export default Home;
