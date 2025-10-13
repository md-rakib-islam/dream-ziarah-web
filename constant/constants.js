//http://api.cashconnectbd.com
//http://192.168.0.8:8002

//base url local
// export const BASE_URL = "http://192.168.68.127:8004";

//base url producton
export const BASE_URL = "https://api.dreamziarah.com";
//
// export const BASE_URL = "https://ziarahapi.dreamtourism.co.uk";
// export const BASE_URL = "https://api.activemanpowerservices.com/";
// export const BASE_URL = "https://api.surmainternational.com";
// export const BASE_URL = "https://api.labbaikintbd.com/";

// export const BASE_URL = 'http://api.cashconnectbd.com';

//login
export const LOGIN_URL = `${BASE_URL}/user/api/v1/user/login/`;

//user
export const USER_BY_ID = `${BASE_URL}/user/api/v1/user/`;

export const RESET_PASSWORD = `${BASE_URL}/auth/user/reset_password/`;

export const CONFIRM_RESET_PASSWORD = `${BASE_URL}/auth/user/reset_password_confirm/`;

// user
export const ALL_USERS = `${BASE_URL}/user/api/v1/user/all/`;

export const GET_USERS_WITHOUT_PAGINATION = `${BASE_URL}/user/api/v1/user/without_pagination/all/`;

export const SEARCH_USER = `${BASE_URL}/user/api/v1/user/search/`;

export const CHECK_EMAIL = `${BASE_URL}/user/api/v1/user/check_email_when_create/`;

export const CHECK_PRIMARY_PHONE = `${BASE_URL}/user/api/v1/user/check_primary_phone_when_create/`;

export const CHECK_SECONDARY_PHONE = `${BASE_URL}/user/api/v1/user/check_secondary_phone_when_create/`;

export const CHECK_USERNAME = `${BASE_URL}/user/api/v1/user/check_username_when_create/`;

// slidersettings
export const CREATE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/create/`;

export const GET_SLIDERSETTINGID = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/`;

export const GET_SLIDERSETTINGS = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/all/`;

export const UPDATE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/update/`;

export const DELETE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/delete/`;

// check_update
export const CHECK_EMAIL_UPDATE = `${BASE_URL}/user/api/v1/user/check_email_when_update/`;

export const CHECK_PRIMARY_PHONE_UPDATE = `${BASE_URL}/user/api/v1/user/check_primary_phone_when_update/`;

export const CHECK_SECONDARY_PHONE_UPDATE = `${BASE_URL}/user/api/v1/user/check_secondary_phone_when_update/`;

export const CHECK_USERNAME_UPDATE = `${BASE_URL}/user/api/v1/user/check_username_when_update/`;

// branch
export const BRANCHES = `${BASE_URL}/branch/api/v1/branch/all/`;

// thana
export const THANAS = `${BASE_URL}/thana/api/v1/thana/all/`;

export const THANAS_BASED_CITY = `${BASE_URL}/thana/api/v1/thana/all_thana_by_city_id/`;

// // cities
// export const CITIES = `${BASE_URL}/city/api/v1/city/all/`;

//  country
export const COUNTRIES = `${BASE_URL}/country/api/v1/country/all/`;

export const GET_COUNTRIES_WITHOUT_PAGINATION = `${BASE_URL}/country/api/v1/country/without_pagination/all/`;

// role
export const ROLES = `${BASE_URL}/role/api/v1/role/all/`;

// department
export const DEPARTMENTS = `${BASE_URL}/department/api/v1/department/all/`;

// user
export const CREATE_USER = `${BASE_URL}/user/api/v1/user/create/`;

// employees
export const EMPLOYEES = `${BASE_URL}/employee/api/v1/employee/all/`;

export const GET_EMPLOYEES_WITHOUT_PAGINATION = `${BASE_URL}/employee/api/v1/employee/without_paginaiton/all/`;

export const BRANCH_BY_USER_ID = `${BASE_URL}/branch/api/v1/branch/get_a_branch_by_user_id/`;

// members
export const GET_MEMBERS_WITHOUT_PAGINATION = `${BASE_URL}/member/api/v1/member/without_pagination/all/`;
// executive Members
export const GET_EXECUTIVE_MEMBERS_WITHOUT_PAGINATION = `${BASE_URL}/executive_member/api/v1/executive_member/without_pagination/`;
// adviser Members
export const GET_ADVISER_MEMBERS_WITHOUT_PAGINATION = `${BASE_URL}/executive_member/api/v1/executive_member/without_pagination/`;
// general Members
export const GET_GENERAL_MEMBERS_WITHOUT_PAGINATION = `${BASE_URL}/executive_member/api/v1/executive_member/without_pagination/`;

// citys
export const CITIES = `${BASE_URL}/city/api/v1/city/all/`;

// users
export const USERS = `${BASE_URL}/user/api/v1/user/all/`;

//  export const ALL_USERS = `${BASE_URL}/users/api/v1/users/all/`;
export const USERS_PASSWORDCHANGE = `${BASE_URL}/user/api/v1/user/passwordchange/`;

//group
export const GROUPS_WITHOUT_PAGINATION = `${BASE_URL}/group/api/v1/group/without_pagination/all/`;

//primary group
export const PRIMARY_GROUPS_WITHOUT_PAGINATION = `${BASE_URL}/primary_group/api/v1/primary_group/all/`;

//designation
export const DESIGNATIONS_WITHOUT_PAGINATION = `${BASE_URL}/designation/api/v1/designation/without_pagination/all/`;

//  employee
export const CREATE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/create/`;

export const GET_EMPLOYEES = `${BASE_URL}/employee/api/v1/employee/all/`;

export const GET_EMPLOYEE_BY_ID = `${BASE_URL}/employee/api/v1/employee/`;

export const UPDATE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/update/`;

export const DELETE_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/delete/`;

export const SEARCH_EMPLOYEE = `${BASE_URL}/employee/api/v1/employee/search/`;

//  subscription
export const CREATE_SUBSCRIPTION = `${BASE_URL}/monthly_subscription/api/v1/monthly_subscription/create/`;

export const GET_SUBSCRIPTIONS = `${BASE_URL}/monthly_subscription/api/v1/monthly_subscription/all/`;

export const GET_SUBSCRIPTION_BY_ID = `${BASE_URL}/monthly_subscription/api/v1/monthly_subscription/`;

export const UPDATE_SUBSCRIPTION = `${BASE_URL}/monthly_subscription/api/v1/monthly_subscription/update/`;

