export type AccountCategory =
  | 'ASSET'
  | 'LIABILITY'
  | 'EQUITY'
  | 'REVENUE'
  | 'COGS'
  | 'OPERATING_EXPENSE'
  | 'OTHER_INCOME'
  | 'OTHER_EXPENSE';

export interface ChartOfAccount {
  id: string;
  accountCode: string; // e.g. "1101-001"
  accountName: string;
  category: AccountCategory;
  level: number;
  isParent: boolean;
  parentId?: string;
  normalBalance: 'DEBIT' | 'CREDIT';
  currentBalanceIdr: number;
  costCenterCode?: string;
  isActive: boolean;
}

export interface JournalDetail {
  id: string;
  accountCode: string;
  accountName: string;
  debitAmountIdr: number;
  creditAmountIdr: number;
  costCenterCode?: string;
  memo: string;
}

export interface JournalEntry {
  id: string;
  journalNo: string; // e.g. "JV-2026-08-001"
  transactionDate: string;
  sourceModule: 'HARVEST' | 'INVENTORY' | 'PAYROLL' | 'EAM_WORKSHOP' | 'MANUAL_FINANCE' | 'CPO_SALES';
  referenceNo: string; // Cross reference to source PO/Payroll/TBS Ticket
  description: string;
  details: JournalDetail[];
  totalDebitIdr: number;
  totalCreditIdr: number;
  status: 'DRAFT' | 'POSTED' | 'REJECTED';
  createdBy: string;
  approvedBy?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  currency: 'IDR' | 'USD';
  balanceIdr: number;
  picName: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface CashTransaction {
  id: string;
  trxNo: string;
  trxType: 'CASH_IN' | 'CASH_OUT';
  accountName: string;
  categoryName: string;
  amountIdr: number;
  date: string;
  description: string;
  recipientOrSource: string;
  status: 'COMPLETED' | 'PENDING_APPROVAL';
}

export interface SupplierInvoice {
  id: string;
  invoiceNo: string;
  poReferenceNo: string;
  supplierName: string;
  invoiceDate: string;
  dueDate: string;
  amountIdr: number;
  paidAmountIdr: number;
  remainingAmountIdr: number;
  status: 'UNPAID' | 'PARTIAL' | 'PAID' | 'OVERDUE';
}

export interface CustomerInvoice {
  id: string;
  invoiceNo: string;
  contractReferenceNo: string;
  customerName: string; // e.g. "PT Wilmar Bioenergi Indonesia"
  productType: 'CPO_CRUDE_PALM_OIL' | 'PK_PALM_KERNEL' | 'TBS_FRESH_FRUIT';
  quantityTons: number;
  invoiceDate: string;
  dueDate: string;
  amountIdr: number;
  paidAmountIdr: number;
  remainingAmountIdr: number;
  status: 'UNPAID' | 'PARTIAL' | 'PAID' | 'OVERDUE';
}

export interface BudgetCostCenter {
  id: string;
  costCenterCode: string; // e.g. "CC-EST-SEIRIAU"
  costCenterName: string; // e.g. "Cost Center Estate Sei Riau - Afdeling 1"
  annualBudgetIdr: number;
  ytdActualCostIdr: number;
  utilizationPercent: number;
  costPerHectareIdr: number;
  costPerTonTbsIdr: number;
  status: 'NORMAL' | 'WARNING_NEAR_LIMIT' | 'OVER_BUDGET';
}

export interface FinancialRatioSummary {
  currentRatio: number;
  quickRatio: number;
  debtToEquityRatio: number;
  grossProfitMarginPercent: number;
  netProfitMarginPercent: number;
  costPerTonCpoIdr: number;
  costPerHectareHaIdr: number;
}

export interface AiFinancialInsight {
  id: string;
  metricType: 'CASH_FLOW_PREDICTION' | 'COST_OPTIMIZATION' | 'ANOMALY_DETECTION' | 'TAX_RECOMMENDATION';
  summary: string;
  confidencePercent: number;
  recommendation: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}
