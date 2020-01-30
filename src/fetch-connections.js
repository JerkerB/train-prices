import axios from 'axios';
import moment from 'moment';

function fetchConnections(departure, arrival, dateTime) {
  return axios
    .post('https://backend-v3-prod.vrfi.prodvrfi.vrpublic.fi/', {
      operationName: 'getConnections',
      variables: { outbound: { departure, arrival, dateTime, showDepartedJourneys: false }, passengers: [{ type: 'ADULT' }] },
      query:
        'query getConnections($outbound: ConnectionInput!, $passengers: [PassengerInput!]!) {\n  connections(input: $outbound) {\n    ... on NoConnections {\n      noConnectionsReason\n      __typename\n    }\n    ... on ConnectionList {\n      items {\n        id\n        duration\n        transferCount\n        departure {\n          station\n          time\n          __typename\n        }\n        services\n        arrival {\n          station\n          time\n          __typename\n        }\n        legs {\n          id\n          services\n          departure {\n            station\n            time\n            __typename\n          }\n          arrival {\n            station\n            time\n            __typename\n          }\n          duration\n          train {\n            id\n            type\n            label\n            __typename\n          }\n          __typename\n        }\n        offer(passengers: $passengers) {\n          ... on Offer {\n            id\n            price\n            __typename\n          }\n          ... on NoOffer {\n            noOfferReason\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n'
    })
    .then(response => parseConnectionsFromResponse(response));
}

function parseConnectionsFromResponse(response) {
  return response.data.data.connections.items.map(conn => ({
    id: conn.id,
    duration: conn.duration,
    departureTime: moment(conn.departure.time).format('HH:mm'),
    arrivalTime: moment(conn.arrival.time).format('HH:mm'),
    price: (conn.offer.price / 100).toLocaleString('fi-FI', { style: 'currency', currency: 'EUR' })
  }));
}

export default fetchConnections;