export const DELETE_SUBSCRIPTION = `${BASE_URL}/monthly_subscription/api/v1/monthly_subscription/delete/`;

export const SEARCH_SUBSCRIPTION = `${BASE_URL}/monthly_subscription/api/v1/monthly_subscription/search/`;

//  donation
export const CREATE_DONATION = `${BASE_URL}/donation/api/v1/donation/create/`;

export const GET_DONATIONS = `${BASE_URL}/donation/api/v1/donation/all/`;

export const GET_DONATION_BY_ID = `${BASE_URL}/donation/api/v1/donation/`;

export const UPDATE_DONATION = `${BASE_URL}/donation/api/v1/donation/update/`;

export const DELETE_DONATION = `${BASE_URL}/donation/api/v1/donation/delete/`;

export const SEARCH_DONATION = `${BASE_URL}/employee/api/v1/employee/search/`;

//  cause
export const CREATE_CAUSE = `${BASE_URL}/cause/api/v1/cause/create/`;

export const GET_CAUSES = `${BASE_URL}/cause/api/v1/cause/all/`;
export const GET_CAUSES_WITHOUT_PAGINATION = `${BASE_URL}/cause/api/v1/cause/without_pagination/all/`;

export const GET_CAUSE_BY_ID = `${BASE_URL}/cause/api/v1/cause/`;

export const UPDATE_CAUSE = `${BASE_URL}/cause/api/v1/cause/update/`;

export const DELETE_CAUSE = `${BASE_URL}/cause/api/v1/cause/delete/`;
//  causeContent
export const CREATE_CAUSECONTENT = `${BASE_URL}/cause_content/api/v1/cause_content/create/`;

export const GET_CAUSECONTENTS = `${BASE_URL}/cause_content/api/v1/cause_content/all/`;

export const GET_CAUSECONTENT_BY_ID = `${BASE_URL}/cause_content/api/v1/cause_content/`;

export const UPDATE_CAUSECONTENT = `${BASE_URL}/cause_content/api/v1/cause_content/update/`;

export const DELETE_CAUSECONTENT = `${BASE_URL}/cause_content/api/v1/cause_content/delete/`;

export const SEARCH_CAUSECONTENT = `${BASE_URL}/employee/api/v1/employee/search/`;
//  member
export const CREATE_MEMBER = `${BASE_URL}/member/api/v1/member/create/`;

export const GET_MEMBERS = `${BASE_URL}/member/api/v1/member/all/`;

export const GET_MEMBER_BY_ID = `${BASE_URL}/member/api/v1/member/`;

export const UPDATE_MEMBER = `${BASE_URL}/member/api/v1/member/update/`;

export const DELETE_MEMBER = `${BASE_URL}/member/api/v1/member/delete/`;

export const SEARCH_MEMBER = `${BASE_URL}/member/api/v1/member/search/`;

//  executive
export const CREATE_EXECUTIVE = `${BASE_URL}/executive_member/api/v1/executive_member/create/`;

export const GET_EXECUTIVES = `${BASE_URL}/executive_member/api/v1/executive_member/all/`;

export const GET_EXECUTIVE_BY_ID = `${BASE_URL}/executive_member/api/v1/executive_member/`;

export const UPDATE_EXECUTIVE = `${BASE_URL}/executive_member/api/v1/executive_member/update/`;

export const DELETE_EXECUTIVE = `${BASE_URL}/executive_member/api/v1/executive_member/delete/`;

export const SEARCH_EXECUTIVE = `${BASE_URL}/employee/api/v1/employee/search/`;
//  adviser
export const CREATE_ADVISER = `${BASE_URL}/adviser_member/api/v1/adviser_member/create/`;

export const GET_ADVISERS = `${BASE_URL}/adviser_member/api/v1/adviser_member/all/`;

export const GET_ADVISER_BY_ID = `${BASE_URL}/adviser_member/api/v1/adviser_member/`;

export const UPDATE_ADVISER = `${BASE_URL}/adviser_member/api/v1/adviser_member/update/`;

export const DELETE_ADVISER = `${BASE_URL}/adviser_member/api/v1/adviser_member/delete/`;

export const SEARCH_ADVISER = `${BASE_URL}/employee/api/v1/employee/search/`;
//  general
export const CREATE_GENERAL = `${BASE_URL}/general_member/api/v1/general_member/create/`;

export const GET_GENERALS = `${BASE_URL}/general_member/api/v1/general_member/all/`;

export const GET_GENERAL_BY_ID = `${BASE_URL}/general_member/api/v1/general_member/`;

export const UPDATE_GENERAL = `${BASE_URL}/general_member/api/v1/general_member/update/`;

export const DELETE_GENERAL = `${BASE_URL}/general_member/api/v1/general_member/delete/`;

export const SEARCH_GENERAL = `${BASE_URL}/employee/api/v1/employee/search/`;

//  departments
export const CREATE_DEPARTMENT = `${BASE_URL}/department/api/v1/department/create/`;

export const GET_DEPARTMENTS = `${BASE_URL}/department/api/v1/department/all/`;

export const GET_DEPARTMENTS_WITHOUT_PAGINATION = `${BASE_URL}/department/api/v1/department/without_pagination/all/`;

export const GET_DEPARTMENTID = `${BASE_URL}/department/api/v1/department/`;

export const UPDATE_DEPARTMENT = `${BASE_URL}/department/api/v1/department/update/`;

export const DELETE_DEPARTMENT = `${BASE_URL}/department/api/v1/department/delete/`;

export const SEARCH_DEPARTMENT = `${BASE_URL}/department/api/v1/department/search/`;

//  permission
export const CREATE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/create/`;

export const GET_PERMISSIONS = `${BASE_URL}/permission/api/v1/permission/all/`;

export const GET_PERMISSIONS_WITHOUT_PAGINATION = `${BASE_URL}/permission/api/v1/permission/without_pagination/all/`;

export const GET_PERMISSIONID = `${BASE_URL}/permission/api/v1/permission/`;

export const UPDATE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/update/`;

export const DELETE_PERMISSION = `${BASE_URL}/permission/api/v1/permission/delete/`;

export const SEARCH_PERMISSION = `${BASE_URL}/permission/api/v1/permission/search/`;

//  brands
export const CREATE_BRAND = `${BASE_URL}/brand/api/v1/brand/create/`;

export const GET_BRANDS = `${BASE_URL}/brand/api/v1/brand/all/`;

export const GET_BRANDID = `${BASE_URL}/brand/api/v1/brand/`;

export const GET_BRANDS_WITHOUT_PAGINATION = `${BASE_URL}/brand/api/v1/brand/without_pagination/all/`;

