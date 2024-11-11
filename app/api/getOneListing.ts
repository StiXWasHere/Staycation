export async function getListingById(id: string): Promise<any | null> {
    try {
        const res = await fetch(`http://localhost:3000/data/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: any = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error', error, `Could not fetch listing with id: ${id}`);
        return null;
    }
}
