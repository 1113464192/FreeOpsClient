import { $t } from '@/locales';

/**
 * Transform record to option
 *
 * @example
 *   ```ts
 *   const record = {
 *     key1: 'label1',
 *     key2: 'label2'
 *   };
 *   const options = transformRecordToOption(record);
 *   // [
 *   //   { value: 'key1', label: 'label1' },
 *   //   { value: 'key2', label: 'label2' }
 *   // ]
 *   ```;
 *
 * @param record
 */
export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label
  })) as CommonType.Option<keyof T>[];
}

/**
 * Transform boolean record to option
 *
 * @example
 *   ```ts
 *   const record = {
 *     1: 'labelTrue',
 *     2: 'labelFalse'
 *   };
 *   const options = transformBooleanRecordToOption(record);
 *   // [
 *   //   { value: true, label: 'labelTrue' },
 *   //   { value: false, label: 'labelFalse' }
 *   // ]
 *   ```;
 *
 * @param record
 */
export function transformBooleanRecordToOption(record: Record<number, string>) {
  return Object.entries(record).map(([value, label]) => ({
    value: value === '1',
    label
  })) as CommonType.Option<boolean>[];
}

/**
 * Translate options
 *
 * @param options
 */
export function translateOptions(options: CommonType.Option<string>[]) {
  return options.map(option => ({
    ...option,
    label: $t(option.label as App.I18n.I18nKey)
  }));
}

/**
 * Toggle html class
 *
 * @param className
 */
export function toggleHtmlClass(className: string) {
  function add() {
    document.documentElement.classList.add(className);
  }

  function remove() {
    document.documentElement.classList.remove(className);
  }

  return {
    add,
    remove
  };
}
