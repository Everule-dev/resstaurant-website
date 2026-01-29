import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { categories, menuItems, getMenuItemsByCategory, searchMenuItems } from "@/data/menuData";
import { cn } from "@/lib/utils";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();

  const getDisplayedItems = () => {
    if (searchQuery) {
      return searchMenuItems(searchQuery);
    }
    if (selectedCategory) {
      return getMenuItemsByCategory(selectedCategory);
    }
    return menuItems;
  };

  const displayedItems = getDisplayedItems();

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-primary font-medium">Explore Our</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold mt-2">
            Delicious Menu
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From appetizing starters to indulgent desserts, discover a world of
            flavors crafted with passion and the finest ingredients
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dishes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCategory(null);
              }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Button
            variant={selectedCategory === null && !searchQuery ? "default" : "outline"}
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery("");
            }}
            className={cn(
              selectedCategory === null && !searchQuery && "bg-primary hover:bg-primary/90"
            )}
          >
            All Items
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(category.id);
                setSearchQuery("");
              }}
              className={cn(
                selectedCategory === category.id && "bg-primary hover:bg-primary/90"
              )}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Grid */}
        {displayedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No items found. Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedItems.map((item) => (
              <Card key={item.id} className="food-card group">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.isPopular && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Popular
                    </span>
                  )}
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-muted-foreground font-semibold">
                        Currently Unavailable
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display font-bold text-lg">{item.name}</h4>
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground shrink-0">
                      {categories.find((c) => c.id === item.category)?.name}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-primary font-bold text-lg">
                      ${item.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => addItem(item)}
                      disabled={!item.isAvailable}
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
    </div>
  );
};

export default Menu;
