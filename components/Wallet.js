import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { gql, useLazyQuery } from "@apollo/client";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
});

const QUERY = gql`
  query Balance {
    balance @client
  }
`;

// TODO: Refactor the wallet component to be a top level component
// will be located in the Layout package (or core components)
// Is it possible to connect the user at the root _app component and make the options available through provider/context pattern?
export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React();
  const [getBalance, { data, loading, error }] = useLazyQuery(QUERY);

  useEffect(() => {
    if (active) {
      getBalance({
        variables: {
          account,
        },
      });
    }
  }, [active, account, getBalance]);

  const onClick = () => {
    activate(injectedConnector);
  };

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      <div>Balance: {data ? data.balance : 0}</div>
      {active ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  );
};
