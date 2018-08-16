import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <header role="banner">
    {/* {% if section == 'home' %}
    <h1 class="banner-name">Daniel T. Ott</h1>
    <h2 class="banner-tagline">Client-Side Design &amp; Development</h2>
    {% else %} */}
    <Link className="banner-name" to="/">
      Daniel T. Ott
    </Link>
    <Link className="banner-tagline" to="/">
      Client-Side Design &amp; Development
    </Link>
    {/* {% endif %} */}
  </header>
)

export default Header
