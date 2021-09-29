import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import useSWR from "swr";
import { formatEther } from "@ethersproject/units";
import { useQuery, gql } from "@apollo/client";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
});

// const fetcher =
//   (library) =>
//   (...args) => {
//     const [method, ...params] = args;
//     console.log(method);
//     console.log(params);
//     return library[method](...params);
//   };

const QUERY = gql`
  query Balance {
    balance @client
  }
`;

export const Balance = () => {
  const { account } = useWeb3React();
  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      account,
    },
  });

  // const { data: balance, mutate } = useSWR(["getBalance", account, "latest"], {
  //   fetcher: (...args) => {
  //     const [method, ...params] = args;
  //     console.log(method);
  //     console.log(params);
  //     return library[method](...params);
  //   },
  // });

  // useEffect(() => {
  //   console.log(`listening for blocks...`);
  //   library.on("block", () => {
  //     console.log("update balance...");
  //     mutate(undefined, true);
  //   });
  //   // remove listener when the component is unmounted
  //   return () => {
  //     library.removeAllListeners("block");
  //   };
  //   // trigger the effect only on component mount
  // }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  const balance = data ? data.balance : 0;
  console.log(balance);
  return <div>Balance: {parseFloat(formatEther(balance)).toPrecision(4)}</div>;
};

export const Wallet = () => {
  const { chainId, account, activate, active, library } = useWeb3React();

  const onClick = () => {
    activate(injectedConnector);
  };

  const showProvider = async () => {
    // const balance = await library.eth.getBalance(account);
    console.log(library);
  };

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      <Balance />
      {active ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
      <button type="button" onClick={showProvider}>
        Show Provider
      </button>
    </div>
  );
};
