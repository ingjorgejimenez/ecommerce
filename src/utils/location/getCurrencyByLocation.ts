import { getUserLocation } from './getUserLocation'

export async function getCurrencyByLocation() {
  try {
    const location = await getUserLocation()
    const apiKey = process.env.NEXT_PUBLIC_LOCATION_KEY
    console.log({ apiKey, location })
    if (!apiKey) {
      throw new Error(
        'La clave API no está definida. Asegúrate de que la variable de entorno NEXT_PUBLIC_LOCATION_KEY está configurada.',
      )
    }
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${apiKey}`,
    )

    if (!response.ok) {
      throw new Error(`Error de red: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.results || data.results.length === 0) {
      throw new Error('No se encontraron resultados de ubicación')
    }

    const countryCode = data.results[0].components.country_code.toUpperCase()
    console.log({ countryCode })
    // dinner with the country code
    const currencyMap: { [key: string]: string } = {
      US: 'USD',
      DE: 'EUR',
      JP: 'JPY',
      CO: 'COP',
      AR: 'ARS',
      ES: 'EUR',
      CL: 'CLP',
    }

    return currencyMap[countryCode] || 'USD'
  } catch (error) {
    console.error('Error getting location or currency:', error)
    return 'USD'
  }
}
