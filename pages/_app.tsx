import React from "react";
import NextNprogress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Toaster } from "react-hot-toast";
import { Provider } from "next-auth/client";
import { ReactQueryDevtools } from "react-query/devtools";
import { PusherProvider } from "@harelpls/use-pusher";

if (process.env.NODE_ENV === "development") {
  require("mocks");
}

const pusherConfig = {
  clientKey: process.env.PUSHER_CLIENT_KEY,
  cluster: process.env.PUSHER_CLUSTER,
};

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <ChakraProvider>
      {/* <FireFlags projectId="cktk2o9bg00370vl7ldwp8m3k"> */}
      <PusherProvider {...pusherConfig}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Provider session={pageProps.session}>
              <Component {...pageProps} />
              <NextNprogress
                color="#FF8826"
                startPosition={0.3}
                stopDelayMs={200}
                height={2}
                showOnShallow={true}
                options={{ showSpinner: false }}
              />
              <div>
                <Toaster position="top-right" />
              </div>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </PusherProvider>
      {/* </FireFlags> */}
    </ChakraProvider>
  );
}
export default MyApp;
