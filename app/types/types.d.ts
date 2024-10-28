


interface Listing  {
    id: string
    imageUrl?: string //ändra
    title: string
    description: string
    creationDate: Date
    lister: string //ändra
    nightlyFee: number
    cleaningFee: number
    beds?: number //ändra
    rating?: number //ändra
    adaptations?: Adapt
    location: string
    publicTransport: string
    comments?: listingComment[]
    bonus?: string
}

type listingComment = {
    commenter: string //ändra
    creationDate: Date
    content: string
}

type Adapt = {
    wheelchair: boolean
    deaf: boolean
    blind: boolean
    child: boolean
}

// Define a new type for the fields needed by HouseCard
type HouseCardProps = Pick<Listing, 'title' | 'bonus' | 'nightlyFee' | 'location' | 'publicTransport' | 'imageUrl' | 'beds' | 'rating'>;
