export const typeDefinitions = /* GraphQL */ `
  type Query {
    getUser: User
    allOffers(filter: OfferInput): [Offer!]
    allCities: [City!]
    discountsSelected: [Offer!]
    coveragesSelected: [Offer!]
    calculatePrice(
      user: UserInput
      coverages: [OfferInput]
      discounts: [OfferInput]
    ): Receipt!
  }

  type Mutation {
    selectOffer(id: ID!): Offer!
    selectCity(id: ID!): City!
    insertCity(option: String!, value: Float!): [City!]
    enableOffer(filter: OfferInput!): Offer!
    disableOffer(filter: OfferInput!): Offer!
    insertUser(user: UserInput!): User
    updateUser(user: UserInput!): User
  }

  type City {
    _id: ID!
    option: String!
    value: Float!
    selected: Boolean!
  }

  input CityInput {
    _id: ID!
    option: String!
    value: Float!
    selected: Boolean!
  }

  input UserInput {
    _id: ID
    username: String!
    birthdate: String!
    city: CityInput
    vehiclepower: Int!
    voucher: Int!
  }

  input OfferInput {
    _id: ID
    type: String
    name: String
    value: Float
    value_alt: Float
    fixed_price: Boolean
    selected: Boolean
    available: Boolean
    condition: String
  }

  type User {
    _id: ID
    username: String!
    birthdate: String!
    city: City!
    vehiclepower: Int!
    voucher: Int!
  }

  type Offer {
    _id: ID!
    type: String!
    name: String!
    value: Float!
    value_alt: Float
    fixed_price: Boolean!
    condition: String!
    selected: Boolean!
    available: Boolean!
  }

  type Receipt {
    base_price: Float!
    coverages: [ReceiptOffer]
    discounts: [ReceiptOffer]
    voucher: Float
    surcharge: Float
    total_price: Float!
  }

  type ReceiptOffer {
    id: String!
    value: Float!
    description: String!
  }
`;
