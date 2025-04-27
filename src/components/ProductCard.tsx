
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  onToggleFavorite?: (id: number) => void;
  isFavorite?: boolean;
}

const ProductCard = ({ product, onToggleFavorite, isFavorite = false }: ProductCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleToggleFavorite = () => {
    setFavorite(!favorite);
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
        />
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            size={18}
            className={favorite ? "fill-red-500 text-red-500" : "text-gray-500"}
          />
        </button>
      </div>
      <CardContent className="flex-grow p-4">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-500">
              {i < Math.floor(product.rating) ? "★" : "☆"}
            </span>
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating.toFixed(1)})</span>
        </div>
        <div className="text-sm text-primary font-medium mb-2">{product.category}</div>
        <h3 className="font-medium mb-2 line-clamp-2">{product.name}</h3>
        <div className="text-lg font-bold">{product.price.toLocaleString()} ₽</div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
