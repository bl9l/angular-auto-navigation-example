import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation-layout',
  templateUrl: './navigation-layout.component.html',
  styleUrls: ['./navigation-layout.component.css']
})
export class NavigationLayoutComponent implements OnInit {

  // Базовый URL от которо будут строится дочерние
  baseUrl = '';

  constructor(
    private _router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
    _router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this._updateBaseUrl(
          this._flattenSegments()
        );
      }
    });
  }

  ngOnInit() {
  }

  // Возвращает массив сегментов текущего роута
  private _flattenSegments() {

    // По сегментам будем проходить рекурсивно,
    // так как они вложены друг в друга
    function _flatten(segments: ActivatedRouteSnapshot[], res: ActivatedRouteSnapshot[] = []) {
      segments.forEach(s => {
        res.push(s);

        _flatten(s.children, res);
      });

      return res;
    }

    return _flatten([this.activatedRoute.root.snapshot]);
  }

  // Обновляет базовый URL
  private _updateBaseUrl(segments: ActivatedRouteSnapshot[]) {

    // Изначально ActivatedRoute хранит сегменты вложеными.
    // Ранее мы вызвали "выпрямитель", который преобразовал
    // дерево в плоский массив.
    const segmentIndex = segments
      // Теперь в этом массиве ищем сегмент на который
      // мы повесили наш лейаут
      .findIndex(s => s.component === this.constructor);

    // Собираем базовый URL
    this.baseUrl = '/' + segments
      // сегменты после нашего нас не интересуют
      .splice(0, segmentIndex + 1)
      // убираем сегометы с пустым path
      .filter(s => s.routeConfig && s.routeConfig.path)
      // получаем path сегментов
      .map(s => s.routeConfig.path)
      // склеиваем
      .join('/');
  }
  

}
