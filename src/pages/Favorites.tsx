
import { useState, useEffect } from "react";
import { products } from "@/data/products";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { HeartOff } from "lucide-react";

const Favorites = () => {
  // Получаем избранные товары из localStorage
  const getInitialFavorites = (): number[] => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  };

  const [favoriteIds, setFavoriteIds] = useState<number[]>(getInitialFavorites);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  // Обновляем список избранных товаров при изменении IDs
  useEffect(() => {
    const filtered = products.filter(product => favoriteIds.includes(product.id));
    setFavoriteProducts(filtered);
    
    // Сохраняем в localStorage
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Обработка удаления из избранного
  const handleToggleFavorite = (id: number) => {
    setFavoriteIds(prev => prev.filter(itemId => itemId !== id));
  };

  // Очистка всего списка избранного
  const clearAllFavorites = () => {
    setFavoriteIds([]);
  };

  return (
    <div className="py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Избранные товары</h1>
        {favoriteProducts.length > 0 && (
          <Button 
            variant="outline" 
            onClick={clearAllFavorites}
            className="flex items-center gap-2"
          >
            <HeartOff size={16} />
            Очистить список
          </Button>
        )}
      </div>
      
      {favoriteProducts.length > 0 ? (
        <>
          <p className="text-muted-foreground">
            Вы добавили в избранное {favoriteProducts.length} {
              favoriteProducts.length === 1 ? 'товар' : 
              favoriteProducts.length < 5 ? 'товара' : 'товаров'
            }
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isFavorite={true} 
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <HeartOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">В избранном пока пусто</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Добавляйте понравившиеся товары в избранное, чтобы не потерять их
          </p>
          <Button 
            onClick={() => window.location.href = '/catalog'}
            className="px-6"
          >
            Перейти в каталог
          </Button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