export const UPDATE_BRAND = `${BASE_URL}/brand/api/v1/brand/update/`;

export const DELETE_BRAND = `${BASE_URL}/brand/api/v1/brand/delete/`;

export const SEARCH_BRAND = `${BASE_URL}/brand/api/v1/brand/search/`;

//  qualification
export const CREATE_QUALIFICATION = `${BASE_URL}/qualification/api/v1/qualification/create/`;

export const GET_QUALIFICATIONS = `${BASE_URL}/qualification/api/v1/qualification/all/`;

export const GET_QUALIFICATIONID = `${BASE_URL}/qualification/api/v1/qualification/`;

export const UPDATE_QUALIFICATION = `${BASE_URL}/qualification/api/v1/qualification/update/`;

export const DELETE_QUALIFICATION = `${BASE_URL}/qualification/api/v1/qualification/delete/`;

export const SEARCH_QUALIFICATON = `${BASE_URL}/qualification/api/v1/qualification/search/`;

//  city
export const CREATE_CITY = `${BASE_URL}/city/api/v1/city/create/`;

export const GET_CITYS = `${BASE_URL}/city/api/v1/city/all/`;

export const GET_CITYS_WITHOUT_PAGINATION = `${BASE_URL}/city/api/v1/city/without_pagination/all/`;

export const GET_CITYID = `${BASE_URL}/city/api/v1/city/`;

export const UPDATE_CITY = `${BASE_URL}/city/api/v1/city/update/`;

export const DELETE_CITY = `${BASE_URL}/city/api/v1/city/delete/`;

export const SEARCH_CITY = `${BASE_URL}/city/api/v1/city/search/`;

//  thana
export const CREATE_THANA = `${BASE_URL}/thana/api/v1/thana/create/`;

export const GET_THANAS = `${BASE_URL}/thana/api/v1/thana/all/`;

export const GET_THANAS_WITHOUT_PAGINATION = `${BASE_URL}/thana/api/v1/thana/without_pagination/all/`;

export const GET_THANAID = `${BASE_URL}/thana/api/v1/thana/`;

export const UPDATE_THANA = `${BASE_URL}/thana/api/v1/thana/update/`;

export const DELETE_THANA = `${BASE_URL}/thana/api/v1/thana/delete/`;

export const SEARCH_THANA = `${BASE_URL}/thana/api/v1/thana/search/`;

//  role
export const CREATE_ROLE = `${BASE_URL}/role/api/v1/role/create/`;

export const GET_ROLES = `${BASE_URL}/role/api/v1/role/all/`;

export const GET_ROLES_WITHOUT_PAGINATION = `${BASE_URL}/role/api/v1/role/without_pagination/all/`;

export const GET_ROLE = `${BASE_URL}/role/api/v1/role/`;

export const UPDATE_ROLE = `${BASE_URL}/role/api/v1/role/update/`;

export const DELETE_ROLE = `${BASE_URL}/role/api/v1/role/delete/`;

export const SEARCH_ROLE = `${BASE_URL}/role/api/v1/role/search/`;

// Accounts
// primary_group
export const PRIMARY_GROUP = `${BASE_URL}/primary_group/api/v1/primary_group/all/`;

//paymentVoucher
export const CREATE_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/create/`;

export const GET_PAYMENTVOUCHERS = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/all`;

export const GET_PAYMENTVOUCHER_BY_ID = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/`;

export const UPDATE_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/update/`;

export const DELETE_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/delete/`;

export const DELETE_PAYMENTVOUCHER_MULTIPLE = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/delete_multiple/`;

export const SEARCH_PAYMENT_VOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/search/`;

export const SEARCH_PAYMENTVOUCHER = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/search/`;

export const GET_PAYMENT_VOUCHER_BY_INVOICE_NO = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/payment_voucher_by_invoice_no/`;

export const GET_PAYMENT_VOUCHER_ID_NAME_BY = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/payment_voucher_with_id_name_dict_by_invoice_no/`;

export const GET_PAYMENTVOUCHERID = `${BASE_URL}/payment_voucher/api/v1/payment_voucher/payment_voucher_by_invoice_no/`;

//receiptVoucher
export const CREATE_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/create/`;

export const GET_RECEIPTVOUCHERS = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/all`;

export const GET_RECEIPTVOUCHER_BY_ID = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/`;

export const UPDATE_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/update/`;

export const DELETE_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/delete/`;

export const DELETE_RECEIPTVOUCHER_MULTIPLE = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/delete_multiple/`;

export const SEARCH_RECEIPTVOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/search/`;

export const GET_RECEIPT_VOUCHER_BY_INVOICE_NO = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/receipt_voucher_by_invoice_no/`;

export const GET_RECEIPT_VOUCHER_ID_NAME_BY = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/receipt_voucher_by_invoice_no/`;

export const GET_RECEIPTVOUCHERID = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/receipt_voucher_by_invoice_no/`;

export const SEARCH_RECEIPT_VOUCHER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/search/`;

export const GET_RECEIPT_VOUCHER_BY_INVOICE_NUMBER = `${BASE_URL}/receipt_voucher/api/v1/receipt_voucher/receipt_voucher_by_invoice_no/`;

//sales
export const CREATE_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/create/`;

export const GET_RECEIVABLEBILLS = `${BASE_URL}/sales/api/v1/sales/all`;

export const GET_RECEIVABLEBILL_BY_ID = `${BASE_URL}/sales/api/v1/sales/`;

export const UPDATE_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/update/`;

export const DELETE_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/delete/`;

export const DELETE_RECEIVABLEBILL_MULTIPLE = `${BASE_URL}/sales/api/v1/sales/delete_multiple/`;

export const SEARCH_RECEIVABLEBILL = `${BASE_URL}/sales/api/v1/sales/search/`;

export const GET_RECEIVABLEBILL_BY_INVOICE_NO = `${BASE_URL}/sales/api/v1/sales/receipt_voucher_by_invoice_no/`;

// accounts/sales
export const CREATE_SALES = `${BASE_URL}/sales/api/v1/sales/create/`;

export const GET_SALESID = `${BASE_URL}/sales/api/v1/sales/`;

export const GET_ALLSALES = `${BASE_URL}/sales/api/v1/sales/all/`;

export const UPDATE_SALES = `${BASE_URL}/sales/api/v1/sales/update/`;

export const DELETE_SALES = `${BASE_URL}/sales/api/v1/sales/delete/`;

export const SEARCH_SALES = `${BASE_URL}/sales/api/v1/sales/search/`;

