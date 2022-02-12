# Learn Angular Route Animations

![](https://img.shields.io/angular-12-red)

Leaning route animations where we can `slideIn` Home and About page/views from left or right depending on the animation state.

Started with my [template-angular-material](https://github.com/lightzane/template-angular-material) and deleted the initial folders (e.g. `components`, `home`, `shared`) and clean `app.module.ts` and `app-routing.module.ts`.

### Prerequisite

Have existing or basic knowledge about Angular animations

- https://github.com/lightzane/learn-angular-animations

### Create 2 views

This would be a demo content to be used for routing animations.

```
ng g m home --route home --module app.module
ng g m about --route about -m app.module
```

### Update the following

1.  [`app-routing.module.ts`](#app-routing-module-ts)
2.  [`my-animation.ts`](#my-animation-ts)
3.  [`app.component.ts`](#app-component-ts)
4.  [`app.component.html`](#app-component-html)


<p id="app-routing-module-ts"></p>

**app-routing.module.ts**

> The data property value has to match the transitions defined in the `routeAnimation` trigger, which we'll define shortly.

**Note**: The data property names that you use can be **arbitrary**. For example, the name `animation` used in the preceding example is an arbitrary choice.

```ts
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      // user-defined property to be referenced to `app.component.ts` and `transition`
      animation: 'HomePage' 
    }
  }
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
    data: {
      // user-defined property to be referenced to `app.component.ts` and `transition`
      animation: 'AboutPage' // to reference in transition
    }
  },
];
```

<p id="my-animation-ts"></p>

**my-animation.ts**

```ts
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
        group([ // group = parallel animation
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
```

<p id="app-component-ts"></p>

**app.component.ts**

`AppComponent` defines a method that can detect when a view changes. The method assigns an animation state value to the animation trigger (`@routeAnimation`) based on the route configuration data property value

```diff
+import { slideInAnimation } from './my-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
+ animations: [
+   slideInAnimation
+ ]
})
export class AppComponent {

+ prepareRoute(outlet: RouterOutlet) {
+   return outlet?.activatedRouteData?.animation;
+ }

}
```

<p id="app-component-html"></p>

**app.component.html**

```html
<div [@routeAnimations]="prepareRoute(outlet)">
  <router-outlet #outlet="outlet"></router-outlet>
</div>
```

## References

- https://v12.angular.io/guide/route-animations