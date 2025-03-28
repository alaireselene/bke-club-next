import { gql } from "@apollo/client"

const CLUB_DATA_FIELDS = gql`
fragment ClubDataFields on Club {
  clubData {
    establishedYear
    membersCount
    president {
      presidentName
      presidentEmail
    }
    advisors {
      advisorName
      advisorEmail
    }
  }
}
`

const SCHOOL_FIELDS = gql`
fragment SchoolFields on School {
  databaseId
  name
  slug
}
`

export { CLUB_DATA_FIELDS, SCHOOL_FIELDS }