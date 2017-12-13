Peace visitor ✌️!

We were tasked with putting together a final project for the Bitmaker full-stack web dev bootcamp in a timeframe of 2 weeks. I created Wanderers which is an interactive trip planner (https://wanderersapp.herokuapp.com/). It offers the user the possibility of adding stops to a trip while comunication with friends in real time via chat or video chat and it allows the user to store their memories by adding images to a trip.

This is the front-end microservice. I am aware that the user experience can be greatly improved and so I'm currently working on that aspect of the project (as of today Dec 13/2017).

For this project I used the following technologies:

- Google places -> main api

- Back end: Ruby on Rails
* Postgres -> main db
* Doorkeeper -> authentication
* Action Cable -> real time functionality
* Redis -> action cable db
* Celluloid::IO -> async ruby
* Twilio Video -> peer to peer connection
* Carrierwave + Minimagick + Fog aws + Amazon s3 -> Handling images
* Geocoder
* Rspec + Factory bot -> basic testing

- Front end: React
* Mobx -> state management
* Styled components -> styling
* React motion -> page transitions
* Jest + Enzyme + Sinon -> basic testing
