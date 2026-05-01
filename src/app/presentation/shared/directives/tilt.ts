import { AfterViewInit, Directive, ElementRef, Input, inject } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective implements AfterViewInit {
  @Input() tiltConfig: Record<string, unknown> = {};

  private readonly el = inject(ElementRef);

  ngAfterViewInit(): void {
    VanillaTilt.init(this.el.nativeElement, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
      ...this.tiltConfig
    } as Parameters<typeof VanillaTilt.init>[1]);
  }
}
