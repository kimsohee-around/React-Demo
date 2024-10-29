import {formatDate} from "../utils/date-utils.js";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getGrid, transformBookings} from "./grid-builder.js";
import loadData, {createItem, deleteItem, editItem} from "../utils/api.js";
import {useMemo} from "react";
import {API_BASE_URL} from "../utils/api-config.js";

const url = API_BASE_URL + "/bookings"
export function useBookings(bookableId, startDate, endDate) {
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    // const urlRoot = "http://localhost:8080/bookings";

    const queryString = `bookableId=${bookableId}` +
        `&date_gte=${start}&date_lte=${end}`;

    const query = useQuery(
        ["bookings", bookableId, start, end],
        () => loadData(`${url}?${queryString}`)
    );
    console.log("-******-",query.data)
    return {
        bookings: query.data ? transformBookings(query.data) : {},
        ...query
    };
}

export function useGrid (bookable, startDate) {
    return useMemo(
        () => bookable ? getGrid(bookable, startDate) : {},
        [bookable, startDate]
    );
}

export function useCreateBooking (key) {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        item => createItem(url, item),
        {
            onSuccess: (booking) => {
                queryClient.invalidateQueries(key);
                const bookings = queryClient.getQueryData(key) || [];
                queryClient.setQueryData(key, [...bookings, booking]);
            }
        }
    );

    return {
        createBooking: mutation.mutate,
        isCreating: mutation.isLoading
    };
}

export function useUpdateBooking (key) {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        item => editItem(`${url}/${item.id}`, item),
        {
            onSuccess: (booking) => {
                queryClient.invalidateQueries(key);
                const bookings = queryClient.getQueryData(key) || [];
                const bookingIndex = bookings.findIndex(b => b.id === booking.id);
                bookings[bookingIndex] = booking;
                queryClient.setQueryData(key, bookings);
            }
        }
    );

    return {
        updateBooking: mutation.mutate,
        isUpdating: mutation.isLoading
    };
}

export function useDeleteBooking (key) {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        id => deleteItem(`${url}/${id}`),
        {
            onSuccess: (resp, id) => {
                queryClient.invalidateQueries(key);
                const bookings = queryClient.getQueryData(key) || [];
                queryClient.setQueryData(key, bookings.filter(b => b.id !== id))
            }
        }
    );

    return {
        deleteBooking: mutation.mutate,
        isDeleting: mutation.isLoading
    };
}