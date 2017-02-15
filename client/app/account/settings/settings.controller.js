'use strict';
// @flow

type User = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  newCity: string;
  newCountry: string;
};

export default class SettingsController {
  user: User = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    newCity: '',
    newCountry: ''
  };
  errors = {
    other: undefined
  };
  message = '';
  locationMessage = '';
  submitted = false;
  submitted2 = false;
  Auth;
  oldCity='';
  oldCountry='';

  /*@ngInject*/
  constructor(Auth) {
    this.Auth = Auth;
  }

  	$onInit() {
      this.oldCity=this.Auth.getCurrentUserSync().city;
      this.oldCountry=this.Auth.getCurrentUserSync().country;
	}

  changePassword(form) {
    console.log("changePassword!!!!");
    this.submitted = true;

    if(form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }

  changeLocation(form2) {
    this.submitted2 = true;
    console.log("changeLocation!!!!")
    if(form2.$valid) {
      this.Auth.changeLocation(this.user.newCity, this.user.newCountry)
        .then(() => {
          this.locationMessage = 'Location successfully changed.';
        })
        .catch(() => {
          this.errors.other = 'could not change location';
          this.message = '';
        });
    }
  }
} 
