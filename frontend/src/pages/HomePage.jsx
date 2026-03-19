import {
  CategoriesSection,
  CollectionsSection,
  CuisinesSection,
  IntroSection,
  PromoSection,
  StoresSection,
} from "../components/HomeSections";

function HomePage() {
  return (
    <main className="foodclick-page">
      <IntroSection />
      <PromoSection />
      <CategoriesSection />
      <StoresSection />
      <CuisinesSection />
      <CollectionsSection />
    </main>
  );
}

export default HomePage;
