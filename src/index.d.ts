declare interface Song {
  id: string | number,
  mid: string,
  singer: string,
  name: string,
  album: any,
  duration: number,
  image: string,
  filename: string,
  url: string,
  favorite: boolean
}

declare interface ActiveLyric {
  txt?: string,
  lineNum?: number
}