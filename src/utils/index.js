function randomIntNum(min, max) {
  return ~~(Math.random()*(max-min+1)+min)
}

export default {
  randomIntNum
}
