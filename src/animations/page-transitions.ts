import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routerTransitions =
	trigger('routerTransitions', [
		transition('* <=> forward', [
			query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
			group([
				query(':enter', [
					style({ transform: 'translateX(100%)' }),
					animate('0.35s ease-in-out', style({ transform: 'translateX(0%)' }))
				], { optional: true }),
				query(':leave', [
					style({ transform: 'translateX(0%)' }),
					animate('0.35s ease-in-out', style({ transform: 'translateX(-100%)' }))], { optional: true }),
			])
		]),
		transition('* <=> backward', [
			query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
			group([
				query(':enter', [
					style({ transform: 'translateX(-100%)' }),
					animate('0.35s ease-in-out', style({ transform: 'translateX(0%)' }))
				], { optional: true }),
				query(':leave', [
					style({ transform: 'translateX(0%)' }),
					animate('0.35s ease-in-out', style({ transform: 'translateX(100%)' }))], { optional: true }),
			])
		]),
		transition('* <=> fade', [
			query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
			group([
				query(':enter', [
					style({ opacity: 0 }),
					animate('0.35s ease-in-out', style({ opacity: 1 }))
				], { optional: true }),
				query(':leave', [
					style({ opacity: 1 }),
					animate('0.15s ease-in-out', style({ opacity: 0 }))], { optional: true }),
			])
		])
	]);

