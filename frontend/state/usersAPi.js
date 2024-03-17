import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath:'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
    tagTypes: ['Orders'],
        endpoints: (build) => ({ 
             getAllOrders: build.query({
                query: () => 'history',
                providesTags: ['Orders']
            }),

            createOrder: build.mutation({
                query: user  => ({
                    url: 'order',
                    body: user,
                    method:'POST', 
                }),
            invalidatesTags:["Orders"]    
            }),
    }),
})

export const {
    useGetAllOrdersQuery,
    useCreateOrderMutation,
    
} = usersApi