export const GET_SALES_BY_INVOICE_NUMBER = `${BASE_URL}/sales/api/v1/sales/sales_by_invoice_no/`;

//purchases

export const CREATE_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/create/`;

export const GET_PAYABLEBILLS = `${BASE_URL}/purchase/api/v1/purchase/all`;

export const GET_PAYABLEBILL_BY_ID = `${BASE_URL}/purchase/api/v1/purchase/`;

export const UPDATE_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/update/`;

export const DELETE_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/delete/`;

export const DELETE_PAYABLEBILL_MULTIPLE = `${BASE_URL}/purchase/api/v1/purchase/delete_multiple/`;

export const SEARCH_PAYABLEBILL = `${BASE_URL}/purchase/api/v1/purchase/search/`;

export const GET_PAYABLEBILL_BY_INVOICE_NO = `${BASE_URL}/purchase/api/v1/purchase/purchase_by_invoice_no/`;

// accounts/purchase

export const CREATE_ACCOUNT_PURCHASE = `${BASE_URL}/purchase/api/v1/purchase/create/`;

export const GET_ACCOUNT_PURCHASEID = `${BASE_URL}/purchase/api/v1/purchase/`;

export const GET_ACCOUNT_PURCHASES = `${BASE_URL}/purchase/api/v1/purchase/all/`;

export const UPDATE_ACCOUNT_PURCHASE = `${BASE_URL}/purchase/api/v1/purchase/update/`;

export const DELETE_ACCOUNT_PURCHASE = `${BASE_URL}/purchase/api/v1/purchase/delete/`;

export const SEARCH_ACCOUNT_PURCHASE = `${BASE_URL}/purchase/api/v1/purchase/search/`;

export const GET_ACCOUNT_PURCHASE_BY_INVOICE_NUMBER = `${BASE_URL}/purchase/api/v1/purchase/purchase_by_invoice_no/`;

// Purchase Req

export const SEARCH_PURCHASE_REQ = `${BASE_URL}/purchase_request/api/v1/purchase_request/search/`;

export const GET_PURCHASE_BY_INVOICE = `${BASE_URL}/purchase_request/api/v1/purchase_request/get_invoice_by_purchase_request_id/`;

export const DELETE_PURCHASE_REQ_ITEM = `${BASE_URL}/purchase_req_item/api/v1/purchase_req_item/delete/`;

export const CREATE_PURCHASE = `${BASE_URL}/purchase_request/api/v1/purchase_request/create_vendor_purchase_request/`;

export const GET_PURCHASES = `${BASE_URL}/purchase_request/api/v1/purchase_request/all/`;

export const DELETE_PURCHASE = `${BASE_URL}/purchase_request/api/v1/purchase_request/delete/`;

export const GET_PURCHASEID = `${BASE_URL}/purchase_request/api/v1/purchase_request_with_items_images/`;

export const UPDATE_PURCHASE = `${BASE_URL}/purchase_request/api/v1/purchase_request/update/`;

// Purchase Final

export const CREATE_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/create_from_purchase_request/`;

export const DELETE_PURCHASE_FINAL_ITEM = `${BASE_URL}/purchase_final/api/v1/purchase_final/delete_item/`;

export const GET_PURCHASE_FINAL_WITH_ITEMS = `${BASE_URL}/purchase_final/api/v1/purchase_final/get_a_purchase_final_with_items/`;

export const PAY_AND_CONFIRM_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/paybill_and_confirm/`;

export const UPDATE_PURCHASE_FINAL_ITEM = `${BASE_URL}/purchase_final/api/v1/purchase_final/update_item/`;

export const UPDATE_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/update/`;

export const GET_PURCHASE_FINALS = `${BASE_URL}/purchase_final/api/v1/purchase_final/all/`;

// Inventory
export const GET_INVENTORY_BY_ID = `${BASE_URL}/inventory/api/v1/inventory/`;

export const GET_INVENTORY_BY_PRODUCT_ID = `${BASE_URL}/inventory/api/v1/inventory/check_by_product_id/`;

//contras
export const CREATE_CONTRA = `${BASE_URL}/contra/api/v1/contra/create/`;

export const GET_CONTRAS = `${BASE_URL}/contra/api/v1/contra/all`;

export const GET_CONTRA_BY_ID = `${BASE_URL}/contra/api/v1/contra/`;

export const UPDATE_CONTRA = `${BASE_URL}/contra/api/v1/contra/update/`;

export const DELETE_CONTRA = `${BASE_URL}/contra/api/v1/contra/delete/`;

export const DELETE_CONTRA_MULTIPLE = `${BASE_URL}/contra/api/v1/contra/delete_multiple/`;

export const SEARCH_CONTRA = `${BASE_URL}/contra/api/v1/contra/search/`;

export const GET_CONTRA_BY_INVOICE_NO = `${BASE_URL}/contra/api/v1/contra/contra_by_invoice_no/`;

//journals
export const CREATE_JOURNAL = `${BASE_URL}/journal/api/v1/journal/create/`;

export const GET_JOURNALS = `${BASE_URL}/journal/api/v1/journal/all`;

export const GET_JOURNAL_BY_ID = `${BASE_URL}/journal/api/v1/journal/`;

export const UPDATE_JOURNAL = `${BASE_URL}/journal/api/v1/journal/update/`;

export const DELETE_JOURNAL = `${BASE_URL}/journal/api/v1/journal/delete/`;

export const DELETE_JOURNAL_MULTIPLE = `${BASE_URL}/journal/api/v1/journal/delete_multiple/`;

export const SEARCH_JOURNAL = `${BASE_URL}/journal/api/v1/journal/search/`;

export const GET_JOURNAL_BY_INVOICE_NO = `${BASE_URL}/journal/api/v1/journal/journal_by_invoice_no/`;

// site_settings
export const CREATE_SITESETTING = `${BASE_URL}/general_setting/api/v1/general_setting/create/`;

export const GET_SITESETTINGID = `${BASE_URL}/general_setting/api/v1/general_setting/`;

export const GET_SITESETTINGS = `${BASE_URL}/general_setting/api/v1/general_setting/all/`;

export const UPDATE_SITESETTING = `${BASE_URL} /general_setting/api/v1/general_setting/update/`;

export const DELETE_SITESETTING = `${BASE_URL} /general_setting/api/v1/general_setting/delete/`;

// branch
export const CREATE_BRANCH = `${BASE_URL}/branch/api/v1/branch/create/`;

export const GET_BRANCHID = `${BASE_URL}/branch/api/v1/branch/`;

