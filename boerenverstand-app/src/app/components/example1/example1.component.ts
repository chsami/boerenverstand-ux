import { Component, OnInit } from "@angular/core";
import { of, Observable } from "rxjs";
import { mapTo, delay, merge, tap } from "rxjs/operators";

@Component({
  selector: "app-example1",
  templateUrl: "./example1.component.html",
  styleUrls: ["./example1.component.css"]
})
export class Example1Component implements OnInit {
  public data: Array<string> = [];
  public message;
  public isLoading: boolean;
  constructor() {}

  ngOnInit() {}

  loadDataTheBadWay() {
    this.message = Observable.create(observer => {
      observer.next("Data 1");
      observer.next("Data 2");
      observer.next("Data 3");
      observer.complete();
    });
    this.message
      .pipe(
        delay(3000)
      )
      .subscribe(val => this.data.push(val));
  }

  loadDataTheGoodWay() {
    this.isLoading = true;
    this.message = Observable.create(observer => {
      observer.next("Data 1");
      observer.next("Data 2");
      observer.next("Data 3");
      observer.complete();
    });
    this.message
      .pipe(
        delay(3000),
        tap(() => this.isLoading = false)
      )
      .subscribe(val => this.data.push(val));
  }

  reset(): void {
    this.data = [];
  }
}
