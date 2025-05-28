import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Filter, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Quality Picks</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
                All Products
              </Link>
              <Link href="/categories/electronics" className="text-sm font-medium transition-colors hover:text-primary">
                Electronics
              </Link>
              <Link href="/categories/fashion" className="text-sm font-medium transition-colors hover:text-primary">
                Fashion
              </Link>
              <Link href="/categories/home" className="text-sm font-medium transition-colors hover:text-primary">
                Home & Kitchen
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                3
              </span>
            </Link>
            <Link href="/account">
              <Button variant="ghost" size="sm">
                Account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
              <p className="text-muted-foreground">Browse our collection of quality products.</p>
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Category
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>All Categories</DropdownMenuItem>
                    <DropdownMenuItem>Electronics</DropdownMenuItem>
                    <DropdownMenuItem>Fashion</DropdownMenuItem>
                    <DropdownMenuItem>Home & Kitchen</DropdownMenuItem>
                    <DropdownMenuItem>Beauty & Personal Care</DropdownMenuItem>
                    <DropdownMenuItem>Sports & Outdoors</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Price Range
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>All Prices</DropdownMenuItem>
                    <DropdownMenuItem>Under $25</DropdownMenuItem>
                    <DropdownMenuItem>$25 to $50</DropdownMenuItem>
                    <DropdownMenuItem>$50 to $100</DropdownMenuItem>
                    <DropdownMenuItem>$100 to $200</DropdownMenuItem>
                    <DropdownMenuItem>Over $200</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Rating
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>All Ratings</DropdownMenuItem>
                    <DropdownMenuItem>4 Stars & Up</DropdownMenuItem>
                    <DropdownMenuItem>3 Stars & Up</DropdownMenuItem>
                    <DropdownMenuItem>2 Stars & Up</DropdownMenuItem>
                    <DropdownMenuItem>1 Star & Up</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="group">
                  <Card className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="aspect-square relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      {product.badge && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-0.5 text-xs font-medium rounded">
                          {product.badge}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {Array(5)
                            .fill(null)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                      <div>
                        <span className="font-bold">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button size="sm" variant="secondary">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span className="sr-only">Previous</span>
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  4
                </Button>
                <Button variant="outline" size="sm">
                  5
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 Quality Picks. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data
const products = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones",
    price: 249.99,
    rating: 5,
    reviews: 128,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Premium Coffee Maker",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4,
    reviews: 86,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    price: 199.99,
    rating: 4,
    reviews: 42,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    rating: 5,
    reviews: 215,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    name: "Professional Chef's Knife",
    price: 89.99,
    rating: 5,
    reviews: 76,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4,
    reviews: 153,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Sale",
  },
  {
    id: "7",
    name: "Ergonomic Office Chair",
    price: 299.99,
    rating: 4,
    reviews: 32,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    rating: 5,
    reviews: 189,
    image: "/placeholder.svg?height=300&width=300",
  },
]
