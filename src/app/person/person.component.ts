import { Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PersonService } from './services/person.service';
import { Person } from './models/person';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person = new Person('', '');
  constructor(private personService: PersonService) {

  }

  ngOnInit(): void {
  }

  onSubmit(formdata) {
    console.log(formdata.fullName + " " + formdata.IdNumber);
    this.person.fullName = formdata.fullName;
    this.person.IdNumber = formdata.IdNumber;
    this.personService.doRegister(this.person).subscribe((response) => {
      window.alert(response);
      console.log('Success!', response);
      if (response == 'Developer successfully registered') {
        this.person.fullName = '';
        this.person.IdNumber = '';
      }

    });

  }
  getReport() {
    this.personService.downloadReport().subscribe((response) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      console.log('Success!', response);
    });

  }

}