export const GET_BRANCHS = `${BASE_URL}/branch/api/v1/branch/all/`;

export const GET_BRANCH_WITHOUT_PAGINATION = `${BASE_URL}/branch/api/v1/branch/without_pagination/all/`;

export const UPDATE_BRANCH = `${BASE_URL}/branch/api/v1/branch/update/`;

export const DELETE_BRANCH = `${BASE_URL}/branch/api/v1/branch/delete/`;

export const SEARCH_BRANCH = `${BASE_URL}/branch/api/v1/branch/search/`;

//menu item
export const MENU_ITEMS = `${BASE_URL}/menu_item/api/v1/menu_item/nested_menu_item_by_user_role/`;

export const CREATE_MENU = `${BASE_URL}/cms_menu/api/v1/cms_menu/create/`;

export const DELETE_MENU = `${BASE_URL}/cms_menu/api/v1/cms_menu/delete/`;

export const GET_MENUS = `${BASE_URL}/cms_menu/api/v1/cms_menu/`;

export const UPDATE_MENU = `${BASE_URL}/cms_menu/api/v1/cms_menu/update/`;

export const GET_MENUS_ALL = `${BASE_URL}/cms_menu/api/v1/cms_menu/all/`;

export const GET_MENUS_ALL_NESTED = `${BASE_URL}/cms_menu/api/v1/cms_menu/get_all_nested_cms_menu/`;

export const GET_MENUS_BY_ROLE = `${BASE_URL}/menu_item/api/v1/menu_item/nested_menu_item_by_role_id/`;

export const SEARCH_MENU = `${BASE_URL}/menu_item/api/v1/menu_item/search/`;

export const GET_MENUS_WITHOUT_PAGINATION = `${BASE_URL}/cms_menu/api/v1/cms_menu/without_pagination/all/`;
export const GET_TOUR_ENTRYID = `${BASE_URL}/tour_content/api/v1/tour`;
export const CHECKOUTDATA = `${BASE_URL}/payments/api/v1/payments/checkout/create/`;
export const getAllTourBookingByTravellerID = `${BASE_URL}/tour_booking/api/v1/tour_booking/get_all_tour_booking_by_traveller_id/`;
export const checkAvailability = `${BASE_URL}/payments/api/v1/payments/availability/check/`;

export const GET_ALL_TOUR = `${BASE_URL}/tour_content/api/v1/tour/all/`;

export const GET_BOOKINGS_BY_ID = `${BASE_URL}/tour_booking/api/v1/tour_booking/`;

export const GET_BOOKINGS_BY_UUID = `${BASE_URL}/tour_booking/api/v1/tour_booking/`;

export const Update_ATour_BookingDate = `${BASE_URL}/tour_booking/api/v1/tour_booking/date/update/`;

//menu content

export const CREATE_CONTENT = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/create/`;

export const DELETE_CONTENT = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/delete/`;

export const GET_CONTENTS = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content`;

export const UPDATE_CONTENT = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/update/`;

export const GET_CONTENTS_ALL = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/all/`;

export const GET_CONTENTS_ALL_NESTED = `${BASE_URL}/cms_menu_content_content/api/v1/get_all_cms_menu_content_content_by_cms_menu_content_id/`;

export const GET_CONTENTS_BY_MENU_ID = `${BASE_URL}/cms_menu_content/api/v1/get_all_cms_menu_content_by_cms_menu_id`;

export const GET_CONTENTS_WITH_URL_BY_MENU_ID = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/get_cms_menu_content_by_cms_menu_id`;

export const GET_CONTENTS_WITHOUT_PAGINATION = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/without_pagination/all/`;

export const GET_CONTENTS_BY_MENU_CONTENT_ID = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content`;

export const GET_CONTENT_BY_TITLE = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content`;

// // menu content images
// export const CREATE_CONTENT_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/create/`;

// export const DELETE_CONTENT_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/delete/`;

// export const GET_CONTENTS_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/`;

// export const UPDATE_CONTENT_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/update/`;

// export const GET_CONTENTS_ALL_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/all/`;

// export const GET_IMAGES_WITHOUT_PAGINATION = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/without_pagination/all/`;

// content  images
export const CREATE_IMAGES = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/create/`;

export const DELETE_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/delete/`;

export const GET_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/`;

export const UPDATE_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/update/`;

export const GET_ALL_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/all/`;

export const GET_IMAGE_BY_MENU_ID = `${BASE_URL}/cms_menu_content_image/api/v1/get_all_cms_menu_content_image_list_by_cms_menu_id`;

export const GET_IMAGE_BY_MENU_NAME = `${BASE_URL}/cms_menu_content_image/api/v1/get_all_cms_menu_content_image_list_by_menu_name/`;

export const GET_IMAGES_WITHOUT_PAGINATION = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/without_pagination/all/`;

export const GET_ALL_CONTENT_AND_IMAGES_BY_MENU_ID = `${BASE_URL}/cms_menu_content_image/api/v1/get_content_and_images_by_menu_id`;

// cause content  images
export const CREATE_CAUSE_IMAGES = `${BASE_URL}/cause_content_image/api/v1/cause_content_image/create/`;

export const DELETE_CAUSE_IMAGE = `${BASE_URL}/cause_content_image/api/v1/cause_content_image/delete/`;

export const GET_CAUSE_IMAGE = `${BASE_URL}/cause_content_image/api/v1/cause_content_image/`;

export const UPDATE_CAUSE_IMAGE = `${BASE_URL}/cause_content_image/api/v1/cause_content_image/update/`;

export const GET_CAUSE_ALL_IMAGE = `${BASE_URL}/cause_content_image/api/v1/cause_content_image/all/`;

export const GET_CAUSE_IMAGES_WITHOUT_PAGINATION = `${BASE_URL}/cause_content/api/v1/cause_content/without_pagination/all/`;

//role menu
export const CREATE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/create/`;

export const GET_ROLEMENUS = `${BASE_URL}/role_menu/api/v1/role_menu/all`;

export const GET_ROLEMENU_BY_ID = `${BASE_URL}/role_menu/api/v1/role_menu/`;

export const UPDATE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/update/`;

export const DELETE_ROLEMENU = `${BASE_URL}/role_menu/api/v1/role_menu/delete/`;

// export const SEARCH_ROLEMENU = `${BASE_URL}/rolemenu/api/v1/rolemenu/search/`;

//ledger
export const CREATE_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/create/`;

export const GET_LEDGERS = `${BASE_URL}/ledger_account/api/v1/ledger_account/all`;

export const GET_LEDGER_BY_ID = `${BASE_URL}/ledger_account/api/v1/ledger_account/`;

export const UPDATE_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/update/`;

