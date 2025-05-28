import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Home() {
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
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Quality Products for Every Need
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover our handpicked selection of premium products that combine style, functionality, and value.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/products">
                    <Button size="lg">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/categories">
                    <Button variant="outline" size="lg">
                      Browse Categories
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Hero Image"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                priority
              />
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our most popular picks, carefully selected for quality and value.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
              {featuredProducts.map((product) => (
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
            <div className="flex justify-center mt-10">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Shop by Category</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse our wide selection of quality products across different categories.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
              {categories.map((category) => (
                <Link href={`/categories/${category.slug}`} key={category.name} className="group">
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-xl">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.productCount} products</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay Updated</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Subscribe to our newsletter to receive updates on new products, special offers, and exclusive deals.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button>Subscribe</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                    <h3 className="font-medium">Free Shipping</h3>
                    <p className="text-sm text-center text-muted-foreground">On orders over $50</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
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
                      className="h-8 w-8 text-primary"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    <h3 className="font-medium">Quality Guarantee</h3>
                    <p className="text-sm text-center text-muted-foreground">100% satisfaction</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
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
                      className="h-8 w-8 text-primary"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                    <h3 className="font-medium">Secure Payments</h3>
                    <p className="text-sm text-center text-muted-foreground">Protected checkout</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
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
                      className="h-8 w-8 text-primary"
                    >
                      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                      <path d="M12 12v9" />
                      <path d="m8 17 4 4 4-4" />
                    </svg>
                    <h3 className="font-medium">Easy Returns</h3>
                    <p className="text-sm text-center text-muted-foreground">30-day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
const featuredProducts = [
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
]

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    productCount: 124,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Fashion",
    slug: "fashion",
    productCount: 237,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Home & Kitchen",
    slug: "home",
    productCount: 189,
    image: "/placeholder.svg?height=300&width=400",
  },
]
