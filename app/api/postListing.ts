export async function postListing(listing: Listing): Promise<void> {
    try {
        const res = await fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(listing),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        console.log('Listing posted successfully');
    } catch (error) {
        console.error('Error', error, 'Could not post listing');
    }
}