export const DELETE_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/delete/`;

export const DELETE_LEDGER_MULTIPLE = `${BASE_URL}/ledger_account/api/v1/ledger_account/delete_multiple/`;

export const SEARCH_LEDGER = `${BASE_URL}/ledger_account/api/v1/ledger_account/search/`;

export const LEDGERS_WITHOUT_PAGINATION = `${BASE_URL}/ledger_account/api/v1/ledger_account/all`;

//subLedger
export const CREATE_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/create/`;

export const GET_SUBLEDGERS = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/all`;

export const GET_SUBLEDGER_BY_ID = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/`;

export const UPDATE_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/update/`;

export const DELETE_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/delete/`;

export const DELETE_SUBLEDGER_MULTIPLE = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/delete_multiple/`;

export const SEARCH_SUBLEDGER = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/search/`;

export const SUBLEDGERS_WITHOUT_PAGINATION = `${BASE_URL}/sub_ledger_account/api/v1/sub_ledger_account/without_pagination/all/`;

//group
export const CREATE_GROUP = `${BASE_URL}/group/api/v1/group/create/`;

export const GET_GROUPS = `${BASE_URL}/group/api/v1/group/all`;

export const GET_GROUP_BY_ID = `${BASE_URL}/group/api/v1/group/`;

export const UPDATE_GROUP = `${BASE_URL}/group/api/v1/group/update/`;

export const DELETE_GROUP = `${BASE_URL}/group/api/v1/group/delete/`;

export const DELETE_GROUP_MULTIPLE = `${BASE_URL}/group/api/v1/group/delete_multiple/`;

export const SEARCH_GROUP = `${BASE_URL}/group/api/v1/group/search/`;

// category
export const GET_PERENT_CATEGORIES = `${BASE_URL}/category/api/v1/category/get_all_parent_category_without_pagination/`;

export const GET_SUB_CATEGORIES_BY_ID = `${BASE_URL}/category/api/v1/category/get_all_sub_category_by_category_id_without_pagination/`;

export const GET_SUB_SUB_CATEGORIES_BY_ID = `${BASE_URL}/category/api/v1/category/get_all_sub_sub_category_by_category_id_without_pagination/`;

export const GET_CATEGORIES_WITHOUT_PAGINATION = `${BASE_URL}/category/api/v1/category/without_pagination/all/`;

export const SEARCH_CATEGORY = `${BASE_URL}/category/api/v1/category/search/`;

export const GET_CATEGORIES = `${BASE_URL}/category/api/v1/category/all/`;

export const CREATE_CATEGORY = `${BASE_URL}/category/api/v1/category/create/`;

export const GET_CATEGORY = `${BASE_URL}/category/api/v1/category/`;

export const UPDATE_CATEGORY = `${BASE_URL}/category/api/v1/category/update/`;

export const DELETE_CATEGORY = `${BASE_URL}/category/api/v1/category/delete/`;

// Order
export const CREATE_ORDER = `${BASE_URL}/order/api/v1/order/create/`;

export const GET_ORDERS = `${BASE_URL}/order/api/v1/order/all`;

export const GET_ORDERID = `${BASE_URL}/order/api/v1/order/`;

export const UPDATE_ORDER = `${BASE_URL}/order/api/v1/order/update/`;

export const DELETE_ORDER = `${BASE_URL}/order/api/v1/order/delete/`;

export const SEARCH_ORDER = `${BASE_URL}/customerorder/api/v1/customerorder/search/`;

export const SHIPPING_ADDRESS_BY_ORDERID = `${BASE_URL}/shippingaddress/api/v1/shippingaddress_using_order_id/`;

// Customer Order
export const CREATE_CUSTOMER_ORDER = `${BASE_URL}/customerorder/api/v1/customerorder/create/`;

export const CONFIRM_CUSTOMER_ORDER = `${BASE_URL}/customerorder/api/v1/customerorder/confirm/`;

export const UPDATE_CUSTOMER_ORDER = `${BASE_URL}/customerorder/api/v1/customerorder/update_order/`;

export const GET_A_CUSTOMER_ORDER = `${BASE_URL}/customerorder/api/v1/customerorder/get_a_customer_order/`;

export const GET_INVOICE_BY_ORDERID = `${BASE_URL}/customerorder/api/v1/customerorder/get_invoice_by_order_id/`;

// Shipping Address

export const CREATE_SHIPPINGADDRESS = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/create/`;

export const GET_SHIPPINGADDRESSID = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/`;

export const GET_SHIPPINGADDRESSES = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/all/`;

export const UPDATE_SHIPPINGADDRESS = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/update/`;

export const DELETE_SHIPPINGADDRESS = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/delete/`;

export const SEARCH_SHIPPINGADDRESS = `${BASE_URL}/shippingaddress/api/v1/shippingaddress/search/`;

//  manufacturers
export const CREATE_MANUFACTURER = `${BASE_URL}/manufacturer/api/v1/manufacturer/create/`;

export const GET_MANUFACTURERS_WITHOUT_PAGINATION = `${BASE_URL}/manufacturer/api/v1/manufacturer/without_pagination/all/`;

export const GET_MANUFACTURERS = `${BASE_URL}/manufacturer/api/v1/manufacturer/all/`;

export const GET_MANUFACTURERID = `${BASE_URL}/manufacturer/api/v1/manufacturer/`;

export const UPDATE_MANUFACTURER = `${BASE_URL}/manufacturer/api/v1/manufacturer/update/`;

export const DELETE_MANUFACTURER = `${BASE_URL}/manufacturer/api/v1/manufacturer/delete/`;

export const SEARCH_MANUFACTURER = `${BASE_URL}/manufacturer/api/v1/manufacturer/search/`;

// Vendor
export const CREATE_VENDOR = `${BASE_URL}/vendor/api/v1/vendor/create/`;

export const GET_VENDORS = `${BASE_URL}/vendor/api/v1/vendor/all/`;

export const GET_VENDORS_WITHOUT_PAGINATION = `${BASE_URL}/vendor/api/v1/vendor/without_pagination/all/`;

export const GET_VENDORID = `${BASE_URL}/vendor/api/v1/vendor/`;

export const UPDATE_VENDOR = `${BASE_URL}/vendor/api/v1/vendor/update/`;

export const DELETE_VENDOR = `${BASE_URL}/vendor/api/v1/vendor/delete/`;

export const SEARCH_VENDOR = `${BASE_URL}/vendor/api/v1/vendor/search/`;

// Purchase Final
export const GET_PURCHASE_FINAL_BY_INVOICE = `${BASE_URL}/purchase_final/api/v1/purchase_final/get_invoice_by_purchase_final_id/`;

export const SEARCH_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/search/`;

