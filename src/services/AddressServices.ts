import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ISuggestionItem {
    data: any;
    unrestricted_value: string;
    value: string;
}

interface IGetAddressAPI {
    suggestions: ISuggestionItem[];
}

export const addressAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_DADATA_URL,
        prepareHeaders: (headers, { getState, endpoint }) => {
            headers.set("Content-Type", "application/json");
            headers.set("Accept", "application/json");
            headers.set(
                "Authorization",
                `Token ${process.env.REACT_APP_DADATA_KEY}`,
            );
            return headers;
        },
    }),
    endpoints: (build) => ({
        getAddressAPI: build.mutation<IGetAddressAPI, string>({
            query: (body) => ({
                url: "",
                method: "POST",
                body: JSON.stringify({ query: body }),
            }),
        }),
    }),
});

export const { useGetAddressAPIMutation } = addressAPI;
