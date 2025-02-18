// _app.tsx
'use client';

import { ApolloProvider } from "@apollo/client";
import { client } from "d:/entage-project/my-next-app/src/apollo-config/client";
import Map from './components/Map';
 // Import the Apollo client you've defined

function App() {
  return (
    <ApolloProvider client={client}>
      <Map/>
    </ApolloProvider>
  );
}

export default App;
