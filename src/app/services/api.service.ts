import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { pluck, tap, catchError, map, retry } from 'rxjs/operators';
import { genUrlMid } from '../../util/index';
import { UserService } from './user.service';
import { PlayerService } from './player.service';
import { addQuery, filterSinger } from '../../util/index';

const commonParams = {
  g_tk: '1928093487',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: '0',
  format: 'jsonp'
};

@Injectable()
export class ApiService {
  showLoading = false;

  constructor(
    private _http: HttpClient,
    private _user: UserService,
    private _player: PlayerService
  ) { }

  private _handleError (err: HttpErrorResponse) {
    console.error(err);
    this._player.playNextSong();
    return throwError('出现了一点问题，请稍后再试！');
  }

  createSong (musicData: any): Song {
    const favorite = this.getFavorite(musicData.songmid);
    
    return {
      id: musicData.songid,
      mid: musicData.songmid,
      singer: filterSinger(musicData.singer),
      name: musicData.songname,
      album: musicData.albumname,
      duration: musicData.interval,
      image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
      url: musicData.url,
      filename: `C400${musicData.songmid}.m4a`,
      favorite: favorite
    }
  }

  getFavorite (songmid: string): boolean {
    const likeList = this._user.getLikeList();
    return likeList.some(item => item.mid === songmid);
  }

  getRecommend (): Observable<any[]> {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const query = Object.assign({}, commonParams, {
      platform: 'h5',
      uin: '0',
      needNewCode: '1'
    });

    return this._http.jsonp(addQuery(url, query), 'jsonpCallback').pipe(
      catchError(this._handleError),
      pluck('data', 'slider')
    );
  }

  getDiscList (): Observable<any[]> {
    const url = 'https://www.mu-zi.xyz/api/getSongsList';

    const query = Object.assign({}, commonParams, {
      platform: 'yqq',
      hostUin: '0',
      sin: '0',
      ein: '29',
      sortId: '5',
      needNewCode: '0',
      categoryId: '10000000',
      rnd: Math.random().toString(),
      format: 'json'
    });

    this.showLoading = true;
    
    return this._http.get(addQuery(url, query)).pipe(
      catchError(this._handleError),
      tap(() => this.showLoading = false),
      pluck('data', 'list')
    );
  }

  getSongList (disstid) {
    const url = 'https://www.mu-zi.xyz/api/getSongList'

    const query = Object.assign({}, commonParams, {
      disstid,
      type: '1',
      json: '1',
      utf8: '1',
      onlysong: '0',
      platform: 'yqq',
      hostUin: '0',
      needNewCode: '0',
      format: 'json'
    });

    this.showLoading = true;

    return this._http.get(addQuery(url, query)).pipe(
      catchError(this._handleError),
      // tap(() => this.showLoading = false),
      pluck('cdlist', '0'),
      map(val => {
        val['songlist'] = val['songlist'].map(item => this.createSong(item));
        return val;
      })
    );
  }

  getSingerList () {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const query = Object.assign({}, commonParams, {
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: '100',
      pagenum: '1',
      hostUin: '0',
      needNewCode: '0',
      platform: 'yqq'
    });

    this.showLoading = true;

    return this._http.jsonp(addQuery(url, query), 'jsonpCallback').pipe(
      catchError(this._handleError),
      pluck('data', 'list'),
      tap(() => this.showLoading = false)
    );
  }

  getSingerDetail (singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const query = Object.assign({}, commonParams, {
      hostUin: '0',
      needNewCode: '0',
      platform: 'yqq',
      order: 'listen',
      begin: '0',
      num: '80',
      songstatus: '1',
      singermid: singerId
    });

    this.showLoading = true;
    
    return this._http.jsonp(addQuery(url, query), 'jsonpCallback').pipe(
      catchError(this._handleError),
      // tap(() => this.showLoading = false),
      pluck('data'),
      map(val => {
        val['list'] = val['list'].map(item => this.createSong(item.musicData));
        return val;
      })
    );
  }

