import { Component, EventEmitter, Input, Output } from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

const DELIVERY_TARIFF = 25;
const MINIMUM_COST = 1000;
@Component({
  selector: 'app-map-form',
  templateUrl: './map-form.component.html',
  styleUrls: ['./map-form.component.css'],
})
export class MapFormComponent {
  apikey = 'd9372196-27a2-4ae5-a99b-d4cc91c95fd5';
  point!: any;
  @Input()
  total!: number;
  @Output()
  totalChange = new EventEmitter();
  constructor(private http: HttpClient) {}

  // Функция, вычисляющая стоимость доставки.
  public calculate(routeLength: number): number {
    return Math.max(routeLength * DELIVERY_TARIFF, MINIMUM_COST);
  }

  routePanelParameters: ymaps.control.IRoutePanelParameters = {
    options: {
      showHeader: true,
      title: 'Расчёт доставки',
    },
  };

  zoomControlParameters: ymaps.control.IZoomControlParameters = {
    options: {
      size: 'small',
      position: {
        bottom: 145,
        right: 10,
      },
    },
  };

  onRoutePanelReady(event: YaReadyEvent<ymaps.control.RoutePanel>): void {
    const { routePanel } = event.target;

    routePanel.options.set({
      types: { auto: true },
    });

    // Получим ссылку на маршрут.
    routePanel.getRouteAsync().then((route: any) => {
      // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
      route.model.setParams({ results: 1 }, true);

      // Повесим обработчик на событие построения маршрута.
      route.model.events.add('requestsuccess', () => {
        const activeRoute = route.getActiveRoute();

        if (activeRoute) {
          // const cord = route.getBounds();
          // let [address1, address2] = cord;
          // let [point4, point3] = address2;
          // let [point2, point1] = address1;
          // let addressFrom = point3 + ',' + point4;
          // let addressTo = point1 + ',' + point2;
          // console.log('from');
          // console.log(addressFrom);
          // console.log('to');
          // console.log(addressTo);

          // Получим протяженность маршрута.
          const length = route.getActiveRoute().properties.get('distance');
          // Вычислим стоимость доставки.
          this.total = this.calculate(Math.round(length.value / 1000));
          this.totalChange.emit(this.total);
          // Создадим макет содержимого балуна маршрута.
          const balloonContentLayout = event.ymaps.templateLayoutFactory
            .createClass(`
              <span>Расстояние: ${length.text}.</span><br/>
              <span style="font-weight: bold; font-style: italic">Стоимость доставки: ${this.total} р.</span>
            `);

          // Зададим этот макет для содержимого балуна.
          route.options.set('routeBalloonContentLayout', balloonContentLayout);
          // Откроем балун.
          activeRoute.balloon.open();
        }
      });
    });
  }

  // public getAddress(address: any) {
  //   this.http
  //     .get(
  //       `https://geocode-maps.yandex.ru/1.x/?apikey=d9372196-27a2-4ae5-a99b-d4cc91c95fd5&geocode=37.597576,55.771899`
  //     )
  //     .pipe(
  //       map((res: any) => {
  //         this.point = Object.keys(res).map(
  //           (key) =>
  //             ({
  //               ...res[key],
  //               text: key,
  //             } as string)
  //         );
  //       })
  //     );
  //   console.log(this.point);
  // }
}
