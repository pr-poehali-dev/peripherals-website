
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  discount?: number;
  rating: number;
  imageUrl: string;
};

const products: Product[] = [
  {
    id: "1",
    title: "Игровая мышь Razer DeathAdder V3 Pro",
    category: "Мыши",
    price: 8990,
    discount: 10,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    title: "Клавиатура Keychron Q1 Pro",
    category: "Клавиатуры",
    price: 14990,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    title: "Наушники HyperX Cloud Alpha",
    category: "Наушники",
    price: 7990,
    discount: 15,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    title: "Монитор ASUS ROG Swift 360Hz",
    category: "Мониторы",
    price: 49990,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1616758561473-7c9ca9f27975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "5",
    title: "Коврик для мыши SteelSeries QcK Edge XL",
    category: "Аксессуары",
    price: 2990,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
];

const PopularProducts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Бесконечная прокрутка
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 20) {
        // Когда доходим до конца, добавляем те же товары еще раз
        const additionalProducts = [...products, ...products, ...products];
        setInfiniteProducts(prev => [...prev, ...additionalProducts]);
      }
    };

    container.addEventListener('scroll', scroll);
    return () => container.removeEventListener('scroll', scroll);
  }, []);

  const [infiniteProducts, setInfiniteProducts] = useState<Product[]>([...products, ...products, ...products]);

  // Обработчики для перетаскивания
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div className="w-full mb-12">
      <h2 className="text-2xl font-bold mb-4">Популярные товары</h2>
      
      <div 
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 cursor-grab"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {infiniteProducts.map((product, idx) => (
          <Card 
            key={`${product.id}-${idx}`} 
            className="flex-shrink-0 w-60 hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white"
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart className={`h-4 w-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
              {product.discount && (
                <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>
              )}
            </div>
            <CardHeader className="p-3">
              <Badge variant="outline" className="w-fit">{product.category}</Badge>
              <CardTitle className="text-sm mt-2 line-clamp-2">{product.title}</CardTitle>
            </CardHeader>
            <CardFooter className="p-3 pt-0 flex justify-between items-center">
              <div>
                {product.discount ? (
                  <div className="flex flex-col">
                    <span className="text-sm line-through text-muted-foreground">
                      {product.price.toLocaleString()} ₽
                    </span>
                    <span className="font-bold text-red-500">
                      {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()} ₽
                    </span>
                  </div>
                ) : (
                  <span className="font-bold">{product.price.toLocaleString()} ₽</span>
                )}
              </div>
              <div className="flex items-center text-amber-500">
                <span>★</span>
                <span className="ml-1 text-sm">{product.rating}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
