import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

// Import images
import kitchenModern from '../assets/kitchen_modern.jpg'
import bathroomLuxurySpa from '../assets/bathroom_luxury_spa.jpg'
import bathroomLuxury from '../assets/bathroom_luxury.jpg'
import bathroomLuxury2 from '../assets/bathroom_luxury_2.jpeg'
import bathroomMarble from '../assets/bathroom_marble.jpg'
import customEntertainment from '../assets/custom_entertainment.jpg'
import customBuiltin from '../assets/custom_builtin.jpg'
import customCabinetry from '../assets/custom_cabinetry.jpg'
import customCloset from '../assets/custom_closet.jpg'

const galleryImages = [
  {
    src: kitchenModern,
    title: 'Coastal Modern Kitchen',
    category: 'Kitchen',
    description: 'Bright, coastal-inspired kitchen with custom cabinetry and quartz countertops'
  },
  {
    src: bathroomLuxurySpa,
    title: 'Luxury Spa Bathroom',
    category: 'Bathroom',
    description: 'Spa-like retreat with modern fixtures and elegant finishes'
  },
  {
    src: bathroomMarble,
    title: 'Marble Master Bath',
    category: 'Bathroom',
    description: 'Elegant bathroom featuring marble finishes and custom lighting'
  },
  {
    src: bathroomLuxury,
    title: 'Contemporary Bathroom',
    category: 'Bathroom',
    description: 'Modern bathroom design with sleek fixtures'
  },
  {
    src: bathroomLuxury2,
    title: 'Luxury Bathroom Suite',
    category: 'Bathroom',
    description: 'High-end bathroom renovation with premium materials'
  },
  {
    src: customEntertainment,
    title: 'Custom Entertainment Center',
    category: 'Millwork',
    description: 'Built-in entertainment center with custom millwork'
  },
  {
    src: customBuiltin,
    title: 'Custom Built-Ins',
    category: 'Millwork',
    description: 'Functional storage solutions seamlessly integrated'
  },
  {
    src: customCabinetry,
    title: 'Custom Cabinetry',
    category: 'Millwork',
    description: 'Bespoke cabinetry crafted with precision'
  },
  {
    src: customCloset,
    title: 'Custom Closet System',
    category: 'Millwork',
    description: 'Organized closet system with custom design'
  }
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Kitchen', 'Bathroom', 'Millwork']

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter)

  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="section-title">Project Gallery</h1>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Browse through our collection of completed projects showcasing our craftsmanship and attention to detail.
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? 'default' : 'outline'}
                className={filter === category 
                  ? 'bg-[var(--deep-charcoal)] hover:bg-[var(--brushed-gold)]' 
                  : 'border-[var(--deep-charcoal)] text-[var(--deep-charcoal)] hover:bg-[var(--warm-off-white)]'
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-[var(--brushed-gold)] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {image.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[var(--brushed-gold)] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg"
            />
            <div className="text-white mt-4 text-center">
              <h2 className="text-2xl font-semibold mb-2">{selectedImage.title}</h2>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
