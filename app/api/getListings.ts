export async function getListings(): Promise<any[]> {
    try {
        const res = await fetch('http://localhost:3000/data');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: any[] = await res.json();
        console.log(data); // Log the entire data array to see what it contains
        return data; // No need to map again here if IDs are set on the server
    } catch (error) {
        console.log('Error', error, 'Could not fetch listings');
        return [];
    }
}
