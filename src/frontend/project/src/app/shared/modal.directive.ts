import { ElementRef, Directive, AfterViewInit, Input, HostListener, Renderer2 } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[appModal]'
})
export class ModalDirective{

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') click(eventData: Event) {
    this.renderer.addClass('#modal-text', 'is-active')
  }

}
