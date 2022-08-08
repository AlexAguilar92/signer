import ErrorCategory from '../enums/errorCategory';
import { ErrorType } from './BaseError';

const ErrorCode: { [key: string]: ErrorType } = {
  ERR0000: {
    code: 'ERR0000',
    category: ErrorCategory.SYSTEM,
    msg: 'INTERNAL_SERVER_ERROR',
    description: '',
  },
  ERR0001: {
    code: 'ERR0001',
    category: ErrorCategory.USER,
    msg: 'NOT_FOUND',
    description: '',
  },
  ERR0002: {
    code: 'ERR0002',
    category: ErrorCategory.USER,
    msg: 'CANNOT_UPDATE_DUE_TO_OUTDATED_DATA',
    description: '',
  },
  ERR0003: {
    code: 'ERR0003',
    category: ErrorCategory.USER,
    msg: 'INVALID_PAGINATION_FORMAT',
    description: '',
  },
  ERR0004: {
    code: 'ERR0004',
    category: ErrorCategory.USER,
    msg: 'INVALID_PAGINATION_LIMIT',
    description: '',
  },
  ERR0005: {
    code: 'ERR0005',
    category: ErrorCategory.USER,
    msg: 'INVALID_PARAMETERS',
    description: 'Ensure that at least one parameter is brought',
  },
  ERR0006: {
    code: 'ERR0006',
    category: ErrorCategory.USER,
    msg: 'MISSING_PARAMETERS',
    description: '',
  },
  ERR0007: {
    code: 'ERR0007',
    category: ErrorCategory.USER,
    msg: 'DUPLICATED_KEY',
    description: '',
  },
  ERR0008: {
    code: 'ERR0008',
    category: ErrorCategory.USER,
    msg: 'BAD_REQUEST',
    description: '',
  },
  ERR0009: {
    code: 'ERR0009',
    category: ErrorCategory.USER,
    msg: 'METHOD_DEPRECATED',
    description: '',
  },
  ERR0010: {
    code: 'ERR0010',
    category: ErrorCategory.SYSTEM,
    msg: 'DATABASE_UNAVAILABLE',
    description: '',
  },
  ERR0011: {
    code: 'ERR0011',
    category: ErrorCategory.SYSTEM,
    msg: 'SERVICE_UNAVAILABLE',
    description: '',
  },
  ERR0012: {
    code: 'ERR0012',
    category: ErrorCategory.SYSTEM,
    msg: 'COLUMN_NOT_FOUND',
    description: '',
  },
  ERR0013: {
    code: 'ERR0013',
    category: ErrorCategory.SYSTEM,
    msg: 'DUPLICATED_ID_FOUND',
    description: '',
  },
  ERR0014: {
    code: 'ERR0014',
    category: ErrorCategory.SYSTEM,
    msg: 'ITEM_INACTIVE',
    description: '',
  },
  ERR0015: {
    code: 'ERR0015',
    category: ErrorCategory.BUSINESS,
    msg: 'RULE_NOT_APPLY',
    description: '',
  },
};

export default ErrorCode;
