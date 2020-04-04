const typeDefs = `

    type User {
        userName: String
        born: Date
        name: String
        restaurants: [Restaurant] @relation(name: "ATE_AT", direction: "OUT")
        reviews: [Review] @relation(name: "HAS_POST", direction: "OUT")
    }
    type Review {
        foods: [String]
        starRating: Float
        reviewSummary: String
        images: [Image] @relation(name: "HAS_IMAGE", direction: "OUT")
        author: User @relation(name: "HAS_POST", direction: "IN")
    }
    type Image {
        caption: String
        url: String
    }
    type Cuisine{
      type: String
    }
    type City {
        name: String
        municipality: Municipality @relation(name: "IS_IN", direction: "OUT")
    }
    type Restaurant {
        name: String
        priceRange: String
        info: String
        cuisines: [Cuisine] @relation(name: "TYPE_OF", direction: "OUT")
        location: City @relation(name: "LOCATED_AT", direction: "OUT")
        reviews: [Review] @relation(name: "FOOD_REVIEW", direction: "IN")
    }

    type Municipality {
        provienceState: String
        country: Country @relation(name: "EXIST", direction: "OUT")
        cities: [City] @relation(name: "IS_IN", direction: "IN")
    }

    type Country {
        name: String
        municipalities: [Municipality] @relation(name: "EXIST", direction: "IN")
    }

    type Query {
        "A simple type for getting started!"
        hello: String
    }

    input CountryInput {
        countryName: String!
    }

    input MunicipalityInput {
        cityName: String
        provienceState: String
        countryName: String
    }

    type Mutation {
        createCountry(input: CountryInput!) : Country
    }
    `;
export default typeDefs;