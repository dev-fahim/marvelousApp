import { ElementRef, Directive, AfterViewInit, Input } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[appModal]'
})
export class ModalDirective implements AfterViewInit {
  @Input() element: string;
  @Input() button_k: string;

  constructor(private model: ElementRef) { }

  ngAfterViewInit(): void {
    jQuery(this.element)
    .modal({
      inverted: false
    })
    .modal('setting', 'transition', 'scale')
    .modal('attach events', this.button_k, 'show');
  }

}
