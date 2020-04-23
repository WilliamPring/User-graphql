

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
        uuid: ID!
        _id: ID!
        userName: String
        bio: String
        born: Date
        name: String
        restaurants: [Restaurant] @relation(name: "ATE_AT", direction: "OUT")
        posts: HAS_POST
        dined: ATE_AT
        followers: [User] @relation(name: "FOLLOWING", direction: "OUT")
        following: [User] @relation(name: "FOLLOWING", direction: "IN")
    }

    type Review {
        _id: ID!
        foods: [String]
        starRating: Float
        reviewSummary: String
        images: [Image] @relation(name: "HAS_IMAGE", direction: "OUT")
        comments: HAS_POST
    }

    type Image {
        _id: ID!
        caption: String
        url: String
    }
    type Cuisine {
       _id: ID!
      type: String
      restaurants: [Restaurant] @relation(name: "TYPE_OF", direction: "IN")
    }
    type City {
        _id: ID!
        name: String
        municipality: Municipality @relation(name: "IS_IN", direction: "OUT")
        restaurants:  [Restaurant] @relation(name: "LOCATED_AT", direction: "IN")
    }
    type Restaurant {
        _id: ID!
        name: String
        priceRange: String
        info: String
        cuisines: [Cuisine] @relation(name: "TYPE_OF", direction: "OUT")
        location: City @relation(name: "LOCATED_AT", direction: "OUT")
        reviews: [Review] @relation(name: "FOOD_REVIEW", direction: "IN")
        postalCode: String
        address: String
        vistedCount: ATE_AT
        startRating: Float @cypher(
            statement: "MATCH (this)<-[:FOOD_REVIEW]-(review:Review) return avg(review.starRating)"
        )
    }

    type Municipality {
        _id: ID!
        provienceState: String
        country: Country @relation(name: "EXIST", direction: "OUT")
        cities: [City] @relation(name: "IS_IN", direction: "IN")
    }

    type Country {
        _id: ID!
        name: String
        municipalities: [Municipality] @relation(name: "EXIST", direction: "IN")
    }

    type Query {
        "A simple type for getting started!"
        hello: String
    }

    input CountryInput {
        countryName: String!
        municipalities: [MunicipalityInput]
    }

    input MunicipalityInput {
        provienceStateName: String!
        cities: [String]
    }

    input UserInput {
        userName: String!
        born: String!
        name: String!
        bio: String
    }
    input UserFollowing {
        userId: ID!
        userToFollow: ID!
    }
    type Mutation {
        CreateCountry(input: CountryInput!) : Country
        CreateUser(input: UserInput!) : User
        CreateFollowing(input: UserFollowing!): User

        AddFollower(userName: String!, followerUserName: String!): User @cypher(
            statement:"""
                MATCH (from:User {userName: $userName})
                MATCH (to:User {userName: $followerUserName})
                MERGE (from)-[:FOLLOWING]->(to)
                RETURN to
            """)
        RemoveFollower(userName: String!, followerUserName: String!): User @cypher(
            statement:"""
            MATCH (from:User{userName: $userName})-[r:FOLLOWING]->(to:User{userName: $followerUserName})
            DELETE r
            RETURN from
            """)
    }
    `;
export default typeDefs;