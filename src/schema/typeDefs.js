const typeDefs = `
    type HAS_IMAGE @relation(name: "HAS_IMAGE", direction: "OUT") {
        from: Review!
        to: Image!
        takenAt: Date
    }
    type HAS_POST @relation(name: "HAS_POST") {
        from: User!
        to: Review!
        postedAt: Date
    }
    type ATE_AT @relation(name: "ATE_AT") {
        from: User!
        to: Restaurant!
        lastAteAt: Date
        count: Int
        favorite: Boolean
    }
    type User {
        userName: String
        born: Date
        name: String
        restaurants: [Restaurant] @relation(name: "ATE_AT", direction: "OUT")
        posts: HAS_POST
        dined: ATE_AT
    }

    type Review {
        foods: [String]
        starRating: Float
        reviewSummary: String
        images: [Image] @relation(name: "HAS_IMAGE", direction: "OUT")
        comments: HAS_POST
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
        vistedCount: ATE_AT
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

    type Mutation {
        createCountry(input: CountryInput!) : Country
    }
    `;
export default typeDefs;