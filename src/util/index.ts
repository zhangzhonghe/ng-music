let _uid = '';

function getUid (): string {
  if (_uid) {
    return _uid
  }
  if (!_uid) {
    const t = (new Date()).getUTCMilliseconds()
    _uid = '' + Math.round(2147483647 * Math.random()) * t % 1e10
  }
  return _uid;
};

/**
 * 生成获取歌曲播放地址时的参数对象
 * @param mids 歌曲的mid列表
 * @param types 歌曲的类型列表
 */
export function genUrlMid (mids: string[], types: number[]): object {
  const guid = getUid();
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  };
};

/**
 * 为一个url地址添加查询参数
 * @param url 完整的url地址
 * @param params 查询参数对象
 */
export function addQuery (url: string, params: object): string {
  let param = '';
  for (var k in params) {
    let value = params[k] !== undefined ? params[k] : '';
    param += '&' + k + '=' + encodeURIComponent(value);
  };

  return url += ((url.indexOf('?') < 0 ? '?' : '&') + (param ? param.substring(1) : ''));
};

/**
 * 把多位歌手组合成一个字符串
 * @param singer 歌手列表
 */
export function filterSinger (singer: any[]): string {
  let ret = [];
  if (!singer) {
    return '';
  };
  singer.forEach((s) => {
    ret.push(s.name);
  });
  return ret.join('/');
};