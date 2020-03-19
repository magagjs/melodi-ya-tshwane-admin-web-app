import { Component, OnInit } from '@angular/core';
import { ProgressLoaderService } from 'src/app/services/progress-loader.service';

/**
 * Component subscribes to progessLoaderService to determine
 * if Http call is loading and returns obeservable boolean result
 * to component local variable
 */
@Component({
  selector: 'myt-progress-loader',
  templateUrl: './progress-loader.component.html',
  styleUrls: ['./progress-loader.component.css']
})
export class ProgressLoaderComponent implements OnInit {

  public isLoading: boolean;
  constructor(private progressLoaderSerice: ProgressLoaderService) { 
    this.progressLoaderSerice.isInProgress.subscribe( (observeLoading) =>{
      this.isLoading = observeLoading;
    });
  }

  ngOnInit(): void {
  }

}
