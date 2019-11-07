import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.css']
})
export class SingerComponent implements OnInit {
  singerList: any[] = [];
  groupTitle: string = '热门';
  offsetTopOfGroupTitles: number[];
  scrollTop: number = 0;
  active: number = 0;
  @ViewChildren('groupTitles')
  set groupTitles(q: QueryList<any>) {
    this.offsetTopOfGroupTitles = q.map(item => item.nativeElement.offsetTop);
  };

  constructor(
    private _api: ApiService
  ) {
    this.getSingerList().subscribe(val => {
      this.singerList = this._formatSingerList(val)
        .filter(item => item.list.length);
    });
  }

  ngOnInit() {
  }

  onScroll (e) {
    const firstIndex = this.offsetTopOfGroupTitles.findIndex(item => e.target.scrollTop < item);
    this.active = firstIndex >= 0 ? firstIndex - 1 : this.offsetTopOfGroupTitles.length - 1;
    this.groupTitle = this.singerList[this.active].title;
  }

  onSelectedOfNavBar (i) {
    const current = this.offsetTopOfGroupTitles[i] + 1;  // 如果不加1，点击A的时候，标题还是“热门”，多加1像素的滚动距离就能解决这个问题

    // 如果把一个相同的值赋给scrollTOP，视图并不会更新，需要赋值一个不同的值，才能触发视图更新
    if (this.scrollTop === current) {
      this.scrollTop = current - 1;
    } else {
      this.scrollTop = current;
    }
  }

  private _formatSingerList (list) {
    const index = ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    list = list.map(item => {
      item.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`;
      return item;
    });
    
    return index.map((item, i) => {
      if (i === 0)
        return {
          title: '热门',
          list: list.slice(0, 10)
        };
      return {
        title: item,
        list: list.filter(singer => singer.Findex === item)
      };
    });
  }

  getSingerList () {
    return this._api.getSingerList();
  }

}