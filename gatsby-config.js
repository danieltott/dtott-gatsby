module.exports = {
  siteMetadata: {
    title: 'Front-End Design and Development ~  Daniel T. Ott',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/danott.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Craft',
        fieldName: 'craft',
        // Url to query from
        url: 'http://dtott.test/api',
        // HTTP headers
        headers: {
          Authorization:
            'bearer GwyFgsxqfRsvsxX4tKJvbXbuwNE2Sus_qTPvwxipQEuO8j9CnboWmTVwOmfu5PSc',
          'Content-type': 'application/json',
        },
        // Additional options to pass to node-fetch
        fetchOptions: {},
      },
    },
  ],
}
