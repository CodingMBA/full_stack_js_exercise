const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.set('views', 'views' )
app.use(express.static('public'))
app.set("view engine", "ejs")

// Declare and define variables
const gifsCount = 22 // Total count of gif files; assumed to stay constant
const pageSize = 10 // Set the number of gifs to display per page
const pageCount = Math.ceil(gifsCount / pageSize) // Round # of pages up
let currentPage = 1 // Start at page 1 as default
let gifsAll = [] // All gifs
let gifsArrays = [] // To hold subarrays of gifs for each page
let gifsList = [] // Gifs for current page

// INDEX - Display all gifs; # per page defined by pageSize
app.get('/', function (req, res) {
  
  // Populate the gifsAll array with paths to all gifs
  for (let i = 0; i < gifsCount; i++) {
    gifsAll.push(`gifs/${i}.gif`)
  }
  // Divide array of all gifs into subArrays by page
  while (gifsAll.length > 0) {
    gifsArrays.push(gifsAll.splice(0, pageSize));
  }

  // Set value of current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }

  // Define array of gifs for current page
  gifsList = gifsArrays[+currentPage - 1];

  res.render('index', {
    gifsList: gifsList,
    pageCount: pageCount,
    currentPage: currentPage
  })
})

// RANDOM - Display a random image
app.get('/random', function (req, res) {
  // Regenerate array of all gifs for random selection
  for (let i = 0; i < gifsCount; i++) {
    gifsAll.push(`gifs/${i}.gif`)
  }

  // Named the ejs file 'show' as functionality is similar to show page
  res.render('show', {
    gifsAll: gifsAll
  })
})

app.listen(port, function () {
  console.log(`Full Stack - JavaScript listening on port ${port}!`)
})