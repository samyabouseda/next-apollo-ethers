import { ApolloClient, InMemoryCache } from "@apollo/client";
import { makeVar } from "@apollo/client";
import { ethers } from "ethers";

// TODO: Refactor this to have only on instance of the provider throuhought the app.
const provider = ethers.getDefaultProvider("mainnet");

// This could be helpful to hide the account or make it globaly available.
const connectedAccount = makeVar();

const client = new ApolloClient({
  // uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          balance: {
            read(_, { variables, storage }) {
              // console.log("read");
              if (!storage.var) {
                // console.log("storage.var about to be created");
                storage.var = makeVar(5555);
              }
              if (variables.account) {
                // console.log(variables.account);
                // 1. Load the page
                // 2. Trigger the initial useQuery
                // 3. The balance is 0 because the account is not connected yet
                // 4. Ask the user to connect its wallet
                // 5. When wallet is connected, the account var is updated
                // 6. The useQuery is triggered again because the account is a dependency of the query
                // 7. The balance is rendered properly for the connected account
                provider.getBalance(variables.account).then((balance) => {
                  const balanceInEth = ethers.utils.formatEther(balance);
                  storage.var(balanceInEth);
                  // console.log(balanceInEth);
                });
              }
              // console.log(storage);
              return storage.var();
            },
          },
        },
      },
    },
  }),
});

export default client;
