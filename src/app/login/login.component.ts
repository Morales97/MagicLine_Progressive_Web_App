// code from: https://jasonwatmore.com/post/2019/05/17/angular-7-tutorial-part-4-login-form-authentication-service-route-guard
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../_services";
import { first } from 'rxjs/operators';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: String;
  error: String;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      // TODO pop up message: already logged in, o be amagar log in de la nav bar, posar log out
      this.router.navigate(["/"]);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required], 
      password: ["", Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.f.username.value)
    this.authService.login(this.f.username.value, this.f.password.value)  // returns an Observable to which we subscribe
        .pipe(first())        // pipe(first()) unsubscribes from Observable after first value is emitted
        .subscribe(
            data => {         // if correct, navigate to URL
                this.router.navigate([this.returnUrl]);
                console.log("logged in")
            },
            error => {        // if error, display it
                this.error = error;
                this.loading = false;
                console.log("error in log in")
            });
  }
}
