import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.css']
})
export class SingerComponent implements OnInit {
  singerList: any[];
  groupTitle: string = '热门';
  offsetTopOfGroupTitles: number[];
  scrollTop: number = 0;
  active: number = 0;
  @ViewChildren('groupTitles')
  set groupTitles(q: QueryList<any>) {
    this.offsetTopOfGroupTitles = q.map(item => item.nativeElement.offsetTop);
  };

  constructor() {
    this.singerList = this.getSingerList();
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

  getSingerList () {
    return [
      {
        title: '热门',
        list: [
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
        ]
      },
      {
        title: 'A',
        list: [
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
        ]
      },
      {
        title: 'B',
        list: [
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
        ]
      },
      {
        title: 'C',
        list: [
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
        ]
      },
      {
        title: 'D',
        list: [
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
        ]
      },
      {
        title: 'E',
        list: [
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
        ]
      },
      {
        title: 'F',
        list: [
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
        ]
      },
      {
        title: 'G',
        list: [
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
          { avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000', name: '薛之谦' },
        ]
      },
    ]
  }

}