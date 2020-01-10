import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const CardImage = (props) => {
  const episodeId = props.episodeId

  return (
    <StaticQuery
      query={graphql`
        query {
          images: allFile {
            edges {
              node {
                relativePath
                name
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        // Filter down to get the correct image.
        // This looks non-optimal. It is non-optimal, but this is a
        // build-time process, not a run-time process.
        const image = data.images.edges.find(n => {
          return n.node.relativePath.includes(episodeId)
        })

        if (!image) {
          return null
        }

        return <Img alt={episodeId} fluid={image.node.childImageSharp.fluid} />
      }}
    />
  )
}

export default CardImage
