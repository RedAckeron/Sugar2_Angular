import { Component, Input, OnInit } from '@angular/core';
import { CmdLight } from 'src/app/Models/cmdLight';
import { CmdService } from 'src/app/Services/cmd.service';

@Component({
  selector: 'app-cmd',
  templateUrl: './cmd.component.html',
  styleUrls: ['./cmd.component.scss']
})
export class CmdComponent implements OnInit {

  @Input() Idcustomer!:number;
  ListCmd : CmdLight[]=[];
  
  constructor(private _cmdService:CmdService){}
  ngOnInit(): void 
  {
    //console.log("IDCUST : "+this.Idcustomer);
    this._cmdService.ReadAllCmdLight(this.Idcustomer).subscribe(
      {
        next:(data:CmdLight[])=>{this.ListCmd=data},
        complete:()=>
        {
          //console.table(this.ListCmd);
        }
      })
  }
}