import { CORE_CONCEPTS } from "../../data";

import CoreConcept from "./CoreConcept.jsx";
import Section from "../Section/Section.jsx";

export default function CoreConcepts(){
    return (
        <Section title="Core Concepts" id="core-concepts">
          <ul>
            {CORE_CONCEPTS.map((item) => (
              <CoreConcept key={item.title} {...item} />
            ))}
          </ul>
        </Section>
    )
}