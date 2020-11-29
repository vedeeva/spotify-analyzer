import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private storage: LocalStorageService) { }
  public barChartLabels = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness'];

  
  public barChartData = [
    {data: this.storage.get('data'), label: this.storage.get('trackInfo')}

  ];
  public barChartType = 'bar';

  ngOnInit(): void {
  }

}
