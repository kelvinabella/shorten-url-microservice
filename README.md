# Timestamp Microservice

Full stack JavaScript service that will give a shortened URL in the JSON response. A [FreeCodeCamp](https://www.freecodecamp.org/challenges/timestamp-microservice) project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

```
git clone https://github.com/kelvinabella/shorten-url-microservice.git
cd shorten-url-microservice
create .env file and connect to your mongodb
yarn install
yarn start
```

### Usage

```
User stories:

I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
When I visit that shortened URL, it will redirect me to my original link.
```

```
Usage:
http://localhost:3000/https://www.google.com
http://localhost:3000/http://foo.com:80

Example output:
{ "original_url":"http://foo.com:80", "short_url":"http://localhost:3000/8170" }
```

```
Usage:
https://localhost/2871

Will redirect to:
https://www.google.com/
```


## License

This project is licensed under the MIT License.

## Acknowledgments

*FreeCodeCamp
