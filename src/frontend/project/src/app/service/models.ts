export interface ExpenditureHeadingGETModel {
    id?: number;
    url?: string;
    heading_name: string;
    description: string;
    uuid?: string;
    added?: string;
    updated?: string;
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
    expend_string: string;
    uuid?: string;
    added?: string;
    updated?: string;
    expend_heading: number;
}

export interface CreditFundSourceGETModel {
    source_name: string;
    url?: string;
    description: string;
    added?: string;
    updated?: string;
    uuid?: string;
}

export interface CreditFundAccordinSourceGETModel {
    source_name: string;
    url?: string;
    description: string;
    added?: string;
    updated?: string;
    uuid?: string;
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