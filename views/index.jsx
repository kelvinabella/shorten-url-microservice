var React = require('react')
var DefaultLayout = require('./layouts/default')

class Index extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div className="container">
          <h1 className="header">FreeCodeCamp API Basejump: URL Shortener Microservice</h1>
          <blockquote>
            <p>User stories:</p>
            <ul>
              <li>I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.</li>
              <li>When I visit that shortened URL, it will redirect me to my original link.</li>
            </ul>
          </blockquote>
          <h3>Example creation usage:</h3>
          <code>http://localhost:3000/https://www.google.com</code>
          <br/>
          <code>http://localhost:3000/http://foo.com:80</code>
          <h3>Example creation output</h3>
          <code>
            {
              '{"original_url":"http://foo.com:80", "short_url":"https://localhost.com/8170"}'
            }
          </code>
          <h3>Usage:</h3>
          <code>https://localhost:3000/2871</code>
          <h3>Will redirect to:</h3>
          <code>https://www.google.com/</code>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = Index
