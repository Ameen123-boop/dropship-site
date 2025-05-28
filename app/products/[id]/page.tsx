"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedSize, setSelectedSize] = useState("m")

  // In a real app, you would fetch the product data based on the ID
  const product = {
    id: params.id,
    name: "Wireless Noise-Canceling Headphones",
    price: 249.99,
    rating: 5,
    reviews: 128,
    description:
      "Experience premium sound quality with our wireless noise-canceling headphones. These headphones feature advanced noise-canceling technology, comfortable ear cushions, and up to 30 hours of battery life. Perfect for travel, work, or enjoying your favorite music without distractions.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium sound quality",
      "Comfortable over-ear design",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Foldable design for easy storage",
      "Includes carrying case and cables",
    ],
    colors: [
      { name: "Black", value: "black" },
      { name: "Silver", value: "silver" },
      { name: "Blue", value: "blue" },
    ],
    sizes: [
      { name: "Small", value: "s" },
      { name: "Medium", value: "m" },
      { name: "Large", value: "l" },
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    specifications: {
      Dimensions: "7.8 x 6.7 x 3.1 inches",
      Weight: "8.3 ounces",
      "Battery Life": "Up to 30 hours",
      "Charging Time": "3 hours",
      "Bluetooth Version": "5.0",
      "Wireless Range": "Up to 33 feet (10m)",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
      "Driver Size": "40mm",
    },
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

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
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/products" className="hover:underline">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="aspect-square object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-lg border bg-muted">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={150}
                      height={150}
                      className="aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                  <Link href="#reviews" className="text-sm text-muted-foreground hover:underline">
                    {product.reviews} reviews
                  </Link>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground ml-2">In stock</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">{product.description}</p>
                <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
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
                        className="h-4 w-4 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4 border-t">
                {/* Color Selection */}
                <div>
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`w-10 h-10 rounded-full border-2 ${
                          selectedColor === color.value ? "border-primary" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color.value }}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="font-medium mb-2">Size</h3>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setSelectedSize(size.value)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                          selectedSize === size.value ? "border-primary bg-primary/10 text-primary" : "border-input"
                        }`}
                      >
                        {size.name.charAt(0).toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="font-medium mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={incrementQuantity} aria-label="Increase quantity">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Button className="flex-1" size="lg">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="mr-2 h-5 w-5" />
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="py-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Product Details</h2>
                  <p>
                    Experience premium sound quality with our wireless noise-canceling headphones. These headphones
                    feature advanced noise-canceling technology, comfortable ear cushions, and up to 30 hours of battery
                    life. Perfect for travel, work, or enjoying your favorite music without distractions.
                  </p>
                  <p>
                    The active noise cancellation technology effectively blocks out ambient noise, allowing you to focus
                    on your audio content. The plush ear cushions provide comfort for extended listening sessions, while
                    the adjustable headband ensures a perfect fit for any head size.
                  </p>
                  <p>
                    With Bluetooth 5.0 connectivity, you can easily pair these headphones with your smartphone, tablet,
                    or computer. The built-in microphone allows you to take calls without removing your headphones, and
                    the intuitive controls make it easy to adjust volume, skip tracks, and activate your device&apos;s
                    voice assistant.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="py-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Technical Specifications</h2>
                  <div className="border rounded-lg">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value], index) => (
                          <tr key={key} className={index !== 0 ? "border-t" : ""}>
                            <td className="px-4 py-3 font-medium">{key}</td>
                            <td className="px-4 py-3 text-muted-foreground">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="py-6" id="reviews">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Customer Reviews</h2>
                    <Button>Write a Review</Button>
                  </div>

                  <div className="grid gap-8">
                    {/* Review 1 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Sarah Johnson</h3>
                          <p className="text-sm text-muted-foreground">Verified Purchase</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2 weeks ago</span>
                      </div>
                      <div className="flex">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                      </div>
                      <h4 className="font-medium">Excellent sound quality and comfort!</h4>
                      <p className="text-muted-foreground">
                        I&apos;ve been using these headphones for two weeks now and I&apos;m extremely impressed with
                        the sound quality and noise cancellation. They&apos;re also very comfortable to wear for long
                        periods. Battery life is as advertised - I only need to charge them about once a week with daily
                        use.
                      </p>
                    </div>

                    {/* Review 2 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Michael Chen</h3>
                          <p className="text-sm text-muted-foreground">Verified Purchase</p>
                        </div>
                        <span className="text-sm text-muted-foreground">1 month ago</span>
                      </div>
                      <div className="flex">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <h4 className="font-medium">Great headphones, minor connectivity issues</h4>
                      <p className="text-muted-foreground">
                        These headphones have excellent sound quality and the noise cancellation is impressive.
                        They&apos;re comfortable to wear and the battery lasts a long time. My only complaint is that I
                        occasionally experience connectivity issues with my laptop, but they work flawlessly with my
                        phone.
                      </p>
                    </div>

                    {/* Review 3 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Emily Rodriguez</h3>
                          <p className="text-sm text-muted-foreground">Verified Purchase</p>
                        </div>
                        <span className="text-sm text-muted-foreground">3 months ago</span>
                      </div>
                      <div className="flex">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                      </div>
                      <h4 className="font-medium">Perfect for travel!</h4>
                      <p className="text-muted-foreground">
                        I bought these headphones specifically for travel and they&apos;ve been a game-changer. The
                        noise cancellation is fantastic on airplanes - I can barely hear the engine noise. They fold up
                        nicely in the included case and the battery easily lasts for long-haul flights. Highly
                        recommend!
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((id) => (
                <Link href={`/products/${id}`} key={id} className="group">
                  <div className="overflow-hidden rounded-lg border bg-muted transition-all hover:shadow-lg">
                    <div className="aspect-square relative">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Related product"
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold truncate">Bluetooth Portable Speaker</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {Array(5)
                            .fill(null)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">(42)</span>
                      </div>
                      <div className="mt-2">
                        <span className="font-bold">$79.99</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
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
