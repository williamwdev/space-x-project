"use strict";

const { gql } = require("apollo-server");


/* NOTE: 
- An exclamation point (!) after a delcared field type means that the value can never be null
- If a declared field's type is in [], its an array of the specified type && if an array has an exclamation point after it, the array cannot be null, but it CAN be empty
*/

const typeDefs = gql`
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }
  
  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }
  
  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = typeDefs;
