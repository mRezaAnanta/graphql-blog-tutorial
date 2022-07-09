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
    `;

    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3    
            ) {
                post_title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query)

    return result.posts;
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories }}}
                last: 3
            ) {
                post_title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query, { categories, slug });

    return result.posts;
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query)

    return result.categories;
}

export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug}) {
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
                post_content {
                    raw
                }
            }
        }      
    `;

    const result = await request(graphqlAPI, query, { slug })

    return result.post;
};