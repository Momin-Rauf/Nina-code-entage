import Image from "next/image"
import { Heart } from "lucide-react"

interface Category {
  _id: string
  title: string
}

interface Restaurant {
  _id: string
  name: string
  image: string
  address: string
  deliveryTime: number
  minimumOrder: number
  categories?: Category[]
  isAvailable: boolean
}

interface RestaurantsGridProps {
  restaurants: Restaurant[]
}

export default function RestaurantsGrid({ restaurants }: RestaurantsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 text-black lg:grid-cols-3 gap-6 mt-4 mb-8">
      {restaurants
        .filter((restaurant) => restaurant.isAvailable)
        .map((restaurant) => (
          <div key={restaurant._id} className="bg-white text-black rounded-lg overflow-hidden shadow-md">
            <div className="relative">
              <Image
                src={restaurant.image || "/placeholder.svg"}
                alt={restaurant.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                priority={false}
              />
              <div className="absolute top-3 left-3">
                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold">
                  {restaurant.deliveryTime} MIN
                </span>
              </div>
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{restaurant.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-green-500">★</span>
                    <span className="text-lg">/5</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  {restaurant.categories?.map((category) => category.title).join(", ")}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-semibold">Rs. {restaurant.minimumOrder}</span>
                  <span className="text-gray-500">Minimum</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

