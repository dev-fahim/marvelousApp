import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserCanEditService implements CanActivate{

  constructor(
    private _router: Router,
    private _dataService: DataService
  ) { }
  
  canActivate() {
    let canEdit: boolean;
    this._dataService.get_canEdit.subscribe(
      (value) => canEdit = value
    )
    if (canEdit) return true;
    this._router.navigate(['/no-access']);
    return false;
  }

}
