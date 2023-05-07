import { Component, AfterContentInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { VehiclesService } from '../../../shared/services/vehicles.service';

import { Vehicle } from '../../../shared/models/Vehicle';

const DATA: Vehicle[] = [
  {line_id: '3', schedule: new Map<string, string>([["key1", "value1"],["key2", "value2"]]) },
  {line_id: '4', schedule: new Map<string, string>([["key1", "value1"],["key2", "value2"]]) }
];

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements AfterContentInit {

  private routeSub?: Subscription;
  currentLineId?: string;
  @Input() vehicleObject?: Array<Vehicle>;
  displayedColumns: string[] = ['line_id', 'schedule'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Vehicle[] = DATA;

  constructor(private route: ActivatedRoute, private vehiclesService: VehiclesService) { }

  ngAfterContentInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.currentLineId = params['id']
    });
    this.vehiclesService.getLinesByLineId(this.currentLineId as string).subscribe((data: Array<Vehicle>) => {
      this.vehicleObject = data;
    })
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

}
