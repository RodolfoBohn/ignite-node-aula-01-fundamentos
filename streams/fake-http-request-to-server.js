import {OneToHundredStream} from './fundamentals.js'

fetch('http://localhost:3334', {
  method: 'POST', 
  body: new OneToHundredStream(),
  duplex: 'half'
})