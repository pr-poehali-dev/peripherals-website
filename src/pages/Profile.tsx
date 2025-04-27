
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

const Profile = () => {
  // В реальном приложении эти данные будут приходить с бэкенда
  const user = {
    id: "USER-2025-04-27",
    name: "Иванов Иван Иванович",
    email: "ivan@example.com",
    role: "Пользователь",
    rating: 4.7,
    registrationDate: "15.02.2024",
    avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60"
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>
      
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Левая колонка с аватаром */}
        <div className="flex flex-col items-center">
          <Avatar className="w-48 h-48 mb-4">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-3xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <Badge variant="outline" className="py-1.5 px-3 text-sm mb-2">
            {user.role}
          </Badge>
          
          <div className="flex items-center gap-1 mb-6">
            <span className="font-medium text-lg">{user.rating}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={16} 
                  className={`${star <= Math.round(user.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`} 
                />
              ))}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            Уникальный ID:
            <div className="font-mono bg-muted p-2 rounded-md mt-1 select-all">
              {user.id}
            </div>
          </div>
        </div>
        
        {/* Правая колонка с информацией */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Персональные данные</CardTitle>
              <CardDescription>Ваша персональная информация на платформе ПериферияПро</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">ФИО</div>
                <div className="font-medium">{user.name}</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Дата регистрации</div>
                <div className="font-medium">{user.registrationDate}</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Статус покупателя</div>
                <div className="font-medium">
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    Стандарт
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Отзывы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">Вы еще не оставили отзывов</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Заказы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">История заказов пуста</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