  getTopList (): Observable<any[]> {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

    const query = Object.assign({}, commonParams, {
      uin: '0',
      needNewCode: '1',
      platform: 'h5'
    });

    this.showLoading = true;
    
    return this._http.jsonp(addQuery(url, query), 'jsonpCallback').pipe(
      catchError(this._handleError),
      tap(() => this.showLoading = false),
      pluck('data', 'topList')
    );
  }

  getMusicList (topid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

    const query = Object.assign({}, commonParams, {
      topid,
      needNewCode: '1',
      uin: '0',
      tpl: '3',
      page: 'detail',
      type: 'top',
      platform: 'h5'
    });

    this.showLoading = true;

    return this._http.jsonp(addQuery(url, query), 'jsonpCallback').pipe(
      catchError(this._handleError),
      // tap(() => this.showLoading = false),
      map(val => {
        val['songlist'] = val['songlist'].map(item => this.createSong(item.data));
        return val;
      })
    );
  }

  getHotKey () {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const query = Object.assign({}, commonParams, {
      uin: '0',
      needNewCode: '1',
      platform: 'h5'
    });

    this.showLoading = true;

    return this._http.jsonp(addQuery(url, query), 'jsonpCallback').pipe(
      catchError(this._handleError),
      tap(() => this.showLoading = false),
      pluck('data', 'hotkey'),
      map((val: any) => val.slice(0, 10))
    );
  }

  search (data: string, page: number, zhida: boolean, perpage: number) {
    const url = 'https://www.mu-zi.xyz/api/search';

    const query = Object.assign({}, commonParams, {
      w: data,
      p: page,
      perpage,
      n: perpage,
      catZhida: zhida ? '1' : '0',
      zhidaqu: '1',
      t: '0',
      flag: '1',
      ie: 'utf-8',
      sem: '1',
      aggr: '0',
      remoteplace: 'txt.mqq.all',
      uin: '0',
      needNewCode: '1',
      platform: 'h5',
      format: 'json'
    });
    
    this.showLoading = true;

    return this._http.get(addQuery(url, query)).pipe(
      catchError(this._handleError),
      tap(() => this.showLoading = false),
      pluck('data'),
      tap((val: any) => val.song.list = val.song.list.map(item => this.createSong(item)))
    );
  }

  getLyric (mid): Observable<any> {
    const url = 'https://www.mu-zi.xyz/api/lyric';

    const query = Object.assign({}, commonParams, {
      songmid: mid,
      platform: 'yqq',
      hostUin: '0',
      needNewCode: '0',
      categoryId: '10000000',
      pcachetime: +new Date(),
      format: 'json'
    });

    return this._http.get(addQuery(url, query)).pipe(
      catchError(this._handleError)
    )
  }

  setSongsUrl (songs: Song[]) {
    const url = 'https://www.mu-zi.xyz/api/getPurlUrl';

    let mids: string[] = []
    let types: number[] = []

    songs.forEach((song) => {
      mids.push(song.mid)
      types.push(0)
    });

    const urlMid = genUrlMid(mids, types)

    const data: object = Object.assign({}, commonParams, {
      g_tk: '5381',
      format: 'json',
      platform: 'h5',
      needNewCode: '1',
      uin: '0'
    })

    // const params = new HttpParams();
    // params.append('comm', data);
    // params.append('req_0', urlMid);

    const params = {
      comm: data,
      req_0: urlMid
    };

    return this._http.post(url, params).pipe(
      catchError(this._handleError),
      map(res => {
        if (res['code'] === 0) {
          let urlMid = res['req_0']
          if (urlMid && urlMid.code === 0) {
            const purlMap = {}
            urlMid.data.midurlinfo.forEach((item) => {
              if (item.purl) {
                purlMap[item.songmid] = item.purl
              }
            })
            if (Object.keys(purlMap).length > 0) {
              return purlMap;
            } else {
              throwError('Error!');
            }
          } else {
            throwError('Error!');
          }
        } else {
          throwError('Error');
        }
      }),
      retry(3),
      map((purlMap) => {
        songs = songs.filter((song) => {
          const purl = purlMap[song.mid]
          if (purl) {
            song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl;
            return true;
          }
          return false;
        });
        return songs;
      }),
      tap(() => this.showLoading = false)
    );
  }
}
