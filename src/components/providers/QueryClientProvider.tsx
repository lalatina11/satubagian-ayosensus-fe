"use client";
import { ReactNode } from "react";
import {
  QueryClientProvider as TantackQueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

const QueryClientProvider = ({ children }: Props) => {
  const client = new QueryClient();
  return (
    <TantackQueryClientProvider client={client}>
      {children}
    </TantackQueryClientProvider>
  );
};

export default QueryClientProvider;
