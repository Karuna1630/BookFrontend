import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockExchangeBooks } from '../../../Utils/mockData';

// Mock API implementation
const mockBaseQuery = async ({ url, method }) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  switch (url) {
    case '/':
      return { data: mockExchangeBooks };
    default:
      if (url.startsWith('/')) {
        const id = url.slice(1);
        const book = mockExchangeBooks.find(b => b._id === id);
        return book ? { data: book } : { error: 'Book not found' };
      }
      return { error: 'Not found' };
  }
};

const exchangeBookApi = createApi({
  reducerPath: 'exchangeBookApi',
  baseQuery: mockBaseQuery,
  tagTypes: ['ExchangeBooks'],
  endpoints: (builder) => ({
    fetchAllExchangeBooks: builder.query({
      query: () => ({
        url: '/',
        method: 'GET'
      }),
      providesTags: ['ExchangeBooks'],
    }),

    fetchExchangeBookById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'ExchangeBooks', id }],
    }),

    addExchangeBook: builder.mutation({
      query: (newExchangeBook) => ({
        url: '/create-exchange',
        method: 'POST',
        body: newExchangeBook,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['ExchangeBooks'],
    }),

    updateExchangeBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/edit/${id}`,
        method: 'PUT',
        body: rest,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['ExchangeBooks'],
    }),

    deleteExchangeBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ExchangeBooks'],
    }),
  }),
});

export const {
  useFetchAllExchangeBooksQuery,
  useFetchExchangeBookByIdQuery,
  useAddExchangeBookMutation,
  useUpdateExchangeBookMutation,
  useDeleteExchangeBookMutation,
} = exchangeBookApi;

export default exchangeBookApi;
