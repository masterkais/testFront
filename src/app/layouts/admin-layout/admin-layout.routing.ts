import { Routes } from "@angular/router";

import { AddGroupComponent } from "app/group/add-group/add-group.component";
import { EditGroupComponent } from "app/group/edit-group/edit-group.component";
import { GroupComponent } from "app/group/group.component";

import { AddUserComponent } from "app/user/add-user/add-user.component";
import { EditUserComponent } from "app/user/edit-user/edit-user.component";
import { UserProfileComponent } from "app/user/user-profile/user-profile.component";


import { UserComponent } from "app/user/user.component";


export const AdminLayoutRoutes: Routes = [
  { path: "user", component: UserComponent },
  { path: "user/edit-user/:id", component: EditUserComponent },
  { path: "user/add-user", component: AddUserComponent },
  { path: "user/profile/:id", component: UserProfileComponent },
  { path: "group", component: GroupComponent },
  { path: "group/edit-group/:id", component: EditGroupComponent },
  { path: "group/add-group", component: AddGroupComponent },





];
