import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from "@apollo/client";

import { client } from './client';
import './index.css';
import { Users } from './containers';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Users />
  </ ApolloProvider>,
  document.getElementById('root')
);
