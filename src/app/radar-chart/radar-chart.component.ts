import { Component, OnInit, Input} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {

  constructor(
    private storage: LocalStorageService
  ) { }
  public radarChartLabels = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness'];

  
  public radarChartData = [
    {data: this.storage.get('data'), label: this.storage.get('trackInfo')}

  ];
  public radarChartType = 'radar';
  

  ngOnInit(): void {
    
  }

}
