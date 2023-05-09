import { Component, EventEmitter, Input, Output } from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';

const DELIVERY_TARIFF = 25;
const MINIMUM_COST = 1000;
@Component({
  selector: 'app-map-form',
  templateUrl: './map-form.component.html',
  styleUrls: ['./map-form.component.css'],
})
export class MapFormComponent {
  @Input()
  total!: number;
  @Output()
  totalChange = new EventEmitter();

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
}
