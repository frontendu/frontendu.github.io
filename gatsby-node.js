/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions;

    return new Promise((resolve) => {
        if (page.path === '/') {
            // It's assumed that `landingPage.js` exists in the `/layouts/` directory
            page.layout = 'landing';

            // Update the page.
            createPage(page);
        }

        resolve();
    });
};