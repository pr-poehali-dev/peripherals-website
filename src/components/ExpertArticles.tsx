
import { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  publishDate: string;
  imageUrl: string;
};

const articles: Article[] = [
  {
    id: "1",
    title: "Как выбрать механическую клавиатуру в 2025 году",
    excerpt: "Обзор современных переключателей, материалов и технологий, которые следует учитывать при выборе механической клавиатуры.",
    authorName: "Алексей Иванов",
    authorRole: "Главный редактор",
    publishDate: "21 апреля 2025",
    imageUrl: "https://images.unsplash.com/photo-1595044426077-d36d9234d9fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    title: "Топ-5 геймерских мышей для киберспорта",
    excerpt: "Какие мыши выбирают профессиональные киберспортсмены и почему эти модели стоят своих денег.",
    authorName: "Мария Петрова",
    authorRole: "Эксперт по периферии",
    publishDate: "18 апреля 2025",
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    title: "Всё, что нужно знать о мониторах с частотой 500 Гц",
    excerpt: "Реальные преимущества новых сверхбыстрых мониторов и стоит ли обновлять свою систему ради них.",
    authorName: "Дмитрий Соколов",
    authorRole: "Технический обозреватель",
    publishDate: "15 апреля 2025",
    imageUrl: "https://images.unsplash.com/photo-1602632905136-76ca78b8702d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    title: "Беспроводные наушники для работы и игр",
    excerpt: "Сравнение лучших моделей 2025 года по соотношению цена-качество с фокусом на комфорт и звук.",
    authorName: "Ольга Власова",
    authorRole: "Аудиоэксперт",
    publishDate: "12 апреля 2025",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
];

const ExpertArticles = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      return () => scrollContainer.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth / 2 : clientWidth / 2,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full mb-12 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Статьи экспертов</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('left')} 
            disabled={!canScrollLeft}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('right')} 
            disabled={!canScrollRight}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {articles.map((article) => (
          <Card key={article.id} className="flex-shrink-0 w-full md:w-[350px] hover:shadow-md transition-shadow">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="line-clamp-2 mt-2">{article.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <User className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{article.authorName}</p>
                  <p className="text-xs text-muted-foreground">{article.authorRole} • {article.publishDate}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExpertArticles;
