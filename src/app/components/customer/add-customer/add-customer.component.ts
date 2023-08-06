import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { CustomerAddress } from 'src/app/models/customerAddress';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {

  registerForm : FormGroup;

  constructor(private _builder : FormBuilder,private _customerService : CustomerService) {
    //On crée un nouveau formulaire grâce à notre FormBuilder et on le stocke dans notre propriété registerForm
    this.registerForm = this._builder.group({
      FirstName : [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      LastName : [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      Email : [null, [Validators.required, Validators.email]],
      Call1 : [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      Call2 : [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      })
   }

   register()
    {
      console.log("register");
    if(this.registerForm.invalid)
        {
        //Si l'entièreté du formulaire est invalide, on va marquer tous les champos comme touchés
        this.registerForm.markAllAsTouched();
        console.log("not valid form");
        }
    else 
        {
        console.log("valid form");
        let custAdr =new Array<CustomerAddress>;
        let cust=new Customer(
        0,
        this.registerForm.value.FirstName,
        this.registerForm.value.LastName,
        this.registerForm.value.Email,
        this.registerForm.value.Call1,
        this.registerForm.value.Call2,
        new Date(),
        1,
        custAdr);
        this._customerService.CreateCustomer(cust).subscribe();
        }
        
    }
}
