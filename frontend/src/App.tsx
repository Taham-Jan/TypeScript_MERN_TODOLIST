import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Homescreen } from './routes/Homescreen';
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Homescreen />
      </QueryClientProvider>
    </>
  );
}

export default App;
