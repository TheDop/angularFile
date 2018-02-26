import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { FileValidators } from "./file-validators";
import { VERSION } from "@angular/material";

import "rxjs/add/operator/map";

@Component({
  selector: "material-app",
  templateUrl: "app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private version: any;
  formDoc: FormGroup;
  private ngVersion = VERSION;

  constructor(http: HttpClient, private _fb: FormBuilder) {
    // Display the currently used Material 2 version.
    http
      .get("https://api.github.com/repos/angular/material2-builds/commits/HEAD")
      .subscribe(d => (this.version = d));
  }

  ngOnInit() {
    this.formDoc = this._fb.group({
      basicfile: [],
      requiredfile: [
        { value: undefined, disabled: false },
        [Validators.required, FileValidators.maxContentSize(104857600)]
      ],
      disabledfile: [{ value: undefined, disabled: true }],
      multiplefile: [{ value: undefined, disabled: false }]
    });
  }

  onSubmit() {
    console.log("SUBMITTED", this.formDoc);
  }
}

/*
  Copyright 2017 Google LLC. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at http://angular.io/license
 */
