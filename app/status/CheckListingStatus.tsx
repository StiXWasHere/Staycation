import { getUsersData } from "../api/GetUsersData";
import { differenceInDays, addDays, parseISO } from "date-fns";

type CheckListingStatusResult = {
  bookings: userData[];
  unavailableDates: Date[];
};

export async function CheckListingStatus(id: string): Promise<CheckListingStatusResult> {
  try {
    const userDataArray = await getUsersData()

    // Filter bookings for the specific listing ID
    const filteredBookings = userDataArray.filter((booking: userData) => booking.id === id)

    // Calculate unavailable dates
    const unavailableDates: Date[] = []
    filteredBookings.forEach(({ startDate, endDate }) => {
      const start = parseISO(startDate)
      const end = parseISO(endDate)
      const rangeDays = differenceInDays(end, start) + 1

      for (let i = 0; i < rangeDays; i++) {
        unavailableDates.push(addDays(start, i))
      }
    })

    return {
      bookings: filteredBookings,
      unavailableDates,
    }
  } catch (error) {
    console.error("Error in CheckListingStatus:", error)
    return { bookings: [], unavailableDates: [] }
  }
}
