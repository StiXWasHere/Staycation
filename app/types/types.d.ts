type Bookings = {
    data: userData
}

type userData = {
    id: string
    title: string
    endDate: string
    startDate: string
}



interface Listing  {
    id: string
    imageUrl: string
    additionalImages: ListingImage[]
    title: string
    description: string
    creationDate: Date
    lister: string
    nightlyFee: number
    cleaningFee: number
    beds: number
    rating?: number //ändra
    adaptations: Adapt
    adaptationDetails: AdaptDetails
    included: Included
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
type AdaptDetails = {
    wheelchair?: string
    deaf?: string
    blind?: string
    child?: string
}
type Included = {
    wifi: boolean
    TV: boolean
    Kitchen: boolean
    Parking: boolean
    Laundry: boolean
    Pets: boolean
}
interface CardDetails {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
}



// Define a new type for the fields needed by HouseCard
type HouseCardProps = Pick<Listing, 'title' | 'bonus' | 'nightlyFee' | 'location' | 'publicTransport' | 'imageUrl' | 'beds' | 'rating' | 'adaptations'>;

type CardFormProps = {
    setCardDetails: React.Dispatch<React.SetStateAction<CardDetails>>;
};