export const CREATE_PURCHASE_FINAL_MANUALLY = `${BASE_URL}/purchase_final/api/v1/purchase_final/create_directly_from_admin_panel/`;

export const DELETE_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/delete/`;

export const GET_PURCHASE_FINAL = `${BASE_URL}/purchase_final/api/v1/purchase_final/`;

//  Order
export const ORDERSTATUS = `${BASE_URL}/orderstatus/api/v1/orderstatus/all/`;

// Customer
export const CREATE_CUSTOMER = `${BASE_URL}/customer/api/v1/customer/create/`;

export const GET_CUSTOMERS = `${BASE_URL}/customer/api/v1/customer/all`;

export const GET_CUSTOMERID = `${BASE_URL}/customer/api/v1/customer/`;

export const UPDATE_CUSTOMER = `${BASE_URL}/customer/api/v1/customer/update/`;

export const DELETE_CUSTOMER = `${BASE_URL}/customer/api/v1/customer/delete/`;

export const SEARCH_CUSTOMER = `${BASE_URL}/customer/api/v1/customer/search/`;

//Get customer without pagination
export const GET_CUSTOMER_WITHOUT_PAGINATION = `${BASE_URL}/customer/api/v1/customer/without_pagination/all/`;

export const GET_CUSTOMER_ORDER_DETAILS = `${BASE_URL}/customerorder/api/v1/customerorder/get_a_customer_order_detail/`;

export const UPDATE_PRODUC_TITEM = `${BASE_URL}/customerorder/api/v1/customerorder/update_item/`;

export const REMOVE_PRODUC_TITEM = `${BASE_URL}/customerorder/api/v1/customerorder_delete_item/`;

export const CUSTOMERORDERDETAILSWITHSHIPPINGADDRESS = `${BASE_URL}/customerorder/api/v1/customerorder/get_a_customer_order_detail_with_order_orderitem_shipping/`;

//  Customer types
export const CUSOTMERTYPES = `${BASE_URL}/customer_type/api/v1/customer_type/all/`;

// Inventory
export const GET_INVENTORY_SEARCH = `${BASE_URL}/inventory/api/v1/inventory/search/`;

// ticket
export const CREATE_TICKET_DETAIL = `${BASE_URL}/ticket_detail/api/v1/ticket_detail/create/`;

export const GET_TICKET_DETAILS = `${BASE_URL}/ticket_detail/api/v1/ticket_detail/all/`;

export const GET_TICKET_DETAILS_BY_ID = `${BASE_URL}/ticket_detail/api/v1/ticket_detail/get_all_by_ticket_id/`;

export const GET_TICKETS = `${BASE_URL}/ticket/api/v1/ticket/all/`;

export const DELETE_TICKET = `${BASE_URL}/ticket/api/v1/ticket/delete/`;

export const UPDATE_TICKET = `${BASE_URL}/ticket/api/v1/ticket/update/`;

export const GET_ACCOUNT_TICKETS = `${BASE_URL}/ticket/api/v1/ticket/ticket_of_account_department`;

export const GET_SALES_TICKETS = `${BASE_URL}/ticket/api/v1/ticket/ticket_of_sales_department`;

export const GET_SUPPORT_TICKETS = `${BASE_URL}/ticket/api/v1/ticket/ticket_of_support_department`;

//ticket_status
export const GET_TICKET_STATUS = `${BASE_URL}/ticket_status/api/v1/ticket_status/all`;

export const UPDATE_TICKET_STATUS = `${BASE_URL}/ticket_status/api/v1/ticket_status/update/`;

// Purchase
export const GET_PURCHASESTATUS = `${BASE_URL}/purchase_status/api/v1/purchase_status/all/`;

//  product
export const SEARCH_PRODUCT = `${BASE_URL}/product/api/v1/product/search/`;

export const CREATE_PRODUCT = `${BASE_URL}/product/api/v1/product/create/`;

export const GET_PRODUCTS = `${BASE_URL}/product/api/v1/product/all/`;

export const GET_PRODUCT = `${BASE_URL}/product/api/v1/product/`;

export const UPDATE_PRODUCT = `${BASE_URL}/product/api/v1/product/update/`;

export const DELETE_PRODUCT = `${BASE_URL}/product/api/v1/product/delete/`;

export const GET_ALL_PRODUCT_WITHOUT_PG = `${BASE_URL}/product/api/v1/product/without_pagination/all/`;

export const GET_ATTRIBUTE_SET_WITHOUT_PAGINATION = `${BASE_URL}/attributeset/api/v1/attributeset/without_pagination/all/`;

//  product-color

export const CREATE_PRODUCT_COLOR = `${BASE_URL}/productcolor/api/v1/productcolor/create/`;
export const GET_PRODUCT_COLORS_BY_ID = `${BASE_URL}/productcolor/api/v1/productcolor/get_all_by_product_id/`;
export const DELETE_PRODUCT_COLOR = `${BASE_URL}/productcolor/api/v1/productcolor/delete/`;

// product-img
export const GET_PRODUCT_BY_ID = `${BASE_URL}/productimage/api/v1/productimage/all_productimage_by_product_id/`;

export const CREATE_PRODUCT_IMAGE = `${BASE_URL}/productimage/api/v1/productimage/create/`;

export const GET_PRODUCT_IMAGES = `${BASE_URL}/productimage/api/v1/productimage/all/`;

export const DELETE_PRODUCT_IMAGE = `${BASE_URL}/productimage/api/v1/productimage/delete/`;

//  product size
export const CREATE_PRODUCT_SIZE = `${BASE_URL}/size/api/v1/size/create/`;

export const GET_PRODUCT_SIZE = `${BASE_URL}/size/api/v1/size/all/`;

export const DELETE_PRODUCT_SIZE = `${BASE_URL}/size/api/v1/size/delete/`;

//  paymentMathods
export const PAYMENT_MATHODS = `${BASE_URL}/paymentmethod/api/v1/paymentmethod/all/`;

//reports

//account statement report
export const ACCOUNTSTATEMENT_FILTER_BY = `${BASE_URL}/account_log_report/api/v1/account_log_report/by_ledger_type/`;

export const ACCOUNTSTATEMENT_FILTER_WITHOUT_PG = `${BASE_URL}/account_log_report/api/v1/account_log_report/by_ledger_type/`;

//account statement summary report
export const ACCOUNTSUMMARY_FILTER_BY = `${BASE_URL}/account_log_report/api/v1/account_log_report/get_total_cash_dr_cr_bank_dr_cr/`;

export const ACCOUNTSUMMARY_FILTER_WITHOUT_PG = `${BASE_URL}/account_log_report/api/v1/account_log_report/get_total_cash_dr_cr_bank_dr_cr/`;

//ledger report
export const LEDGER_FILTER_BY = `${BASE_URL}/account_log_report/api/v1/account_log_report/general/`;

export const LEDGER_FILTER_WITHOUT_PG = `${BASE_URL}/account_log_report/api/v1/account_log_report/general/`;

//sub ledger report
export const PAYMENT_FILTER_BY = `${BASE_URL}/account_report/api/v1/account_report/report_for_payment_voucher/`;

export const PAYMENT_FILTER_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/report_for_payment_voucher/`;

