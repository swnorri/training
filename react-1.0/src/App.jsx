import { Fragment } from 'react';

import Header from "./components/Header/Header.jsx";
import CoreConcepts from './components/CoreConcept/CoreConcepts.jsx';
import Examples from './components/Examples/Examples.jsx';

export default function App() {

  return (
    <Fragment>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </Fragment>
  );
}