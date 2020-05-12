'use strict';

const _ = require('lodash');
const siteConfig = require('../../config.js');

module.exports = async (graphql, actions) => {
  const { postsPerPage } = siteConfig;

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);
  _.each(result.data.allMarkdownRemark.group, (tag) => {
  });
};
