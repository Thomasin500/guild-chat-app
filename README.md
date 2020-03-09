# Guild Chat App by Thomas Freeman

## Description

This is a simple messenger style application. Users are automatically able to send and receive messages once connected to the server.

Video overview of the project can be found here: https://www.youtube.com/watch?v=Tpx3d5wbZ4o

Features:
- Ability to send and receive messages to everyone on the server nearly instantaneously.
- Notifications when users connect or disconnected from the chat as well as the current total number of connected users.
- Typing indicators. Other users are notified when you are typing.
- Local vs foreign messages. Allows for intuitive understanding of which messages you have sent versus which you have received from others.
- Mostly Responsive design. Multiple desktop and mobile dimensions should still be able to use the software.

## Instructions for Use

### Installation
1) Clone repo to a local folder
2) Navigate to that folder
3) `Npm Install`
4) Start the server `nodemon server.js`
5) Visit http://localhost:3000/

### Testing
To run backend tests: 
`npm run test`

To run front end test:
1) Open the project in a browser
2) Open devtools and the console
3) `mocha.run()`
4) Results will be on the page


## Dev Notes
This was a really interesting project. While the requirements were simple, the opportunities were seemingly endless. I actually had to stop myself from working on this till late in the night, the possible 
features and extensions kept my imagination alive. Also, it is rare that I have had the opportunity to bootstrap a project from a blank screen, completely from scratch. Starting from the ground up allowed 
me the freedom to develop and design as I saw fit.

When I first started outlining the architecture of the project with the requirements given, some kind of websockets seemed like the obvious choice. This is because of the real time communication needed and the bounty
of existing technologies that are out there in wild. From my research, 3 different options were evident and from those I wrote a pro/con list to decide which to use
- Socket.io
	- Pros:
		- Great documentation with examples and clear writing
		- Huge community support
		- Well known with lots of blog posts, talks, and other media
		- Recently updated
		- Easy to extended with a large feature set
	- Cons:
		- Quite a few open issues on github
		- Probably a bit 'more' than I actually needed for this project

- Pusher
	- Pros:
		- Very configurable
		- Updated recently
	- Cons:
		- Seemed like a bit more of a learning curve

- Faye
	- Pros:
		- Familiar API-like design
		- Very lightweight
		- Used by large companies such as groupme and myspace
	- Cons:
		- Docs were not so great
		- Has not been updated in a while, not source code changed in 9 months

After looking over the list and keeping in mind that I needed to develop this quickly while also keeping quality and simplicity in mind, I choose Socket.io. The deciding factors were mostly documentation, ease of use, 
and reliability. To be frank, working with Socket.io was a breeze. The docs were fantastic and clear, the community robust, and the github repo very much alive.

On the front end side, at first I started using JQuery because I figured I would need to do a decent amount of dom manipulation, but as I have experienced in the past, I quickly realized I could accomplish everything
I needed to using vanilla javascript. Therefore I removed it with the bonus of having simplified the codebase a bit. In the end, basic HTML, CSS, and JS was more than enough to fulfill the requirements and then some.

During the actual development of the project I ran into the familiar issue of having to restart the NodeJS server after every change. Thankfully this is a solved problem and the NPM package 'nodemon' allowed for 
instantaneous server restarts upon listened to code changes. This made development much much easier.

Finally, testing was a large part of the effort required for this project. From the beginning I was contemplating using CypressJS for my testing needs as I had used it before and was familiar with it. However, I considered this
a learning opportunity to check out something new, so I dipped my toes into the waters of Mocha/ChaiJS which I had never used before. Once I understand the basic syntax I was able to test many of the basic front end features
in the browser without much difficulty. The one aspect that took a bit of effort to learn well was how to test multiple clients communicating with each other within on browser during testing. This was mostly due to my backend 
architecture which allowed for certain events to only be seen by other users, such as the typing indicator and how foreign messages are displayed. However, once that was figured out, the rest of testing went well and I am happy 
to report that most if not all of the logical code, both front and back end, has a test or two to account for it.


## Lessons Learned and things I would have done differently
I certainly learned a thing or two that I will take with me in my career moving forward. Again, the value of having a TDD driven mindset helped tremendously as I was able to catch odd edge cases before they became bugs. 
An example of this was when I was testing the typing indicator and discovered that the user typing was also able to see the indicator which seemed of no value to the typing user. 

Given more time I would have implemented some sort of lasting data storage whether that be a database or otherwise. Currently the messages are lost upon a page refresh, I figured that would be fine for a project of this scope.
That being said, a persistent conversation would be preferable. 

Secondly, while the backend tests are automated to a degree (i.e. ran using an npm script) it would have been ideal if the front end tests were run in a headless browser or something equivalent. Currently the user has to 
load the application and run `mocha.run()` in the console. While certainly ok for this small project, automated tests are ideal.

Finally, here are some ideas I had for potential features:
- User registration and tagging messages as sent by a specific user
- Persisting messages through memory or a database
- Allowing users to delete or edit their messages
- Having a 'clear all' button to remove all existing messages
- Deploying to a hosting service so a simple URL could be visited apposed to running locally

## Known bugs
- Occasionally front end tests will fail with an error of 'Cannot read .innerText of null.' I have not been able to reproduce this reliably and simply refreshing the page or re-running the tests seems to work
- Not directly related to my code per say, but my last pass integration (a password manager with a chrome extension) throws an error when hitting 'enter' on the input field. While this does not affect the functionality of
the project at all, it certainly would be better to not have that error appear at all.
- The Typing indicator sometimes blinks when another user is typing.

