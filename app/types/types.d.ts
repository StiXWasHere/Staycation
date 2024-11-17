


interface Listing  {
    id: string
    imageUrl: string
    additionalImages: ListingImage[]
    title: string
    description: string
    creationDate: Date
    lister: string //ändra
    nightlyFee: number
    cleaningFee: number
    beds?: number //ändra
    rating?: number //ändra
    adaptations: Adapt
    location: string
    publicTransport: number
    comments: ListingComment[]
    bonus?: string
}

type ListingComment = {
    commenter: string //ändra
    creationDate: Date
    content: string
    rating: number
}
type ListingImage = {
    imageUrl: string
}
type Adapt = {
    wheelchair: boolean
    deaf: boolean
    blind: boolean
    child: boolean
}

// Define a new type for the fields needed by HouseCard
type HouseCardProps = Pick<Listing, 'title' | 'bonus' | 'nightlyFee' | 'location' | 'publicTransport' | 'imageUrl' | 'beds' | 'rating' | 'adaptations'>;
