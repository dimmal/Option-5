export class NavItem {
	path: string;
	navigationExtras: any;
	data: any;

	constructor(path: string, navigationExtras: any, data: any) {
		this.path = path;
		this.navigationExtras = navigationExtras;
		this.data = data;
	}
}