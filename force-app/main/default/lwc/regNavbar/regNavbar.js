import { LightningElement, wire } from 'lwc';
import getNavbarItems from '@salesforce/apex/RegNavbarSelector.getNavbarItems'
export default class RegNavbar extends LightningElement {


navbarItems;
 menuOpen = false;

    get menuClass() {
        return this.menuOpen ? 'menu-open' : '';
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
@wire(getNavbarItems)
wiredData({ error, data }) {
  if (data) {

    this.navbarItems  = data
  } else if (error) {
    console.error('Error:', error);
  }
}
}