export async function getUsersData(): Promise<userData[]> {
    try {
        const res = await fetch('http://localhost:3000/clerk/users')
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const responseData = await res.json()
        const userDataArray: userData[] = responseData.flatMap((item: any) => item.bookings || [])
        return userDataArray
    } catch (error) {
        console.log('Error', error, 'Could not fetch listings')
        return []
    }
}
