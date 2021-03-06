CREATE (Bento:User {name:'William Pring', userName: 'Bento', born: date({year:1999, month:5, day:6}), about:'Foodie'})
CREATE (BeefBento:User {name:'Will Pringles', userName: 'BeefBento', born: date({year:1984, month:10, day:11}), about:'Foodie'})
CREATE (BeefBentoPost:Review {reviewSummary:'Green Curry is not bad a bit spicy', starRating: 4, foods: ['Green Curry']})
CREATE (BentoPost:Review {reviewSummary:'Amazing Thai Food MUST TRY!!!!', starRating: 4.5, foods: ['Thai Chicken Wings', 'Thai Ice Tea']})
CREATE (locateCountry:Country {name: 'Canada'} )
CREATE (locateCity:City {name: 'Toronto'} )
CREATE (locateMunicipality:Municipality {provienceState: "Ontario"} )
CREATE (PAI:Restaurant {name: 'PAI', bio: "Nuit & Jeff Regular's casual Northern Thai spot serving dishes like salted crab & papaya salad.", priceRange: 'medium', address: "18 Duncan St", postalCode: "M5H 3G8"})
CREATE(Thai: Cuisine {type: 'Thai' })
CREATE (PAI)-[:TYPE_OF]->(Thai)
CREATE (PAI)-[:LOCATED_AT]->(locateCity)
CREATE (locateCity)-[:IS_IN]->(locateMunicipality)
CREATE (locateMunicipality)-[:EXIST]->(locateCountry)
CREATE (BENTO_PICTURE:Image {caption: 'Thai Chicken Wing', url: 'https://via.placeholder.com/150'})
CREATE (BENTO_PICTURE1:Image {caption: 'Thai Ice Tea', url: 'https://via.placeholder.com/150'})
CREATE (BentoPost)-[:HAS_IMAGE {takeAt: date("2020-12-12")}]->(BENTO_PICTURE)
CREATE (BentoPost)-[:HAS_IMAGE {takeAt: date("2020-12-12")}]->(BENTO_PICTURE1)
CREATE (Bento)-[:HAS_POST {postedAt: date("2020-12-12")}]->(BentoPost)
CREATE (BeefBento)-[:HAS_POST {postedAt: date("2020-12-12")}]->(BeefBentoPost)
CREATE (BeefBento)-[:ATE_AT {count: 3, lastAteAt: date("2020-10-25"), favorite: true}]->(PAI)
CREATE (BentoPost)-[:FOOD_REVIEW]->(PAI)
CREATE (Sabai:Restaurant {name: 'Sabai Sabai', bio: "The cooking of Northern Thailand & Laos is featured with full bar in a relaxed, art-filled setting.", priceRange: 'medium', address: "81 Bloor St E", postalCode: "M4W 1A9"})
CREATE (Sabai)-[:LOCATED_AT]->(locateCity)
CREATE (Sabai)-[:TYPE_OF]->(Thai)
CREATE (BeefBentoPost)-[:FOOD_REVIEW]->(Sabai)
CREATE (Bento)-[:FOLLOWING {followSince: date("2020-01-01")}]->(BeefBento)
CREATE (BeefBento)-[:FOLLOWING {followSince: date("2020-01-01")}]->(Bento)



CREATE CONSTRAINT ON (user:User) ASSERT user.userName IS UNIQUE
CREATE CONSTRAINT ON (user:User)
ASSERT user.uuid IS UNIQUE;
CALL apoc.uuid.install('User')
YIELD label, installed, properties
RETURN label, installed, properties;


CREATE CONSTRAINT ON (restaurant:Restaurant) ASSERT restaurant.restaurantUUID IS UNIQUE;
CALL apoc.uuid.install('Restaurant', {addToExistingNodes: true, uuidProperty: 'restaurantUUID'})
YIELD label, installed, properties
RETURN label, installed, properties;




// CREATE (user)-[:HAS_POST {postedAt: date("2020-12-12")}]->(BentoPost)
// CREATE (usera)-[:]->(d);

MATCH (user:User {userName: "BeefBento"})
create (user)-[:]->(b {name : "bar"}),
       (c {name: "Baz"})-[:GOODBYE]->(d {name:"Quux"});

MATCH (user:User {userName: "BeefBento"})
create (user)-[:HAS_POST]->(review:Review {reviewSummary:'Green Curry is not bad a bit spicy', starRating: 4, foods: ['Green Curry']}),


MATCH (user:User {userName: "BeefBento"})
MATCH (review:Review {userName: "BeefBento"})
CREATE (user)-[:HAS_POST]->(review:Review {reviewSummary:'Green Curry is not bad a bit spicy', starRating: 4, foods: ['Green Curry']}),
CREATE (review)-[:GOODBYE]->(d {name:"Quux"});


match (:Cuisine)<-[:TYPE_OF]->(R:Restaurant)<-[FOOD_REVIEW]-(review:Review)
RETURN R.name, review.starRating
ORDER BY review.starRating desc