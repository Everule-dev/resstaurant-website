import { Heart, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { getPopularItems } from "@/data/menuData";

const Favorites = () => {
  const { addItem } = useCart();
  // Mock favorites - in a real app, this would come from user data
  const favorites = getPopularItems().slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Favorites</h1>
        <p className="text-muted-foreground">Your saved favorite items</p>
      </div>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">
              Start adding items to your favorites for quick access
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Browse Menu
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <Card key={item.id} className="food-card group">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h4 className="font-display font-bold">{item.name}</h4>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-primary font-bold">
                    ${item.price.toFixed(2)}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => addItem(item)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
