import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  registrationForm!: FormGroup;
  formSubmitted: boolean = false; 
  imageUrl: string | ArrayBuffer | null = null;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      hobbies: this.fb.group({
        reading: [false],
        music: [false],
        cricket: [false]
      }, Validators.required), 
      profile: ['', Validators.required], 
      iAgree: ['', Validators.requiredTrue]
    });
  }

  onSubmit() {
    if(this.registrationForm.valid) {
      // Form submission logic
      console.log("Form is successfully submitted",this.registrationForm.value);
      this.formSubmitted = true;
    } 
    else {
      // Handle form validation errors
      console.log("Form is not ready for submission. Please fill out all required fields.");
      this.formSubmitted = false;
    }
  }
//selecting the profile image
  onSelectProfile(event:any)
  {
    if(event.target.files)
      {
        var reader=new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload=(event:any)=>{
          this.imageUrl=event.target.result;
        }
      }
  }
  get name(){ return this.registrationForm.get('name');}
  get email() 
  { return this.registrationForm.get('email'); 
  }
  get phoneNumber()
   { return this.registrationForm.get('phoneNumber'); 
   }
  get password() 
  { return this.registrationForm.get('password'); 
  }
  get dob() 
  { return this.registrationForm.get('dob'); 
  }
  get gender()
   { return this.registrationForm.get('gender'); 
   }
  get hobbies() 
  { return this.registrationForm.get('hobbies'); 
  }
  get profile() 
  { return this.registrationForm.get('profile');
   }
  get termsAgreed()
   { return this.registrationForm.get('termsAgreed'); 
   }
}


