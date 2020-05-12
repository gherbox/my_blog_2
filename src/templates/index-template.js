// @flow strict
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Page from "../components/Page";
import Pagination from "../components/Pagination";
import { useSiteMetadata } from "../hooks";
import Copyright from "../components/Sidebar/Copyright";
import Contacts from "../components/Sidebar/Contacts";
import { isMobile } from "react-device-detect";
import type { PageContext, AllMarkdownRemark } from "../types";

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext,
};

const IndexTemplate = ({ data, pageContext }: Props) => {
  const {
    title: siteTitle,
    subtitle: siteSubtitle,
    author,
    copyright,
  } = useSiteMetadata();

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath,
  } = pageContext;

  const { edges } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar isIndex />
      <Page>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>

      {isMobile && (
        <div
          style={{
            margin: "10px 10px 10px 10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Contacts contacts={author.contacts} />
          <Copyright copyright={copyright} />
        </div>
      )}
    </Layout>
  );
};

export const query = graphql`
  query IndexTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
          }
        }
      }
    }
  }
`;

export default IndexTemplate;
