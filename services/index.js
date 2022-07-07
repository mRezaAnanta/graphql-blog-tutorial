import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            author_name
                            id
                            author_photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        post_title
                        post_excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }      
    `

    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges;
}