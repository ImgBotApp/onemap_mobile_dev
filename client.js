
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const NETWORK_INTERFACE_URL = 'https://api.graph.cool/simple/v1/cjb30vkvv434c0146sjjn4d4w'
const SUBSCRIPTION_CLIENT_URL = 'wss://subscriptions.graph.cool/v1/cjb30vkvv434c0146sjjn4d4w';

const networkInterface = createNetworkInterface({ uri: NETWORK_INTERFACE_URL });
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});


export default client;