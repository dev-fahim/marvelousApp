import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dataService: DataService) { }
  base_user: boolean = false;
  sub_user: boolean = false;

  ngOnInit() {
    this.dataService.get_user()
      .subscribe(
        (result) => {
          if (result.base_user) {
            this.dataService.get_base_user()
              .subscribe(
                (sub_result) => {
                  this.dataService.all_access();
                  this.dataService.ch_is_base_user(true);
                  this.dataService.ch_uuid(sub_result.uuid);
                  this.dataService.ch_user_type('admin');
                }
              )
            return this.base_user = true;
          }
          else if (result.sub_user) {
            this.dataService.get_sub_user()
              .subscribe(
                (sub_result) => {
                  this.dataService.ch_canAdd(sub_result.canAdd);
                  this.dataService.ch_canRetrieve(sub_result.canRetrieve);
                  this.dataService.ch_canList(sub_result.canList);
                  this.dataService.ch_canEdit(sub_result.canEdit);
                  this.dataService.ch_is_sub_user(true);
                  this.dataService.ch_uuid(sub_result.uuid);
                  this.dataService.ch_user_type('accounts')
                }
              )
            return this.sub_user = true
          }
          this.dataService.ch_is_active(result.is_active);
          this.dataService.ch_is_approved(result.is_approved);
          this.dataService.ch_is_not_locked(result.is_not_locked);
        }
      )
  }
}

