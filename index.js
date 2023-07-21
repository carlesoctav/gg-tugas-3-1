const mongoose = require('mongoose');
const {faker} = require('@faker-js/faker')
const Artist = require('./models/artist');
const Song = require('./models/song');
const  PopularSong = require('./models/popularsong');

function generatePlayCount(){
    return Math.floor(Math.random() * 100000000);
}

function randomYear(){
  // 1990 - 2023
  return Math.floor(Math.random() * 33) + 1990
}

function createArtist(){

  const randomAlbums = Math.floor(Math.random() * 10)
  const startDate = new Date('1990-01-01')
  const endDate = new Date('2022-12-31')
  return {
      name: faker.person.fullName(),
      dateOfBirth: faker.date.birthdate({ min: 16, max: 65, mode: 'age' }),
      genre: faker.music.genre(),
      albums: Array.from({length: randomAlbums}, () => faker.music.songName())
  }
}

async function createSong(){

  const artistList = await Artist.find()
  const random = Math.floor(Math.random() * artistList.length)
  
    return {
        title: faker.music.songName(),
        artist: artistList[random].name,
        playCount: generatePlayCount()
    }
}

async function createPopularSong(){
    const songList = await Song.find()
    const random = Math.floor(Math.random() * songList.length)
    const period = faker.date.month({abbreviated: true}) + " " + randomYear()
    return {
        period: period,
        title: songList[random].title,
        playCount: songList[random].playCount
    }
  }



async function populateArtist(){
    for (let i = 0; i < 20; i++) {
        const artist = new Artist(createArtist())
        await artist.save()
    }
}

async function populateSong(){
    for (let i = 0; i < 20; i++) {
        const song = new Song(await createSong())
        await song.save()
    }
}

async function populatePopularSong(){
    for (let i = 0; i < 20; i++) {
        const popularsong = new PopularSong(await createPopularSong())
        await popularsong.save()
    }
}

async function main(){
    mongoose.set('strictQuery', false)
    uri= process.env.MONGODB_URI || 'mongodb://localhost:27017/spotify'
    await mongoose.connect(uri)
    console.log("Connected to MongoDB")
    await populateArtist()
    await populateSong()
    await populatePopularSong()
    mongoose.connection.close()
}

main()
