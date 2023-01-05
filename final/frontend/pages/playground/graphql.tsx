import { useEffect } from "react";

import Head from "next/head";
import { useQuery, gql } from "@apollo/client";

// const QUERY_COUNTRIES = gql`
//   query {
//     countries {
//       code
//       name
//     }
//   }
// `;

const QUERY_GET_CONTACTS = gql`
  query {
    getContacts {
      name {
        en
      }
    }
  }
`;

export default () => {
  const { data, loading, error } = useQuery(QUERY_GET_CONTACTS);

  return (
    <>
      graphql
      {loading ? "loading" : "done loading"}
      {JSON.stringify(data)}
    </>
  );
};