// payment-summary
export const PAYMENT_SUMMARY_FILTER_BY = `${BASE_URL}/account_report/api/v1/account_report/summary_for_payment_voucher/`;

export const PAYMENT_SUMMARY_FILTER_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/summary_for_payment_voucher/`;

//receipt voucher report
export const RECEIPT_FILTER_BY = `${BASE_URL}/account_report/api/v1/account_report/report_for_receipt_voucher/`;

export const RECEIPT_FILTER_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/report_for_receipt_voucher/`;

// receipt-summary report
export const RECEIPT_SUMMARY_FILTER_BY = `${BASE_URL}/account_report/api/v1/account_report/summary_for_receipt_voucher/`;

export const RECEIPT_SUMMARY_FILTER_WITHOUT_PG = `${BASE_URL}/account_report/api/v1/account_report/summary_for_receipt_voucher/`;

// order report
export const ORDER_FILTER_BY = `${BASE_URL}/report/api/v1/order_report_with_profit/filter/`;

export const ORDER_FILTER_WITHOUT_PG = `${BASE_URL}/report/api/v1/order_report_with_profit/filter/`;

// order-summary report
export const ORDER_SUMMARY_FILTER_BY = `${BASE_URL}/summary_report/api/v1/order_summary_report/filter/`;

export const ORDER_SUMMARY_FILTER_WITHOUT_PG = `${BASE_URL}/summary_report/api/v1/order_summary_report/filter/`;

// Stock Summary Report

export const FILTER_SUMMARY_INVENTORY_REPORT = `${BASE_URL}/summary_report/api/v1/inventory_summary_report/filter/`;

export const FILTER_SUMMARY_INVENTORY_REPORT_WITHOUT_PG = `${BASE_URL}/summary_report/api/v1/inventory_summary_report/filter/`;

// Purchase Final Report

export const FILTER_PURCHASE_FINAL_REPORT = `${BASE_URL}/summary_report/api/v1/purchase_final_summary_report/filter/`;

export const FILTER_PURCHASE_FINAL_REPOR_WITHOUT_PG = `${BASE_URL}/summary_report/api/v1/purchase_final_summary_report/filter/`;

// Purchage Req Report

export const FILTER_PURCHASE_REQ_REPORT = `${BASE_URL}/summary_report/api/v1/purchase_request_summary_report/filter/`;

export const FILTER_PURCHASE_REQ_REPORT_WITHOUT_PG = `${BASE_URL}/summary_report/api/v1/purchase_request_summary_report/filter/`;

//DashBoard
// Get order count paid
export const GET_ORDERS_COUNT_PAID = `${BASE_URL}/dashboard/api/v1/get_total_count_of_paid_orders/`;

// Get order count un-paid
export const GET_ORDERS_COUNT_UNPAID = `${BASE_URL}/dashboard/api/v1/get_total_count_of_unpaid_orders/`;
// Get total registered customer
export const GET_REGISTERED_CUSTOMERS = `${BASE_URL}/dashboard/api/v1/get_total_count_of_customers/`;
// Get total stock
export const GET_TOTAL_LOW_STOCKS = `${BASE_URL}/dashboard/api/v1/get_total_count_of_low_stock_products/`;
// Get total stock
export const GET_TOTAL_LATEST_ORDERS = `${BASE_URL}/dashboard/api/v1/get_all_latest_orders/`;
// Get total orders
export const GET_TOTAL_ORDERS = `${BASE_URL}/dashboard/api/v1/get_order_totals/`;
// Get total Incomplete orders
export const GET_TOTAL_INCOMPLETE_ORDERS = `${BASE_URL}/dashboard/api/v1/get_all_incomplete_orders/`;
// Get Employee
export const GET_ALL_EMPLOYEE_WITHOUT_PAGINATION = `${BASE_URL}/employee/api/v1/employee/without_paginaiton/all/`;
// Get total paid orders
export const GET_ALL_PAID_ORDERS = `${BASE_URL}/dashboard/api/v1/get_all_paid_orders/`;
// Get total unPaid orders
export const GET_ALL_UNPAID_ORDERS = `${BASE_URL}/dashboard/api/v1/get_all_unpaid_orders/`;
// Get total low stocks
export const GET_ALL_LOW_STOCK_PRODUCTS = `${BASE_URL}/dashboard/api/v1/get_all_low_stock_products/                  `;
export const GET_ALL_CATEGORIZED_ORDER_ITEM_COUNT = `${BASE_URL}/dashboard/api/v1/get_all_categorized_order_item_count/`;
// Get Best seller Amount
export const GET_BEST_SELLER_AMOUNT = `${BASE_URL}/dashboard/api/v1/get_best_seller_by_amount/`;
// Get Best seller Quantity
export const GET_BEST_SELLER_QUANTITY = `${BASE_URL}/dashboard/api/v1/get_best_seller_by_quantity/`;

// email and newsletter
export const CREATE_NEWS_LETTER = `${BASE_URL}/email/api/store-and-send-email/`;
export const CREATE_SUBSCRIPTION_WITH_EMAIL = `${BASE_URL}/send-email/api/send-email/`;

// exchange rates api
export const GET_LATEST_EXCHANGE_RATE = `https://v6.exchangerate-api.com/v6/81dd55f0d406c9a2f17b5298/latest/USD`;

// get itenaries
export const GET_ITENARIES_BY_CONTENT_ID = `${BASE_URL}/cms_itinerary/api/v1/Itinerary/get_Itinerary_by_cms_content_id`;

// get Customer location
export const GET_LOCATION_BY_COORDS = `https://api.opencagedata.com/geocode/v1/json`;
