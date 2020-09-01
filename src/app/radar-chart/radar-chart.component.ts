import { Component, OnInit, Input} from '@angular/core';


@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {

  @Input() inputs: [];
  public radarChartLabels = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness'];
  public radarChartData = [
    {data: this.inputs.entries, label: '2017'}
  ];
  public radarChartType = 'radar';
  constructor() { }

  ngOnInit(): void {
  }

}
