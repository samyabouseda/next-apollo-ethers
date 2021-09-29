import { ApolloClient, InMemoryCache } from "@apollo/client";
import { makeVar } from "@apollo/client";
import { ethers } from "ethers";

const provider = ethers.getDefaultProvider("mainnet");

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          balance: {
            read(_, { variables, storage }) {
              if (!storage.var) {
                storage.var = makeVar(5555);

                console.log(variables.account);
                if (variables.account) {
                  provider.getBalance(variables.account).then((balance) => {
                    const balanceInEth = ethers.utils.formatEther(balance);
                    storage.var(balanceInEth);
                  });
                }
              }
              return storage.var();
            },
          },
        },
      },
    },
  }),
});

export default client;
