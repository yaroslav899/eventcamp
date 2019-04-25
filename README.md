This is <b>events board</b>

<h3>Setup Instructions</h3>
<ul>
    <li>Clone this repository</li>
    <li>Create 'credentials.js' file in '/src/'<br/>
        <code>
        export const adminAccess = {
            login: '***',
            password: '***',
        };
        </code>
        <br/>
        <code>
        export const reCaptcha = {
          siteKey: '***',
        };
        </code>
        <br/>
        <code>
        export const googleApiService = {
          ru: {
            key: '***',
            lang: '***',
          },
        };
        </code>
    </li>
    <li>npm i</li>
    <li>npm run dev<br/>npm run prodbuild</li>
</ul>

<h3>Using techologies</h3>
<ul>
    <li><b>Backend</b> - WordPress REST API<br/>
    doc: https://developer.wordpress.org/rest-api/
    </li>
    <li><b>Frontend</b> - React (^16.2.0) + Redux (^3.7.2)</li>
</ul>
