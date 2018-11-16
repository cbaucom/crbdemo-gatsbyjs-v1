import React, { Component } from 'react'
import Link from 'gatsby-link'
import nicetime from '../helpers/nicetime'

import kebabCase from 'lodash/kebabCase'
import 'prismjs/themes/prism-okaidia.css'

// import ReadingProgress from '../components/ReadingProgress'
import SEO from '../components/SEO'
import Cover from '../components/Cover'
import Comments from '../components/Comments'
import PostLoop from '../components/PostLoop'
import Twitter from '../components/icons/Twitter'

export default class BlogPost extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const skip = false
    const post = this.props.data.blog
    let related
    this.props.data.relatedPosts
      ? (related = this.props.data.relatedPosts.edges)
      : (related = null)
    const currentDate = new Date()

    const tags = post.frontmatter.tags.map(tag => (
      <li key={tag}>
        <Link to={'/tags/' + kebabCase(tag)}>#{tag}</Link>
      </li>
    ))

    let postImage = post.frontmatter.cover_image.publicURL
    let postDate = new Date(post.frontmatter.date)

    if (post.frontmatter.cover_image.childImageSharp !== null) {
      postImage =
        post.frontmatter.cover_image.childImageSharp &&
        post.frontmatter.cover_image.childImageSharp.sizes &&
        post.frontmatter.cover_image.childImageSharp.sizes.src
    }

    return (
      <div className="Blog">
        {/*----- Reading progress only on blog -----*/}
        {/* {post.frontmatter.section === 'blog' && 
          <ReadingProgress targetEl="#Article" />
        } */}
        <SEO
          key={`seo-${post.fields.slug}`}
          postImage={postImage}
          postData={post}
          isBlogPost
        />
        <article id="Article" className={'ArticlePage ' +   post.frontmatter.section} >
          {/*----- Cover image only on blog -----*/}
          {post.frontmatter.section === 'blog' && <Cover image={post.frontmatter.cover_image} /> }
          <section className="container">
            {/*----- Post content -----*/}
            <section className="content">
              <h1 className="Title">{post.frontmatter.title}</h1>
              
              <span className="date">
                Originally Posted: 
                {nicetime(currentDate, postDate)}
              </span>

              <div dangerouslySetInnerHTML={{ __html: post.html }} />

              {/*----- Share on twitter -----*/}
              <aside className="meta">                
                <section className="share">
                  <a
                    href={`http://twitter.com/share?text=Check this out&url=https://crbaucom.com${post.fields.slug}&hashtags=${
                      post.frontmatter.tags
                    }`}
                    className="twitter"
                  >
                    {post.frontmatter.section === 'blog'
                      ? 'Share on Twitter'
                      : 'Share'}
                    <Twitter />
                  </a>
                </section>
              </aside>

              <aside className="TagCloud small">
                <ul>{tags}</ul>
              </aside>

            </section>
          </section>
        </article>

        {post.frontmatter.section === 'blog' && <Comments post={post} />}

        {related ? (
          <nav className="RelatedPosts container">
            <h3 className="Title">Related Articles</h3>
            <PostLoop loop={related} skip={skip} />
          </nav>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export const query = graphql`
  query BlogPostQuery($slug: String!, $tag: String!) {
    blog: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        cover_image {
          publicURL
          childImageSharp {
            sizes(maxWidth: 1240) {
              tracedSVG
              src
              srcSet
            }
          }
        }
        date(formatString: "DD MMMM, YYYY")
        tags
        section
      }
      fields {
        slug
      }
    }
    relatedPosts: allMarkdownRemark(
      limit: 2
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { slug: { ne: $slug } }
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            cover_image {
              publicURL
              childImageSharp {
                sizes(maxWidth: 1240) {
                  src
                  srcSet
                }
              }
            }
            date(formatString: "DD MMMM, YYYY")
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
