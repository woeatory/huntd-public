/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { FC } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { NotFound } from 'strapi-helper-plugin';

// Utils
import { ApolloProvider } from '@apollo/client';
import { Padded, Flex } from '@buffetjs/core';
import { Fonts, GlobalStyle } from '@buffetjs/styles';
import { CandidatesPage } from '@profile-checker/containers/CandidatesPage';
import { initApolloClient } from '@/controllers/apollo/apollo.client';
import { pluginRoutes } from '@profile-checker/utils/constants';
import { RecruitersPage } from '@profile-checker/containers/RecruitersPage';
import './App.styles.css';

export const App: FC = () => (
  <>
    <Fonts />
    <GlobalStyle />
    <ApolloProvider client={initApolloClient()}>
      <div className="container-fluid">
        <Padded top bottom size="sm">
          <h1 className="app__heading">Profiles moderation</h1>
        </Padded>

        <nav>
          <Flex>
            <Padded right size="smd">
              <NavLink className="link" to={pluginRoutes.candidates}>
                Candidates
              </NavLink>
            </Padded>
            <NavLink className="link" to={pluginRoutes.recruiters}>
              Recruiters
            </NavLink>
          </Flex>
        </nav>

      </div>

      <div>
        <Switch>
          <Route
            path={pluginRoutes.candidates}
            component={CandidatesPage}
            exact
          />
          <Route
            path={pluginRoutes.recruiters}
            component={RecruitersPage}
            exact
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ApolloProvider>
  </>
);
