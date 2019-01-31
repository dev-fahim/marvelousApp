export interface UserPermissions {
    canAdd: boolean;
    canEdit: boolean;
    canList: boolean;
    canRetrieve: boolean;
    canFundSourceListCreate: boolean;
    canFundSourceEdit: boolean;
    is_active: boolean;
    user_type: string;
}

export interface AccountStatus {
    is_approved: boolean;
    is_locked: boolean;
    is_active: boolean;
}

export interface RootObject {
    is_base_user: boolean;
    is_sub_user: boolean;
    user_permissions: UserPermissions;
    account_status: AccountStatus;
    todays_open_credit_fund: number;
    remaining_credit_fund_amount: number;
    this_month_total_expend_amount: number;
    total_unauthorized_expend_amount: number;
    total_credit_fund_amount: number;
    fund_status: boolean;
    this_year_total_expend_amoun: number;
    this_year_remaining_credit_fund_amount: number;
    this_year_total_credit_fund_amount: number;
    this_year_total_unauthorized_expend_amount: number;
    this_month_total_credit_fund_amount: number;
    this_year: Date;
}

export interface ExpenditureHeadingGETModel {
    id?: number;
    url?: string;
    heading_name: string;
    description: string;
    uuid?: string;
    added?: string;
    updated?: string;
    is_deleted?: boolean;
    extra_description?: string;
}

export interface ExpenditureRecordGETModel {
    id?: number;
    edit_url?: string;
    details_url?: string;
    expend_heading_name?: string;
    added_by: string;
    expend_by: string;
    description: string;
    amount: number;
    is_verified: boolean;
    expend_date: string;
    uuid?: string;
    added?: string;
    updated?: string;
    expend_heading: number;
    is_deleted?: boolean;
    extra_description?: string;
}

export interface CreditFundSourceGETModel {
    id?: number;
    source_name: string;
    url?: string;
    description: string;
    added?: string;
    updated?: string;
    uuid?: string;
    is_deleted?: boolean;
    extra_description?: string;
}

export interface CreditFundSourceFilterModel {
    ordering?: string;
    search?: string;
}

export interface CreditFundAccordinSourceGETModel {
    source_name: string;
    url?: string;
    description: string;
    added?: string;
    updated?: string;
    uuid?: string;
    is_deleted?: boolean;
    extra_description?: string;
    funds: CreditFundSourceGETModel[];
}

export interface CreditFundRecordGETModel {
    source: number;
    source_name?: string;
    url?: string;
    description: string;
    added?: string;
    updated?: string;
    amount: number;
    fund_added: string;
    uuid?: string;
    is_deleted?: boolean;
    extra_description?: string;
}

export interface CompnayInfoGETModel {
    name: string;
    address: string;
    company_type: string;
    created: string;
}

export interface BaseUserInfoGETModel {
    id?: number;
    is_admin?: boolean;
    uuid?: string;
    joined?: string;
    last_updated?: string;
    base_user?: number;
}

export interface SubUserInfoGETModel {
    username: string;
    user_type: string;
    joined: string;
    urls?: string;
    canAdd: boolean;
    canRetrieve: boolean;
    canEdit: boolean;
    canList: boolean;
    uuid?: string;
}

export interface UserExtraInfoGETModel {
    id?: number;
    is_approved?: boolean;
    is_not_locked?: boolean;
    is_active?: boolean;
    base_user?: boolean;
    sub_user?: boolean;
    user?: number;
}

export interface UserModel {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface SubUser {
    user_type?: any;
    joined?: any;
    canAdd: boolean;
    canRetrieve: boolean;
    canEdit: boolean;
    canList: boolean;
}

export interface SubUserPOSTModel {
    username: string;
    email: string;
    password: string;
    password2: string;
    root_sub_user: SubUser;
}

export interface UserEditModel {
    username: string;
    email: string;
}
