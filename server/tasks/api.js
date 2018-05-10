const rp = require('request-promise-native')

async function fetchMovie(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const res = await rp(url)
  return res
}

; (async () => {
  let movies = [
    {
      doubanId: 4920389,
      title: '头号玩家',
      rate: 8.9,
      poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2497576479.jpg'
    }
  ]

  movies.map(async movie => {
    let movieData = await fetchMovie(movie)

    try {
      movieData = JSON.parse(movieData)
      console.log(movieData.summary)
    } catch (err) {
      console.log(err)
    }
  })
})()