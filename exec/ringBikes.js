const bikes = require( '../data/bikeids.json' )
const ringBike = require( './ringBike' )
// const last15 = require( '../data/last15bikesbackwards.json' )
const readline = require( 'readline' )
const {
  writeToErrorFile
} = require( '../exports' )
const rl = readline.createInterface( {
  input: process.stdin,
  output: process.stdout,
  terminal: false
} )

async function ringBikes( bikesArray, n ) {
  const firstNBikes = bikesArray.slice( 0, n )
  try {
    for ( let bike of firstNBikes ) {
      const lat = bike.attributes.latitude
      const lng = bike.attributes.longitude
      const res = await ringBike( bike.id, lat, lng )
      console.log( res.data )
      console.log( res.status )
      console.log( res.statusText )
      console.log( `Am sunat ${bike.attributes.plate_number} aka` )
      console.log( bike.id )
    }
  } catch ( e ) {
    console.log( `Nu mere sa sune trotii` )
    console.log( e )
    console.log( e.response.headers[ 'set-cookie' ] )
    writeToErrorFile( e )
  }
  rl.close()
}

function doThething() {
  rl.question( `Cate troti vrei sa suni boossu?\n`, async nr => {
    ringBikes( bikes, nr )
  } )
}

doThething()





module.exports = ringBikes