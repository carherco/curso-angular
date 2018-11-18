import { Injectable }           from '@angular/core';
import { AdItem } from '../model/AdItem';
import { Ad1Component } from '../components/ad1/ad1.component';
import { Ad2Component } from '../components/ad2/ad2.component';
import { Ad3Component } from '../components/ad3/ad3.component';
import { Ad4Component } from '../components/ad4/ad4.component';


@Injectable()
export class AdService {
  getAds() {
    return [
      new AdItem(Ad1Component, {name: 'Bombasto', bio: 'Brave as they come'}),

      new AdItem(Ad2Component, {name: 'Dr IQ', bio: 'Smart as they come'}),

      new AdItem(Ad3Component,   {headline: 'Hiring for several positions',
                                        body: 'Submit your resume today!'}),

      new AdItem(Ad4Component,   {headline: 'Openings in all departments',
                                        body: 'Apply today'}),
    ];
  }
}
