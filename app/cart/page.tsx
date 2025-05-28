"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Wireless Noise-Canceling Headphones",
      price: 249.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      color: "Black",
      size: "One Size",
    },
    {
      id: "2",
      name: "Premium Coffee Maker",
      price: 129.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      color: "Silver",
      size: "Standard",
    },
    {
      id: "3",
      name: "Organic Cotton T-Shirt",
      price: 34.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      color: "Blue",
      size: "Medium",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

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
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
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
            <span className="text-foreground">Shopping Cart</span>
          </div>

          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven&apos;t added any products to your cart yet.
              </p>
              <Link href="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-lg border">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Cart Items ({cartItems.length})</h2>
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <div className="flex justify-between">
                              <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                                {item.name}
                              </Link>
                              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <p>Color: {item.color}</p>
                              <p>Size: {item.size}</p>
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-lg border">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 space-y-3">
                      <Button className="w-full" size="lg">
                        Proceed to Checkout
                      </Button>
                      <Link href="/products" className="block">
                        <Button variant="outline" className="w-full">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="rounded-lg border mt-6">
                  <div className="p-6">
                    <h3 className="font-semibold mb-4">Promo Code</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
