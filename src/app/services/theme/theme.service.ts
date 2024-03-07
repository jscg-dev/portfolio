import { DOCUMENT } from '@angular/common';
import { Injectable, Renderer2, RendererFactory2, WritableSignal, effect, inject, signal } from '@angular/core';
import { APP_STORAGE } from '../../app.config';

export enum Theme {
  light,
  dark
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private __doc: Document = inject(DOCUMENT);
  private __storage: Storage = inject(APP_STORAGE)
  private __renderer: Renderer2;
  public current: WritableSignal<Theme> = signal(Theme.light);

  public constructor(
    __rendererFactory: RendererFactory2,
  ) {
    this.__renderer = __rendererFactory.createRenderer(null, null);
    
    effect(() => {
      this.__renderer.removeClass(this.__doc.body, Theme[Theme.dark]);
      if(this.current() == Theme.dark) this.__renderer.addClass(this.__doc.body, Theme[Theme.dark]);
      this.__storage.setItem('theme', Theme[this.current()])
    });

    if(!this.__storage.getItem('theme')) this.__storage.setItem('theme', Theme[Theme.dark]);
    this.current.set(Theme[<keyof typeof Theme>(this.__storage.getItem('theme')!)])
  }

  public Swicth(): void {
    this.current.set(this.current() == Theme.dark ? Theme.light : Theme.dark);
  }

  public get isdark(): boolean {
    return this.current() == Theme.dark;
  }
}
