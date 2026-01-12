import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

// Portfolio imagery
import kitchenTimberlineChefSuite from '../assets/portfolio/kitchen-timberline-chef-suite.jpg'
import kitchenSculptedMarbleGathering from '../assets/portfolio/kitchen-sculpted-marble-gathering.jpg'
import kitchenTimberAndStoneHearth from '../assets/portfolio/kitchen-timber-and-stone-hearth.jpg'
import kitchenArabesqueMarbleEstate from '../assets/portfolio/kitchen-arabesque-marble-estate.jpg'
import kitchenCharcoalLinearGalley from '../assets/portfolio/kitchen-charcoal-linear-galley.jpg'
import kitchenSleekEspressoLounge from '../assets/portfolio/kitchen-sleek-espresso-lounge.jpg'
import kitchenSunlitNavyHub from '../assets/portfolio/kitchen-sunlit-navy-hub.jpg'
import bathroomLightFilledSpaSuite from '../assets/portfolio/bathroom-light-filled-spa-suite.jpg'
import bathroomVintageCharmRetreat from '../assets/portfolio/bathroom-vintage-charm-retreat.jpg'
import bathroomBrassAndGraphiteSuite from '../assets/portfolio/bathroom-brass-and-graphite-suite.jpg'
import bathroomHonedHoneycombVanity from '../assets/portfolio/bathroom-honed-honeycomb-vanity.jpg'
import bathroomMarbleAndOakSpa from '../assets/portfolio/bathroom-marble-and-oak-spa.jpg'
import bathroomSilverOakRetreat from '../assets/portfolio/bathroom-silver-oak-retreat.jpg'
import bathroomLakeviewMarbleRetreat from '../assets/portfolio/bathroom-lakeview-marble-retreat.jpg'
import bathroomWavePanelPowder from '../assets/portfolio/bathroom-wave-panel-powder.jpg'

const galleryImages = [
  {
    src: kitchenTimberlineChefSuite,
    title: 'Timberline Chef Suite',
    category: 'Kitchen',
    style: 'Transitional',
    description: 'Dual islands, pro-grade appliances, and warm brass accents create a hardworking family kitchen framed by scenic backyard views.'
  },
  {
    src: kitchenSculptedMarbleGathering,
    title: 'Sculpted Marble Gathering Kitchen',
    category: 'Kitchen',
    style: 'Modern',
    description: 'A monolithic waterfall island and continuous slab backsplash wrap this minimalist space in veined marble and soft uplighting.'
  },
  {
    src: kitchenTimberAndStoneHearth,
    title: 'Timber & Stone Hearth Kitchen',
    category: 'Kitchen',
    style: 'Rustic Contemporary',
    description: 'Exposed beams, a stone hearth, and mixed-finish cabinetry bring lodge warmth to an open kitchen designed for entertaining.'
  },
  {
    src: kitchenArabesqueMarbleEstate,
    title: 'Arabesque Marble Estate Kitchen',
    category: 'Kitchen',
    style: 'Luxury Classic',
    description: 'Grand arched steel doors, a sculpted hood, and bookmatched marble surfaces define this statement-making estate kitchen.'
  },
  {
    src: kitchenCharcoalLinearGalley,
    title: 'Charcoal Linear Galley Kitchen',
    category: 'Kitchen',
    style: 'Contemporary',
    description: 'Full-height charcoal cabinetry, a waterfall peninsula, and glass mosaic backsplash deliver a streamlined work zone with ample storage.'
  },
  {
    src: kitchenSleekEspressoLounge,
    title: 'Sleek Espresso Lounge Kitchen',
    category: 'Kitchen',
    style: 'Contemporary',
    description: 'Sculptural pendants and soft grey cabinetry blur the line between kitchen and lounge, perfect for casual gatherings.'
  },
  {
    src: kitchenSunlitNavyHub,
    title: 'Sunlit Navy Hub Kitchen',
    category: 'Kitchen',
    style: 'Transitional',
    description: 'Bold navy cabinetry, brass lighting, and a farmhouse sink balance modern energy with timeless function in this family hub.'
  },
  {
    src: bathroomLightFilledSpaSuite,
    title: 'Light-Filled Spa Suite Bath',
    category: 'Bathroom',
    style: 'Transitional',
    description: 'A freestanding soaking tub, oversized shower, and illuminated mirrors transform this spacious suite into a calming retreat.'
  },
  {
    src: bathroomVintageCharmRetreat,
    title: 'Vintage Charm Retreat Bath',
    category: 'Bathroom',
    style: 'Historic Revival',
    description: 'Paneled wainscoting, pedestal sinks, and lantern sconces honor the home’s history while updating the clawfoot soaking experience.'
  },
  {
    src: bathroomBrassAndGraphiteSuite,
    title: 'Brass & Graphite Suite Bath',
    category: 'Bathroom',
    style: 'Modern Classic',
    description: 'Brushed brass fixtures, a furniture-style double vanity, and geometric tile flooring deliver elevated everyday luxury.'
  },
  {
    src: bathroomHonedHoneycombVanity,
    title: 'Honed Honeycomb Vanity Bath',
    category: 'Bathroom',
    style: 'Soft Traditional',
    description: 'Warm hexagon marble tile and polished nickel hardware frame a dual vanity that maximizes storage in an intimate footprint.'
  },
  {
    src: bathroomMarbleAndOakSpa,
    title: 'Marble & Oak Spa Bath',
    category: 'Bathroom',
    style: 'Modern',
    description: 'A floating oak vanity, integrated LED mirrors, and large-format porcelain slabs create a serene spa-like atmosphere.'
  },
  {
    src: bathroomSilverOakRetreat,
    title: 'Silver Oak Retreat Bath',
    category: 'Bathroom',
    style: 'Contemporary',
    description: 'Sycamore-toned tile, frameless glass, and a sculptural soaking tub invite relaxation with a view of the surrounding greenery.'
  },
  {
    src: bathroomLakeviewMarbleRetreat,
    title: 'Lakeview Marble Retreat Bath',
    category: 'Bathroom',
    style: 'Coastal Contemporary',
    description: 'Polished marble floors and a curved backlit mirror reflect natural light from panoramic windows overlooking the water.'
  },
  {
    src: bathroomWavePanelPowder,
    title: 'Wave Panel Powder Room',
    category: 'Bathroom',
    style: 'Statement Powder',
    description: '3D wave wall panels and a compact gloss vanity pack texture and functionality into this guest-ready powder room.'
  }
]

const categories = ['All', ...Array.from(new Set(galleryImages.map((img) => img.category)))]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('All')

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
                  {image.category}{image.style ? ` · ${image.style}` : ''}
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
