import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('bienvenida => ingreso', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%' }))

        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('ingreso => bienvenida', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ right: '100%' }))

        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ left: '0%' }))

        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

export const myAnimation =
  trigger('routeAnimations', [
    transition('bienvenida => registro', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 400,
          left: 0,
          width: '100%',
        })
      ]),
      query(':enter', [
        style({ top: 1000 })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ top: -1000 }))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ top: 200 }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('registro => bienvenida', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 218,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%', top: 418 })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

  ]);
