
import NewProductsAccordion from "@/components/NewProductsAccordion";
import ExpertArticles from "@/components/ExpertArticles";
import PopularProducts from "@/components/PopularProducts";

const Index = () => {
  return (
    <div className="space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ПериферияПро</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ваш эксперт в мире компьютерной периферии. Обзоры, тесты и рекомендации лучших устройств для работы и игр.
        </p>
      </section>

      <NewProductsAccordion />
      <ExpertArticles />
      <PopularProducts />
    </div>
  );
};

export default Index;
