import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private platformId = inject(PLATFORM_ID);
  private translateService = inject(TranslateService);
  private renderer2 = inject(Renderer2);
  private rendererFactory2 = inject(RendererFactory2);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // set Default Lang
      this.translateService.setDefaultLang('en');

      // get Lang Local Saved
      const savedLang = localStorage.getItem('lang');

      // use lang local
      if (savedLang) {
        this.translateService.use(savedLang);
      }
    }
  }

  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr ');
    } else if (localStorage.getItem('lang') === 'ar') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl ');
    }
  }
}
