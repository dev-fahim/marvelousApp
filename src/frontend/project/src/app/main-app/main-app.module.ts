import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppRoutingModule } from './main-app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { RecordAddComponent } from './expenditure/record/record-add/record-add.component';
import { RecordEditComponent } from './expenditure/record/record-edit/record-edit.component';
import { RecordFilterComponent } from './expenditure/record/record-filter/record-filter.component';
import { RecordListComponent } from './expenditure/record/record-list/record-list.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { RecordComponent } from './expenditure/record/record.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { MainAppComponent } from './main-app.component';
import { HeadingComponent } from './expenditure/heading/heading.component';

@NgModule({
  declarations: [
    MainAppComponent,
    DashboardComponent,
    ExpenditureComponent,
    RecordAddComponent,
    RecordEditComponent,
    RecordFilterComponent,
    RecordListComponent,
    NoAccessComponent,
    RecordComponent,
    SidebarComponent,
    ToolbarComponent,
    NotificationMessageComponent,
    HeadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainAppRoutingModule
  ]
})
export class MainAppModule { }
/*
/api-token-refresh/     rest_framework_jwt.views.RefreshJSONWebToken
/api-token-verify/      rest_framework_jwt.views.VerifyJSONWebToken

/api/company/add/       company.api.views.CompanyInfoListCreateAPIView  company_app:company_add
/api/company/change/<uuid:uuid>/        company.api.views.CompanyInfoRetrieveUpdateDeleteAPIView        company_app:company_change

/api/credit/fund-source-list-all/       credit.api.views.CreditFundsAccordingToSourcesListAPIView       credit_app:fund_source_list_all
/api/credit/fund-source-report/ credit.api.views.CreditExportPDFReport
/api/credit/fund/list-add/      credit.api.views.CreditFundListCreateAPIView    credit_app:fund_list_add
/api/credit/fund/list/  credit.api.views.CreditFundListAPIView  credit_app:fund_list
/api/credit/fund/mail-csv/      credit.api.views.CreditFundGenCSVEmail
/api/credit/fund/settings/      credit.api.views.CreditFundSettingsView credit_app:fund_settings
/api/credit/fund/settings/edit/ credit.api.views.CreditFundSettingsEditView     credit_app:fund_settings_edit
/api/credit/fund/view-update-delete/<uuid:uuid>/        credit.api.views.CreditFundRetrieveUpdateDestroyAPIView credit_app:fund_view_update_delete
/api/credit/source/list-add/    credit.api.views.CreditFundSourceListCreateAPIView      credit_app:fund_source_list_add
/api/credit/source/list/        credit.api.views.CreditFundSourceListAPIView    credit_app:fund_source_list
/api/credit/source/view-update-delete/<uuid:uuid>/      credit.api.views.CreditFundSourceRetrieveUpdateDestroyAPIView   credit_app:fund_source_view_update_delete

/api/expenditure/heading/list-add/      expenditure.api.views.ExpenditureHeadingListCreateAPIView       expenditure_app:heading_list_add
/api/expenditure/heading/list/  expenditure.api.views.ExpenditureHeadingListAPIView     expenditure_app:heading_list
/api/expenditure/heading/view-update-delete/<uuid:uuid>/        expenditure.api.views.ExpenditureHeadingRetrieveUpdateDestroyAPIView    expenditure_app:heading_view_update_delete
/api/expenditure/record/add/    expenditure.api.views.ExpenditureRecordCreateAPIView    expenditure_app:record_list_add
/api/expenditure/record/checkout-today/ expenditure.api.views.ExpenditureCheckoutToday  expenditure_app:checkout_today
/api/expenditure/record/list/   expenditure.api.views.ExpenditureRecordListAPIView      expenditure_app:record_list
/api/expenditure/record/view-update-delete/<uuid:uuid>/ expenditure.api.views.ExpenditureRecordRetrieveUpdateDestroyAPIView     expenditure_app:record_view_update_delete
/api/expenditure/record/view/<uuid:uuid>/       expenditure.api.views.ExpenditureRecordRetrieveAPIView  expenditure_app:record_view
/api/expenditure/records-mail-csv/      expenditure.api.views.ExpenditureRecordEmailCSV expenditure_app:records_mail_csv
/api/expenditure/records-report-pdf/    expenditure.api.views.ExpenditureRenderPDF      expenditure_app:records_report_pdf

/api/services/total-fund-amount/        service.api.views.GetTotalFundAmount
/api/services/user/     service.api.views.GetUserData

/api/sub_user/add/      sub_user.api.views.SubUserCreateAPIView sub_user:add_sub_user
/api/sub_user/edit/<uuid:uuid>/ sub_user.api.views.SubUserEditAPIView   sub_user:edit_sub_user
/api/sub_user/list/     sub_user.api.views.SubUserListAPIView   sub_user:list_sub_user
/api/sub_user/view/     sub_user.api.views.GetSubUserData

/api/user/add/  base_user.api.views.BaseUserCreateAPIView       base_user:create_base_user
/api/user/extra/view/   user.api.views.GetUserExtraInfo
/api/user/view/ base_user.api.views.GetBaseUserData

/rest-auth/login/       rest_auth.views.LoginView       rest_login
/rest-auth/logout/      rest_auth.views.LogoutView      rest_logout
/rest-auth/password/change/     rest_auth.views.PasswordChangeView      rest_password_change
/rest-auth/password/reset/      rest_auth.views.PasswordResetView       rest_password_reset
/rest-auth/password/reset/confirm/      rest_auth.views.PasswordResetConfirmView        rest_password_reset_confirm
/rest-auth/user/        rest_auth.views.UserDetailsView rest_user_details
*/