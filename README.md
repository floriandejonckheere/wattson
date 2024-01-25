# Wattson

![Continuous Integration](https://github.com/floriandejonckheere/wattson/workflows/Continuous%20Integration/badge.svg)

Wattson is a smart energy assistant for the RESPONSE2020 High-Level Energy Management System (HL-EMS) project.

Navigate to [https://wattson.dejonckhee.re](https://wattson.dejonckhee.re) to access the application.

![Screenshot](https://github.com/floriandejonckheere/wattson/raw/master/2-overview.png)

<a href="https://github.com/floriandejonckheere/wattson/raw/master/4-history.png"><img src="https://github.com/floriandejonckheere/wattson/raw/master/4-history.png" width="49%" height="auto"></a>
<a href="https://github.com/floriandejonckheere/wattson/raw/master/6-suggestions.png"><img src="https://github.com/floriandejonckheere/wattson/raw/master/6-suggestions.png" width="49%" height="auto"></a>

<a href="https://github.com/floriandejonckheere/wattson/raw/master/1-signup.png"><img src="https://github.com/floriandejonckheere/wattson/raw/master/1-signup.png" width="49%" height="auto"></a>
<a href="https://github.com/floriandejonckheere/wattson/raw/master/7-alerts.png"><img src="https://github.com/floriandejonckheere/wattson/raw/master/7-alerts.png" width="49%" height="auto"></a>

<a href="https://github.com/floriandejonckheere/wattson/raw/master/2-overview-dark.png"><img src="https://github.com/floriandejonckheere/wattson/raw/master/2-overview-dark.png" width="49%" height="auto"></a>
<a href="https://github.com/floriandejonckheere/wattson/raw/master/8-settings.png"><img src="https://github.com/floriandejonckheere/wattson/raw/master/8-settings.png" width="49%" height="auto"></a>

## Installation

Please ensure you have a working [Node.js](https://nodejs.org/en/) environment.
Install the [Yarn](https://yarnpkg.com/) package manager, then install the project dependencies:

```sh
yarn install
```

## Usage

Run the development server:

```sh
yarn dev
```

The application will be available at [http://localhost:5137](http://localhost:5137).
The API server is proxied through the development server to mitigate CORS issues.
To change the API server address, change the IP address in `vite.config.ts`.

## Building

For your convenience, a Dockerfile is provided to build a production-ready image.
The image uses [NGINX](https://www.nginx.com/) to serve the static files, and proxy API requests to the API server.

To build the image, run:

```sh
docker build -t wattson .
```

To run the image, run:

```sh
docker run -p 80:80 wattson
```

## License

Copyright 2023 Florian Dejonckheere
