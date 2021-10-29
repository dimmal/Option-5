import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOutTimeout = 400;
export const fadeInOut = trigger('fadeInOut', [
	transition('void => *', [style({ opacity: '0', transform: 'translate(0, -10%)' }), animate(fadeInOutTimeout)]),
	transition('* => void', [animate(fadeInOutTimeout, style({ opacity: '0' }))]),
	transition('* => *', [
		style({ opacity: '0', transform: 'translate(0, -10%)' }),
		animate(fadeInOutTimeout, style({ opacity: '1', transform: 'translate(0%)' })),
	]),
]);