
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
};

const newProducts: Product[] = [
  {
    id: "1",
    title: "Механическая клавиатура Corsair K70 RGB",
    description: "Премиальная механическая клавиатура с переключателями Cherry MX и полной RGB-подсветкой",
    category: "Клавиатуры",
    price: 12990,
    imageUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    title: "Игровая мышь Logitech G Pro X Superlight",
    description: "Сверхлегкая беспроводная мышь для профессиональных геймеров",
    category: "Мыши",
    price: 9990,
    imageUrl: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    title: "Аудиогарнитура SteelSeries Arctis Nova Pro",
    description: "Премиальная игровая гарнитура с активным шумоподавлением и высококачественным звуком",
    category: "Наушники",
    price: 18990,
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
];

const NewProductsAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full mb-12">
      <AccordionItem value="new-products">
        <AccordionTrigger className="text-xl font-bold">
          Новинки компьютерной периферии
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {newProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">{product.category}</Badge>
                    <Badge variant="outline" className="text-purple-600 bg-purple-50">Новинка</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{product.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="font-bold text-lg">{product.price.toLocaleString()} ₽</span>
                  <Badge variant="default" className="cursor-pointer hover:bg-primary/90">Подробнее</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NewProductsAccordion;
