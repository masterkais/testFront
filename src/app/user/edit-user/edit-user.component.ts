import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Group } from "app/shared/models/group.model";
import { User } from "app/shared/models/user.module";
import { GroupService } from "app/shared/services/group.service";
import { UserService } from "app/shared/services/user.service";
import { NgToastService } from "ng-angular-popup";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"],
})
export class EditUserComponent implements OnInit {
  is_edit : boolean = false;
  userFormGroup?: FormGroup;
  submitted: boolean = false;
  groups = new FormControl();
  listGroups: Group[];
  isUpdated: boolean = false;
  ids: Group[] = [];
  idUser: number;
  user: User;
  date: Date;
  selectedOptions: any = {};
  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private groupService: GroupService,
    private userService: UserService,
    private toast: NgToastService,
    private router: Router
  ) {
    this.idUser = this.activatedRoot.snapshot.params.id;
  }

  ngOnInit(): void {
    this.isUpdated = false;
    this.submitted = true;
    this.userService.getUserById(this.idUser).subscribe((user) => {
      user.password = "";
      this.user = user;
      let ss =
        user.dateNaissanced[0] +
        "/" +
        user.dateNaissanced[1] +
        "/" +
        user.dateNaissanced[2];
      this.date = new Date(ss);
      this.selectedOptions.permessions = user.groups;
      this.ids = user.groups;
    });
    this.userFormGroup = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      city: ["", Validators.required],
      userName: ["", Validators.required],
      dateNaissanced: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.required],
      adress: ["", Validators.required],
      fax: ["", Validators.required],
    });
    this.groupService.getAllGroup().subscribe((groups) => {
      this.listGroups = groups;
    });
    this.userFormGroup.controls['userName'].disable();
  }
  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        console.log(event.source.value);
        this.ids.push({ id: event.source.value.id, privileged: "" });
      } else {
        console.log(event.source.value);
        this.removeGroup(event.source.value);
      }
    }
  }

  removeGroup(group: Group): void {
    this.user.groups = this.user.groups.filter(({ id }) => id !== group.id);
    this.ids = this.ids.filter(({ id }) => id !== group.id);
  }
  onUpdateUser() {
    this.submitted = true;
    if (!this.userFormGroup.valid) return;
    const myDate = this.userFormGroup.value.dateNaissanced;
    var maDate = this.datePipe.transform(myDate, "yyyy-MM-ddT14:20:29");
    let data: User = {
      id: this.idUser,
      firstName: this.userFormGroup.value.firstName,
      lastName: this.userFormGroup.value.lastName,
      login: this.user.login,
      password: this.user.password,
      dateNaissanced: maDate,
      dateCreated: new Date(),
      adress: this.userFormGroup.value.adress,
      fax: this.userFormGroup.value.fax,
      email: this.userFormGroup.value.email,
      city: this.userFormGroup.value.city,
      picture: null,
      active: true,
      groups: this.ids,
    };
    let isValid: boolean;
          this.userService.editUser(data).subscribe(() => {
            this.toast.success({
              detail: "Modification avec succée !",
              duration: 5000,
            });
            this.router.navigateByUrl("/user");
          });
  }
}
