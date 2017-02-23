# FCC Book Trading App

FCC Book Trading Club App is a fullstack JavaScript app to implement an where a user can trade books with other users. The user can build an "online" library of the books he owns and request to trade them with other users.

This app uses the Google Books API to identify books and present their author, etc.

* [FreeCodeCamp] - Link to the exercice
* [Heroku] - Online deployed version

### APP description

Below is a list of use cases.

  - **Use-case 1:** I can view all books posted by every user.
  - **Use-case 2:** I can add a new book.
  - **Use-case 3:** I can update my settings to store my full name, city, and state.
  - **Use-case 4:** I can propose a trade and wait for the other user to accept the trade.
  

## Local Installation

You'll need to have the latest verison of node.js installed. Either use your OS's package manager or follow the installation instructions on the [official website](http://nodejs.org).

Next, [install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) if it is not already installed. To clone this repository to your local machine, open a command line interface and navigate to your projects directory.

You will also need Gulp (`npm install --global gulp`) and MongoDB. Then type:

`$ git clone https://github.com/sergiomgaspar/smg-book-trade.git`

Move to the `smg-book-trade` subdirectory and type `npm install`. This installs all of the APP dependencies.

Finally, type `gulp serve` to start the application. If all goes well, it will be available at `http://localhost:3000`.

To deploy a "production-ready" version of the app type `gulp build` and deploy the contents of the "dist" folder.

### IMPORTANT
This node app uses MongoDB (free mongoLab instance). The user/password are not correct and you will not be able to logon. Create your instance in mongoLab and **allways define the user and password and environment variables** *(never leave them inside code commited in gitHub!!!)*.

## Technologies used

In the about section of the page the used technologies are listed and described

## License

[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png)](http://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the author has waived all copyright and related or neighboring rights to this work.

[FreeCodeCamp]: <https://www.freecodecamp.com/challenges/manage-a-book-trading-club>
[Heroku]: <https://smg-book-trade.herokuapp.com/>
