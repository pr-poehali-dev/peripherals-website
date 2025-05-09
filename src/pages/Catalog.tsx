
import { useState, useEffect } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { toast } from "sonner";

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  
  // Загрузка избранных товаров из localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavoriteIds(JSON.parse(savedFavorites));
    }
  }, []);

  // Фильтрация товаров по категории и поисковому запросу
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Все" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Обработка добавления/удаления из избранного
  const handleToggleFavorite = (id: number) => {
    setFavoriteIds(prev => {
      // Если товар уже в избранном - удаляем
      if (prev.includes(id)) {
        toast.info("Товар удален из избранного");
        return prev.filter(itemId => itemId !== id);
      } 
      // Иначе добавляем
      else {
        toast.success("Товар добавлен в избранное");
        return [...prev, id];
      }
    });
  };

  // Сохранение в localStorage при изменении избранных товаров
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  return (
    <div className="py-6 space-y-8">
      <h1 className="text-3xl font-bold">Каталог товаров</h1>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Поиск товаров..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-64">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favoriteIds.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-xl text-muted-foreground">По вашему запросу ничего не найдено</p>
          <p className="mt-2">Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </div>
  );
};

export default Catalog;
