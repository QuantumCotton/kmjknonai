import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function MetaPixelTracker() {
  const location = useLocation()

  useEffect(() => {
    // Track page view on route change
    // fbq is loaded globally from the Meta Pixel script in index.html
    if (typeof fbq !== 'undefined') {
      fbq('track', 'PageView')
      
      // Track ViewContent for service-specific landing pages
      const pathname = location.pathname.toLowerCase()
      const serviceType = getServiceTypeFromPath(pathname)
      const locationName = getLocationFromPath(pathname)
      
      if (serviceType) {
        fbq('track', 'ViewContent', {
          content_type: 'service_page',
          content_name: `${serviceType}${locationName ? ` in ${locationName}` : ''}`,
          service_type: serviceType,
          location: locationName,
          content_ids: [pathname.replace(/\//g, '')]
        })
      }
    }
  }, [location.pathname])

  // Extract service type from URL path
  const getServiceTypeFromPath = (pathname) => {
    if (pathname.includes('bathroom')) return 'Bathroom Remodel'
    if (pathname.includes('kitchen')) return 'Kitchen Renovation'
    if (pathname.includes('handyman')) return 'Handyman Services'
    if (pathname.includes('tv-mounting')) return 'TV Mounting'
    if (pathname.includes('epoxy')) return 'Epoxy Flooring'
    if (pathname.includes('home-renovation')) return 'Home Renovation'
    return null
  }

  // Extract location from URL path
  const getLocationFromPath = (pathname) => {
    if (pathname.includes('sailfish-point')) return 'Sailfish Point'
    if (pathname.includes('sewalls-point')) return 'Sewalls Point'
    if (pathname.includes('palm-city')) return 'Palm City'
    if (pathname.includes('hutchinson-island')) return 'Hutchinson Island'
    if (pathname.includes('stuart')) return 'Stuart'
    if (pathname.includes('treasure-coast')) return 'Treasure Coast'
    return null
  }

  return null
}

export default MetaPixelTracker
