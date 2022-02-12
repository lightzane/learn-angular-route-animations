import { animate, group, query, style, transition, trigger } from "@angular/animations";

const duration = '300ms ease-out';

export const slideInAnimation = trigger('routeAnimations', [
    transition('HomePage => AboutPage', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                width: '100%',
                height: '100%'
            })
        ]),
        group([
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate(duration)
            ]),
            query(':leave', [
                animate(duration, style({ transform: 'translateX(-100%)' }))
            ])
        ]),
    ]),
    transition('AboutPage => HomePage', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                width: '100%'
            })
        ]),
        group([ // group = parallel animation
            query(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate(duration)
            ]),
            query(':leave', [
                animate(duration, style({ transform: 'translateX(100%)' }))
            ])
        ]),
    ]),
]);